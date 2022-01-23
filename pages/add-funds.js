import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from '../components/PaymentForm';

// components imports
import FooterSecureSafeTransparentSection from '../components/FooterSecureSafeTransparentSection';
import FooterLowestSection from '../components/FooterLowestSection';
import UserSessionNavBar from '../components/UserSessionNavBar';

const AddFunds = () => {

    const publicKey = 'pk_test_2NihlJ80LshbzX9QHEeF6Cj8';
    const stripeTestPromise = loadStripe(publicKey);

  return (
    <React.Fragment>
    <UserSessionNavBar/>

    <Elements stripe={stripeTestPromise}>
            <PaymentForm />
    </Elements>




    <FooterSecureSafeTransparentSection />
    <FooterLowestSection />      
    </React.Fragment>
  )
};

export default AddFunds;
