require('dotenv').config();
const SheetsApi = require ('./sheets');
const {send} = require('micro')
const microCors = require('micro-cors')

const cors = microCors()

const API = new SheetsApi({
    apiToken: process.env.GOOGLE_API_TOKEN
})

module.exports = cors(
        (req , res) => {
        API.list(process.env.GOOGLE_SPREADSHEET_ID).then( (resp => {
            send(res, 200, resp);
        }) ).catch( err => {
            send(res, 500, err);
        });  
    }
);
