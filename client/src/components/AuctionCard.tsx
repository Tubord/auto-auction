import { Link } from 'react-router-dom'

type Props = {
  id: number
  brand: string
  model: string
  year: number
  mileage: number
  color: string
  price: number
  image: string
}

export default function AuctionCard({
  id,
  brand,
  model,
  year,
  mileage,
  color,
  price,
  image,
}: Props) {
  return (
  <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300">
    <div className="overflow-hidden">
      <img
        src={image}
        alt=""
        className="h-[220px] w-full object-cover hover:scale-110 transition duration-500"
      />
    </div>

    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {brand} {model}
          </h2>

          <p className="text-gray-500 mt-1">
            {year} • {mileage} км
          </p>
        </div>

        <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
          {color}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">
            Текущая ставка
          </p>

          <p className="text-3xl font-bold text-blue-600">
            ${price}
          </p>
        </div>

        <Link to={`/cars/${id}`}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl transition">
            Подробнее
          </button>
        </Link>
      </div>
    </div>
  </div>
)
}