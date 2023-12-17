import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import '../Payment/initialPaymentPage.scss';
import FormInput from '../../../../Common/Form/FormInput';
import { createRazorPayAccount } from '../../../../store/actions/ecommerce/action/cartOrder';

const CreateAccount = () => {

  const dispatch = useDispatch();

  useEffect(() => {},[]);

  const createRazorPayAccountHandler = () => {
    dispatch(createRazorPayAccount());
  };

  return (
   <React.Fragment>
    <div className='containerTrue mt-24'>
      
      <div className='paymentPage-container'>
        <div className='paymentPage-wrap'>
        <form action="">
          <p>Create your RazorPay Account</p>
          <div className="formFieldwrap">
          <FormInput type="text" placeholder="Name"  />
          </div>
          <div className="formFieldwrap">
          <FormInput type="text" placeholder="Name"  />
          </div>
          <button className='buttonTrue btnTrue-primary' onClick={createRazorPayAccountHandler}>Create Account</button>
        </form>
        </div>
  
      </div>
   
    </div>
   </React.Fragment>
  )
}

export default CreateAccount;