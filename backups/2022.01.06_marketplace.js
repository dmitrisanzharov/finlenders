import React from 'react';
import Link from 'next/link'; 
import Meta from '../components/Meta'; 
import Image from 'next/image'; 
import NavBarBorderBlueGreen from '../components/NavBarBorderBlueGreen'; 
import MarketPlaceProjectCards from '../components/MarketPlaceProjectCards';
import Footer from '../components/Footer';
import {useGlobal} from '../useContext'; 


const Marketplace = () => {

    const {loadingData, campaignDatabase} = useGlobal(); 

   



//********************************************************************
//          ACTUAL HTMLS
// *******************************************************************



    if(loadingData){
        return (
            <>
                        <Meta title='marketplace' keywords='invest, p2p, SME Irish Businesses' description='finlenders marketplace, see investment opportunities' />

                        <section className="p-5 text-center">
    <div className="container">

    <div className='mb-5' style={{fontFamily: 'Lato', fontWeight: '500', color: '#002f69', lineHeight: '48px', fontSize: '40px'}}>Loading, please wait... </div>
    

      {/* end of SECTION */}
      </div>
            </section>
            
            </>
        )
    }


    return (
        <>

            <Meta title='marketplace' keywords='invest, p2p, SME Irish Businesses' description='finlenders marketplace, see investment opportunities' />


{/* HEADING AND TAG LINE */}
        <section className="p-5 text-center">
    <div className="container">

    <div className='mb-5' style={{fontFamily: 'Lato', fontWeight: '500', color: '#002f69', lineHeight: '48px', fontSize: '40px'}}>Marketplace</div>

<div style={{fontFamily: 'Lato', fontWeight: '500', color: '#002f69', lineHeight: '34px', fontSize: '28px', fontStyle: 'italic'}}>Successful Irish businesses growing with Finlenders finance</div>

     

      {/* end of SECTION */}
      </div>
            </section>




{/* ****************************************************************** */}
{/* *****   PROJECTS SECTION     ****** */}
{/* ***************************************************************** */}


<section className="px-5 mt-3 mb-5">
    <div className="container" style={{fontFamily: 'Lato'}}>


    <div className="row g-5 justify-content-center">

   <Link href='/campaigns/5727-bear-sporting-events-ltd-phase-2'>
   <a className="col-12 col-lg-4" style={{maxWidth: '375px'}}>
 <MarketPlaceProjectCards projectInfo={{
     imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5727/ea5e673d-0eff-4e45-ae46-61f3d818c40b.png',
     nameOfProject: 'Bear Sporing Events Ltd Part 2',
     nameOfCompany: 'Bear Sporing Events Limited',
     interestRateJustNumber: 8.85,
     projectGrade: 'B',
     percentageFunded: 100,
     totalAmountAsStringNoEuroSign: '53,500',
     projectDurationInMonthsJustTheNumber: 18,
     ribbonType: 'funded'
 }} />
</a>
</Link>


<Link href='/campaigns/5684-halpin-complete-construction-limited'>
<a className="col-12 col-lg-4" style={{maxWidth: '375px'}}>
<MarketPlaceProjectCards projectInfo={{
     imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5684/7d8232b7-1d02-49cb-ab3b-d6ad773b34e7.png',
     nameOfProject: 'Halpin Complete Construction Limited',
     nameOfCompany: 'Halpin Complete Construction',
     interestRateJustNumber: 10.95,
     projectGrade: 'C+',
     percentageFunded: 63,
     totalAmountAsStringNoEuroSign: '32,000',
     projectDurationInMonthsJustTheNumber: 18,
     ribbonType: 'projectgreen'
 }}/>
 </a>
 </Link>


 <Link href='/campaigns/5666-laurel-lodge-nursing-home'>
<a className="col-12 col-lg-4" style={{maxWidth: '375px'}}>
<MarketPlaceProjectCards projectInfo={{
     imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5666/a866b9c7-a426-4d4e-ae0b-941a16a0e640.png',
     nameOfProject: 'Laurel Lodge Nursing Home',
     nameOfCompany: 'Laurel Lodge Nursing Home Ltd',
     interestRateJustNumber: 8.85,
     projectGrade: 'B',
     percentageFunded: 42,
     totalAmountAsStringNoEuroSign: '60,000',
     projectDurationInMonthsJustTheNumber: 36,
     ribbonType: 'funded'
 }}/>
  </a>
 </Link>

 <Link href='/campaigns/5578-gc-fitout'>
<a className="col-12 col-lg-4" style={{maxWidth: '375px'}}>
<MarketPlaceProjectCards projectInfo={{
     imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5578/f991a497-78ce-40b1-b41a-2d296d7b3a68.png',
     nameOfProject: 'GC Fitout',
     nameOfCompany: 'GC Fitout Limited',
     interestRateJustNumber: 11.6,
     projectGrade: 'C+',
     percentageFunded: 80,
     totalAmountAsStringNoEuroSign: '53,000',
     projectDurationInMonthsJustTheNumber: 24,
     ribbonType: 'projectgreen'
 }}/>
   </a>
 </Link>


 <Link href='/campaigns/5564-intrepid-spirits'>
<a className="col-12 col-lg-4" style={{maxWidth: '375px'}}>
<MarketPlaceProjectCards projectInfo={{
     imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5564/45e8bb84-7521-4c0a-8c54-54a536fcfdb3.png',
     nameOfProject: 'Intrepid Spirits',
     nameOfCompany: 'Intrepid-Spirits Limited',
     interestRateJustNumber: 8.85,
     projectGrade: 'B',
     percentageFunded: 23,
     totalAmountAsStringNoEuroSign: '53,000',
     projectDurationInMonthsJustTheNumber: 18,
     ribbonType: 'funded'
 }}/>
    </a>
 </Link>



 <Link href='/campaigns/5555-emf-controls'>
<a className="col-12 col-lg-4" style={{maxWidth: '375px'}}>
<MarketPlaceProjectCards projectInfo={{
     imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5555/9a41bf89-bb56-4af9-9d36-fcc1b3686dba.png',
     nameOfProject: 'EMF Controls',
     nameOfCompany: 'Evan Michael Fahy Controls Ltd',
     interestRateJustNumber: 8.85,
     projectGrade: 'B',
     percentageFunded: 69,
     totalAmountAsStringNoEuroSign: '75,000',
     projectDurationInMonthsJustTheNumber: 24,
     ribbonType: 'funded'
 }}/>
     </a>
 </Link>



 <Link href='/campaigns/5520-willis-steel-ltd'>
<a className="col-12 col-lg-4" style={{maxWidth: '375px'}}>
<MarketPlaceProjectCards projectInfo={{
     imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5520/991ee2ec-b0fa-49a6-87c7-19aa1fe9cd15.png',
     nameOfProject: 'Willis Steel Ltd',
     nameOfCompany: 'Willis Steel Ltd',
     interestRateJustNumber: 11.6,
     projectGrade: 'C+',
     percentageFunded: 39,
     totalAmountAsStringNoEuroSign: '54,000',
     projectDurationInMonthsJustTheNumber: 18,
     ribbonType: 'funded'
 }}/>
      </a>
 </Link>



 <Link href='/campaigns/5550-finghin-o-driscoll-solicitors'>
<a className="col-12 col-lg-4" style={{maxWidth: '375px'}}>
<MarketPlaceProjectCards projectInfo={{
     imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5550/51c643ec-5649-4ef3-947d-4ca0426ee931.png',
     nameOfProject: `Finghín O'Driscoll Solicitors`,
     nameOfCompany: `Finghín O'Driscoll Solicitors`,
     interestRateJustNumber: 11.7,
     projectGrade: 'C+',
     percentageFunded: 48,
     totalAmountAsStringNoEuroSign: '27,000',
     projectDurationInMonthsJustTheNumber: 36,
     ribbonType: 'funded'
 }}/>
       </a>
 </Link>


 <Link href='/campaigns/5471-simon-ainscough-t-a-ainscaff-scaffolding-tranche-2'>
<a className="col-12 col-lg-4" style={{maxWidth: '375px'}}>
<MarketPlaceProjectCards projectInfo={{
     imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5471/2846b14c-66db-4ceb-b992-ea59983c0d79.png',
     nameOfProject: `Simon Ainscough t/a Ainscaff Scaffolding - Tranche 2`,
     nameOfCompany: `Simon Ainscough trading...`,
     interestRateJustNumber: 8.75,
     projectGrade: 'B',
     percentageFunded: 76,
     totalAmountAsStringNoEuroSign: '44,000',
     projectDurationInMonthsJustTheNumber: 12,
     ribbonType: 'funded'
 }}/>
        </a>
 </Link>



{/* end of row */}
</div>

       {/* end of Projects section */}
    </div>
</section>


            
        </>
    )
}

export default Marketplace
