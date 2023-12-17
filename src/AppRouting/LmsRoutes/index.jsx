import React from 'react';
import { Route,Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import PageNotFound from '../../Common/PageNotFound/PageNotFound';
// import TemplateRoutes from '../TemplateRoutes';

const LMSRoutes = () => {

  return (
    <Routes>
        <Route path='/*' element={<PublicRoutes/>}/>
         <Route path='/*' element={<ProtectedRoutes/>}/>
        <Route path="*" component={<PageNotFound/>} />

    </Routes>
  )
}
export default LMSRoutes