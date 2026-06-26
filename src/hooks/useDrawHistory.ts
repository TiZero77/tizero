import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../api/supabase'
import { getUserId } from '../lib/userId'
import type { DrawHistoryItem } from '../types/movie'

export function useDrawHistory() {
  const queryClient = useQueryClient()
  const userId = getUserId()

  const query = useQuery({
    queryKey: ['drawHistory', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('draw_history')
        .select('*')
        .eq('user_id', userId)
        .order('drawn_at', { ascending: false })
        .limit(50)
      if (error) throw error
      return data as DrawHistoryItem[]
    },
  })

  const add = useMutation({
    mutationFn: async (movieId: number) => {
      const { error } = await supabase
        .from('draw_history')
        .insert({ user_id: userId, movie_id: movieId })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['drawHistory', userId] }),
  })

  return { ...query, add }
}
