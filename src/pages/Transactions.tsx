import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

interface Transaction {
  id: number
  date: string
  description: string
  category: string
  amount: number
  type: 'income' | 'expense'
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    date: '2024-03-15',
    description: 'Salary',
    category: 'Income',
    amount: 5000,
    type: 'income',
  },
  {
    id: 2,
    date: '2024-03-14',
    description: 'Grocery Shopping',
    category: 'Food',
    amount: -120,
    type: 'expense',
  },
  {
    id: 3,
    date: '2024-03-13',
    description: 'Rent',
    category: 'Housing',
    amount: -1500,
    type: 'expense',
  },
]

export default function Transactions() {
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Add Transaction
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
          <option value="">All Categories</option>
          <option value="income">Income</option>
          <option value="food">Food</option>
          <option value="housing">Housing</option>
          <option value="utilities">Utilities</option>
        </select>
        <input
          type="date"
          className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {transaction.category}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 text-sm ${
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : ''}
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 