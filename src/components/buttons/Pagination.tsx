import { useState, useEffect } from 'react'

const Pagination = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}: {
  numberOfPages: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [pages, setPages] = useState<[] | number[]>([])

  useEffect(() => {
    const number = [...Array(numberOfPages).keys()].map((num) => {
      return num + 1
    })
    setPages(number)
  }, [numberOfPages])

  const previousButton = () => {
    if (currentPage - 1 < 1) return
    setCurrentPage((prev) => prev - 1)
  }
  const nextButton = () => {
    if (currentPage + 1 > numberOfPages) return
    setCurrentPage((prev) => prev + 1)
  }

  return (
    <div className="btn-group">
      <button className="btn" onClick={previousButton}>
        «
      </button>

      {pages.map((page) => {
        return (
          <button
            key={page}
            className={currentPage === page ? 'btn btn-info' : 'btn'}
            onClick={() => {
              setCurrentPage(page)
            }}
          >
            {page}
          </button>
        )
      })}
      <button className="btn" onClick={nextButton}>
        »
      </button>
    </div>
  )
}

export default Pagination
