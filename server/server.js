const express = require('express')
const cors = require('cors')
require('dotenv').config()

const carsRoutes = require('./routes/cars.routes')
const bidsRoutes = require('./routes/bids.routes')

const app = express()

app.use(cors())
app.use(express.json())
const authRoutes = require('./routes/auth.routes')

app.use('/api/auth', authRoutes)
app.use('/api/cars', carsRoutes)
app.use('/api/bids', bidsRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})