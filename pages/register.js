//! Margin top on input fields is set to 4; 


// NPM and other imports
import React, {useState, useEffect} from 'react'
import Link from 'next/link'; 
import $ from 'jquery'
import {useGlobal} from '../useContext';
import { TiTick } from 'react-icons/ti';
import {ImEnter} from 'react-icons/im'; 
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'; 
import { GoogleLogin } from 'react-google-login';



// componetn imports
import UpAndDownArrowIcon from '../components/UpAndDownArrowIcon'
import RegistrationSelectTypeDropDown from '../components/RegistrationSelectTypeDropDown'


const Register = () => {


//********************************************************************
//          STATE CONTROLS
// *******************************************************************

    const [showDropDown, setShowDropDown] = useState(false); 

    const [mainPasswordFieldTypeSetToPassword, setMainPasswordFieldTypeSetToPassword] = useState(true); 

    const [confirmPasswordFieldTypeSetToPassword, setConfirmPasswordFieldTypeSetToPassword] = useState(true); 

    const [firstName, setFirstName] = useState(''); 
    const [firstNameWarning, setFirstNameWarning] = useState(false); 

    const [lastName, setLastName] = useState('');
    const [lastNameWarning, setLastNameWarning] = useState(false); 

    const [email, setEmail] = useState(''); 
    const [emailWarning, setEmailWarning] = useState(false); 
    const [pleaseEnterValidEmailWithAtSymbolWarning, setPleaseEnterValidEmailWithAtSymbolWarning] = useState(false)

    const [passwordMain, setPasswordMain] = useState('');
    const [showPasswordHint, setShowPasswordHint] = useState(false); 
    const [passwordMainWarning, setPasswordMainWarning] = useState(false);

    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmWarning, setPasswordConfirmWarming] = useState(false); 
    const [passwordsDidNotMatch, setPasswordsDidNotMatch] = useState(false);
    const [passwordIsToWeakWarning, setPasswordIsToWeakWarning] = useState(false); 

    const [captchaDone, setCaptchaDone] = useState(false);
    const [pleaseDoCaptchaMessage, setPleaseDoCaptchaMessage] = useState(false); 
    
    // useGlobal States
    const {
    pageOriginURL,
    registrationPageDropDownSelection, 
    registrationPageInvestAsBorderControl, setRegistrationPageInvestAsBorderControl, 
    expressServerURL, registrationCompleted, setRegistrationCompleted
    } = useGlobal(); 


//********************************************************************
//          FUNCTIONS
// *******************************************************************

const handleClick = (e) => {

    if(e.target.id === 'selectTypeDropDown'){
        setShowDropDown(true)
    } else if (e.target.id === 'passWord'){
        setShowPasswordHint(true); 
    }   
    
    else {
        setShowDropDown(false); 
        setShowPasswordHint(false); 
    }

}

const borderColorForInvestAs = (test) => {
    if(test === 'default'){
        return '1px solid lightgray'
    }

    if(test === 'red'){
        return '1px solid #e04B59'
    }

    if (test === 'green'){
        return '1px solid #28a745'
    }
}

const passwordStrengthCheckingFunction = () => {
    if(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(passwordMain)){
        return true;
    }
    return false; 
}


const captchaValidationFunction = (token) => {
    setCaptchaDone(true);
    setPleaseDoCaptchaMessage(false); 
}


const handleSubmit = async () => {

try{
  
if(registrationPageDropDownSelection === 'Select type'){
    setRegistrationPageInvestAsBorderControl('red');
    return;
}

if(firstName.length < 1){
    setFirstNameWarning(true);
    return;
}

if(lastName.length < 1){
    setLastNameWarning(true);
    return; 
}

if(email.length < 1){
    setEmailWarning(true);
    return; 
}

if(!/@/g.test(email) && email.length > 1){
    setPleaseEnterValidEmailWithAtSymbolWarning(true);
    return;
}

if(passwordMain.length < 1){
    setPasswordMainWarning(true);
    return;
}

if(passwordConfirm.length < 1){
    setPasswordConfirmWarming(true);
    return;
}

if(passwordMain !== passwordConfirm && passwordConfirm.length > 1){
    setPasswordsDidNotMatch(true);
    return;
} 

if(!passwordStrengthCheckingFunction() && passwordMain.length > 1){
    setPasswordIsToWeakWarning(true);
    return; 
} else {
    setPasswordIsToWeakWarning(false);
}

if(!captchaDone){
    setPleaseDoCaptchaMessage(true);
    return; 
}



// CAN REGISTER NOW, ALL IS GOOD

setRegistrationCompleted(true); 

let postDataToServer = await axios.post(`${expressServerURL}/register-new-user`, {
    firstName,
    lastName,
    email,
    passwordMain,
});

let replyFromServer = await postDataToServer.data;
console.log("replyFromServer: ", replyFromServer);



} catch(error){
    console.log(error);
}  


    // end of handle Submit
}

