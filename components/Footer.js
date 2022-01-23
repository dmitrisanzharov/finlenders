import React, {useState} from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import FinLendersLogo from './FinLendersLogo';
import FooterLinksNavBarStyle from './FooterLinksNavBarStyle'; 
import FooterSecureSafeTransparentSection from './FooterSecureSafeTransparentSection'; 
import FooterLowestSection from './FooterLowestSection';


const Footer = () => {

    const [showWhite, setShowWhite] = useState(false); 
    const [showWhiteP2PIcon, setShowWhiteP2PIcon] = useState(false); 



//********************************************************************
//          FUNCTIONS 
// *******************************************************************    


const mouseON = () => {
    setShowWhite(true);
}


const mouseOUT = () => {
    setShowWhite(false); 
}


const mouseONshowWhiteP2PIcon = () => {
    setShowWhiteP2PIcon(true)
}

const mouseOUTshowWhiteP2PIcon = () => {
    setShowWhiteP2PIcon(false)
    
}



//********************************************************************
//          ACTUAL HTML
// *******************************************************************


    return (
        <>

{/* ****************************************************************** */}
{/* *****   SECURE - SAFE -TRANSPARENT SECTION     ****** */}
{/* ***************************************************************** */}

    <FooterSecureSafeTransparentSection />



{/* ****************************************************************** */}
{/* *****   Flenders in Media SECTION     ****** */}
{/* ***************************************************************** */}


    <section className="p-5" style={{background: '#002F69'}}>
    <div className="container text-center">


    <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontSize: '36px', lineHeight: '43.2px', color: '#dddddd', letterSpacing: '-1.45px'}} >
    Finledners in the media
    </div>



    <div className='d-flex flex-column flex-sm-row justify-content-center align-items-center mt-3'>


        <div className="d-flex justify-content-center align-items-center me-4" style={{width: '220px', height: '180px', cursor: 'pointer'}} onMouseOver={mouseON} onMouseLeave={mouseOUT}>
        
        {showWhite ? 
        <div><Image src='/images/businessWorldWhite.png' width='163px' height='25px' alt=''></Image>  </div>  
        : <div><Image src='/images/businessWorldBlue.png' width='163px' height='25px' alt=''></Image></div>
    
        }


        </div>



        <div className="d-flex justify-content-center align-items-center" style={{width: '220px', height: '180px', cursor: 'pointer'}} onMouseOver={mouseONshowWhiteP2PIcon} onMouseLeave={mouseOUTshowWhiteP2PIcon}>
        
        {showWhiteP2PIcon ? 
        <div><Image src='/images/p2pWhiteIcon.png' width='138px' height='46px' alt='Dimage'></Image>  </div>  
        : <div><Image src='/images/p2pBlueIcon.png' width='138px' height='46px' alt='Dimage'></Image></div>
    
        }


        </div>
        

        {/* end of d-flex */}
    </div>

       {/* end of container */}
    </div>
    </section>

{/* ****************************************************************** */}
{/* *****   LOWER FOOTER SECTION     ****** */}
{/* ***************************************************************** */}

<FooterLowestSection />


            
        </>
    )
}

export default Footer
