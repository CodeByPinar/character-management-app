export function SkeletonGrid({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
  return (
    <div className={viewMode === 'grid' ? 'character-grid' : 'character-list'} aria-label="Loading characters">
      {Array.from({ length: viewMode === 'grid' ? 8 : 5 }).map((_, index) => (
        <div className={`skeleton-card ${viewMode === 'list' ? 'is-list' : ''}`} key={index}>
          <div className="skeleton-media shimmer" />
          <div className="skeleton-body">
            <div className="skeleton-line shimmer wide" />
            <div className="skeleton-pills">
              <div className="skeleton-pill shimmer" />
              <div className="skeleton-pill shimmer" />
            </div>
            <div className="skeleton-line shimmer" />
            <div className="skeleton-line shimmer short" />
          </div>
        </div>
      ))}
    </div>
  );
}
