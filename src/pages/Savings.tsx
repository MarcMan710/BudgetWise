import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

interface SavingsGoal {
  id: number
  name: string
  target: number
  current: number
  deadline: string
  icon: string
}

const mockGoals: SavingsGoal[] = [
  {
    id: 1,
    name: 'Vacation Fund',
    target: 2000,
    current: 1200,
    deadline: '2024-08-01',
    icon: '🏖️',
  },
  {
    id: 2,
    name: 'New Car',
    target: 15000,
    current: 5000,
    deadline: '2024-12-31',
    icon: '🚗',
  },
  {
    id: 3,
    name: 'Emergency Fund',
    target: 10000,
    current: 7500,
    deadline: '2024-06-30',
    icon: '🛡️',
  },
]

export default function Savings() {
  const [goals] = useState<SavingsGoal[]>(mockGoals)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Savings Goals</h1>
        <button
          onClick={() => {}}
          className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Add Goal
        </button>
      </div>

      {/* Savings Goals */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100
          const remaining = goal.target - goal.current
          const daysUntilDeadline = Math.ceil(
            (new Date(goal.deadline).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )

          return (
            <div
              key={goal.id}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <h3 className="text-lg font-medium text-gray-900">{goal.name}</h3>
                </div>
                <span className="text-sm text-gray-500">
                  {daysUntilDeadline} days left
                </span>
              </div>

              <div className="mt-4">
                <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-green-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-gray-500">
                    ${goal.current} / ${goal.target}
                  </span>
                  <span className="text-gray-500">{Math.round(percentage)}%</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  ${remaining} remaining to reach your goal
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Target date: {new Date(goal.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 