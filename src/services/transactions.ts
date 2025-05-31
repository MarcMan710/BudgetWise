import { supabase } from '../config/supabase'

export interface Transaction {
  id?: string
  user_id: string
  date: Date
  description: string
  category: string
  amount: number
  type: 'income' | 'expense'
  created_at: Date
  updated_at: Date
}

export const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        ...transaction,
        date: transaction.date.toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data.id
  } catch (error) {
    throw error
  }
}

export const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .update({
        ...transaction,
        date: transaction.date?.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    throw error
  }
}

export const deleteTransaction = async (id: string) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    throw error
  }
}

export const getTransactions = async (userId: string, filters?: {
  startDate?: Date
  endDate?: Date
  category?: string
  type?: 'income' | 'expense'
}) => {
  try {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (filters?.startDate) {
      query = query.gte('date', filters.startDate.toISOString())
    }

    if (filters?.endDate) {
      query = query.lte('date', filters.endDate.toISOString())
    }

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    if (filters?.type) {
      query = query.eq('type', filters.type)
    }

    const { data, error } = await query

    if (error) throw error

    return data.map(transaction => ({
      ...transaction,
      date: new Date(transaction.date),
      created_at: new Date(transaction.created_at),
      updated_at: new Date(transaction.updated_at),
    })) as Transaction[]
  } catch (error) {
    throw error
  }
} 