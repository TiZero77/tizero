// src/components/FilterBar/FilterBar.tsx
import { useMovieStore } from '../../stores/useMovieStore'
import { useGenres } from '../../hooks/useMovies'
import { LANGUAGE_OPTIONS, RUNTIME_OPTIONS, type EraOption } from '../../types/movie'

const ERA_LABELS: Record<EraOption, string> = {
  classic: '经典',
  '90s': '90s',
  '00s': '00s',
  '10s': '10s',
  recent: '近5年',
}

export function FilterBar() {
  const { filters, toggleGenre, setEra, setMinRating, setMaxRating, setLanguage, setMaxRuntime } = useMovieStore()
  const { data: genres = [] } = useGenres()

  return (
    <div className="flex flex-col gap-5">
      {/* 类型 */}
      <section>
        <h3 className="text-sm font-medium text-muted mb-2">类型</h3>
        <div className="flex flex-wrap gap-1.5">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                filters.genres.includes(genre.id)
                  ? 'bg-accent text-bg border-accent'
                  : 'border-border text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </section>

      {/* 年代 */}
      <section>
        <h3 className="text-sm font-medium text-muted mb-2">年代</h3>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(ERA_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setEra(filters.era === key ? null : key as EraOption)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                filters.era === key
                  ? 'bg-accent text-bg border-accent'
                  : 'border-border text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* 评分 */}
      <section>
        <h3 className="text-sm font-medium text-muted mb-2">
          评分 {filters.minRating.toFixed(1)} - {filters.maxRating.toFixed(1)}
        </h3>
        <div className="flex gap-2 items-center">
          <input
            type="range"
            min={5}
            max={9}
            step={0.5}
            value={filters.minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="flex-1 accent-accent"
          />
          <input
            type="range"
            min={5}
            max={10}
            step={0.5}
            value={filters.maxRating}
            onChange={(e) => setMaxRating(Number(e.target.value))}
            className="flex-1 accent-accent"
          />
        </div>
      </section>

      {/* 语言 */}
      <section>
        <h3 className="text-sm font-medium text-muted mb-2">语言</h3>
        <select
          value={filters.language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-1.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:border-accent"
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </section>

      {/* 片长 */}
      <section>
        <h3 className="text-sm font-medium text-muted mb-2">片长</h3>
        <div className="flex flex-wrap gap-1.5">
          {RUNTIME_OPTIONS.map((opt) => (
            <button
              key={String(opt.value)}
              onClick={() => setMaxRuntime(opt.value)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                filters.maxRuntime === opt.value
                  ? 'bg-accent text-bg border-accent'
                  : 'border-border text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
