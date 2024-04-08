import React, { useState } from 'react';

const UsePagination = (initialPage, initialRecordsPerPage) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const recordsPerPage = initialRecordsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return { currentPage, recordsPerPage, handlePageChange };
};

export default UsePagination;