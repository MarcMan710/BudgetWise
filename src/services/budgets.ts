import { supabase } from '../config/supabase'

export interface BudgetCategory {
  id?: string
  user_id: string
  name: string
  budget: number
  spent: number
  color: string
  created_at: Date
  updated_at: Date
}

export const addBudgetCategory = async (category: Omit<BudgetCategory, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('budget_categories')
      .insert(category)
      .select()
      .single()

    if (error) throw error
    return data.id
  } catch (error) {
    throw error
  }
}

export const updateBudgetCategory = async (id: string, category: Partial<BudgetCategory>) => {
  try {
    const { error } = await supabase
      .from('budget_categories')
      .update({
        ...category,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    throw error
  }
}

export const deleteBudgetCategory = async (id: string) => {
  try {
    const { error } = await supabase
      .from('budget_categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    throw error
  }
}

export const getBudgetCategories = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('budget_categories')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error

    return data.map(category => ({
      ...category,
      created_at: new Date(category.created_at),
      updated_at: new Date(category.updated_at),
    })) as BudgetCategory[]
  } catch (error) {
    throw error
  }
}

export const updateCategorySpent = async (id: string, spent: number) => {
  try {
    const { error } = await supabase
      .from('budget_categories')
      .update({
        spent,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    throw error
  }
} 