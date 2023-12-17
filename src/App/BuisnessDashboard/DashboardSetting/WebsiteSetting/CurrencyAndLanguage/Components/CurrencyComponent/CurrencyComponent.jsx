import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ValidationFile from '../../../../../../../Classes/ValidationFile';
import SwitchButton from '../../../../../../../Common/Button/SwitchButton';
// import SwitchButton from '../../../../../../../Common/Button/SwitchButton/index';
import Card from '../../../../../../../Common/Card';
import CardBody from '../../../../../../../Common/Card/CardBody';
import FormInput from '../../../../../../../Common/Form/FormInput';
// import SingleSelectDropdown from '../../../../../../../Common/Form/SingleSelectDropdown';
import { deleteCurrencyDetails, getAllCurrencyList, getSelectedCurrencyData } from '../../../../../../../store/actions/ecomCurrency';
import CurrencyDropDown from '../CurrencyDropDown/CurrencyDropDown';
import './currencyComponent.scss';
const CurrencyComponent = ({ onLoadPrimaryCurrencyInfo, onLoadSecondaryCurrencyInfo }) => {

  let dispatch = useDispatch();

  const { user, getSelectedCurrencyDetails, getSelectedCurrencySuccess, getAllCurrenciesList, getAllCurrenciesListSuccess } = useSelector((state) => {
    return {
      user: state.user,
      getSelectedCurrencyDetails: state.ecommerceCurrency.getCurrencyData.data,
      getSelectedCurrencySuccess: state.ecommerceCurrency.getCurrencyData.success,
      getAllCurrenciesList: state.ecommerceCurrency.getCurrenciesList.data,
      getAllCurrenciesListSuccess: state.ecommerceCurrency.getCurrenciesList.success,
    }
  })

  const [currencydata, setCurrencydata] = useState([]);
  const [toggleCurrency, setToggleCurrency] = useState(true);
  const [onChange, setOnChange] = useState(false);
  const [currencyRow, setCurrencyRow] = useState([{
    currency: "Indian rupee",
    ISOCode: "INR",
    commision: "",
    enabled: true,
    primary: true
  }]);

  useEffect(() => {
    dispatch(getAllCurrencyList(user.user_business));
  }, [dispatch, user.user_business])

  useEffect(() => {
    dispatch(getSelectedCurrencyData(user.user_business));
  }, [dispatch, user.user_business])

  useEffect(() => {
    if (getAllCurrenciesListSuccess && getAllCurrenciesList) {
      setCurrencydata(getAllCurrenciesList);
    }
  }, [getAllCurrenciesList, getAllCurrenciesListSuccess])

  const handleAddCurrencyButton = () => {
    // setToggleCurrency(true);
    currencyRow.push({
      currency: "",
      ISOCode: "",
      commision: "",
      enabled: true,
      primary: false
    })
    setCurrencyRow([...currencyRow]);
  }

  const handleDeleteButton = (item, key) => {
    let array = currencyRow;
    let index = array.indexOf(item);
    array.splice(key, 1);
    setCurrencyRow([...array]);
    if (item._id) {
      // console.log(item, "line no 67");
      dispatch(deleteCurrencyDetails(user.user_business, item.ISOCode));
    }
  }

  const handleChange = (e, key) => {
    let array = currencyRow;
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    array[key]["commision"] = value;
    setCurrencyRow([...array]);
    setOnChange(true);
  }

  const handleSwitchButton = (e, key) => {
    let array = currencyRow;
    let inputChecked = e.target.checked;
    if (inputChecked) {
      array[key]["enabled"] = true;
    }
    else {
      array[key]["enabled"] = false;
    }
    setCurrencyRow([...array]);
    setOnChange(true);
  }

  const handleSwitchPrimaryButton = (e, key) => {
    let array = currencyRow;
    let inputChecked = e.target.checked;
    if (inputChecked) {
      array[key]["primary"] = true;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (index !== key) {
          element.primary = false;
        }
      }
    }
    setCurrencyRow([...array]);
    setOnChange(true);
  }

  useEffect(() => {
    onLoadSecondaryCurrencyInfo(currencyRow, onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyRow])

  useEffect(() => {
    if (getSelectedCurrencySuccess && getSelectedCurrencyDetails && getSelectedCurrencyDetails.currencyList && getSelectedCurrencyDetails.currencyList.length) {
      setCurrencyRow(getSelectedCurrencyDetails.currencyList);
      setToggleCurrency(true);
      setOnChange(false);
    }
  }, [getSelectedCurrencyDetails, getSelectedCurrencySuccess])

  const filterByReference = (arr1, arr2) => {
    let res = [];
    res = arr1.filter(el => {
      return !arr2.find(element => {
        return element.ISOCode === el.ISOCode;
      });
    });
    return res;
  }
  useEffect(() => {
    setCurrencydata(filterByReference(getAllCurrenciesList, currencyRow))
  }, [currencyRow, getAllCurrenciesList])
  // useEffect(() => {

  //   let tempArr = currencydata.filter(function (item) {
  //     return currencyRow.some((itemm) => itemm.ISOCode !== item.ISOCode);
  //   });
  //   console.log(tempArr)
  //   console.log(currencyRow, "cr")
  //   // setCurrencyRow([...tempArr])
  // }, [currencyRow, currencydata])

  return (
    <div className='currencyComponent-container'>
      {/* <Card className='currencyCard'>
        <CardBody>
          <div className='cardBody-container'>
            <p className='tex-18 w-500 primary website-name'>Currency</p>
            <p className='tex-18 w-500 base mt-15 '>Primary Currency</p>
            <p className='text-2xs w-300 base mt-2'>Select primary currency for your website</p>
            <div className='currency-dropDown'>
               <SingleSelectDropdown SingleSelectLabelName="hiii" />
              <div className="formFieldwrap sidebar-formgroup ">

                <div className="addProduct-align-div ">
            
                </div>
              </div> 
              <CurrencyDropDown position={'bottom'} onLoadPrimaryCurrencyInfo={onLoadPrimaryCurrencyInfo} type={"primary"} />
            </div>
          </div>
        </CardBody>
      </Card> */}

      <Card className='currencyCard'>
        <CardBody>
          <div className='cardBody-container'>
            <div className='multiple-currency-div'>
              <div className='multiple-currency-div-left'>
                <p className='tex-18 w-500 base  '>Multiple Currency</p>
                <p className='text-2xs w-300 base mt-2'>Add multiple currencies to your website</p>
              </div>
              <div className='multiple-currency-div-right'>
                <button className='button btn-xs button-primary'
                  onClick={handleAddCurrencyButton}
                >Add Currency  </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <div className='table-div'>
        <div className='multipleCurrency-content'>
          <table>
            {currencyRow && currencyRow.length ?
              <thead>
                <tr className='product-tr-list customer-tr-List'>
                  <th className=' capitalize text-xxs th-text  w-600' style={{ width: '30%' }}>Currency</th>
                  <th className=' capitalize text-xxs th-text w-600' style={{ width: '10%' }}>Label</th>
                  <th className=' capitalize text-xxs th-text w-600' style={{ width: '20%' }}>Rate  +  Commission</th>
                  <th className=' capitalize text-xxs th-text w-600' style={{ width: '10%' }}>Enabled</th>
                  <th className=' capitalize text-xxs th-text w-600' style={{ width: '10%' }}>Primary</th>
                  <th className=' text-xxs w-600'> &nbsp; </th>
                </tr>
              </thead>
              : ""
            }

            <tbody>

              {currencyRow && currencyRow.length ? currencyRow.map((item, key) => {
                return (
                  < tr className={`currency-list-wrapper  ${'tr-bg-color'}`} key={key}>
                    <td>
                      <div className='currency-dropDown'>
                        {/* <div className="formFieldwrap sidebar-formgroup ">
                                  <div className="addProduct-align-div ">
                                    <select
                                      id="list"
                                      // name="blood_group"
                                      defaultValue={false}
                                    >
                                      <option value={false}>Draft-INR</option>
                                      <option value={true}>Active</option>
                                      <option value={false}>Draft</option>
                                      <option value={true}>Active</option>
                                      <option value={false}>Draft</option>
                                    </select>
                                  </div>
                                </div> */}
                        <CurrencyDropDown position={'bottom'} currencydata={currencydata} onLoadPrimaryCurrencyInfo={onLoadPrimaryCurrencyInfo} type={"secondary"}
                          data={key} currencyRow={currencyRow} setCurrencyRow={setCurrencyRow} setOnChange={setOnChange} />
                        {/* <CurrencyDropDown position={'bottom'} onLoadPrimaryCurrencyInfo={onLoadPrimaryCurrencyInfo} type={"primary"} /> */}
                      </div>
                    </td>
                    <td>
                      <div className='label-div'>
                        <span>{item.ISOCode}</span>
                      </div>
                    </td>
                    <td>
                      <div className='commison-wraper'>
                        <div className='rate-div'>
                          <span>{item.ISOCode ? `1 ${item.ISOCode}` : ""}</span>
                        </div>
                        <div>	&#43;</div>
                        <div className='commison-div'>
                          <div className="formFieldwrap width-65">
                            <FormInput
                              type="number"
                              value={item.commision}
                              onChange={(e) => handleChange(e, key)}
                              id="Commission"
                              name="Commission"
                              placeholder=""
                              maxLength="80"
                            />
                            {/* <FormError
                          show={nameV}
                          error="Invalid Name."
                        /> */}

                          </div>
                        </div>
                        <div>&#x25;</div>
                      </div>
                    </td>
                    <td>
                      <SwitchButton onChange={(e) => handleSwitchButton(e, key)} checked={item.enabled} disabled={item.primary === true} />
                    </td>
                    <td>
                      <SwitchButton onChange={(e) => handleSwitchPrimaryButton(e, key)} checked={item.primary} />
                    </td>
                    <td>
                      {/* when the delete button is disable put 'aria-disabled="true"' */}
                      <div className='delete-wrapper' aria-disabled={currencyRow.length === 1 ? true : item.primary === true ? true : false} onClick={() => handleDeleteButton(item, key)}>
                        <i className='ed-icon i-xs  icon-delete'></i>
                        <p className='text-2xs w-500 base cursor-pointer'
                        >Delete</p>
                      </div>
                    </td>
                  </tr>
                );
              })
                : ""}

            </tbody>
          </table>

        </div>
        <div className='message-wraper'>
          <p className='text-xs base w-300'><span className='w-500'>*Note :</span> <span>  Percentage ‘%’ is based on the product price. </span></p>
          <div className='message-text'>
            <p className='w-300 base'>If you want to add commission on currency exchange then add a percentage in the commision input field. For eg.- The price of a product is 16,500 INR
              and on converting it to USD, it will be $207 but if you’d like to add commission then add percentage and that percentage will be calculated based on your
              product price, i.e, if you add 10% then the converted price of the product will be $227</p>
          </div>
        </div>
      </div>


    </div >
  )
}

export default CurrencyComponent