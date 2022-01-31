import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import $ from 'jquery';



const FooterLinksNavBarStyle = () => {

    const [screenWidth, setScreenWidth] = useState(600); // this needs to work ONLOAD and on resize


    useEffect(()=> {

        $(document).ready(()=>{

            let size = $(window).width(); 
            setScreenWidth(size); 
            // end of document ready thing

            $(window).resize(()=> {
                let size2 = $(window).width(); 
                setScreenWidth(size2); 

            })
        })
    }, [])




//********************************************************************
//          586px OR bigger
// *******************************************************************

  if(screenWidth > 585){
    return (
        <>
            
        <ul className="nav">

        <li className='nav-item d-flex justify-content-start align-items-center' style={{width: '127px', height: '18px', borderRight: '1px solid #d3d3d3'}}>
            <Link href='/business-loans'>
                <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar'>Business loans</a>
            </Link>
        </li>



        <li className='nav-item d-flex justify-content-center align-items-center' style={{width: '127px', height: '18px', borderRight: '1px solid #d3d3d3'}}>
            <Link href='/invest'>
                <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Invest</a>
            </Link>
        </li>



        <li className='nav-item d-flex justify-content-center align-items-center' style={{width: '127px', height: '18px', borderRight: '1px solid #d3d3d3'}}>
            <Link href='/faq'>
                <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >FAQ</a>
            </Link>
        </li>


        <li className='nav-item d-flex justify-content-center align-items-center' style={{width: '127px', height: '18px'}}>
            <Link href='/team'>
                <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >About Us</a>
            </Link>
        </li>

            {/* end of nav */}
        </ul>


{/* ****************************************************************** */}
{/* *****   BOTTOM LINE     ****** */}
{/* ***************************************************************** */}

        <ul className="nav mt-2">


<li className='nav-item d-flex justify-content-start align-items center' style={{width: '127px', height: '18px', borderRight: '1px solid #d3d3d3'}}>
    <Link href='/terms-of-service'>
        <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Terms of Service</a>
    </Link>
</li>



<li className='nav-item d-flex justify-content-center align-items center' style={{width: '127px', height: '18px', borderRight: '1px solid #d3d3d3'}}>
    <Link href='/cookie-policy'>
        <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Cookie Policy</a>
    </Link>
</li>



<li className='nav-item d-flex justify-content-center align-items center' style={{width: '127px', height: '18px', borderRight: '1px solid #d3d3d3'}}>
    <Link href='/privacy-policy'>
        <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Privacy Policy</a>
    </Link>
</li>


<li className='nav-item d-flex justify-content-center align-items center' style={{width: '127px', height: '18px'}}>
    <Link href='/partnership'>
        <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Partnership</a>
    </Link>
</li>

    {/* end of nav */}
</ul>





        </>
    )

    // end of IF screenWidth > 585 STATEMENT
} else {

    return (

        <>

<ul className="nav flex-column">


        <li className="nav-item" style={{width: '100%', height: '30px', borderBottom: '1px solid #d3d3d3'}}>
            <Link href='/business-loans'>
                <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Business loans</a>
            </Link>
        </li>



        <li className="nav-item" style={{width: '100%', height: '30px', borderBottom: '1px solid #d3d3d3'}}>
            <Link href='/'>
                <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Invest</a>
            </Link>
        </li>



        <li className="nav-item" style={{width: '100%', height: '30px', borderBottom: '1px solid #d3d3d3'}}>
            <Link href='/faq'>
                <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999', }} className='miniFooterNavBar' >FAQ</a>
            </Link>
        </li>


        <li className="nav-item" style={{width: '100%', height: '30px', borderBottom: '1px solid #d3d3d3'}}>
            <Link href='/team'>
                <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >About Us</a>
            </Link>
        </li>

        <li className="nav-item" style={{width: '100%', height: '30px', borderBottom: '1px solid #d3d3d3'}}>
    <Link href='/terms-of-service'>
        <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Terms of Service</a>
    </Link>
</li>



<li className="nav-item" style={{width: '100%', height: '30px', borderBottom: '1px solid #d3d3d3'}}>
    <Link href='/cookie-policy'>
        <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Cookie Policy</a>
    </Link>
</li>



<li className="nav-item" style={{width: '100%', height: '30px', borderBottom: '1px solid #d3d3d3'}}>
    <Link href='/privacy-policy'>
        <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Privacy Policy</a>
    </Link>
</li>


<li className="nav-item" style={{width: '100%', height: '30px', borderBottom: '1px solid #d3d3d3'}}>
    <Link href='/partnership'>
        <a style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '12px', lineHeight: '18px', color: '#999999'}} className='miniFooterNavBar' >Partnership</a>
    </Link>
</li>













            {/* end of nav */}
        </ul>




        </>
        )
    // end of  IF ELSE statement for screenWidth > 585 STATEMENT
}









}

export default FooterLinksNavBarStyle
