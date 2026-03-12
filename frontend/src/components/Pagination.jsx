import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Using Ant Design Icons from react-icons

const Pagination = ({ productsPerPage, totalProducts, paginate, activePage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex justify-center items-center mt-6 space-x-2 sm:space-x-4">
      {/* Previous Button */}
      <li>
        <button
          onClick={() => {
            if (activePage > 1) {
              paginate(activePage - 1);
            }
          }}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm text-xs sm:text-sm transition"
        >
          <AiOutlineLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </li>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            onClick={() => paginate(number)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full text-center text-xs sm:text-sm font-medium transition ${number === activePage
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-transparent text-slate-700 hover:bg-slate-100'
              }`}
          >
            {number}
          </button>
        </li>
      ))}

      {/* Next Button */}
      <li>
        <button
          onClick={() => {
            if (activePage < pageNumbers.length) {
              paginate(activePage + 1);
            }
          }}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm text-xs sm:text-sm transition"
        >
          <AiOutlineRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;

