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
        range: 'Formularantworten 1!A2:L',
      }, (err, res) => {
        if (err) 
          return reject('The API returned an error: ' + err);
  
        const rows = res.data.values;
        if (rows.length) {
          
          const res = rows.map((row) => {
            return {
              createdAt: row[0],
              name: row[1],
              tags: row[2].split(','),
              description: row[3],
              imageUrl: row[4],
              address:  row[5],
              deeplink: row[6],
              startsAt: row[7],
              expires: row[8],
              startsAtTime: row[9],
              lat: row[10] ? parseFloat(row[10].replace(',','.')) : null,
              lng: row[11] ? parseFloat(row[11].replace(',','.')) : null
            }
          });

          resolve(res);
        } else {
          return reject('no rows');
        }
      });
    });
  }
}

module.exports = Sheets;