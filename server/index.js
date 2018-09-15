require('dotenv').config();
const Sheets = require ('./sheets');
const {send} = require('micro')

const API = new Sheets({
    apiToken: process.env.GOOGLE_API_TOKEN
})

module.exports = (req , res) => {
    API.list(process.env.GOOGLE_SPREADSHEET_ID).then( (resp => {
        send(res, 200, resp);
    }) ).catch( err => {
        send(res, 500, err);
    });  
}


