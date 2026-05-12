const express = require('express')
const router = express.Router()

const pool = require('../db/db')

const authMiddleware = require(
  '../middleware/auth.middleware'
)

router.post(
  '/',
  authMiddleware,
  async (req, res) => {
    try {
      const {
        auction_id,
        amount,
      } = req.body

      const auction = await pool.query(
        `
        SELECT *
        FROM auctions
        WHERE auction_id = $1
        `,
        [auction_id]
      )

      if (auction.rows.length === 0) {
        return res.status(404).json({
          message: 'Auction not found',
        })
      }

      const currentAuction =
        auction.rows[0]

      const now = new Date()

      if (
        currentAuction.end_time &&
        now > currentAuction.end_time
      ) {
        return res.status(400).json({
          message: 'Auction ended',
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
        [auction_id]
      )

      let currentPrice = 0

      if (highestBid.rows.length > 0) {
        currentPrice =
          highestBid.rows[0].amount
      }

      if (amount <= currentPrice) {
        return res.status(400).json({
          message:
            'Bid must be higher than current bid',
        })
      }

      await pool.query(
        `
        UPDATE bids
        SET status = 'outbid'
        WHERE auction_id = $1
        AND status = 'active'
        `,
        [auction_id]
      )
      const bid = await pool.query(
        `
        INSERT INTO bids (
          auction_id,
          user_id,
          amount,
          status
        )
        VALUES ($1, $2, $3, 'active')
        RETURNING *
        `,
        [
          auction_id,
          req.user.user_id,
          amount,
        ]
      )

      res.json(bid.rows[0])
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message: 'Server error',
      })
    }
  }
)
router.get('/:auctionId', async (req, res) => {
  try {
    const bids = await pool.query(
      `
      SELECT
        bids.bid_id,
        bids.amount,
        bids.status,
        bids.bid_time,
        users.first_name
      FROM bids
      JOIN users
        ON bids.user_id = users.user_id
      WHERE bids.auction_id = $1
      ORDER BY bids.amount DESC
      `,
      [req.params.auctionId]
    )

    res.json(bids.rows)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server error',
    })
  }
})

module.exports = router