const SheetsTranslator = require('../services/sheets/translator')
const testCases = require('./sheet-cases.json')

test('translation of google sheets row into our structure', () => {
  testCases.forEach( testCase => {
    expect(SheetsTranslator.translate(testCase.row)).toEqual(testCase.expected);
  })
});
