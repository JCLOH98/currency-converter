
import { useEffect, useState } from 'react';
import Select from 'react-select';
const CurrencyEditbox = ({currencyContent,defaultCurrency="",setGlobalCurrency=()=>{},index, updateCurrencyList=()=>{},readonly=true,triggerFunction=()=>{},currencyValue=0}) => {

  // local currency
  const [currency,setCurrency] = useState("");

  // set the default currency provided
  useEffect(()=>{
    if (defaultCurrency.value) {
      setCurrency(defaultCurrency)
    }
  },[defaultCurrency])

  // when local currency has value, it is not bound to use default value
  useEffect(()=>{
      // set updated list
      updateCurrencyList(index,currency);
  },[currency])
  
  // set the global currency
  const onCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    if (index === 0) {
      setGlobalCurrency(selectedCurrency); //for source only
    }
  }

  const selectStyle = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "9999px",
      border: "none",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    input: (provided)=> ({
      ...provided,
      paddingLeft: "2rem", 
    })
  };

  return (
      <div className="flex flex-row space-x-3 items-center justify-center mx-1">
        {/* map the currencies into option */}
        <Select className='w-32' options={currencyContent} placeholder="Currency" defaultValue={currency} value={currency} onChange={onCurrencyChange} menuPosition='fixed' styles={selectStyle}>
        </Select>
        <input readOnly={readonly} type="number" onInput={(event)=>{
          // source-currency: get the value 
          // target-currency: calculate and set the value
          console.log(event.target.value)
          triggerFunction(event.target.value);
        }} className="border-none rounded-full w-60 h-10 px-5 outline-none" value={currencyValue}></input>
      </div>
    
  )
} 

export default CurrencyEditbox;