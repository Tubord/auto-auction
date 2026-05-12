import { useState } from 'react'
import axios from 'axios'

import {
  useNavigate,
  Link,
} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  async function login() {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      )

      localStorage.setItem(
        'token',
        response.data.token
      )

      navigate('/')

      window.location.reload()
    } catch (error: any) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-md w-[400px]">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Вход
        </h1>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4"
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl transition"
          >
            Войти
          </button>

          <p className="text-center text-gray-500">
            Нет аккаунта?{' '}

            <Link
              to="/register"
              className="text-blue-600 font-semibold"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}