import React from 'react';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { IconContext } from "react-icons";

const UpAndDownArrowIcon = () => {
    return (
        <div className="d-flex flex-column">
                    <div style={{marginBottom: '-17px'}}>
                        <TiArrowSortedUp />
                    </div>
                    <div>
                     <TiArrowSortedDown />
                    </div>

            
        </div>
    )
}

export default UpAndDownArrowIcon