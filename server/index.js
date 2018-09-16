require('dotenv').config();

const {send} = require('micro')
const microCors = require('micro-cors')
const URL = require('url')
const QS = require('querystring')
const cors = microCors()

const SheetsAPI = require('./services/sheets/service');
const OSMAPI = require('./services/osm/service');
const uniqueTags = require ('./util/uniqueTags');

const demoData = require('./demo.json');

const SheetsApi = new SheetsAPI(process.env.GOOGLE_API_TOKEN);
const OsmService = new OSMAPI(process.env.OSM_SERVICE_INTERPRETER_URL) 

const DEFAULT_NW = [52.38817293874201,13.208999633789062];
const DEFAULT_SE =[52.65139547872391,13.69171142578125];

module.exports = cors( (req , res) => {
    
    const url = URL.parse(req.url);
    const qs = QS.parse(url.query);
    if (qs.demo == 'true') {
        return send(res, 200, demoData);
    }

    const bbox = {
        nw: qs['bbox[nw]'] ? qs['bbox[nw]'].split(',') : DEFAULT_NW,
        se: qs['bbox[se]'] ? qs['bbox[se]'].split(',') : DEFAULT_SE,
    }

    const tagFilter = qs['tags'] ? qs['tags'].split(',') : [];

    Promise.all([
        SheetsApi.list(process.env.GOOGLE_SPREADSHEET_ID), 
        OsmService.query(bbox, OSMAPI.QUERY_TYPE_VENDING_TUBE + OSMAPI.QUERY_TYPE_AIR + OSMAPI.QUERY_TYPE_SHOPS_SERVICE )
    ])
    .then( (resp => {
        const combinedResult = resp[0].concat(resp[1]);
        const tags = uniqueTags(combinedResult);
        send(res, 200, {tags, result: combinedResult});
    }) ).catch( err => {
        send(res, 500, err);
    });  
});
