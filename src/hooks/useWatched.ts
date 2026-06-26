import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../api/supabase'
import { getUserId } from '../lib/userId'
import type { WatchedItem } from '../types/movie'

export function useWatched() {
  const queryClient = useQueryClient()
  const userId = getUserId()

  const query = useQuery({
    queryKey: ['watched', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('watched')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as WatchedItem[]
    },
  })

  const add = useMutation({
    mutationFn: async ({ movieId, rating, comment }: { movieId: number; rating?: number; comment?: string }) => {
      const { error } = await supabase
        .from('watched')
        .insert({ user_id: userId, movie_id: movieId, rating: rating ?? null, comment: comment ?? null })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watched', userId] }),
  })

  const remove = useMutation({
    mutationFn: async (movieId: number) => {
      const { error } = await supabase
        .from('watched')
        .delete()
        .eq('user_id', userId)
        .eq('movie_id', movieId)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watched', userId] }),
  })

  return { ...query, add, remove }
}
