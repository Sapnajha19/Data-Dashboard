import React from 'react'
import "../styles/Sort.css"

const Sort = ({ sortOptions, sortBy, setSortBy, sortOrder, setSortOrder }) => {
    const selectSortOption = (e) => {
        const selectedValue = e.target.value;
        setSortBy(selectedValue === "" ? null : Number(selectedValue));
    }
    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }
    return (
        <div className="sortContainer">
            Sort by:
            <select onChange={selectSortOption} className="sortSelect">
                <option value="">Select option</option>
                {sortOptions.map((option, index) => (
                    <option key={option} value={index}>{option}</option>
                ))}
            </select>
            <button className="sort-order" onClick={toggleSortOrder} disabled={sortBy === null}>
                {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
        </div>
    )
}

export default Sort
