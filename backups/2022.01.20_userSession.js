import React, {useEffect, useState} from 'react';
import {useGlobal} from '../useContext'; 
import {useRouter} from 'next/router'; 
import axios from 'axios'; 
import Link from 'next/link';
import { AiTwotonePieChart } from 'react-icons/ai';


// component imports
import FooterSecureSafeTransparentSection from '../components/FooterSecureSafeTransparentSection';
import FooterLowestSection from '../components/FooterLowestSection';
import UserSessionNavBar from '../components/UserSessionNavBar';
import GeneralLoadingPleaseWaitComponent from '../components/GeneralLoadingPleaseWaitComponent'


const UserSession = () => {



    const router = useRouter(); 

    const {
        setNoUserIdSoRedirectToSigninPage, pageOriginURL, expressServerURL,
    } = useGlobal(); 

    const [loadingIsVisible, setLoadingIsVisible] = useState(true); 
    const [userDataLoaded, setUserDataLoaded] = useState({loaded: false});


//********************************************************************
//          FUNCTIONS
// *******************************************************************


const fetchUserData = async () => {

    let userIDfromSessionStorage = sessionStorage.finLendersUserDataId;

    let request = await axios.post(`${expressServerURL}/user-session-single-user`, {userId: userIDfromSessionStorage});
    let responds = await request.data;
    console.log("responds: ", responds[0]);
    setUserDataLoaded(responds[0]); 

    setUserAvailableBalance(
        responds[0].totalDeposits - responds[0].totalInvestments - responds[0].totalWithdrawals
    ); 

    sessionStorage.userBalance = responds[0].totalDeposits - responds[0].totalInvestments - responds[0].totalWithdrawals; 


// end of fetchUserData(); 
}



//********************************************************************
//          useEffects
// *******************************************************************    

useEffect(()=> {
    let userID = sessionStorage.finLendersUserDataId;

    if(!userID){
        setNoUserIdSoRedirectToSigninPage(true); 
        router.push('/sign-in');
        return;
    } 

    setLoadingIsVisible(false); 
    fetchUserData(); 

}, [])



//********************************************************************
//          HTML data
// *******************************************************************

if(loadingIsVisible){
    return (
        <div></div>
    )
}

if(!userDataLoaded){
    return (
        <GeneralLoadingPleaseWaitComponent textToDisplay={'Loading please wait!'} />
    )
}

// ! this is MAIN HTML
// ! this is MAIN HTML
// ! this is MAIN HTML


return (
        <React.Fragment>
        <UserSessionNavBar/>


{/* ****************************************************************** */}
{/* *****   Welcome to Flenders SECTION     ****** */}
{/* ***************************************************************** */}


<section className="">
<div className="container p-4">

<div className="welcomeToFlendersUserSessionText text-center text-md-start col-12 col-md-6 col-lg-5 col-xl-4">
Welcome back to Finlenders!
</div>
<div className="welcomeToFlendersUserSessionText text-center text-md-start">
{userDataLoaded.firstName} {userDataLoaded.lastName}
</div>

<div className='pt-2 text-center text-md-start col-12 col-md-6 col-lg-5 col-xl-3' style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '14px', lineHeight: '21px', color: '#999999'}} >
Here is your unique reference when making credit transfers: &nbsp; 

    <span style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '700', fontSize: '14px', lineHeight: '21px', color: '#00d1c1'}} >
    {userDataLoaded.finleandersId}
    </span>


</div>

{/* end of container */}
</div>
</section>


{/* ****************************************************************** */}
{/* *****   My account information SECTION     ****** */}
{/* ***************************************************************** */}

<section className="">
<div className="container">

{/* start of the COL-12 BOX that holds all information on deposits, investments and available balance and add funds and view transctions reports */}

<div className="col-12 col-md-6 col-lg-5 col-xl-4 shadow-dreamy-no-hover p-3 mb-5">

{/* this div holds My account and PieChart icon */}
<div className="d-flex justify-content-start align-items-center" style={{borderBottom: '2px solid #E5E5E5'}}>

<div className='me-2'>
<h4 style={{color: '#00d1c1'}}><AiTwotonePieChart /></h4>
</div>

<div className='mb-0 pb-0' style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '700', fontSize: '16px', lineHeight: '24px', color: '#0077c8'}} >
 My Account
</div>

</div>


{/* THIS DIV HOLDS Total Deposits and Bonus Reveived information */}

<div className="d-flex mt-3">

    {/* this is total deposits and invested BOX */}
    <div className="d-flex flex-column w-50">

        <div className="totalDepositTextStyle mt-2">
            Total Deposit
        </div>

        <div className="totalDepositTextStyle mt-2">
            Total Invested
        </div>

        <div className="totalDepositTextStyle mt-2">
            Available Balance
        </div>

    </div>

    {/* this is Amounts box */}

    <div className="d-flex flex-column w-50">

        <div className="totalDepositTextStyle mt-2 text-end">
        €{userDataLoaded.totalDeposits === 0 ? '0.00' : userDataLoaded.totalDeposits}
        </div>

        <div className="totalDepositTextStyle mt-2 text-end">
        €{userDataLoaded.totalInvestments === 0 ? '0.00' : userDataLoaded.totalInvestments}
        </div>

        <div className="totalDepositTextStyle mt-2 text-end">
        €{(userDataLoaded.totalDeposits - userDataLoaded.totalInvestments) === 0 ? '0.00' : userDataLoaded.totalDeposits - userDataLoaded.totalInvestments}
        </div>

    </div>

</div>


{/* START OF ADD FUNDS AND MAKE INVESTMENT BUTTONS */}

<div className="d-flex flex-column mt-5">

{/* add funds button */}
<div className="p-2 loginFormLoginButton w-100" style={{cursor: 'pointer'}}>
    <Link href='/add-funds'>
    <div className='addFundsButtonText text-center'>
        Add Funds
    </div>
    </Link>
</div>

{/* make an investment button */}
<div className="p-2 loginFormLoginButton mt-3 w-100" style={{cursor: 'pointer'}}>
    <div className='addFundsButtonText text-center'>
        Make An Investment
    </div>
</div>

{/* view transactions button */}
<div className="p-2 mt-3 mb-4 loginBackButton w-100" style={{cursor: 'pointer'}}>
    <Link href='/transactions-reports'>
    <div className='viewTransactionReportsText text-center'>
        View Transaction Reports
    </div>
    </Link>
</div>





{/* end of ADD FUNDS AND MAKE INVESTMENT BUTTONS */}
</div>


{/* end of the COL-12 BOX that holds all information on deposits, investments and available balance and add funds and view transctions reports  */}
</div>


{/* end of container */}
</div>
</section>






        <FooterSecureSafeTransparentSection />
        <FooterLowestSection />


        </React.Fragment>
    )
}

export default UserSession
