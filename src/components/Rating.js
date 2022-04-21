import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function Rating({ rating, onClick, style }) {
    return <>
        {
            [...Array(5)].map((_, index) => (
                <span key={index} onClick={() => onClick(index)} style={style}>
                    {(rating > index) ? <AiFillStar /> : <AiOutlineStar />}
                </span>
            ))
        }
    </>;
}

export default Rating;
