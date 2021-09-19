const postgresql = require('./postgresql')
module.exports = {
  query: async (text, values, callback) => await postgresql.getInstance().pool.query(text, values, callback)
}



