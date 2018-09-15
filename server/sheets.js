const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

class Sheets {
  constructor(config) {
    this.config = config;
    this.api = google.sheets({version: 'v4', auth: config.apiToken });
  }

  list(sheetId) {
    return new Promise( (resolve, reject) => {
      this.api.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Formularantworten 1!A2:E',
      }, (err, res) => {
        if (err) 
          return reject('The API returned an error: ' + err);
  
        const rows = res.data.values;
        if (rows.length) {
          const res = rows.map((row) => ({
            createdAt: row[0],
            name: row[1],
            tags: row[2],
            description: row[3]
          }));
          resolve(res);
        } else {
          return reject('no rows');
        }
      });
    });
  }
}

module.exports = Sheets;