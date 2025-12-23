import './Pagination.css';

export function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
  
    return (
      <div className="pagination">
        {/* Previous */}
        <button
          className="page-btn circle"
          disabled={currentPage === 1}
          onClick={function () {
            onPageChange(currentPage - 1);
          }}
        >
          ‹
        </button>
  
        {/* Page numbers */}
        {Array.from({ length: totalPages }, function (_, i) {
          const page = i + 1;
          return (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? "active" : ""}`}
              onClick={function () {
                onPageChange(page);
              }}
            >
              {page}
            </button>
          );
        })}
  
        {/* Next */}
        <button
          className="page-btn circle"
          disabled={currentPage === totalPages}
          onClick={function () {
            onPageChange(currentPage + 1);
          }}
        >
          ›
        </button>
      </div>
    );
  }
  
  