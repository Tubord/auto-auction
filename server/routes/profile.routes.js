const express = require('express')
const router = express.Router()

const pool = require('../db/db')

const authMiddleware = require(
  '../middleware/auth.middleware'
)

router.get(
  '/',
  authMiddleware,
  async (req, res) => {
    try {
      const user = await pool.query(
        `
        SELECT
          user_id,
          first_name,
          last_name,
          email,
          contacts,
          person_status,
          role,
          passport,
          created_at
        FROM users
        WHERE user_id = $1
        `,
        [req.user.user_id]
      )

      const bids = await pool.query(
        `
        SELECT
          bids.bid_id,
          bids.amount,
          bids.status,
          bids.bid_time,
          cars.brand,
          cars.model,
          cars.image_url
        FROM bids
        JOIN auctions
          ON bids.auction_id = auctions.auction_id
        JOIN cars
          ON auctions.car_id = cars.car_id
        WHERE bids.user_id = $1
        ORDER BY bids.bid_time DESC
        `,
        [req.user.user_id]
      )

      res.json({
        user: user.rows[0],
        bids: bids.rows,
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message: 'Server error',
      })
    }
  }
)

module.exports = router