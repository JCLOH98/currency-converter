
import { useEffect, useState } from 'react';
import Select from 'react-select';
const CurrencyEditbox = ({currencyContent,defaultCurrency="",setGlobalCurrency=()=>{},index, updateCurrencyList=()=>{},readonly=true,triggerFunction=()=>{},currencyValue=0,setSourceCurrencyValue=()=>{}}) => {

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
      <div className="flex sm:flex-row sm:space-x-3 sm:space-y-0 sm:justify-center flex-col space-y-2 items-center mx-1">
        {/* map the currencies into option */}
        <Select className='w-32' options={currencyContent} placeholder="Currency" defaultValue={currency} value={currency} onChange={onCurrencyChange} menuPosition='fixed' styles={selectStyle}>
        </Select>
        <input readOnly={false} type={"number"} onInput={(event)=>{
          setSourceCurrencyValue(event.target.value);
        }} className="border-none rounded-full w-40 h-10 outline-none text-center" value={currencyValue}></input>
      </div>
    
  )
} 

export default CurrencyEditbox;