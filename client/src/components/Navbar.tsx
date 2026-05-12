import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

type User = {
  first_name: string
}

export default function Navbar() {
  const [user, setUser] =
    useState<User | null>(null)

  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    try {
      const token =
        localStorage.getItem('token')

      if (!token) return

      const response = await axios.get(
        'http://localhost:5000/api/auth/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  function logout() {
    localStorage.removeItem('token')

    window.location.reload()
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          AutoAuction
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/auctions"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Аукционы
          </Link>

          {!user ? (
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition">
                Войти
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold">
                {user.first_name}
              </div>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl transition"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}