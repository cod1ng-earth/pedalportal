const _intersection = require('lodash.intersection');

export default ({selectedTags, results}) => {
    if (selectedTags.length === 0)
        return results;

    return results.filter(result => {
        return _intersection(selectedTags, result.tags).length > 0
    });
}