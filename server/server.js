const express = require('express')
const cors = require('cors')
require('dotenv').config()

const carsRoutes = require('./routes/cars.routes')
const bidsRoutes = require('./routes/bid.routes')
const profileRoutes = require('./routes/profile.routes')
const bidRoutes = require('./routes/bid.routes')
const dealRoutes = require('./routes/deal.routes')
const authRoutes = require('./routes/auth.routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/cars', carsRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/bids', bidRoutes)
app.use('/api/deals', dealRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})