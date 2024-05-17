// import React, { useState } from 'react';

// const Pagination = () => {
//   // Define state for current page number
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 10; // Total number of pages, you can adjust this as needed

//   // Function to handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // Add logic here to fetch data for the new page or update the UI accordingly
//   };

//   // Generate page buttons dynamically based on total pages
//   const renderPageButtons = () => {
//     const buttons = [];
//     for (let i = 1; i <= totalPages; i++) {
//       buttons.push(
//         <button
//           key={i}
//           className={`relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg ${
//             currentPage === i ? 'border-2 text-base font-semibold border-sh-blue text-white bg-sh-blue' : 'border-2 text-base font-semibold border-gray-500 text-gray-900'
//           } text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-sh-blue ${
//             currentPage === i ? 'pointer-events-none  shadow-none' : ''
//           }`}
//           type="button"
//           onClick={() => handlePageChange(i)}
//         >
//           <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{i}</span>
//         </button>
//       );
//     }
//     return buttons;
//   };

//   return (
//     <div className="relative flex flex-col w-full h-full text-gray-700 bg-sh-cream shadow-md rounded-xl bg-clip-border">
//       <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
//         <button
//           className="select-none rounded-lg border border-sh-blue text-sh-blue py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//           type="button"
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//         >
//           Previous
//         </button>
//         <div className="flex items-center gap-2">{renderPageButtons()}</div>
//         <button
//           className="select-none rounded-lg border border-sh-blue text-sh-blue py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//           type="button"
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

import React, { useState, useEffect } from 'react';
import PaginationNext from '../../assets/pagination_next.svg';
import PaginationPrev from '../../assets/pagination_prev.svg';

const Pagination = ({ totalRecords, recordsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);


  
  const [isMedium, setisMedium] = useState(window.innerWidth < 1024);
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setisMedium(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 4; // Number of page buttons to show at a time
    const ellipsis = '...';
  
    // Calculate the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 2);
  
    // Adjust startPage and endPage if there are more than maxVisiblePages
    if (totalPages > maxVisiblePages && currentPage > endPage) {
      // Show the next 3 pages starting from currentPage
      startPage = Math.max(1, currentPage - 2);
      endPage = Math.min(totalPages, currentPage + 2);
    }
    if (isMedium) {
      if (totalPages - currentPage <= 4) {
        startPage = Math.max(1, totalPages - 4); // Start from the calculated start page
        endPage = totalPages; // Set endPage to total pages
      }
    } else {
      if (totalPages - currentPage <= 6) {
        startPage = Math.max(1, totalPages - 6); // Start from the calculated start page
        endPage = totalPages; // Set endPage to total pages
      }
    }
  
    // Add previous button if necessary
    buttons.push(
      <button
        key="prev"
        className={`lg:mr-3 mr-1  lg:max-h-[40px]  lg:max-w-[40px] relative h-9 lg:h-12  w-9 lg:w-12  select-none rounded-[40px] border border-sh-blue text-gray-900 text-center align-middle  text-sm font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-sh-blue shadow-none`}
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={PaginationPrev} className='ml-1.5'></img>
      </button>
    );
  
    // Add page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg ${
            currentPage === i ? 'border-2 text-base font-semibold border-sh-blue text-white bg-sh-blue' : ' text-base font-semibold  text-gray-900'
          } text-center align-middle  text-sm font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-sh-blue`}
          type="button"
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
  
    // Check if next button should show pages from current page to total pages
   
  
    // Add last 3 pages after ellipsis if totalPages - currentPage > 6
    if (endPage < totalPages) {
      buttons.push(
        <span key="ellipsis" className="relative w-8 max-w-[32px] select-none rounded-lg text-gray-900 text-center align-middle  text-xs font-medium uppercase">
          {ellipsis}
        </span>
      );
  
      for (let i = totalPages - 2; i <= totalPages; i++) {
        if (isMedium) {
          i = totalPages; // Set i to totalPages when isMedium is true
        }
        buttons.push(
          <button
            key={i}
            className={`relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg ${
              currentPage === i ? ' text-base font-semibold border-sh-blue text-white bg-sh-blue' : ' text-base font-semibold  text-gray-900'
            } text-center align-middle  text-sm font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-sh-blue`}
            type="button"
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    }
  
    // Add next button if necessary
  
      buttons.push(
        <button
          key="next"
          className={`ml-3 lg:mr-3 mr-1  relative h-9 lg:h-12  w-9 lg:w-12 lg:max-h-[40px]  lg:max-w-[40px] select-none rounded-[40px] border border-sh-blue text-gray-900 text-center align-middle  text-sm font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-sh-blue shadow-none`}
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}

        >
          <img src={PaginationNext} className='ml-1'></img>
        </button>
      );
    
  
    return buttons;
  };
  
  
  
  
  
  
  // const renderPageButton = (pageNumber) => (
  //   <button
  //     key={pageNumber}
  //     className={`relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg ${
  //       currentPage === pageNumber ? 'border-2 text-base font-semibold border-sh-blue text-white bg-sh-blue' : 'border-2 text-base font-semibold border-gray-500 text-gray-900'
  //     } text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-sh-blue ${
  //       currentPage === pageNumber ? 'pointer-events-none shadow-none' : ''
  //     }`}
  //     type="button"
  //     onClick={() => handlePageChange(pageNumber)}
  //   >
  //     <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{pageNumber}</span>
  //   </button>
  // );

  const renderEllipsis = () => (
    <span key="ellipsis" className="text-gray-500">...</span>
  );

  return (
    <div className=" flex items-center justify-center  w-full h-full text-gray-700 bg-sh-cream  rounded-xl bg-clip-border">
      <div className="flex items-center justify-between bg-transparent p-4 ">
        {/* <button
          className="select-none rounded-lg border border-sh-blue text-sh-blue py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button> */}
        <div className="flex items-center gap-2 bg-transparent">{renderPageButtons()}</div>
        {/* <button
          className="select-none rounded-lg border border-sh-blue text-sh-blue py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button> */}
      </div>
    </div>
  );
};

export default Pagination;