const responseGoogleSignUpButton = async (response) => {
    try{
        setRegistrationCompleted(true); 

        let postDataToServer = await axios.post(`${expressServerURL}/register-new-user`, {
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email,
            googleId: response.profileObj.googleId
        });

        let replyFromServer = await postDataToServer.data;
        console.log("replyFromServer: ", replyFromServer);



    } catch(error){
        console.log(error)
    }


    // end of responseGoogleSignUpButton
  }


//********************************************************************
//          USE EFFECTS
// *******************************************************************

useEffect(()=> {
    $(document).ready(()=> {
        $('#firstName').focus();
    })
}, [])

useEffect(()=> {
    if(firstName.length > 0){
        setEmailWarning(false);
    }
}, [firstName]);

useEffect(()=> {
  if(registrationCompleted){

    let timeOut = setTimeout(()=> {
        window.location.href = `${pageOriginURL}/`; 
    }, 2000)
    return () => clearTimeout(timeOut); 
  } 
}, [registrationCompleted])




//********************************************************************
//          ACTUAL HTML
// *******************************************************************

if(registrationCompleted){
    return (
        <React.Fragment>

        <div className="registrationPageWrapper p-md-5">
        <form className='registrationPageFormBox px-3 pt-5 p-md-5 pb-5'>

            <div className="registerFormHeader text-center mb-4 p-0">
            Thank you for registering. <br />
            You will be directed to Marketplace in a moment.
            </div>

            <div className='d-flex justify-content-center align-items-center'>
            <div className="registerPageLoadingSpinner"></div>
            </div>

        </form>
        </div>
        </React.Fragment>
    )
    // end of registrationComplete HTML
}




