import React, { ClassAttributes } from "react"
import SearchIcon from "@svg/search_black_24dp.svg"

interface Props {
  className?: string
}

const SearchBox: React.FC<Props> = ({ className }) => {
  return (
    <form className={className}>
      <div className="relative">
        <SearchIcon className="absolute top-2 left-3" />
        <input
          className="font-medium rounded-full py-2.5 px-12 w-full text-black focus:outline-none"
          placeholder="Search..."
        />
      </div>
    </form>
  )
}

export default SearchBox
