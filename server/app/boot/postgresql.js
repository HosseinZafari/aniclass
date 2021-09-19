class DB {
  static db = null
  
  constructor() {
    this.pg   = require("pg");
    this.pool = new this.pg.Pool({
      user: process.env.PG_USER ,
      host:  process.env.PG_HOST,
      database:  process.env.PG_DATABASE ,
      password:  process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    });
  }
  

  static getInstance() {
    if(this.db == null) {
      this.db = new DB();
    }

    return this.db;
  }
}

module.exports = DB;
