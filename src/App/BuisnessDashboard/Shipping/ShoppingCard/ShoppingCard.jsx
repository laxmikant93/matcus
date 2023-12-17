import React from 'react'
import Card from '../../../../Common/Card'
import CardBody from '../../../../Common/Card/CardBody';
import './shoppingCard.scss';

const ShoppingCard = ({ children }) => {
  return (
    <React.Fragment>
      <Card className={'shipping-card'}>
        <CardBody className={'card-body'}>
          {
            children
          }
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ShoppingCard