import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const DropdownListWrapper = styled.div`

`;

const Dropdown = ({WrapperClass, children, Title, State}) => {
    const {dynamicdropdownValue,dynamicdropdownActive}=useSelector((state)=>{
        return{
            dynamicdropdownValue:state.dynamicdropdown.dropdowntitle.value,
            dynamicdropdownActive:state.dynamicdropdown.dropdowntitle.active
        }
    });
    console.log(dynamicdropdownValue===Title && dynamicdropdownActive ,dynamicdropdownValue,Title,dynamicdropdownActive)
  return (
    <React.Fragment>
    {dynamicdropdownValue===Title && dynamicdropdownActive &&
    <DropdownListWrapper className={`${WrapperClass}`} title={Title}>
      {children}
  </DropdownListWrapper>}
  </React.Fragment>
  )
}

export default Dropdown