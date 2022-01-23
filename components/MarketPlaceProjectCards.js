import React, {useState, useEffect} from 'react';
import Link from 'next/link'; 
import NavBarBorderBlueGreen from '../components/NavBarBorderBlueGreen';
import Image from 'next/image';
import FundedRibbon from './FundedRibbon'
import ProjectGreenRibbon from './ProjectGreenRibbon'
 
const MarketPlaceProjectCards = (props) => {
 

        const {imageURL, nameOfProject, nameOfCompany, interestRateJustNumber,
            projectGrade, percentageFunded,  totalAmountAsStringNoEuroSign, projectDurationInMonthsJustTheNumber, ribbonType
        } = props.projectInfo;
 
 
        let setTimeOutSpeed = 900/percentageFunded;
        let projectNameSliced = nameOfProject.substring(0, 23) + '...'; 
        let currencyFormat = totalAmountAsStringNoEuroSign.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];

         
 
 
        const [progressFunded, setProgressFunded] = useState(0)
 
 
 
 
//********************************************************************
//          FUNCTIONS
// *******************************************************************
 
const increaseProgressTillLimit = () => {
    if(progressFunded < percentageFunded){
        setProgressFunded(progressFunded+1)
    }
}
 
 
 
 const gradeColorFunction = (grade) => {
 
            if(grade === 'A+'){
                return {background: '#00d1c1'}
            }
 
            if(grade === 'A'){
                return {background: '#00adc4'}
            }
 
            if(grade === 'B+'){
                return {background: '#0096c6'}
            }
 
            if(grade === 'B'){
                return {background: '#0096d6'}
            }
 
            if(grade === 'C+'){
                return {background: '#0077ca'}
            }
 
            if(grade === 'C'){
                return {background: '#0057a9'}
            }
 
            if(grade === 'D'){
                return {background: '#004383'}
            }
 
            if(grade === 'V'){
                return {background: '#002f69'}
            }
 
            // end of gradeColorFunction
        }
 
 
 
 
//********************************************************************
//          USE EFFECTS
// *******************************************************************
 
useEffect(()=> {
    increaseProgressTillLimit();
}, []);
 
useEffect(()=> {
 
    let timeOut = setTimeout(()=> {
        increaseProgressTillLimit();
    }, setTimeOutSpeed)
    return ()=> clearTimeout(timeOut)
 
   
}, [progressFunded])
 
 
 
//********************************************************************
//          ACTUAL HTML
// *******************************************************************
 
 
    return (
        <div>
 
        
 
        {/* start of CARD1 */}
        <div className="card shadow-dreamy mt-5 mt-lg-2" style={{position: 'relative'}}>
 
        {ribbonType === 'funded' ? <FundedRibbon /> : <ProjectGreenRibbon /> }
       
           
        <div className='marketplaceImageHolder'>
 
        <Image src={imageURL} layout="fill" alt='Dimage'></Image>
        </div>
       
        <div className="card-body px-0">
   
        <div className='text-center' style={{fontFamily: 'Lato', fontWeight: '500', color: '#4a4a4a', lineHeight: '25px', fontSize: '21px', fontStyle: 'normal'}}>{nameOfProject.length > 25 ? projectNameSliced : nameOfProject}</div>
 
 
        <div className='text-center mt-4 mx-0' style={{fontFamily: 'Lato', fontWeight: '500', color: '#999999', lineHeight: '16px', fontSize: '16px', fontStyle: 'normal', width: '100%'}}>{nameOfCompany}</div>
 
        <div className="d-flex mt-4 justify-content-around">
 
            {/* start of box1 */}
            <div className='text-center'>
                <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '14px', lineHeight: '21px', color: '#4a4a4a'}}>
                    Interest Offered</div>
 
                <div style={{fontFamily: 'Lato', fontWeight: '400', color: '#00d1c1', lineHeight: '30px', fontSize: '20px', fontStyle: 'normal'}}>
                    {interestRateJustNumber}%</div>
 
                    {/* end of box1 */}
            </div>
 
            {/* start of box2 */}
            <div className='text-center'>
 
            <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '14px', lineHeight: '21px', color: '#4a4a4a'}}>
                    Loan Grade</div>
 
            <div className='gradeDiv mt-1' style={gradeColorFunction(projectGrade)}>
                <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '700', fontSize: '12px', lineHeight: '12px', color: '#ffffff'}}>{projectGrade}</div>
            </div>
 
 
            {/* end of box2 */}
            </div>
 
 
 
            {/* end of d-flex */}
        </div>  
 
        {/* end of card body */}
        </div>
 
        <div className='percentageGrayLineOnProjectCard'>
        <NavBarBorderBlueGreen height='10' width={progressFunded}/>
        </div>
 
        <div className="d-flex justify-content-between">
 
        <div className='p-3'>
 
            <span style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '700', fontSize: '24px', lineHeight: '36px', color: '#002f69'}}>{progressFunded}%</span >
 
            <span className='ms-2' style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '12px', lineHeight: '18px', color: '#4a4a4a'}}>funded</span>
 
        </div>
 
 
        <div className='p-3'>
 
           
        <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '26px', lineHeight: '39px', color: '#002f69'}}>&euro;{currencyFormat}</div>
 
        <div className='ms-2' style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '12px', lineHeight: '18px', color: '#4a4a4a'}}>over {projectDurationInMonthsJustTheNumber} months</div>
 
 
        </div>
 
            {/* end of d-flex */}
        </div>
 
 
            {/* end of card 1 */}
            </div>
            {/* end of col 1 */}
        </div>
    )
}
 
export default MarketPlaceProjectCards
