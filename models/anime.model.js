const pg = require('pg')
const db = require('../connections.pool')

module.exports = {
  async init () {
    return db.query(`
      CREATE TABLE IF NOT EXISTS anime(
        id SERIAL PRIMARY KEY,
        slug VARCHAR (50) UNIQUE NOT NULL,
        title VARCHAR (50) UNIQUE NOT NULL,
        rating INT, 
        thumbnail VARCHAR (50),
        description VARCHAR (500),
        media VARCHAR (50) [] 
      ) 
    `)
  },
   
  async add (anime) {
    const { slug, title, thumbnail, description, media } = anime
    return (await db.query({
      text: 'INSERT INTO anime(slug, title, thumbnail, description, media) VALUES($1, $2, $3, $4, $5) RETURNING *;',
      values: [ slug, title, thumbnail, description, media ]
    })).rows[0]
  },

  async getById (id) {
    return (await db.query({
      text: 'SELECT * FROM anime WHERE id = $1',
      values: [ id ]
    })).rows[0]
  },

  async getList (query) {
    return (await db.query({
      text: `SELECT * FROM anime WHERE title LIKE '%$1%' OR description LIKE '%$1%'`,
      values: [ query ]
    }))
  }
}