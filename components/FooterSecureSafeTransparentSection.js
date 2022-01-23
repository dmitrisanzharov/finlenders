import React from 'react'; 
import Image from 'next/image'; 

const FooterSecureSafeTransparentSection = () => {
    return (
        <React.Fragment>
            
            <section className="p-5" style={{background: '#EEEEEE'}}>
    <div className="container">


   <div className="row">



    {/* Secure Box */}
    <div className="col-md-4 col-12 d-flex flex-column justify-content-center align-items-center text-center">
    
    <div className='mt-3'>
    <Image src='/images/secureLockImage.png' width='66px' height='66px' className='d-block' alt='Dimage'/>
    </div>

    <div style={{fontFamily: 'Lato', fontWeight: '400', color: '#002f69', lineHeight: '45px', fontSize: '30px', fontStyle: 'normal'}} className='mt-3'>
        Secure
    </div>

    <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '16px', lineHeight: '24px', color: '#212529', maxWidth: '300px'}} className='my-3'>
    Your data is protected and GDPR compliant
    </div>

{/* end of Secure box */}
    </div>


        {/* Safe Box */}
        <div className="col-md-4 col-12 mt-4 mt-md-0 d-flex flex-column justify-content-center align-items-center text-center">
    
    <div className='mt-4'>
    <Image src='/images/safeshieldicon.png' width='66px' height='66px' className='d-block' alt='Dimage'/>
    </div>

    <div style={{fontFamily: 'Lato', fontWeight: '400', color: '#002f69', lineHeight: '45px', fontSize: '30px', fontStyle: 'normal'}} className='mt-3'>
        Safe
    </div>

    <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '16px', lineHeight: '24px', color: '#212529', maxWidth: '300px'}} className='mt-3'>
    Your data is safe and checking your eligibility for a Flender loan won&apos;t affect your credit score
    </div>

{/* end of Safe box */}
    </div>



        {/* Transparent Box */}
        <div className="col-md-4 col-12 mt-5 mt-md-0 d-flex flex-column justify-content-center align-items-center text-center">
    
    <div className='mt-0'>
    <Image src='/images/transparentMagnifyingGlassIcon.png' width='66px' height='66px' className='d-block' alt='Dimage'/>
    </div>

    <div style={{fontFamily: 'Lato', fontWeight: '400', color: '#002f69', lineHeight: '45px', fontSize: '30px', fontStyle: 'normal'}} className='mt-3'>
    Transparent
    </div>

    <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '16px', lineHeight: '24px', color: '#212529', maxWidth: '300px'}} className='mt-3'>
    Our rates and fees are clear
    </div>

{/* end of Transparent box */}
    </div>

    {/* end of ROW */}
   </div> 

       {/* end of container */}
    </div>
    </section>



        </React.Fragment>
    )
}

export default FooterSecureSafeTransparentSection
