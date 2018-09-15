const _pick = require('lodash.pick');
const axios = require('axios');
class OSM {
  
  _query(bbox) {

    return `
    [out:json][timeout:25][bbox:${bbox.neLat},${bbox.neLon},${bbox.swLat},${bbox.swLon}];
    (
      node["compressed_air"="yes"];
      node["amenity"="compressed_air"];
      node["service:bicycle:pump"="yes"];
      node["amenity"="bicycle_repair_station"];
      node["service:bicycle:diy"];
      node["shop"="bicycle"];
      node["amenity"="air_filling"];
      node["bicycle:air"="compressed_air"];
    );
    out body;
    >;
    out skel qt;
    `;
  }

  _translate(osm) {
    const osmTags = osm.tags;
    const addr = _pick(osmTags, ["addr:street", "addr:housenumber", "addr:postcode", "addr:city"]).join(" ");
    const result = {
      createdAt: null,
      name: osm['name'],
      description: osm['opening_hours'],
      imageUrl: null,
      address:  addr,
      deeplink: osmTags['website'] || osmTags['contact:website'],
      startsAt: null,
      expires: null,
      startsAtTime: null,
      lat: osm.lat,
      lng: osm.lon
    };

    const tags = [];

    if (osmTags['shop'] == 'bicycle' || osmTags['service:bicycle:retail'] == 'yes') {
      tags.push('retail'); 
    }
    if (osmTags['service:bicycle:rental'] == 'yes') {
      tags.push('rental'); 
    }
    if (osmTags['service:bicycle:repair'] == 'yes') {
      tags.push('repair'); 
    }
    if (osmTags['service:bicycle:pump'] == 'yes') {
      tags.push('service'); 
      tags.push('pump')
    }
    if (osmTags['service:bicycle:second_hand'] == 'yes') {
      tags.push('second_hand'); 
    }

    result.tags = tags;
    return result;
  }

  query(boundingBox, nodes) {
    const theQuery = this._query(boundingBox)
    return new Promise( (resolve, reject) => {
      axios({
        method: 'post',
        url: "https://overpass-api.de/api/interpreter",
        data: theQuery
      }).then(resp => {
        const res = resp.data.elements.map(this._translate)
        resolve(res);
      })
    });
  }
}

module.exports = OSM;