const express = require('express')
const router = express.Router()

const pool = require('../db/db')

router.post('/close/:auctionId', async (req, res) => {
  try {
    const auctionId = req.params.auctionId

    const auction = await pool.query(
      `
      SELECT *
      FROM auctions
      WHERE auction_id = $1
      `,
      [auctionId]
    )

    if (auction.rows.length === 0) {
      return res.status(404).json({
        message: 'Auction not found',
      })
    }

    const highestBid = await pool.query(
      `
      SELECT *
      FROM bids
      WHERE auction_id = $1
      ORDER BY amount DESC
      LIMIT 1
      `,
      [auctionId]
    )

    if (highestBid.rows.length === 0) {
      return res.status(400).json({
        message: 'No bids found',
      })
    }

    const winner = highestBid.rows[0]

    const car = await pool.query(
      `
      SELECT car_id
      FROM auctions
      WHERE auction_id = $1
      `,
      [auctionId]
    )

    const deal = await pool.query(
      `
      INSERT INTO deals (
        price,
        user_id,
        car_id,
        auction_id
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        winner.amount,
        winner.user_id,
        car.rows[0].car_id,
        auctionId,
      ]
    )

    await pool.query(
      `
      UPDATE bids
      SET status = 'winning'
      WHERE bid_id = $1
      `,
      [winner.bid_id]
    )

    await pool.query(
      `
      INSERT INTO payments (
        deal_id,
        method,
        amount,
        profit,
        status
      )
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        deal.rows[0].deal_id,
        'card',
        winner.amount,
        winner.amount * 0.1,
        'pending',
      ]
    )

    res.json({
      message: 'Deal created',
      deal: deal.rows[0],
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server error',
    })
  }
})

module.exports = router