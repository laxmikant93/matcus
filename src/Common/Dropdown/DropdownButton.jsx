import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addvalue } from '../../store/actions/DynamicDropDown';

const DropdownButton = ({children, Title, ...props}) => {
    
    const [active, setActive] = useState(false);
    const [value,setValue]=useState("")
    const dispatch=useDispatch();
    const HandleState = (value) =>{
        setActive(!active)
        setValue(value)
    }
    useEffect(()=>{
      dispatch(addvalue({value:value,active:active}))
    },[active, dispatch, value])
   
  return (
    <React.Fragment>
        <button onClick={()=>HandleState(Title)} title={Title}  {...props}>{children}</button>
    </React.Fragment>
  )
}

export default DropdownButton