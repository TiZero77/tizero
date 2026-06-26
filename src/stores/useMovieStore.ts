// src/stores/useMovieStore.ts
import { create } from 'zustand'
import type { FilterState, DrawnCard, Movie } from '../types/movie'

interface MovieStore {
  // 筛选条件
  filters: FilterState
  setGenres: (genres: number[]) => void
  toggleGenre: (genreId: number) => void
  setEra: (era: FilterState['era']) => void
  setMinRating: (rating: number) => void
  setMaxRating: (rating: number) => void
  setLanguage: (language: string) => void
  setMaxRuntime: (runtime: number | null) => void

  // 抽卡状态
  drawnCards: DrawnCard[]
  isDrawing: boolean
  selectedCard: Movie | null
  startDraw: (movies: Movie[]) => void
  selectCard: (index: number) => void
  resetDraw: () => void

  // 主题
  isDark: boolean
  toggleTheme: () => void
}

const defaultFilters: FilterState = {
  genres: [],
  era: null,
  minRating: 6.0,
  maxRating: 10.0,
  language: '',
  maxRuntime: null,
}

export const useMovieStore = create<MovieStore>((set) => ({
  // 筛选条件
  filters: defaultFilters,
  setGenres: (genres) => set((s) => ({ filters: { ...s.filters, genres } })),
  toggleGenre: (genreId) =>
    set((s) => ({
      filters: {
        ...s.filters,
        genres: s.filters.genres.includes(genreId)
          ? s.filters.genres.filter((id) => id !== genreId)
          : [...s.filters.genres, genreId],
      },
    })),
  setEra: (era) => set((s) => ({ filters: { ...s.filters, era } })),
  setMinRating: (rating) => set((s) => ({ filters: { ...s.filters, minRating: rating } })),
  setMaxRating: (rating) => set((s) => ({ filters: { ...s.filters, maxRating: rating } })),
  setLanguage: (language) => set((s) => ({ filters: { ...s.filters, language } })),
  setMaxRuntime: (runtime) => set((s) => ({ filters: { ...s.filters, maxRuntime: runtime } })),

  // 抽卡状态
  drawnCards: [],
  isDrawing: false,
  selectedCard: null,
  startDraw: (movies) =>
    set({
      drawnCards: movies.map((movie) => ({ movie, isFlipped: false, isSelected: false })),
      isDrawing: true,
      selectedCard: null,
    }),
  selectCard: (index) =>
    set((s) => ({
      drawnCards: s.drawnCards.map((card, i) => ({
        ...card,
        isFlipped: i === index,
        isSelected: i === index,
      })),
      selectedCard: s.drawnCards[index]?.movie ?? null,
      isDrawing: false,
    })),
  resetDraw: () => set({ drawnCards: [], isDrawing: false, selectedCard: null }),

  // 主题（从 localStorage 读取，默认暗色）
  isDark: localStorage.getItem('tizero_theme') !== 'light',
  toggleTheme: () =>
    set((s) => {
      const newDark = !s.isDark
      localStorage.setItem('tizero_theme', newDark ? 'dark' : 'light')
      return { isDark: newDark }
    }),
}))
