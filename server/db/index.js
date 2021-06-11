class DB {
  static db = null 
  
  constructor() {
    this.pg   = require("pg");
    this.pool = new this.pg.Pool({
      user: process.env.PGUSER ,
      host:  process.env.PGHOST,
      database:  process.env.PGDATABASE ,
      password:  process.env.PGPASSWORD,
      port: process.env.PGPORT
    });
  }
  

  static getInstance() {
    if(this.db == null) {
      this.db = new DB();
    } 

    return this.db;
  }
}

const db = DB.getInstance();

module.exports = db;