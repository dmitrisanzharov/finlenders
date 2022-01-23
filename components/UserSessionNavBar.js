import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {useGlobal} from '../useContext'; 
import $ from 'jquery'; 


// component imports
import FinLendersLogo from './FinLendersLogo'; 
import GeneralLoadingPleaseWaitComponent from './GeneralLoadingPleaseWaitComponent';


const UserSessionNavbar = () => {


//********************************************************************
//          STATE MANAGEMENTS
// *******************************************************************

  const {
    navBarDropdownStyleController,
    fetchSingleUserDataToSetAvailableBalance
  } = useGlobal(); 

  const [loading, setLoading] = useState(true);
  const [availableBalance, setAvailableBalance] = useState('0.00') 


//********************************************************************
//          FUNCTIONS
// *******************************************************************

const handleAddFundsDropDown = () => {
  setAddFundsDropdown(true);
}




  //********************************************************************
//          useEffects
// *******************************************************************

useEffect(async ()=> {

  let userIDfromSessionStorage = sessionStorage.finLendersUserDataId;

  let balance = await fetchSingleUserDataToSetAvailableBalance(userIDfromSessionStorage);
  setAvailableBalance(balance); 
  setLoading(false); 

}, [])



  //********************************************************************
//         ACTUAL HTML
// *******************************************************************

if(loading){
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
<div className='mx-5 my-3'>
    <Link className="navbar-brand" href="/">
      <a><FinLendersLogo /></a>
    </Link>
</div>
</div></nav>
  )
} 

return (
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">


  
{/* ****************************************************************** */}
{/* *****   Logo Section     ****** */}
{/* ***************************************************************** */}

<div className='mx-5 my-3'>
    <Link className="navbar-brand" href="/user-session">
      <a><FinLendersLogo /></a>
    </Link>
</div>


{/* ****************************************************************** */}
{/* *****   MID SECTION, marketplace and other + colapsable controller    ****** */}
{/* ***************************************************************** */}

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>



<div className="collapse navbar-collapse text-center" id="navbarSupportedContent">

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

      <li className="nav-item ms-3 mb-lg-0 mb-2">
        <Link href='/user-session'>
          <a className="nav-link"
          onClick={()=> navBarDropdownStyleController('removeStyle')}
          >Dashboard</a>
          </Link>
        </li>

        <li className="nav-item ms-3 mb-lg-0 mb-2">
        <Link href='/'>
          <a className="nav-link"
          onClick={()=> navBarDropdownStyleController('removeStyle')}
          >Marketplace</a>
          </Link>
        </li>

        {/* <li className="nav-item ms-3 mb-lg-0 mb-2">
        <Link href='/transactions-reports'>
          <a className="nav-link"
          onClick={()=> navBarDropdownStyleController('removeStyle')}
          >View Transaction Reports</a>
          </Link>
        </li>

        <li className="nav-item ms-3 mb-lg-0 mb-2">
        <Link href='/my-investments'>
          <a className="nav-link"
          onClick={()=> navBarDropdownStyleController('removeStyle')}
          >View My Investments</a>
          </Link>
        </li> */}


     </ul>



{/* ****************************************************************** */}
{/* Right section of navbar, it holds: Balance and Logout stuff ****** */}
{/* ***************************************************************** */}

<div className="d-flex flex-column flex-lg-row me-lg-4 align-items-center justify-content-center ms-4 ms-lg-0">

       <ul className="navbar-nav pe-lg-2">
        <li className="nav-item">


          {/* START OF AVAILABLE BALANCE BOX */}
          <div className='d-flex flex-column justify-content-center align-items-center align-items-lg-end me-3' onClick={handleAddFundsDropDown}>

            <div className="availableBalanceText">
              Available Balance
            </div>

            <div className="availableBalanceText">
            €{parseFloat(availableBalance).toFixed(2)}
            </div>

          </div>

          {/* END OF AVAILABLE BALANCE BOX */}
        </li>
          </ul>
          <button type="button" className="btn btn-light btn-lg my-3 my-lg-0" style={{border: '2px solid #00D0C1'}}>
            <Link href='/'>
              <a className='tempLink'
              onClick={()=> {
                sessionStorage.removeItem('finLendersUserDataId');
              }}
              >Sign Out</a>
              </Link>
            </button>

{/* end of right section wrapper */}
</div>


 {/*end of mid section wrapper  */}
</div>
{/* end of navbar full - container-fluid*/}
</div>

  
</nav>
</>
    )


}

export default UserSessionNavbar 
