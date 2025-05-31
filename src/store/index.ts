import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { Transaction } from '../services/transactions'
import { BudgetCategory } from '../services/budgets'
import { SavingsGoal } from '../services/savings'

interface AppState {
  user: User | null
  transactions: Transaction[]
  budgetCategories: BudgetCategory[]
  savingsGoals: SavingsGoal[]
  setUser: (user: User | null) => void
  setTransactions: (transactions: Transaction[]) => void
  setBudgetCategories: (categories: BudgetCategory[]) => void
  setSavingsGoals: (goals: SavingsGoal[]) => void
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  addBudgetCategory: (category: BudgetCategory) => void
  updateBudgetCategory: (id: string, category: Partial<BudgetCategory>) => void
  deleteBudgetCategory: (id: string) => void
  addSavingsGoal: (goal: SavingsGoal) => void
  updateSavingsGoal: (id: string, goal: Partial<SavingsGoal>) => void
  deleteSavingsGoal: (id: string) => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  transactions: [],
  budgetCategories: [],
  savingsGoals: [],

  setUser: (user) => set({ user }),
  setTransactions: (transactions) => set({ transactions }),
  setBudgetCategories: (categories) => set({ budgetCategories: categories }),
  setSavingsGoals: (goals) => set({ savingsGoals: goals }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  updateTransaction: (id, updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedTransaction } : t
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  addBudgetCategory: (category) =>
    set((state) => ({
      budgetCategories: [...state.budgetCategories, category],
    })),

  updateBudgetCategory: (id, updatedCategory) =>
    set((state) => ({
      budgetCategories: state.budgetCategories.map((c) =>
        c.id === id ? { ...c, ...updatedCategory } : c
      ),
    })),

  deleteBudgetCategory: (id) =>
    set((state) => ({
      budgetCategories: state.budgetCategories.filter((c) => c.id !== id),
    })),

  addSavingsGoal: (goal) =>
    set((state) => ({
      savingsGoals: [...state.savingsGoals, goal],
    })),

  updateSavingsGoal: (id, updatedGoal) =>
    set((state) => ({
      savingsGoals: state.savingsGoals.map((g) =>
        g.id === id ? { ...g, ...updatedGoal } : g
      ),
    })),

  deleteSavingsGoal: (id) =>
    set((state) => ({
      savingsGoals: state.savingsGoals.filter((g) => g.id !== id),
    })),
})) 