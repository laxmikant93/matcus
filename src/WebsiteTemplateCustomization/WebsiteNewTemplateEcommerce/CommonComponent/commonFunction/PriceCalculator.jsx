import { useSelector } from "react-redux";
import { convertToIndianFormat } from "../../../../CommonFunctions/helperFunction";

export const priceCalculator = (price, commission = 0, rate = 1) => Math.ceil(price * rate * (1 + commission / 100));

const ProductCurrencyPrice = (val) => {
  const { currency } = useSelector((state) => { 
    return {
      currency: state.currencyList,
    }
  });
  if (currency ) {
    if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
    else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
  }
  return val;
}
export default ProductCurrencyPrice;
