import React from 'react'
import './bulkUpload.scss';
import Importcsv from '../BulkUpload/importcsv.png'
import BulkuploadList from './BulkUploadLists/BulkuploadList';
import { useState } from 'react';
import ImportProductPopup from './ImportProductPopup/ImportProductPopup';
import { useRef } from 'react';

const BulkUpload = () => {

  const [showcsv, setshowcsv] = useState(false);

  const openref = useRef(null);
  const onOpenProductImport = () => {
    openref.current.open()
  }
  const onCloseProductImport = () => {
    openref.current.close()
  }


  return (
    <div>
      {/* heading */}
      <p className='text-s w-500 heading-item '>Bulk Upload</p>
      {/* bulkupload container */}

      <section className='bulkupload-wrapper'>
        {/* download csv container */}
        <div className='inline bulkupload-item '>
          <div className='inline bulkupload-item-div '>
            <div>
              <img src={Importcsv} alt="" />
            </div>
            <div>
              <p className='text-xs  w-500 base'>Step 1.  Download our CSV Templates</p>
              <p className='text-xxs w-400 mt-2 gray'>Choose if you want to download a blank CSV template file, or a CSV file with all
                your current products.</p>
            </div>
          </div>
          <div className='bulkupload-btn-wrapper'>
            <button className='button btn-o-primary btn-2xs download-csv-btn bulkupload-csv-button' onClick={() => { setshowcsv(!showcsv) }}>Download CSV File <span className='download-btn-icon rotate-download-icon'></span></button>
            <div className={`download-csv-dropdown ${showcsv ? '' : 'download-csv-dropdown-hide'} `} >
              <p className='inline'><i className='ed-icon icon-csv-download i-xxxs gray '></i>  <span className='text-2xs w-400 base'> Download Blank CSV</span> </p>
              <hr className='mt-8 mb-5' />
              <p className='inline'><span><i className='ed-icon icon-csv-download i-xxxs gray '></i></span><span className='text-2xs w-400 base'>Download CSV with products</span></p>

            </div>
          </div>

        </div>


        <hr className='mt-25 mb-25' />
        {/* uplaod csv container */}
        <div className='inline bulkupload-item '>
          <div className='inline bulkupload-item-div '>
            <div>
              <img src={Importcsv} alt="" />
            </div>
            <div>
              <p className='text-xs  w-500 base'>Step 2.  Upload your CSV File</p>
              <p className='text-xxs w-400 mt-2 gray'>Add or edit your product info in the CSV file, making sure you don't add or delete
                columns. Once your Wix CSV file is ready to go, upload it here.</p>
            </div>
          </div>
          <div className='bulkupload-btn-wrapper'>
            <button className='button btn-o-primary btn-2xs bulkupload-csv-button  '>Upload CSV File</button>
            <button className='button  btn-2xs bulkupload-csv-button btn-o-gray remove-button  '>Remove</button>
            <p className='text-2xs w-400 primary inline mt-5 attachment-div'> <span><i className='ed-icon icon-attachmenticon pr-3 i-xxs primary'></i></span>ATTIF3.pdf file uploaded</p>
          </div>

        </div>
        <hr className='mt-25 mb-25' />
        {/* back to productlist or import product container */}
        <div className='inline between-xs between-lg back-import-wrapper'>
          <p className='text-xs w-500 primary'><span className='back-button-arrow'></span> Back to Products list</p>
          <div>
            <button className='button button-primary button-gray btn-2xs' onClick={() => { onOpenProductImport() }}>Import Products</button>
          </div>
          {
            <ImportProductPopup openref={openref} onclose={onCloseProductImport} />
          }
        </div>
      </section>

      <BulkuploadList />
    </div>
  )
}

export default BulkUpload