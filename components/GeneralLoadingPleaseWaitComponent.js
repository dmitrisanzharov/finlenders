import React from 'react'

const GeneralLoadingPleaseWaitComponent = ({textToDisplay}) => {
    return (
        <React.Fragment>

        <div className="loadingPleaseWaitPageWrapper p-md-5">
        <form className='registrationPageFormBox px-3 pt-5 p-md-5 pb-5'>

            <div className="registerFormHeader text-center mb-4 p-0">
            {textToDisplay}
            </div>

            <div className='d-flex justify-content-center align-items-center'>
            <div className="registerPageLoadingSpinner"></div>
            </div>

        </form>
        </div>
        </React.Fragment>
    )
}

export default GeneralLoadingPleaseWaitComponent
