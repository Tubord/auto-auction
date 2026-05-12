import { useEffect, useState } from 'react'
import axios from 'axios'

import AuctionCard from '../components/AuctionCard'

type Car = {
  car_id: number
  brand: string
  model: string
  year: number
  mileage: number
  color: string
  start_price: number
  image_url: string
}

export default function Auctions() {
  const [cars, setCars] = useState<Car[]>([])

  const [brands, setBrands] = useState<string[]>([])

  const [selectedBrand, setSelectedBrand] =
    useState('')

  const [search, setSearch] = useState('')

  const [maxPrice, setMaxPrice] = useState('')

  const [minYear, setMinYear] = useState('')

  useEffect(() => {
    fetchBrands()
  }, [])

  useEffect(() => {
    fetchCars()
  }, [
    selectedBrand,
    search,
    maxPrice,
    minYear,
  ])

  async function fetchBrands() {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/cars/brands/all'
      )

      setBrands(
        response.data.map(
          (item: { brand: string }) => item.brand
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchCars() {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/cars',
        {
          params: {
            brand:
              selectedBrand || undefined,

            search: search || undefined,

            maxPrice:
              maxPrice || undefined,

            minYear:
              minYear || undefined,
          },
        }
      )

      setCars(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-bold">
            Аукционы
          </h1>

          <p className="text-gray-500 mt-2">
            Найдите автомобиль своей мечты
          </p>
        </div>

        <input
          type="text"
          placeholder="Поиск автомобиля..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-white border border-gray-200 px-5 py-3 rounded-2xl w-[320px] outline-none"
        />
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-8">
        <div className="bg-white rounded-3xl p-6 shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-6">
            Фильтры
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-gray-600">
                Марка
              </label>

              <select
                value={selectedBrand}
                onChange={(e) =>
                  setSelectedBrand(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              >
                <option value="">
                  Все
                </option>

                {brands.map((brand) => (
                  <option
                    key={brand}
                    value={brand}
                  >
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-600">
                Максимальная цена
              </label>

              <input
                type="number"
                placeholder="$50000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-600">
                Год от
              </label>

              <input
                type="number"
                placeholder="2020"
                value={minYear}
                onChange={(e) =>
                  setMinYear(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              />
            </div>

            <button
              onClick={() => {
                setSelectedBrand('')
                setSearch('')
                setMaxPrice('')
                setMinYear('')
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-xl transition"
            >
              Сбросить фильтры
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {cars.map((car) => (
            <AuctionCard
              key={car.car_id}
              id={car.car_id}
              brand={car.brand}
              model={car.model}
              year={car.year}
              mileage={car.mileage}
              color={car.color}
              price={car.start_price}
              image={car.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  )
}