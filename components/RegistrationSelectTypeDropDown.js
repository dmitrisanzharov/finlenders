import React from 'react'
import {useGlobal} from '../useContext'

const RegistrationSelectTypeDropDown = () => {

    const {setRegistrationPageDropDownSelection, setRegistrationPageInvestAsBorderControl} = useGlobal(); 


    return (
        <div style={{borderRadius: '10px', background: 'white', boxSizing: 'border-box', position: 'absolute', width: '100%', zIndex: '10000', boxShadow: '0px 40px 10px 2px rgba(0,0,0,0.1)'}}>
            <div className='selectTypeDropDownText ps-2' onClick={()=> {setRegistrationPageDropDownSelection('Select type');
            setRegistrationPageInvestAsBorderControl('red');
        }}>Select type</div>
            <div className='selectTypeDropDownText ps-2' onClick={()=>{setRegistrationPageDropDownSelection('Individual lender');
        setRegistrationPageInvestAsBorderControl('green');}} >Individual lender</div>
            <div className='selectTypeDropDownText ps-2' onClick={()=> {setRegistrationPageDropDownSelection('Pension account');
        setRegistrationPageInvestAsBorderControl('green');}}>Pension account</div>
        </div>
    ) 
}

export default RegistrationSelectTypeDropDown
