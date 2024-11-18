
import { useEffect, useState } from 'react';
import Select from 'react-select';
const CurrencyEditbox = ({currencyContent,defaultCurrency,setGlobalCurrency,index,useDefaultCurrency=[true], setUseDefaultCurrency=()=>{},}) => {

  // local currency
  const [currency,setCurrency] = useState({});

  // check if using the default currency provided
  useEffect(()=>{
    if (defaultCurrency.value) {
      if (useDefaultCurrency[index]) {
        setCurrency(defaultCurrency)
      }
    }
  },[defaultCurrency])

  // when local currency has value, it is not bound to use default value
  useEffect(()=>{
    if (index!=0 && currency.value) {
      // original list
      const copy_list = [...useDefaultCurrency]

      // updated list
      copy_list[index] = false;

      // set updated list
      setUseDefaultCurrency(copy_list);
    }
  },[currency])
  
  // set the global currency
  const onCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    if (index === 0) {
      setGlobalCurrency(selectedCurrency);
    }
  }

  return (
      <div className="flex flex-row space-x-3">
        {/* map the currencies into option */}
        <Select className='w-32' options={currencyContent} placeholder="Currency" defaultValue={currency} value={currency} onChange={onCurrencyChange}>
        </Select>
        <input className="currency-amount"></input>
      </div>
    
  )
} 

export default CurrencyEditbox;