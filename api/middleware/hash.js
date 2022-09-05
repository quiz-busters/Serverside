const bcrypt = require('bcrypt');

async function getHash (text) {
    let salt = await bcrypt.genSalt(12);
    let hash = await bcrypt.hash(text, salt)
    return hash;
}

async function compareHash (text, hash) {
    let compare = await bcrypt.compare(text, hash);
    return compare
}

module.exports = {
    getHash,
    compareHash
}
