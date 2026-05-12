import { useState } from 'react'
import axios from 'axios'

type Props = {
  auctionId: number
  onClose: () => void
}

export default function BidModal({
  auctionId,
  onClose,
}: Props) {
  const [amount, setAmount] = useState('')

  async function makeBid() {
    try {
      const token = localStorage.getItem(
        'token'
      )

      await axios.post(
        'http://localhost:5000/api/bids',
        {
          auction_id: auctionId,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      alert('Ставка сделана')

      window.location.reload()
    } catch (error: any) {
      console.log(error)

      alert(
        error?.response?.data?.message ||
          'Ошибка сервера'
      )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-3xl w-[500px]">
        <h2 className="text-4xl font-bold mb-8">
          Сделать ставку
        </h2>

        <input
          type="number"
          placeholder="Введите сумму"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full border border-gray-200 rounded-2xl px-5 py-4"
        />

        <div className="flex gap-4 mt-8">
          <button
            onClick={makeBid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl transition"
          >
            Сделать ставку
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-4 rounded-2xl transition"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  )
}