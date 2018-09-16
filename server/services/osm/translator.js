const _rm = require('lodash.remove');
const _map = require('lodash.map');

class OSMTranslator {

  _translateAddress(osmTags) {
    if (osmTags['addr:street']) {
      return `${osmTags["addr:street"]} ${osmTags["addr:housenumber"]}, ${osmTags["addr:postcode"]} ${osmTags["addr:city"]}`;
    } else {
      return '';
    }
  }

  /**
   * sideeffect: changes data on result
   * 
   * @param {object} result 
   * @param {Array} osmTags 
   */
  _enrichByOsmTags(result, osmTags) {
    const address = this._translateAddress(osmTags);
    if (address) {
      result.location.address = address;
    }
    
    _map(osmTags, (value, tag) => {
      if (tag == 'shop' && value == 'bicycle') {
        result['kind'] = 'shop';
        return;
      }

      if (tag == 'vending' && value == 'bicycle_tube') {
        result['kind'] = 'vending';
        result['name'] = osmTags['operator'];
        return;
      }
      
      if ( (tag == 'website') || (tag == 'contact:website') ) {
        result['deeplink'] = value;
        return;
      }
      
      if (tag == 'opening_hours') {
        result[tag] = value;
        return;
      }

      ['email', 'phone', 'website'].forEach(test => {
        if (tag == test) {
          result['contact'][tag] = value;
        }
      });

      if (tag.indexOf("contact:") == 0) {
        const parts = tag.split(":");
        result['contact'][parts[parts.length - 1]] = value;
        return false;
      }
    })
    return result;
  }

  _extractTags(osmTags) {
    return _rm(_map(osmTags, (value, tag) => {
      if (tag == 'shop' && value == 'bicycle') {
        return 'shop';
      }
      if (tag == 'vending' && value == 'bicycle_tube') {
        return 'vending';
      }
      if ((tag.indexOf("service:bicycle") == 0) && (value == 'yes')) {
        const parts = tag.split(":");
        return parts[parts.length - 1];
      }
      return false;
    }), (v => v != false));
  }
  /**
   * @param {object} osm - an osm result element
   * @returns {object} - our translated item with kind osm
   */
  translate(osm) {
    const osmTags = osm.tags;

    const result = {
      id: 'osm-' + osm.id,
      origin: 'osm',
      kind: null,
      createdAt: new Date(osm.timestamp),
      name: osmTags['name'],
      description: '',
      imageUrl: null,
      startsAt: null,
      expiresAt: null,
      location: {
        lat: osm.lat,
        lng: osm.lon
      },
      opening_hours: '',
      contact: {},
      tags: this._extractTags(osmTags)
    };
    
    return this._enrichByOsmTags(result, osmTags);
  }

  translateAll(OSMelements) {
    return OSMelements.map(this.translate.bind(this));
  }
}

module.exports = new OSMTranslator;
