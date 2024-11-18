// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import CurrencyEditbox from './components/CurrencyEditbox';

function App() {
  
  // variables
  library.add(fab, fas, far);
  const [currencyContent, setCurrencyContent] = useState({}) // available currencies
  
  const [targetCurrencyCount, setTargetCurrencyCount] = useState(1) // amount of target currency
  const [useTargetCurrency, setUseTargetCurrency] = useState([true]) // array of true and false

  const [sourceCurrency, setSourceCurrency] = useState({})
  const [targetCurrency, setTargetCurrency] = useState({}) 

  // read the currencies file
  useEffect(()=> {
    const fetchCurrencies = async () => {
      const response = await fetch("./currencies.txt")
      if (response.ok) {
        let content = await response.text()

        // split the string in array
        content = content.split("\r\n")

        //change to json for using react-select
        const contentJson = content.map((item)=>({
          label:<div className='flex flex-row justify-around h-21px'>
            <img alt={item} className='border p-0.5 rounded' src={`https://flagcdn.com/28x21/${item.substring(0,2).toLowerCase()}.png`} width="28" height="21"/>
            <div className='ml-1'>{item}</div>
            </div>,
            value:item}))

        setCurrencyContent(contentJson);
      }
    }
    fetchCurrencies();
  },[]);

  // set source currency and target currency
  useEffect(()=>{
    if (currencyContent.length) {
      for (let currency of currencyContent){
        if (currency.value === "USD") {
          // console.log(currency);
          setSourceCurrency(currency);
          break;
        }
        else if (currency.value === "MYR") {
          setTargetCurrency(currency);
        }
      }
    }
    // add initial target currency box
  },[currencyContent])

  // add the target currency
  const addCurrency = () => {
    setTargetCurrencyCount(prevCount => prevCount + 1);
    setUseTargetCurrency((prevUse) => [...prevUse, true]);
  }

  // remove the target currency
  const removeCurrency = () => {
    setTargetCurrencyCount(prevCount => prevCount - 1);
    setUseTargetCurrency((prevUse) => prevUse.slice(0, prevUse.length - 1));
  }
  
  // swap currency
  const swapCurrency = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  }

  return (
    <div>
      <header>
      </header>
      <body className='container'>
        <div className='flex flex-col justify-center min-h-screen h-full items-center space-y-5'>
          <div id="source-currency" className='basis-5/12'>
            <CurrencyEditbox currencyContent={currencyContent} defaultCurrency={sourceCurrency} index={0} setGlobalCurrency={setSourceCurrency}></CurrencyEditbox>
          </div>
          <button title="swap currency" onClick={()=>{swapCurrency()}} className=' border w-10 h-10 flex items-center justify-center rounded-full'>
            <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
          </button>
          <div className="" id='target-currencies'>
            {/* loop the target currencies */}
            {
              Array.from({ length: targetCurrencyCount }).map((_, index) =>(
                <CurrencyEditbox key={index} currencyContent={currencyContent} defaultCurrency={targetCurrency} setGlobalCurrency={setTargetCurrency} index={index} useDefaultCurrency={useTargetCurrency} setUseDefaultCurrency={setUseTargetCurrency}></CurrencyEditbox>
              ))
            }
            {/* <CurrencyEditbox currencyContent={currencyContent}></CurrencyEditbox> */}
            {/* <CurrencyEditbox currencyContent={currencyContent}></CurrencyEditbox> */}
          </div>
          <button onClick={()=>{addCurrency()}} title="add currency" className=' border w-10 h-10 flex items-center justify-center rounded-full'>
            <FontAwesomeIcon icon="fa-solid fa-add" />
          </button>
          <button onClick={()=>{removeCurrency()}} title="add currency" className=' border w-10 h-10 flex items-center justify-center rounded-full'>
            <FontAwesomeIcon icon="fa-solid fa-minus" />
          </button>
        </div>
      </body>
    </div>
  );
}

export default App;
