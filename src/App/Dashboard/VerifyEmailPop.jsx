import React from 'react';
import ModalsHeader from '../../Common/Modals/ModalsHeader';
import { Modals } from '../../Common/Modals';
import ModalsBody from '../../Common/Modals/ModalsBody';

const VerifyEmailPop = ({ VerifyEmailRef }) => {
  return (
    <React.Fragment>
      <Modals ref={VerifyEmailRef}>
        <ModalsHeader title="OTP Verification" />
        <ModalsBody>
          dcvd
        </ModalsBody>
      </Modals>
    </React.Fragment>
  )
}

export default VerifyEmailPop