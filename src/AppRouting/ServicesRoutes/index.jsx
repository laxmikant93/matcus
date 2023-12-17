import React from 'react'
import { Switch } from 'react-router-dom'
import ServicesProtectedRoutes from './ProtectedRoutes';

const ServicesRoutes = () => {

  return (
    <React.Fragment>
      <Switch>
        < ServicesProtectedRoutes />
      </Switch>
    </React.Fragment>
  )
}
export default ServicesRoutes