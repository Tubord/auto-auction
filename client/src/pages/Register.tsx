import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link, } from 'react-router-dom'


export default function Register() {
  const navigate = useNavigate()

  const [firstName, setFirstName] =
    useState('')

  const [lastName, setLastName] =
    useState('')

  const [contacts, setContacts] =
    useState('')

  const [personStatus, setPersonStatus] =
    useState('physical')

  const [role, setRole] =
    useState('buyer')

  const [passport, setPassport] =
    useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] =
    useState('')

  async function register() {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          first_name: firstName,
          last_name: lastName,
          contacts,
          person_status: personStatus,
          role,
          passport,
          email,
          password,
        }
      )

      localStorage.setItem(
        'token',
        response.data.token
      )

      navigate('/')
    } catch (error: any) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-md w-[450px]">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Регистрация
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Имя"
            value={firstName}
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) =>
              setLastName(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="Контакты"
            value={contacts}
            onChange={(e) =>
              setContacts(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4"
          />

          <select
            value={personStatus}
            onChange={(e) =>
              setPersonStatus(
                e.target.value
              )
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4"
          >
            <option value="physical">
              Физическое лицо
            </option>

            <option value="legal">
              Юридическое лицо
            </option>
          </select>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4"
          >
            <option value="buyer">
              Покупатель
            </option>

            <option value="seller">
              Продавец
            </option>
          </select>

          <input
            type="text"
            placeholder="Паспорт"
            value={passport}
            onChange={(e) =>
              setPassport(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl px-5 py-4"
          />

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
            onClick={register}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl transition"
          >
            Зарегистрироваться
          </button>

          <p className="text-center text-gray-500">
            Уже есть аккаунт?{' '}

            <Link
              to="/login"
              className="text-blue-600 font-semibold"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}