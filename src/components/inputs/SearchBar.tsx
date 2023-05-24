const SearchBar = ({
  setSearchInput,
}: {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
}) => {
  const handleSearch = (e: any) => {
    const input = e.target.value.toLowerCase()
    setSearchInput(input)
  }

  return (
    <div className="form-control w-full max-w-sm mx-auto md:mx-0">
      <div className="input-group w-full">
        <input
          type="text"
          placeholder="Recherche..."
          className="input input-bordered w-full"
          onChange={handleSearch}
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchBar
