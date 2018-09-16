module.exports = elements => {
    const tags = {};
    elements.forEach(el => {
        el.tags.forEach(t => {
        if (typeof tags[t] === "undefined") {
            tags[t] = 1;
        } else {
            tags[t]++;
        }
        })
    })
    return tags;
}