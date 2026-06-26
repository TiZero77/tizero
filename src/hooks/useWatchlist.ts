import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../api/supabase'
import { getUserId } from '../lib/userId'
import type { WatchlistItem } from '../types/movie'

export function useWatchlist() {
  const queryClient = useQueryClient()
  const userId = getUserId()

  const query = useQuery({
    queryKey: ['watchlist', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as WatchlistItem[]
    },
  })

  const add = useMutation({
    mutationFn: async (movieId: number) => {
      const { error } = await supabase
        .from('watchlist')
        .insert({ user_id: userId, movie_id: movieId })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist', userId] }),
  })

  const remove = useMutation({
    mutationFn: async (movieId: number) => {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', userId)
        .eq('movie_id', movieId)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist', userId] }),
  })

  return { ...query, add, remove }
}
