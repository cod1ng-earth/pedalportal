require('dotenv').config();
const SheetsAPI = require ('./sheets')
const OSMAPI = require('./osm')
const {send} = require('micro')
const microCors = require('micro-cors')

const cors = microCors()

const SheetsApi = new SheetsAPI({
    apiToken: process.env.GOOGLE_API_TOKEN
});

const OsmApi = new OSMAPI() 

module.exports = cors( (req , res) => {
    //const sheetData = SheetsApi.list(process.env.GOOGLE_SPREADSHEET_ID);
    const osmData = OsmApi.query({
        neLat: 52.38817293874201, neLon: 13.208999633789062, 
        swLat: 52.65139547872391, swLon:13.69171142578125
      })
    Promise.all([osmData])
    .then( (resp => {
        const rrr = {
            //sheet: resp[0],
            osm: resp[0]
        };

        send(res, 200, rrr);
    }) ).catch( err => {
        send(res, 500, err);
    });  
});
