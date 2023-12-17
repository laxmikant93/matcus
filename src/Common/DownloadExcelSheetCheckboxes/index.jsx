import React, { useEffect, useRef, useState } from 'react'
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';

import ModalFooter from '../Modal/ModalFooter';
import FormError from '../Form/FormError';
import { useSelector } from 'react-redux';
const ExcelSheetCheckboxes = ({ show, onClose, columnList, OnSelectedValue, isValidCheck, saveDownload }) => {

  const closeModalState = () => {
    onClose()
  }
  const { postExcelFileLoading } = useSelector((state) => {
    return {
      // postExcelFileSuccess: state.studentlistuserinfo.postExcelSheetColumn.success,
      postExcelFileLoading: state.studentlistuserinfo.postExcelSheetColumn.loading,
    }
  })
  const mainCheckboxRef = useRef();
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleCheck = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;
    if (checked) {
      let data = selectedOptions;
      data.push(name);
      setSelectedOptions([...data]);
      OnSelectedValue(data)
      setValidError(false)
    } else {
      let data = selectedOptions;
      let indexData = data.indexOf(name);
      data.splice(indexData, 1);
      setSelectedOptions([...data]);
      OnSelectedValue(data)
    }
  }
  const allData = () => {
    let data = [];
    for (let i = 0; i < columnList.length; i++) {
      let column = columnList[i].value;
      data.push(column)
    }
    return data;
  };
  const handleAll = (e) => {
    let checked = e.target.checked
    if (checked) {
      OnSelectedValue(allData())
      setSelectedOptions(allData());
      setValidError(false)
    } else {
      setSelectedOptions([]);
      OnSelectedValue([])
    }
  }
  const [validError, setValidError] = useState(false)
  useEffect(() => {
    if (isValidCheck) {
      if (selectedOptions.length > 0) {

      } else {
        setValidError(true)
      }
    }
  }, [isValidCheck, selectedOptions.length])

  useEffect(() => {
    if (
      selectedOptions.length !== columnList.length &&
      selectedOptions.length > 0 &&
      selectedOptions.length < columnList.length
    ) {
      if (mainCheckboxRef.current) {
        let indeterminate = selectedOptions.length > 0;
        mainCheckboxRef.current.indeterminate = true;
        if (indeterminate) {
          // mainCheckboxRef.current.nextSibling.classList.add("CheckDash");
        } else {
          // mainCheckboxRef.current.nextSibling.classList.remove("CheckDash");
        }
      }
    } else {
      if (mainCheckboxRef.current) {
        mainCheckboxRef.current.indeterminate = false;
        // mainCheckboxRef.current.nextSibling.classList.remove("CheckDash");
      }
    }
  }, [selectedOptions, selectedOptions.length, columnList.length]);



  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          title="Select Columns for Dynamic Excel Sheet"
          closeButton={true}
          onclose={closeModalState}
        />
        <ModalBody>
          <ul className='check_list'>
            <li className="option mb-10">
              <label className="small">
                <input
                  type="checkbox"
                  onChange={handleAll}
                  ref={mainCheckboxRef}
                  checked={columnList.length === selectedOptions.length ? true : false}
                />&nbsp;&nbsp;
                All
              </label>
            </li>
            {
              columnList.length ?
                columnList.map((item, index) => {
                  return (
                    <React.Fragment>
                      <li key={index} className="option mb-10">
                        <label className="small">
                          <input
                            type="checkbox"
                            name={item.value}
                            onChange={handleCheck}
                            defaultChecked={selectedOptions.includes(
                              item.value
                            )}
                            checked={selectedOptions.includes(
                              item.value
                            )}
                          />&nbsp;&nbsp;
                          {item.name}
                        </label>
                      </li>
                    </React.Fragment>
                  )
                }) : "No Columns"

            }

            <FormError show={validError} error="Select any one" />
          </ul>
        </ModalBody>
        <ModalFooter>
          {
            postExcelFileLoading ? <button className='button btn-sm button-primary'>Downloading...</button> : <button className='button btn-sm button-primary' onClick={() => saveDownload()}>Save & Download</button>
          }

        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}
export default ExcelSheetCheckboxes;