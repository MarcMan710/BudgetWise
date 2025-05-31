import { supabase } from '../config/supabase'

export interface SavingsGoal {
  id?: string
  user_id: string
  name: string
  target: number
  current: number
  deadline: Date
  icon: string
  created_at: Date
  updated_at: Date
}

export const addSavingsGoal = async (goal: Omit<SavingsGoal, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('savings_goals')
      .insert({
        ...goal,
        deadline: goal.deadline.toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data.id
  } catch (error) {
    throw error
  }
}

export const updateSavingsGoal = async (id: string, goal: Partial<SavingsGoal>) => {
  try {
    const { error } = await supabase
      .from('savings_goals')
      .update({
        ...goal,
        deadline: goal.deadline?.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    throw error
  }
}

export const deleteSavingsGoal = async (id: string) => {
  try {
    const { error } = await supabase
      .from('savings_goals')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    throw error
  }
}

export const getSavingsGoals = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error

    return data.map(goal => ({
      ...goal,
      deadline: new Date(goal.deadline),
      created_at: new Date(goal.created_at),
      updated_at: new Date(goal.updated_at),
    })) as SavingsGoal[]
  } catch (error) {
    throw error
  }
}

export const updateGoalProgress = async (id: string, current: number) => {
  try {
    const { error } = await supabase
      .from('savings_goals')
      .update({
        current,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    throw error
  }
} 