class SheetsTranslator {

   /**
   * @param {object} row - a google sheet row
   * @returns {object} - our translated item 
   */
  translate(row) {
    return {
        id: 'gds-',
        origin: 'gds',
        kind: null,
        createdAt: row[0],
        name: row[1],
        tags: row[2].split(','),
        description: row[3],
        imageUrl: row[4],
        deeplink: row[6],
        startsAt: row[7] + ' ' + row[9],
        expiresAt: row[8],
        contact: {},
        location: {
            address:  row[5],
            lat: row[10] ? parseFloat(row[10].replace(',','.')) : null,
            lng: row[11] ? parseFloat(row[11].replace(',','.')) : null
        }
      };
  }

  translateAll(rows) {
    return rows.map(this.translate);
  }
}

module.exports = new SheetsTranslator;