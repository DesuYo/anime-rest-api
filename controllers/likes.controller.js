const db = require('../connections.pool')
const { likes } = require('../initSQL')

module.exports = {
  async addLike (req, res) {
    try {

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },
  async remove(req, res) {
    try {

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },
  async getLikesList (req, res) {
    try {
      const { ownerId, commentId } = req.payload;

      const { rows } = await db.query({
        text: `SELECT * FROM likes WHERE owner_id = $1 AND comment_id = $2`,
        values: [ ownerId, commentId ]
      })

      return res.status(200).json(rows)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}