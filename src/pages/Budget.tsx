import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

interface BudgetCategory {
  id: number
  name: string
  budget: number
  spent: number
  color: string
}

const mockCategories: BudgetCategory[] = [
  {
    id: 1,
    name: 'Food & Dining',
    budget: 500,
    spent: 320,
    color: '#4CAF50',
  },
  {
    id: 2,
    name: 'Housing',
    budget: 1500,
    spent: 1500,
    color: '#F44336',
  },
  {
    id: 3,
    name: 'Transportation',
    budget: 300,
    spent: 150,
    color: '#2196F3',
  },
  {
    id: 4,
    name: 'Entertainment',
    budget: 200,
    spent: 80,
    color: '#9C27B0',
  },
]

export default function Budget() {
  const [categories] = useState<BudgetCategory[]>(mockCategories)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Budget Planning</h1>
        <button
          onClick={() => {}}
          className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Add Category
        </button>
      </div>

      {/* Budget Categories */}
      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((category) => {
          const percentage = (category.spent / category.budget) * 100
          const isOverBudget = percentage > 100

          return (
            <div
              key={category.id}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <span
                  className={`text-sm font-medium ${
                    isOverBudget ? 'text-red-600' : 'text-gray-500'
                  }`}
                >
                  ${category.spent} / ${category.budget}
                </span>
              </div>
              <div className="mt-4">
                <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
                <p
                  className={`mt-2 text-sm ${
                    isOverBudget ? 'text-red-600' : 'text-gray-500'
                  }`}
                >
                  {isOverBudget
                    ? `${Math.round(percentage - 100)}% over budget`
                    : `${Math.round(percentage)}% used`}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 