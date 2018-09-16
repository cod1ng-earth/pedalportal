const OSMTranslator = require('../services/osm/translator')
const OSMApi = require('../services/osm/service')
const uniqueTags = require('../util/uniqueTags')

const sampleResponses = require('./responses.json')

test('translation of osm data to our structure', () => {

  const osmElem = {
      "type": "node",
      "id": 267090674,
      "lat": 52.4911635,
      "lon": 13.3612843,
      "timestamp": "2016-07-02T16:52:54Z",
      "version": 5,
      "changeset": 40444176,
      "user": "jacobbraeutigam",
      "uid": 1260280,
      "tags": {
          "addr:city": "Berlin",
          "addr:country": "DE",
          "addr:housenumber": "163",
          "addr:postcode": "10827",
          "addr:street": "Hauptstraße",
          "email": "schoeneberg@radcompany.de",
          "name": "Rad Company",
          "opening_hours": "Mo-Fr 10:00-19:00; Sa 10:00-18:00",
          "phone": "+49 30 78894123",
          "shop": "bicycle",
          "website": "http://radcompany.de",
          "wheelchair": "limited"
      }
  }

  const expectedElement = {
    id: 'osm-267090674',
    origin: "osm",
    kind: "shop",
    createdAt: new Date("2016-07-02T16:52:54Z"),
    name: 'Rad Company',
    description: "",
    imageUrl: null,
    contact:  {
      "email": "schoeneberg@radcompany.de",
      "phone": "+49 30 78894123"
    },
    deeplink: "http://radcompany.de",
    startsAt: null,
    expiresAt: null,
    opening_hours: "Mo-Fr 10:00-19:00; Sa 10:00-18:00",
    location: {
      lat: 52.4911635,
      lng: 13.3612843,
      address: "Hauptstraße 163, 10827 Berlin"
    },
    tags: ['shop']
  }

  expect(OSMTranslator.translate(osmElem)).toEqual(expectedElement);
});

test('translation of special tags data to our structure', () => {

  const osmElem = {
      "type": "node",
      "id": 2670904,
      "lat": 52.4911635,
      "lon": 13.3612843,
      "timestamp": "2018-02-09T16:24:23Z",
  "version": 11,
  "changeset": 56220894,
  "user": "28MzXP5-_uXH",
  "uid": 1940221,
      "tags": {
          "addr:city": "Berlin",
          "addr:country": "DE",
          "addr:housenumber": "163",
          "addr:postcode": "10827",
          "addr:street": "Hauptstraße",
          "email": "schoeneberg@radcompany.de",
          "name": "Rad Company",
          "opening_hours": "Mo-Fr 10:00-19:00; Sa 10:00-18:00",
          "phone": "+49 30 78894123",
          "shop": "bicycle",
          "website": "http://radcompany.de",
          "wheelchair": "limited",
          "service:bicycle:parts": "yes",
          "service:bicycle:pump": "yes",
          "service:bicycle:rental": "yes",
          "service:bicycle:repair": "yes",
          "service:bicycle:second_hand": "yes"
      }
  }

  const expectedElement = {
    id: 'osm-2670904',
    kind: "shop",
    origin: "osm",
    createdAt: new Date("2018-02-09T16:24:23Z"),
    name: 'Rad Company',
    description: "",
    imageUrl: null,
    deeplink: "http://radcompany.de",
    startsAt: null,
    expiresAt: null,
    contact: {
      "email": "schoeneberg@radcompany.de",
      "phone": "+49 30 78894123"
    },
    opening_hours: "Mo-Fr 10:00-19:00; Sa 10:00-18:00",
    location: {
      lat: 52.4911635,
      lng: 13.3612843,
      address:  "Hauptstraße 163, 10827 Berlin"
    },
    tags: ['shop','parts','pump','rental','repair','second_hand']
  }

  expect(OSMTranslator.translate(osmElem)).toEqual(expectedElement);
});

test('vending machines are translated', () => {
  const osm = {
    "type": "node",
    "id": 3895798940,
    "lat": 52.5121769,
    "lon": 13.4606102,
    "timestamp": "2016-01-08T01:05:47Z",
    "version": 2,
    "changeset": 36436841,
    "user": "atpl_pilot",
    "uid": 881429,
    "tags": {
      "amenity": "vending_machine",
      "operator": "Roland Jabs Nachfahrer",
      "vending": "bicycle_tube"
    }
  }
  const expected = {
    id: 'osm-3895798940',
    kind: "vending",
    origin: "osm",
    createdAt: new Date("2016-01-08T01:05:47Z"),
    name: 'Roland Jabs Nachfahrer',
    description: "",
    imageUrl: null,
    startsAt: null,
    expiresAt: null,
    location: {
      lat: 52.5121769,
      lng: 13.4606102,
    },
    contact: {},
    opening_hours: "",
    tags: ['vending']
  }
  expect(OSMTranslator.translate(osm)).toEqual(expected);
})

test('translations are resilient on real data', () => {
  const t = OSMTranslator.translateAll(sampleResponses.elements);
  t.forEach((trElem, idx) => {
    expect(trElem.id).toEqual('osm-' + sampleResponses.elements[idx].id)
  })
})


test('extract unique tags from translated elements', () => {
  const t = OSMTranslator.translateAll(sampleResponses.elements);
  const tags = uniqueTags(t);

  expect(Object.keys(tags).length).toEqual(22);
})