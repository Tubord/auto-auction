const express = require('express')
const router = express.Router()

const pool = require('../db/db')

router.get('/brands/all', async (req, res) => {
  try {
    const brands = await pool.query(`
      SELECT DISTINCT brand
      FROM cars
      ORDER BY brand
    `)

    res.json(brands.rows)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server error',
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const {
      brand,
      search,
      maxPrice,
      minYear,
    } = req.query

    let query = `
      SELECT *
      FROM cars
      WHERE 1=1
    `

    let values = []

    if (brand) {
      values.push(brand)

      query += `
        AND brand = $${values.length}
      `
    }

    if (search) {
      values.push(`%${search}%`)

      query += `
        AND (
          brand ILIKE $${values.length}
          OR model ILIKE $${values.length}
        )
      `
    }

    if (maxPrice) {
      values.push(maxPrice)

      query += `
        AND start_price <= $${values.length}
      `
    }

    if (minYear) {
      values.push(minYear)

      query += `
        AND "year" >= $${values.length}
      `
    }

    query += `
      ORDER BY car_id DESC
    `

    const cars = await pool.query(
      query,
      values
    )

    res.json(cars.rows)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server error',
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const car = await pool.query(
      `
      SELECT *
      FROM cars
      WHERE car_id = $1
      `,
      [id]
    )

    res.json(car.rows[0])
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Server error',
    })
  }
})

module.exports = router