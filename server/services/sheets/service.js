const {google} = require('googleapis');
const SheetsTranslator = require('./translator');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

class SheetsService {

  constructor(apiToken) {
    this.api = google.sheets({version: 'v4', auth: apiToken });
  }

  list(sheetId) {
    return new Promise( (resolve, reject) => {
      this.api.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Formularantworten 1!A2:L',
      }, (err, res) => {
        if (err) 
          return reject('The API returned an error: ' + err);
  
        const rows = res.data.values;
        if (rows.length) {
          res = SheetsTranslator.translateAll(rows);
          resolve(res);
        } else {
          return reject('no rows available');
        }
      });
    });
  }
}

module.exports = SheetsService;