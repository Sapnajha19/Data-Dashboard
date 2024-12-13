import React from 'react'
import "../styles/ItemDetails.css"

const ItemDetails = ({ data }) => {
    return (
        <div className="detailsContainer">
            <h2 className="heading">Complete details of item</h2>
            <p className="label">Engagement history:</p>
            <ul className="engagementHistoryList">
                <li className="labelWrap"><span className="label">Likes:</span> <span className="value">{data?.likes}</span></li>
                <li className="labelWrap"><span className="label">Shares:</span> <span className="value">{data?.shares}</span></li>
                <li className="labelWrap"><span className="label">Comments:</span><span className="value">{data?.comments}</span></li>
            </ul>
            <p className="labelWrap"><span className="label">Category:</span> <span className="value">{data?.category}</span></p>
            <p className="labelWrap"><span className="label">Location:</span> <span className="value">{data?.location}</span></p>
        </div>
    )
}

export default ItemDetails
