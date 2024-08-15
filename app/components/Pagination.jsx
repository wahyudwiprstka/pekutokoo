import React from 'react'

const Pagination = ({currentPage, totalPage, itemPerPage, link}) => {
  console.log(totalPage);
  currentPage = parseInt(currentPage)
  totalPage = parseInt(totalPage)
  itemPerPage = parseInt(itemPerPage)
  return (
    <>
    {(totalPage > 1) ? (
      <div className='flex text-center items-center sm:ml-[16rem]'>
      {/* PREVIOUS BUTTON */}
      {(currentPage - 1 > 0) ? (
        <a href={`${link}?page=${currentPage-1}&itemPerPage=${itemPerPage}`} className='border rounded-l-lg p-2 bg-white'><button>Prev</button></a>
      ): (
        <a href={`#`} className='border rounded-l-lg p-2 bg-gray-100'><button>Prev</button></a>
      )}
      {/* -2 PAGE BUTTON */}
      {(currentPage - 2 > 0) ? (
        <button className='border py-2 px-4 bg-white'>{currentPage-2}</button>
      ) : ''}
      {/* -1 PAGE BUTTON */}
      {(currentPage - 1 > 0) ? (
        <button className='border py-2 px-4 bg-white'>{currentPage-1}</button>
      ) : ''} 
      {/* CURRENT PAGE */}
      <p className='border py-2 px-4 bg-blue-600 text-white'>{currentPage}</p>
      {/* +1 PAGE BUTTON */}
      {(currentPage + 1 <= totalPage) ? (
        <button className='border py-2 px-4 bg-white'>{currentPage+1}</button>
      ) : ''}
      {/* +2 PAGE BUTTON */}
      {(currentPage + 2 <= totalPage) ? (
        <button className='border py-2 px-4 bg-white'>{currentPage+2}</button>
      ) : ''} 
      {/* NEXT BUTTON */}
      {(currentPage + 1 <= totalPage) ? (
        <a href={`${link}?page=${currentPage+1}&itemPerPage=${itemPerPage}`} className='border rounded-r-lg p-2 bg-white'><button>Next</button></a>
      ): (
        <a href={`#`} className='border rounded-r-lg p-2 bg-gray-100'><button>Next</button></a>
      )}
    </div>
    ) : ''}
      
    </>
  )
}

export default Pagination