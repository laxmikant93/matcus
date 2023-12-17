import React from 'react'
import Dropdown from './Dropdown'
import DropdownButton from './DropdownButton'
import styled from 'styled-components';

const DropdownWrapper = styled.div`

`;
const DropdownContainer = ({WrapperClass, children}) => {
  return (
    <DropdownWrapper className={`${WrapperClass}`}>
        {children}
    </DropdownWrapper>
  )
}

export default DropdownContainer