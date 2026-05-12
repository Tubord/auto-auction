const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../db/db')

router.post('/register', async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      contacts,
      person_status,
      role,
      passport,
      email,
      password,
    } = req.body

    const existingUser = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: 'Email already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    const user = await pool.query(
      `
      INSERT INTO users (
        first_name,
        last_name,
        contacts,
        person_status,
        role,
        passport,
        email,
        password
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
      )
      RETURNING *
      `,
      [
        first_name,
        last_name,
        contacts,
        person_status,
        role,
        passport,
        email,
        hashedPassword,
      ]
    )

    const token = jwt.sign(
      {
        user_id: user.rows[0].user_id,
        role: user.rows[0].role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )

    res.json({
      token,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server error',
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    )

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: 'User not found',
      })
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    )

    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid password',
      })
    }

    const token = jwt.sign(
      {
        user_id: user.rows[0].user_id,
        role: user.rows[0].role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )

    res.json({
      token,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server error',
    })
  }
})

module.exports = router