// src/components/MovieCard/MovieCard.tsx
import { useMovieStore } from '../../stores/useMovieStore'
import { useMovieDetail } from '../../hooks/useMovies'
import { useWatchlist } from '../../hooks/useWatchlist'
import { useWatched } from '../../hooks/useWatched'
import { useDrawHistory } from '../../hooks/useDrawHistory'

export function MovieCard() {
  const { selectedCard, resetDraw } = useMovieStore()
  const { data: detail } = useMovieDetail(selectedCard?.id ?? null)
  const watchlist = useWatchlist()
  const watched = useWatched()
  const drawHistory = useDrawHistory()

  if (!selectedCard) return null

  const movie = detail ?? selectedCard
  const year = movie.release_date?.slice(0, 4) ?? '未知'
  const rating = movie.vote_average?.toFixed(1) ?? '-'
  const runtime = detail?.runtime ? `${detail.runtime}分钟` : ''

  const handleWatchlist = () => {
    watchlist.add.mutate(movie.id)
  }

  const handleWatched = () => {
    watched.add.mutate({ movieId: movie.id })
    drawHistory.add.mutate(movie.id)
  }

  const handleRedraw = () => {
    resetDraw()
  }

  return (
    <div className="flex gap-6 max-w-2xl mx-auto">
      {/* 海报 */}
      <div className="flex-shrink-0 w-[200px]">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-full h-[300px] bg-card rounded-lg flex items-center justify-center text-muted">
            无海报
          </div>
        )}
      </div>

      {/* 详情 */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span>{year}</span>
          <span className="text-accent font-medium">⭐ {rating}</span>
          {runtime && <span>{runtime}</span>}
        </div>
        {detail?.genres && (
          <div className="flex flex-wrap gap-1.5">
            {detail.genres.map((g) => (
              <span key={g.id} className="px-2 py-0.5 text-xs border border-border rounded-full text-muted">
                {g.name}
              </span>
            ))}
          </div>
        )}
        {movie.overview && (
          <p className="text-sm text-muted leading-relaxed line-clamp-4">
            {movie.overview}
          </p>
        )}

        {/* 操作按钮 */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleWatchlist}
            className="px-4 py-2 text-sm border border-accent text-accent rounded-lg hover:bg-accent hover:text-bg transition-colors"
          >
            想看
          </button>
          <button
            onClick={handleWatched}
            className="px-4 py-2 text-sm bg-accent text-bg rounded-lg hover:opacity-90 transition-opacity"
          >
            已看
          </button>
          <button
            onClick={handleRedraw}
            className="px-4 py-2 text-sm border border-border text-muted rounded-lg hover:border-accent hover:text-accent transition-colors"
          >
            再抽一次
          </button>
        </div>
      </div>
    </div>
  )
}
