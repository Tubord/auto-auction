import { useEffect, useState } from 'react'
import axios from 'axios'

type User = {
  first_name: string
  last_name: string
  email: string
  contacts: string
  person_status: string
  role: string
  passport: string
}

type Bid = {
  bid_id: number
  amount: number
  status: string
  brand: string
  model: string
  image_url: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(
    null
  )
  const [bids, setBids] = useState<Bid[]>([])

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    try {
      const token = localStorage.getItem(
        'token'
      )

      const response = await axios.get(
        'http://localhost:5000/api/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUser(response.data.user)
      setBids(response.data.bids)
    } catch (error) {
      console.log(error)
    }
  }

  function logout() {
    localStorage.removeItem('token')

    window.location.href = '/'
  }

  if (!user) {
    return (
      <div className="p-10 text-2xl">
        Загрузка...
      </div>
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-bold">
            Личный кабинет
          </h1>

          <p className="text-gray-500 mt-2">
            Добро пожаловать,
            {' '}
            {user.first_name}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-2xl transition"
        >
            Выйти
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl shadow-md p-8 h-fit">
          <h2 className="text-3xl font-bold mb-6">
            Профиль
          </h2>

          <div className="space-y-4 text-lg">
            <p>
              <span className="font-bold">
                Имя:
              </span>
              {' '}
              {user.first_name}
            </p>

            <p>
              <span className="font-bold">
                Фамилия:
              </span>
              {' '}
              {user.last_name}
            </p>

            <p>
              <span className="font-bold">
                Email:
              </span>
              {' '}
              {user.email}
            </p>

            <p>
              <span className="font-bold">
                Контакты:
              </span>
              {' '}
              {user.contacts}
            </p>

            <p>
              <span className="font-bold">
                Роль:
              </span>
              {' '}
              {user.role}
            </p>

            <p>
              <span className="font-bold">
                Статус:
              </span>
              {' '}
              {user.person_status}
            </p>

            <p>
              <span className="font-bold">
                Паспорт:
                 </span>
              {' '}
              {user.passport}
            </p>
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-3xl font-bold mb-6">
            Мои ставки
          </h2>

          <div className="space-y-5">
            {bids.map((bid) => (
              <div
                key={bid.bid_id}
                className="bg-white rounded-3xl shadow-md overflow-hidden flex"
              >
                <img
                  src={bid.image_url}
                  alt=""
                  className="w-[260px] h-[180px] object-cover"
                />

                <div className="p-6 flex-1 flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold">
                      {bid.brand}
                      {' '}
                      {bid.model}
                    </h3>
                    <p className="text-gray-500 mt-3 text-lg">
                      Статус ставки:
                      {' '}
                      {bid.status}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-4xl font-bold text-blue-600">
                      ${bid.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}