return (

<div className='registrationPageWrapper p-md-5' 
onClick={e=> handleClick(e)}
>

<form className='registrationPageFormBox px-3 pt-5 p-md-5'>

<div className="registerFormHeader text-center mb-5 p-0">
Join today and start investing in minutes.
</div>


{/* ****************************************************************** */}
{/* *****   Sign up with GOOGLE SECTION     ****** */}
{/* ***************************************************************** */}

{/* <section className="">
<div className="container">

<div className="d-flex justify-content-center align-items-center">
<GoogleLogin 
      clientId="1031087847528-cfu81r2r8bvtje22lc19p89s5khfkm7j.apps.googleusercontent.com"
      buttonText="Sign Up with Google"
      onSuccess={responseGoogleSignUpButton}
      onFailure={responseGoogleSignUpButton}
      cookiePolicy={'single_host_origin'}
  />
</div>


<div className="d-flex justify-content-center align-items-center my-4 mb-md-2">
    <span style={{textDecoration: 'line-through', color: '#777777'}}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>

    <span className='registerWithGoogleOrHorizontalLineSeparator labelInRegistrationForm text-center'>
    &nbsp; OR register by filling in the form &nbsp;
    </span>

    <span style={{textDecoration: 'line-through', color: '#777777'}}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
</div>



</div>
</section> */}


{/* ****************************************************************** */}
{/* *****   INVEST AS Section     ****** */}
{/* ***************************************************************** */}

<section>
<div className="container p-0">



            <label htmlFor="investAs" className='labelInRegistrationForm'>Invest as</label>

            <div style={{position: 'relative'}}>

            <div className='d-flex justify-content-between align-items-center p-2' id='selectTypeDropDown' 
            style={{border: borderColorForInvestAs(registrationPageInvestAsBorderControl), background: 'white'}}
            >

                <div className='selectType'>
                    {registrationPageDropDownSelection}
                </div>


                {/* Warning icon */}
                {registrationPageInvestAsBorderControl === 'red' && <i className="bi bi-exclamation-circle-fill" style={{marginLeft: 'auto', color: '#e04B59'}}></i>}

                {/* Correct icon */}
                {registrationPageInvestAsBorderControl === 'green' 
                && 
                <span style={{marginLeft: 'auto', color: '#28a745', transform: 'scale(1.5)'}}><TiTick /></span>
                
                }

                <div className='ms-1'>

                    <UpAndDownArrowIcon  />                   
                   
                </div>

            </div>

            {showDropDown && <RegistrationSelectTypeDropDown />}

            {registrationPageInvestAsBorderControl === 'red' && <div className='registrationPageWarningText pt-1'>Please select lender type</div>}


        </div>
        </div>
</section>

{/* ****************************************************************** */}
{/* *****   First name and Second name SECTION     ****** */}
{/* ***************************************************************** */}


<section className="mt-4">
<div className="container">


<div className="row">


{/*    FIRST NAME INPUT */}
  <div className="col-12 col-md-6 p-0">
    <div className="d-flex flex-column pe-md-3">


        {/* correct icon */}
        {firstName.length > 0 && <div style={{position: 'relative'}}>
            <span style={{marginLeft: 'auto', color: '#28a745', transform: 'scale(1.5)', position: 'absolute', right: '20px', top: '25px', zIndex: '1000'}}><TiTick /></span>
        </div>
        }

        {/* Warning icon */}
        {firstNameWarning && <div style={{position: 'relative'}}>
            <span style={{marginLeft: 'auto', color: '#e04B59', position: 'absolute', right: '17px', top: '27px', zIndex: '1000'}}><i className="bi bi-exclamation-circle-fill"></i></span>
        </div>
        }




    <label htmlFor="firstName" className='labelInRegistrationForm ps-0'>
        First name
   </label>

   <div className='' style={{position: 'relative'}}>

    <input type="text" id='firstName' className='registrationFormInput p-2' value={firstName} onChange={e=> {setFirstName(e.target.value); setFirstNameWarning(false);}} placeholder='Enter your first name' 
    style={firstName.length > 0 ? {border: '1px solid #28a745', width: '100%'} 
    : 
    firstNameWarning ? {border: '1px solid #e04B59', width: '100%'}
    :
    {width: '100%'}} 
    />

    {firstNameWarning &&
        <div className='registrationPageWarningText pt-1'>Please enter your first name</div>
        }


    </div>

    </div>
    </div>


{/* SECOND NAME INPUT */}
    <div className="col-12 col-md-6 p-0 mt-3 mt-md-0">
    <div className="d-flex flex-column ps-md-3">



        {lastName.length > 0 && <div style={{position: 'relative'}}>
            <span style={{marginLeft: 'auto', color: '#28a745', transform: 'scale(1.5)', position: 'absolute', right: '20px', top: '25px', zIndex: '1000'}}><TiTick /></span>
        </div>
        }

        {/* Warning icon */}
        {lastNameWarning && <div style={{position: 'relative'}}>
            <span style={{marginLeft: 'auto', color: '#e04B59', position: 'absolute', right: '17px', top: '27px', zIndex: '1000'}}><i className="bi bi-exclamation-circle-fill"></i></span>
        </div>
        }
       

    <label htmlFor="lastName" className='labelInRegistrationForm ps-0'>
        Last name
   </label>


   <div className='' style={{position: 'relative'}}>

    <input type="text" id='lastName' className='registrationFormInput p-2' value={lastName} onChange={e=> {setLastName(e.target.value); setLastNameWarning(false)}} placeholder='Enter your last name' 
    style={lastName.length > 0 ? {border: '1px solid #28a745', width: '100%'} 
    : 
    lastNameWarning ? {border: '1px solid #e04B59', width: '100%'}
    :
    {width: '100%'}}  
    />

    {lastNameWarning &&
        <div className='registrationPageWarningText pt-1'>Please enter your last name</div>
        }


    </div>


    </div>
    </div>


{/* end of row */}
</div>
{/* end of container */}
</div>
</section>


{/* ****************************************************************** */}
{/* *****   EMAIL SECTION     ****** */}
{/* ***************************************************************** */}

<section className="mt-4">
<div className="container p-0">


 
    <div className="d-flex flex-column">

        {/@/g.test(email) && <div style={{position: 'relative'}}>
            <span style={{marginLeft: 'auto', color: '#28a745', transform: 'scale(1.5)', position: 'absolute', right: '20px', top: '25px', zIndex: '1000'}}><TiTick /></span>
        </div>
        }

        {/* Warning icon */}
        {emailWarning || pleaseEnterValidEmailWithAtSymbolWarning && <div style={{position: 'relative'}}>
            <span style={{marginLeft: 'auto', color: '#e04B59', position: 'absolute', right: '17px', top: '27px', zIndex: '1000'}}><i className="bi bi-exclamation-circle-fill"></i></span>
        </div>
        }

    <label htmlFor="email" className='labelInRegistrationForm ps-0'>
        Email
   </label>


<div className='' style={{position: 'relative'}}>

    <input type="email" id='email' className='registrationFormInput p-2' value={email} onChange={e=> {setEmail(e.target.value); setEmailWarning(false); setPleaseEnterValidEmailWithAtSymbolWarning(false)}} placeholder='Your E-Mail' style={/@/g.test(email) ? {border: '1px solid #28a745', width: '100%'} : {width: '100%'}} />
    </div>

    {emailWarning &&
        <div className='registrationPageWarningText pt-1'>Please enter your email</div>
        }

    {pleaseEnterValidEmailWithAtSymbolWarning && 
        <div className='registrationPageWarningText pt-1'>Please enter valid email with @ symbol</div>
    }


</div>

</div>
</section>



{/* ****************************************************************** */}
{/* *****   PASSWORDS SECTION     ****** */}
{/* ***************************************************************** */}

<section className="mt-4">
<div className="container">


<div className="row">


{/*    PASSWORD MAIN INPUT */}
  <div className="col-12 col-md-6 p-0">
    <div className="d-flex flex-column pe-md-3">
        {passwordStrengthCheckingFunction() && <div style={{position: 'relative', zIndex: '100'}}>
            <span style={{marginLeft: 'auto', color: '#28a745', transform: 'scale(1.5)', position: 'absolute', right: '20px', top: '25px'}}><TiTick /></span>
        </div>
         }

         <div style={{position: 'relative', zIndex: '100'}}>
         <span className='showHideButtonOnInputInRegistration' style={{marginLeft: 'auto', position: 'absolute', right: '45px', top: '29px', cursor: 'pointer'}} onClick={()=> setMainPasswordFieldTypeSetToPassword(!mainPasswordFieldTypeSetToPassword)}>

            {mainPasswordFieldTypeSetToPassword ? 'Show' : 'Hide'}

         </span>

         </div>

    <label htmlFor="passWord" className='labelInRegistrationForm ps-0'>
        Password
   </label>



   <div className='' style={{position: 'relative'}}>

 

        <input 
        type={mainPasswordFieldTypeSetToPassword ? 'password' : 'text'}
        id='passWord' className='registrationFormInput p-2' value={passwordMain} onChange={e=> {
            setPasswordMain(e.target.value); 
            setPasswordMainWarning(false);
            setPasswordIsToWeakWarning(false);
        }}    
        placeholder='Enter a password' style={passwordStrengthCheckingFunction() ? {border: '1px solid #28a745', width: '100%'} : {width: '100%'}}/>

        {showPasswordHint && !passwordStrengthCheckingFunction() && 
        <div className='registrationPageWarningTextBlue pt-1'>Must have at least six characters, one upper case, one lower case and numeric character</div>
        }

        {passwordMainWarning && 
        <div className='registrationPageWarningText pt-1'>Please enter password</div>
        }  
        
        {passwordIsToWeakWarning &&  <div className='registrationPageWarningText pt-1'>Password is too weak, password must have at least six characters, one upper case, one lower case and numeric character
        </div>} 


    </div>
    </div>
    </div>


{/* CONFIRM PASSWORD INPUT */}
    <div className="col-12 col-md-6 p-0 mt-3 mt-md-0">

    <div className="d-flex flex-column ps-md-3">
        {passwordConfirm === passwordMain && passwordMain !== '' && <div style={{position: 'relative'}}>
            <span style={{marginLeft: 'auto', color: '#28a745', transform: 'scale(1.5)', position: 'absolute', right: '20px', top: '25px', zIndex: '1000'}}><TiTick /></span>
        </div>
        }

        <div style={{position: 'relative', zIndex: '100'}}>
         <span className='showHideButtonOnInputInRegistration' style={{marginLeft: 'auto', position: 'absolute', right: '45px', top: '29px', cursor: 'pointer'}} onClick={()=> setConfirmPasswordFieldTypeSetToPassword(!confirmPasswordFieldTypeSetToPassword)}>

            {confirmPasswordFieldTypeSetToPassword ? 'Show' : 'Hide'}

         </span>

         </div>

    <label htmlFor="passwordConfirm" className='labelInRegistrationForm ps-0'>
        Last name
   </label>

        <div style={{position: 'relative'}}>

        <input type={confirmPasswordFieldTypeSetToPassword ? 'password' : 'text'} id='passwordConfirm' className='registrationFormInput p-2' value={passwordConfirm} onChange={e=> {setPasswordConfirm(e.target.value); setPasswordConfirmWarming(false); setPasswordsDidNotMatch(false);}} placeholder='Confirm your password' style={passwordConfirm === passwordMain && passwordMain !== '' ? {border: '1px solid #28a745', width: '100%'} : {width: '100%'}}/>
        </div>

        {passwordConfirmWarning && 
        <div className='registrationPageWarningText pt-1'>Please confirm your password</div>
        } 

        {passwordsDidNotMatch && 
        <div className='registrationPageWarningText pt-1'>Confirm password did not match</div>}


        </div>
    </div>


{/* end of row */}
</div>
{/* end of container */}
</div>
</section>


{/* ****************************************************************** */}
{/* *****   Communication Preferences Section    ****** */}
{/* ***************************************************************** */}


<section className="mt-4">
<div className="container p-0">

<div className="communicationPreferencesText">
Communication Preferences
</div>

<div className='d-flex justify-content-start align-items-center mt-2'>
<input type="checkbox" id='agreeToEmailUpdates'/>
<label htmlFor="agreeToEmailUpdates" className='labelInRegistrationForm ms-2'>
I agree to receive news periodically from Flender via email.</label>
</div>


<div className='d-flex justify-content-start align-items-center mt-2'>
<input type="checkbox" id='agreeToInvestmentUpdates'/>
<label htmlFor="agreeToInvestmentUpdates" className='labelInRegistrationForm ms-2'>
I agree to receive investment updates periodically from Flender.</label>
</div>

{/* end of container */}
</div>
</section>


{/* ****************************************************************** */}
{/* *****   CAPTCHA SECTION     ****** */}
{/* ***************************************************************** */}


<section className="mt-4">
<div className="container p-0">

<div className='d-flex justify-content-center align-items-center'>
<ReCAPTCHA
        sitekey={process.env.GOOGLE_SITE_KEY}
        onChange={captchaValidationFunction}
      />
</div>

{pleaseDoCaptchaMessage &&
    <div className='registrationPageWarningText pt-1 text-center'>Please complete the captcha</div>
}


{/* end of container */}
</div>
</section>


{/* ****************************************************************** */}
{/* *****   SIGN UP BUTTON AND TERMS SECTION     ****** */}
{/* ***************************************************************** */}

<section className="mt-4">
<div className="container p-0">

<div className='d-flex flex-column justify-content-center align-items-center'>


<button type='button' className='registrationFormSignUpButton' onClick={handleSubmit}>Sign up</button> 


<div className="px-3 pt-2">
    <div className="bySubmittingThisFormYouAgreeToTermsText text-center">
    By submitting this form you agree to the Terms of Use and Privacy of our website.
    </div>
</div>


<div className="px-3 pt-4">
<Link href='/sign-in'>
<a className="iAlreadyHaveAnAccountText text-center">
<ImEnter /> Already Have an account? Sign in
</a>
</Link>
</div>

</div>
{/* end of container */}
</div>
</section>




{/* THIS IS JUST TO CREATE SPACE ON THE BOTTOM OF THE FORM, REMOVE LATER */}

    <section className="p-5 p-md-3">
        <div className="container">
            
       {/* end of container */}
    </div>
    </section>




        {/* end of form */}
        </form>



        {/* end of .registrationPageWrapper */}
        </div>
    )
}

export default Register
