import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

const monthlyData = [
  { month: 'Jan', income: 4000, expenses: 3000, savings: 1000 },
  { month: 'Feb', income: 4500, expenses: 3200, savings: 1300 },
  { month: 'Mar', income: 5000, expenses: 3500, savings: 1500 },
  { month: 'Apr', income: 4800, expenses: 3300, savings: 1500 },
  { month: 'May', income: 5200, expenses: 3800, savings: 1400 },
  { month: 'Jun', income: 5500, expenses: 4000, savings: 1500 },
]

const categoryData = [
  { category: 'Food', amount: 1200 },
  { category: 'Housing', amount: 3000 },
  { category: 'Transport', amount: 800 },
  { category: 'Entertainment', amount: 600 },
  { category: 'Utilities', amount: 400 },
]

export default function Reports() {
  const [timeRange, setTimeRange] = useState('monthly')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Financial Reports</h1>
        <div className="flex space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
            Export PDF
          </button>
          <button className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
            Export CSV
          </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Average Monthly Income
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            $4,833
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Average Monthly Expenses
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            $3,467
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Average Monthly Savings
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            $1,367
          </dd>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trends */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Monthly Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4CAF50"
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#F44336"
                  name="Expenses"
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#2196F3"
                  name="Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Expense Categories</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#4CAF50" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Key Insights</h2>
        <ul className="mt-4 space-y-4">
          <li className="flex items-start">
            <span className="mr-2">📈</span>
            <span>
              Your income has increased by 12.5% over the last 6 months
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">💰</span>
            <span>
              You're saving an average of 28.3% of your monthly income
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🏠</span>
            <span>
              Housing is your largest expense category at 43.2% of total expenses
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span>
              You're on track to reach your savings goals for this quarter
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
} 