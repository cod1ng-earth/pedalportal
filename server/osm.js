const _rm = require('lodash.remove');
const _map = require('lodash.map');
const axios = require('axios');

class OSM {
  
  _query(bbox, queryType) {

    return `
    [out:json][timeout:25][bbox:${bbox.neLat},${bbox.neLon},${bbox.swLat},${bbox.swLon}];
    (${queryType});
    out body meta;
    >;
    out skel qt;
    `;
  }

  _translate(osm) {
    const osmTags = osm.tags;
    const addr = (osmTags['addr:street']) ? 
       [
        osmTags["addr:street"],
        osmTags["addr:housenumber"],
        osmTags["addr:postcode"],
        osmTags["addr:city"]
      ].join(" ") : '';
        
    const result = {
      id: 'osm-' + osm.id,
      createdAt: new Date(osm.timestamp),
      name: osmTags['name'],
      description: osmTags['opening_hours'],
      imageUrl: null,
      address: addr,
      deeplink: osmTags['website'] || osmTags['contact:website'],
      startsAt: null,
      expires: null,
      startsAtTime: null,
      lat: osm.lat,
      lng: osm.lon
    };

    const serviceTags = _rm(_map(osmTags, (value, tag) => {
      if (tag == 'shop' && value == 'bicycle') {
        return 'shop';
      }
      if (tag == 'vending' && value == 'bicycle_tube') {
        result['name'] = osmTags['operator'];
        return 'vending';
      }

      if ((tag.indexOf("service:bicycle") == -1) || (value !== 'yes'))
        return false;

      const parts = tag.split(":");
      return parts[parts.length-1];
    }), (v => v != false));
    
    result.tags = serviceTags;
    return result;
  }

  query(boundingBox, queryType) {
    const theQuery = this._query(boundingBox, queryType)
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

OSM.QUERY_TYPE_VENDING_TUBE = `
    node["vending"="bicycle_tube"];
  `

OSM.QUERY_TYPE_AIR = `
    node["compressed_air"="yes"];
    node["amenity"="compressed_air"];
    node["amenity"="air_filling"];
    node["service:bicycle:pump"="yes"];
    node["bicycle:air"="compressed_air"];
  `

OSM.QUERY_TYPE_SHOPS_SERVICE = ` 
    node["shop"="bicycle"];
    node["amenity"="bicycle_repair_station"];
    node[~"^service:bicycle:"~"yes"];
  `

module.exports = OSM;