import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import FinLendersLogo from './FinLendersLogo'
import {useGlobal} from '../useContext'; 
import NavBarBorderBlueGreen from './NavBarBorderBlueGreen';
import $ from 'jquery'; 

const Navbar = () => {

  const {pageUnderDevelopment, 
    styleTeamNav, styleMissionNav, 
    styleFAQNav, 
    navBarDropdownStyleController
  } = useGlobal(); 




  //********************************************************************
//          useEffects
// *******************************************************************



  //********************************************************************
//         ACTUAL HTML
// *******************************************************************

    return (
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">

      <div className={`mx-5 my-3`}>
    <Link className="navbar-brand" href="/">
      <a><FinLendersLogo /></a>
    </Link>
    </div>



    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>



    <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {/* <li className="nav-item ms-3 mb-lg-0 mb-2">
          <Link href='/invest'>
          <a className="nav-link" 
          onClick={()=> navBarDropdownStyleController('removeStyle')}
          >Invest</a>
          </Link>
        </li> */}

        {/* <li className="nav-item ms-3 mb-lg-0 mb-2" >
        <Link href='/business-loans'>
          <a className="nav-link"
          onClick={()=> navBarDropdownStyleController('removeStyle')}
          >Business loans</a>
          </Link>
        </li> */}

        <li className="nav-item ms-3 mb-lg-0 mb-2">
        <Link href='/'>
          <a className="nav-link"
          onClick={()=> navBarDropdownStyleController('removeStyle')}
          >Marketplace</a>
          </Link>
        </li>


        <li className="nav-item dropdown ms-3 mb-lg-0 mb-2">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            About
          </a>

          <ul className="dropdown-menu text-center text-lg-start mt-lg-0 mt-1" 
          // style={{background: '#F8F9FA', border: 'none'}}
          >

            <li><Link href='/mission'>
              <a className={styleMissionNav ? "dropdown-item p-4 color-white" : "dropdown-item p-4"} style={styleMissionNav ? {background: '#007BFF'} : {}} 
              onClick={()=> navBarDropdownStyleController('mission')}>Mission</a>
              </Link></li>

            <li><Link href='/team'>
              <a className={styleTeamNav ? "dropdown-item p-4 color-white" : "dropdown-item p-4"} style={styleTeamNav ? {background: '#007BFF'} : {}}
              onClick={()=> navBarDropdownStyleController('team')}
              >Team</a>
              </Link></li>

            <li><Link href='/faq'>
              <a 
              className={styleFAQNav ? "dropdown-item p-4 color-white" : "dropdown-item p-4"} style={styleFAQNav ? {background: '#007BFF'} : {}}
              onClick={()=> navBarDropdownStyleController('faq')}
              >FAQ</a>
              </Link></li>

          </ul>

        </li>


        <li className="nav-item ms-3 mb-lg-0 mb-2">
        <Link href='/contact'>
          <a className="nav-link"
          onClick={()=> navBarDropdownStyleController('removeStyle')}
          >Contact</a>
          </Link>
        </li>



      {/* end of UL that holds Invest, busines loans, Markteplace, etc */}
      </ul>


      <div className="d-flex flex-column flex-lg-row me-lg-4 align-items-center justify-content-center ms-4 ms-lg-0">

       <ul className="navbar-nav pe-lg-2">
        <li className="nav-item">
        <Link href='/sign-in'>
          <a className="nav-link"
          onClick={()=> navBarDropdownStyleController('removeStyle')}
          >Log in</a>
          </Link>
        </li>
          </ul>
          <button type="button" className="btn btn-light btn-lg" style={{border: '2px solid #00D0C1'}}>
            <Link href='/register'>
              <a className='tempLink'
              onClick={()=> navBarDropdownStyleController('removeStyle')}
              >Get Started</a>
              </Link>
            </button>
      </div>


      {/* end of navbar full */}
    </div>
  </div>

  
</nav>
    <NavBarBorderBlueGreen height='12' />
</>
    )
}

export default Navbar
