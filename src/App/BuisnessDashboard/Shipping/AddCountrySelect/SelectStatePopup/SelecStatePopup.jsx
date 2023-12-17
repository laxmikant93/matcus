import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CheckboxInput from '../../../../../Common/Form/CheckboxInput'
import FormInput from '../../../../../Common/Form/FormInput'
import Modals from '../../../../../Common/Modals'
import ModalBody from '../../../../../Common/Modals/ModalsBody'
import ModalHeader from '../../../../../Common/Modals/ModalsHeader'
import SearchControl from '../../../../../Common/SearchControl'
import './selectstatepopup.scss'
const SelecStatePopup = ({ openpopup, autoCheckState, onclose, countryState, isAddCountryOpen, handleSetCoutry, inputValue }) => {
  const closeModal = () => {
    onclose();
  };
  const { existingStates } = useSelector((state) => {
    return {
      existingStates: state.shipping.existingStates.data
    }
  });
  const { id } = useParams()
  const [states, SetStates] = useState([]);
  const [existingState, setExistingState] = useState([])
  const [selectedState, SetSelectedState] = useState([]);
  const [SearchingTrue, SetSearchingTrue] = useState(false);
  const SelectStateHandle = (e, type) => {
    let array = selectedState
    switch (type) {
      case "All": {
        if (e.target.checked) {
          array = states
        } else {
          array = [];
        }
        break;
      }
      default: {
        if (e.target.checked) {
          array.push(e.target.value)
        } else {
          // let index = array.indexOf(e.target.value)
          array = array.filter((item) => item !== e.target.value)
        }
      }
    }
    SetSelectedState([...array]);
  }
  // useEffect(() => {
  //   SetStates(countryState);

  // }, [countryState]);
  // useEffect(() => {
  //   handleSetCoutry(selectedState, "state")
  //   console.log("line 46",)
  // }, [selectedState])
  const ApplyState = () => {
    handleSetCoutry(selectedState, "state");
    closeModal();
  }
  const searchStates = (e) => {
    if (e.target.value) {
      let searchData = states.filter((item) => {
        return item.toLowerCase().includes(e.target.value.toLowerCase())
      })
      SetStates([...searchData]);
      SetSearchingTrue(true)
    } else {
      // SetStates(countryState.filter())
      if (existingState.length > 0) {
        var tempArr = countryState.filter(function (item) {
          return !existingState.includes(item);
        });

        SetStates([...tempArr])
      } else {
        SetStates([...countryState])
      }

      SetSearchingTrue(false)
    }
  }
  useEffect(() => {

    if (existingStates.length > 0) {
      let data = existingStates.find((item) => item._id === inputValue.country)
      if (data) {
        var tempArr = countryState.filter(function (item) {
          return !data.state.includes(item);
        });
        let array1 = tempArr.concat(data.state)
        SetStates([...tempArr])
        setExistingState(data.state)
        SetSelectedState([...tempArr]);
        if (id) {
          if (autoCheckState) {
            handleSetCoutry(tempArr, "state")
          }
        } else {
          handleSetCoutry(tempArr, "state")
        }

      } else {
        SetSelectedState(countryState);
        if (id) {
          if (autoCheckState) {
            handleSetCoutry(countryState, "state")
          }
        } else {
          handleSetCoutry(countryState, "state")
        }
        SetStates(countryState)
      }
    } else {
      SetSelectedState(countryState);
      SetStates(countryState)
      if (id) {
        if (autoCheckState) {
          handleSetCoutry(countryState, "state")
        }
      } else {
        handleSetCoutry(countryState, "state")
      }
    }
  }, [existingStates, inputValue.country, countryState])
  useEffect(() => {
    if (!isAddCountryOpen) {
      SetSelectedState([])
    }
  }, [isAddCountryOpen])
  return (
    <div>
      <Modals ref={openpopup} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-xs'}>
        <ModalHeader title={'Select state '} />
        <ModalBody>
          <div className='createCollection-search-bar '>
            <div className="headerItem headerSearchBar createCollectionpop-search">
              <SearchControl
                classNameWrappper="tableSe  archbar"
                placeholder="Search..."
                onChange={(e) => searchStates(e)}
              />
            </div>
          </div>
          <div className='mt-20 pb-5'>
            <div className='states-item-div '>
              {!SearchingTrue && <div className="ffeatured-wrap mb-5 ">
                <CheckboxInput
                  label={"All"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                  onClick={(e) => SelectStateHandle(e, "All")}
                  checked={selectedState.length === states.length ? true : false}
                />
              </div>}
              {states.length ? states.concat(existingState).map((item, i) => {
                return (
                  <div className="ffeatured-wrap mb-5">
                    <CheckboxInput
                      label={item}
                      LabelClass={"label-heading eComm-checkbox-center"}
                      className={"eComm-checkbox"}
                      value={item}
                      onChange={(e) => SelectStateHandle(e, "other")}
                      disabled={existingState.includes(item)}
                      checked={selectedState.includes(item) ? true : false}
                    />
                  </div>
                )
              }) : ""}

              {/* <div className="ffeatured-wrap mb-5 ">
                <CheckboxInput
                  label={"Arunachal Pradesh"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5">
                <CheckboxInput
                  label={"Assam"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5 ">
                <CheckboxInput
                  label={"Bihar"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5">
                <CheckboxInput
                  label={"Chhattisgarh"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5 ">
                <CheckboxInput
                  label={"Goa"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5">
                <CheckboxInput
                  label={"Gujarat "}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5">
                <CheckboxInput
                  label={"Haryana"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5">
                <CheckboxInput
                  label={"Himachal Pradesh "}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5">
                <CheckboxInput
                  label={"Uttar Pradesh "}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5 ">
                <CheckboxInput
                  label={"Uttra Khand "}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
              <div className="ffeatured-wrap mb-5 ">
                <CheckboxInput
                  label={"Tamil Nadu"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div> */}
            </div>
          </div>
          <button className=' mt-10  button btn-2xs button-primary btn-block  btn-oval' onClick={ApplyState}>Apply</button>
        </ModalBody>
      </Modals>
    </div >
  )
}

export default SelecStatePopup