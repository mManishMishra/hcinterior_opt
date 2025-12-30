// Skeleton loaders for above-the-fold content
export const BannerSkeleton = () => (
  <div className="position-relative" style={{ height: '600px', backgroundColor: '#f0f0f0' }}>
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="cardoffer" style={{ backgroundColor: '#f0f0f0', minHeight: '300px' }}>
    <div className="skeleton-image" style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0' }}></div>
    <div className="px-3 pt-3">
      <div className="skeleton-text" style={{ width: '80%', height: '20px', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>
      <div className="skeleton-text" style={{ width: '60%', height: '20px', backgroundColor: '#e0e0e0' }}></div>
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div style={{ padding: '20px' }}>
    <div className="skeleton-text" style={{ width: '70%', height: '30px', backgroundColor: '#e0e0e0', marginBottom: '15px' }}></div>
    <div className="skeleton-text" style={{ width: '100%', height: '20px', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>
    <div className="skeleton-text" style={{ width: '90%', height: '20px', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>
    <div className="skeleton-text" style={{ width: '80%', height: '20px', backgroundColor: '#e0e0e0' }}></div>
  </div>
);

export const IconSkeleton = () => (
  <div style={{ width: '60px', height: '60px', backgroundColor: '#e0e0e0', borderRadius: '50%' }}></div>
);

