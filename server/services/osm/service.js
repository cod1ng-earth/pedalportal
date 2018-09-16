const axios = require('axios');
const OSMTranslator = require('./translator');

class OSMService {

  constructor(OSMServiceInterpreterUrl) {
    this.OSMServiceInterpreterUrl = OSMServiceInterpreterUrl;
  }

  _query(bbox, queryType) {

    return `
    [out:json][timeout:25][bbox:${bbox.nw[0]},${bbox.nw[1]},${bbox.se[0]},${bbox.se[1]}];
    (${queryType});
    out body meta;
    >;
    out skel qt;
    `;
  }

  query(boundingBox, queryType) {
    const theQuery = this._query(boundingBox, queryType)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: this.OSMServiceInterpreterUrl,
        data: theQuery
      }).then(resp => {
        const res = OSMTranslator.translateAll(resp.data.elements);
        resolve(res);
      })
    });
  }
}

OSMService.QUERY_TYPE_VENDING_TUBE = `
    node["vending"="bicycle_tube"];
  `

OSMService.QUERY_TYPE_AIR = `
    node["compressed_air"="yes"];
    node["amenity"="compressed_air"];
    node["amenity"="air_filling"];
    node["service:bicycle:pump"="yes"];
    node["bicycle:air"="compressed_air"];
  `

OSMService.QUERY_TYPE_SHOPS_SERVICE = ` 
    node["shop"="bicycle"];
    node["amenity"="bicycle_repair_station"];
    node[~"^service:bicycle:"~"yes"];
  `

module.exports = OSMService;
