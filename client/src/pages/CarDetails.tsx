import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

type Car = {
  car_id: number
  brand: string
  model: string
  year: number
  mileage: number
  color: string
  vin: string
  start_price: number
  image_url: string
}

type Bid = {
  bid_id: number
  user_name: string
  amount: number
}

export default function CarDetails() {
  const { id } = useParams()

  const [car, setCar] = useState<Car | null>(
    null
  )

  const [bids, setBids] = useState<Bid[]>(
    []
  )

  const [userName, setUserName] =
    useState('')

  const [bidAmount, setBidAmount] =
    useState('')

  useEffect(() => {
    fetchCar()
    fetchBids()
  }, [])

  async function fetchCar() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cars/${id}`
      )

      setCar(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchBids() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bids/${id}`
      )

      setBids(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function createBid() {
    try {
      await axios.post(
        'http://localhost:5000/api/bids',
        {
          car_id: id,
          user_name: userName,
          amount: bidAmount,
        }
      )

      setBidAmount('')

      fetchBids()
    } catch (error: any) {
      alert(
        error.response.data.message
      )
    }
  }

  if (!car) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="grid grid-cols-2 gap-10">
        <img
          src={car.image_url}
          alt=""
          className="w-full h-[500px] object-cover rounded-3xl"
        />

        <div>
          <h1 className="text-5xl font-bold">
            {car.brand} {car.model}
          </h1>

          <p className="text-4xl text-blue-600 font-bold mt-6">
            $
            {bids[0]?.amount ||
              car.start_price}
          </p>

          <div className="mt-8 space-y-3 text-lg">
            <p>Год: {car.year}</p>

            <p>
              Пробег: {car.mileage} км
            </p>

            <p>Цвет: {car.color}</p>

            <p>VIN: {car.vin}</p>
          </div>

          <div className="mt-10 bg-white p-6 rounded-3xl shadow-md">
            <h2 className="text-2xl font-bold mb-5">
              Сделать ставку
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={userName}
                onChange={(e) =>
                  setUserName(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                placeholder="Сумма ставки"
                value={bidAmount}
                onChange={(e) =>
                  setBidAmount(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              />

              <button
                onClick={createBid}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl transition"
              >
                Сделать ставку
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5">
              История ставок
            </h2>

            <div className="space-y-3">
              {bids.map((bid) => (
                <div
                  key={bid.bid_id}
                  className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {bid.user_name}
                    </p>
                  </div>

                  <p className="text-blue-600 font-bold text-xl">
                    ${bid.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}