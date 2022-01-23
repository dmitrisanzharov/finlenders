import React, {useEffect} from 'react'

const ProgressCircleComponent = ({progress}) => {

    return (
        <>

        <div className="progressCircleWrapper">

            <div className="progress-circle-spinner" style={{
                background: `conic-gradient(#00D1C1 ${progress}%, #ffffff ${progress}%)`
            }}></div>


            <div className="progress-circle-middle-circle">
                <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '21px', lineHeight: '25px', color: '#00d1c1'}} >
                {progress}%
                </div>               
            </div>


            {/* end of progress wrapper */}
        </div>



        </>
    )
}

export default ProgressCircleComponent
