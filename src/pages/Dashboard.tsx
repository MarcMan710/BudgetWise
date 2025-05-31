import { useState } from 'react'
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const summaryData = [
  { title: 'Total Income', amount: '$5,240.00', change: '+12.5%', type: 'income' },
  { title: 'Total Expenses', amount: '$3,180.00', change: '-8.2%', type: 'expense' },
  { title: 'Savings Balance', amount: '$2,060.00', change: '+24.3%', type: 'savings' },
]

const spendingData = [
  { name: 'Food', value: 35 },
  { name: 'Rent', value: 25 },
  { name: 'Utilities', value: 15 },
  { name: 'Transport', value: 10 },
  { name: 'Entertainment', value: 15 },
]

const monthlyData = [
  { month: 'Jan', income: 4000, expenses: 3000 },
  { month: 'Feb', income: 4500, expenses: 3200 },
  { month: 'Mar', income: 5000, expenses: 3500 },
  { month: 'Apr', income: 4800, expenses: 3300 },
  { month: 'May', income: 5200, expenses: 3800 },
  { month: 'Jun', income: 5500, expenses: 4000 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {summaryData.map((item) => (
          <div
            key={item.title}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">{item.title}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.amount}
            </dd>
            <dd
              className={`mt-1 text-sm ${
                item.type === 'expense' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {item.change}
            </dd>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Spending by Category */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Spending by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Monthly Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#4CAF50" name="Income" />
                <Bar dataKey="expenses" fill="#F44336" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 