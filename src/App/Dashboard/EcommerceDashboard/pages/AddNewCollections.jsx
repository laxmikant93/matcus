import React, { useEffect } from 'react';
import "./AddNewCollection.scss";

const AddNewCollections = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="addnewCollection-container">
      {/* <div className='PHT-CreateMenu border-bottom'>
        <div>
          <h1>Products</h1>
          <p>Manage your products online in minutes. </p>
        </div> 

      <div className="PTH-Item">
        <AppLink
          to={`/`}
          className="button button-primary"
        >Add Menu
        </AppLink>
        
      <button className="button button-primary btn-sm">Add Products</button>
    </div>
    </div >
    */}
      < div className="foodmenu-wrapper" >
        <button type='button' className='drapbutton'>
          <i className='ed-icon icon-plus-add primary  i-xs mr-2'></i>
          Add a new Collection
        </button>
      </div >
    </div >
  )
}

export default AddNewCollections