import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 px-10 rounded-b-[40px]">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-6xl font-bold leading-tight">
            Онлайн <br />
            автоаукцион
          </h1>

          <p className="mt-6 text-xl text-blue-100 max-w-[600px]">
            Покупайте премиальные автомобили
            через современную систему онлайн торгов
          </p>

          <Link to="/auctions">
            <button className="mt-10 bg-white text-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition">
              Смотреть аукционы
            </button>
          </Link>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-20 px-6">
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h2 className="text-5xl font-bold text-blue-600">
              1000+
            </h2>

            <p className="mt-3 text-gray-600 text-lg">
              Автомобилей в каталоге
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h2 className="text-5xl font-bold text-blue-600">
              500+
            </h2>

            <p className="mt-3 text-gray-600 text-lg">
              Успешных сделок
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h2 className="text-5xl font-bold text-blue-600">
              24/7
            </h2>

            <p className="mt-3 text-gray-600 text-lg">
              Онлайн аукционы
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}