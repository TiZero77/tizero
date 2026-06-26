import { useWatchlist } from '../../hooks/useWatchlist'
import { useWatched } from '../../hooks/useWatched'
import { useMovieDetail } from '../../hooks/useMovies'

function MovieRow({ movieId, type }: { movieId: number; type: 'watchlist' | 'watched' }) {
  const { data: movie } = useMovieDetail(movieId)
  const watched = useWatched()
  const watchlist = useWatchlist()

  if (!movie) return null

  const handleRemove = () => {
    if (type === 'watchlist') watchlist.remove.mutate(movieId)
    else watched.remove.mutate(movieId)
  }

  return (
    <div className="flex items-center gap-3 py-2">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
          alt={movie.title}
          className="w-8 h-12 object-cover rounded"
        />
      ) : (
        <div className="w-8 h-12 bg-card rounded flex items-center justify-center text-xs text-muted">?</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{movie.title}</p>
        <p className="text-xs text-muted">{movie.release_date?.slice(0, 4)}</p>
      </div>
      <button onClick={handleRemove} className="text-xs text-muted hover:text-accent transition-colors">
        ✕
      </button>
    </div>
  )
}

export function MyList() {
  const { data: watchlist = [] } = useWatchlist()
  const { data: watched = [] } = useWatched()

  return (
    <div className="flex flex-col gap-4">
      {/* 想看 */}
      <section>
        <h3 className="text-sm font-medium text-muted mb-2">
          想看 <span className="text-accent">({watchlist.length})</span>
        </h3>
        {watchlist.length === 0 ? (
          <p className="text-xs text-muted">还没有想看的电影</p>
        ) : (
          <div className="flex flex-col">
            {watchlist.map((item) => (
              <MovieRow key={item.id} movieId={item.movie_id} type="watchlist" />
            ))}
          </div>
        )}
      </section>

      {/* 已看 */}
      <section>
        <h3 className="text-sm font-medium text-muted mb-2">
          已看 <span className="text-accent">({watched.length})</span>
        </h3>
        {watched.length === 0 ? (
          <p className="text-xs text-muted">还没有看过的电影</p>
        ) : (
          <div className="flex flex-col">
            {watched.map((item) => (
              <MovieRow key={item.id} movieId={item.movie_id} type="watched" />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
