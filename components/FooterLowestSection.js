import React from 'react'
import Link from 'next/link'; 

// component imports
import FinLendersLogo from './FinLendersLogo';
import FooterLinksNavBarStyle from './FooterLinksNavBarStyle';


const FooterLowestSection = () => {
    return (
        <React.Fragment>

<section className="px-5 pt-5 pb-4" style={{background: '#ffffff'}}>
    <div className="container">

        <FinLendersLogo />

        <FooterLinksNavBarStyle />
        
       {/* end of container */}
    </div>
    </section>




    <section className="px-5" style={{background: '#ffffff'}}>
    <div className="container">


    <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '14px', lineHeight: '21px', color: '#999999'}} >
    <i className="bi bi-info-circle-fill"></i> With P2P lending your capital is at risk. Finlenders is not covered by the Deposit Guarantee Scheme or the Investor Compensation Scheme in Ireland.
    </div>

    <div className='mt-3' style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '14px', lineHeight: '21px', color: '#999999'}} >
    Use of this website is subject to our 
    <Link href='/privacy-policy'>
        <a className='footerLink'> Privacy Policy</a>
    </Link>
    , 

    <Link href='/cookie-policy'>
        <a className='footerLink'> Cookie Policy </a>
    </Link>
    and 
    
    <Link href='/cookie-policy'>
        <a className='footerLink'> Terms of Service</a>
    </Link>
     .
     <br />
     Finlenders Ireland Limited is a Company registered in Ireland with company number 594119. Registered office Riverside One, Sir John Rogerson&apos;s Quay, Dublin 2, Ireland.
    </div>


    <div className='mt-3' style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '14px', lineHeight: '21px', color: '#999999'}} >
    Contact the Finlenders team at     
    <Link href='mailto:dimas15@gmail.com'>
        <a className='footerLink'> info@finlender.ie </a>
    </Link> 
    or call us on 
    
    <Link href='tel:+35315551234'>
        <a className='footerLink'> (01) 555 1234</a>
    </Link> 
       .
    <br />
    Finlenders ® is a registered trademark of SDD Finance Ltd. © 2022. All rights reserved.
    </div>


       {/* end of container */}
    </div>
    </section>

    {/* ****************************************************************** */}
{/* *****   EMTPTY SECTION FOR FOOTER SPACE    ****** */}
{/* ***************************************************************** */}

    <section className="p-4" style={{background: '#ffffff'}}>
    <div className="container">




       {/* end of container */}
    </div>
    </section>


        </React.Fragment>
    )
}

export default FooterLowestSection
