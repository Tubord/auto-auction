const express = require('express')
const router = express.Router()

const pool = require('../db/db')

router.get('/:auctionId', async (req, res) => {
  try {
    const { auctionId } = req.params

    const bids = await pool.query(
      `
      SELECT
        bids.*,
        users.first_name,
        users.last_name
      FROM bids
      JOIN users
      ON bids.user_id = users.user_id
      WHERE auction_id = $1
      ORDER BY amount DESC
      `,
      [auctionId]
    )

    res.json(bids.rows)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server error',
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const {
      auction_id,
      user_id,
      amount,
    } = req.body

    const highestBid = await pool.query(
      `
      SELECT MAX(amount)
      FROM bids
      WHERE auction_id = $1
      `,
      [auction_id]
    )

    const currentBid =
      highestBid.rows[0].max || 0

    if (Number(amount) <= Number(currentBid)) {
      return res.status(400).json({
        message:
          'Ставка должна быть выше текущей',
      })
    }

    await pool.query(
      `
      UPDATE bids
      SET status = 'outbid'
      WHERE auction_id = $1
      AND status = 'winning'
      `,
      [auction_id]
    )

    const newBid = await pool.query(
      `
      INSERT INTO bids (
        auction_id,
        user_id,
        amount,
        status
      )
      VALUES ($1, $2, $3, 'winning')
      RETURNING *
      `,
      [
        auction_id,
        user_id,
        amount,
      ]
    )

    res.json(newBid.rows[0])
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server error',
    })
  }
})

module.exports = router