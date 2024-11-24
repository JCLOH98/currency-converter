// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

import CurrencyEditbox from './components/CurrencyEditbox';
import Button from './components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { Analytics } from '@vercel/analytics/react';


function App() {
  library.add(fab, fas, far);
  const [currencyContent, setCurrencyContent] = useState([]) // available currencies
  
  //const [targetCurrencyCount, setTargetCurrencyCount] = useState(1) // amount of target currency
  const [currentTargetCurrencies, setCurrentTargetCurrencies] = useState([]) // array of true and false
  const [swapAnimation, setSwapAnimation] = useState(false);

  const [sourceCurrency, setSourceCurrency] = useState({})
  // const [targetCurrency, setTargetCurrency] = useState({}) 
  const [sourceCurrencyValue, setSourceCurrencyValue] = useState(0)
  const [targetCurrencyValue, setTargetCurrencyValue] = useState([])
  const [currencyPair, setCurrencyPair] = useState({})

  // for error use
  const [errorMessage, setErrorMessage] = useState("")
  const [errorVisible,setErrorVisible] = useState(false)
  
  // currency pair data
  // read the currencies file
  useEffect(()=> {
    const fetchCurrencies = async () => {
      const response = await fetch("./currencies.txt")
      if (response.ok) {
        let content = await response.text()

        // split the string in array (need to do twice as linux and window read file differntly)
        // split by \n, and replace \r if any
        content = content.split("\n")

        //change to array of JSON for using react-select
        const contentJson = content.map((item)=>({
          label:<div className='flex flex-row justify-around h-21px'>
            <img alt={item.replace("\r","")} className='border p-0.5 rounded' src={`https://flagcdn.com/28x21/${item.substring(0,2).toLowerCase()}.png`} width="28" height="21"/>
            <div className='ml-1'>{item.replace("\r","")}</div>
            </div>,
            value:item.replace("\r","")}))

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
          // setTargetCurrency(currency);
          setCurrentTargetCurrencies([currency])
        }
      }
    }
    // add initial target currency box
  },[currencyContent])

  // add the target currency
  const addCurrency = () => {
    // setTargetCurrencyCount(prevCount => prevCount + 1);
    setCurrentTargetCurrencies((prevUse) => [...prevUse, [...prevUse][0]]);
  }

  // remove the target currency
  const removeCurrency = () => {
    if (currentTargetCurrencies.length>1) {
      // setTargetCurrencyCount(prevCount => prevCount - 1);
      setCurrentTargetCurrencies((prevUse) => prevUse.slice(0, prevUse.length - 1));
    }
  }
  
  // swap currency
  const swapCurrency = () => {
    setSwapAnimation(true);
    const oriTarget = currentTargetCurrencies[0];
    const oriSource = sourceCurrency;
    setSourceCurrency(oriTarget);
    // setTargetCurrency(sourceCurrency);
    setCurrentTargetCurrencies((prevItem)=> {
      let copyList = [...prevItem];
      copyList[0] = oriSource;
      return copyList
    });
  }

  // disable swap animation
  useEffect(()=> {
    if (swapAnimation) {      
      setTimeout(()=> {
        setSwapAnimation(false)
      },500);
    }
  },[swapAnimation]);

  // GET the currency pair data (from server/local)
  useEffect(()=> {  
    // read all the data from session storage
    if (sessionStorage.length) {
      for (let i=0; i<sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const val = sessionStorage.getItem(key)
        // console.log("key",key,"val",val)
        setCurrencyPair((prevPair)=>({
          ...prevPair,
          [key]:val
        }))
      }
    }
  },[]); // get the data from session storage
  
  // useEffect(()=> {
  //   console.log("currencyPair",JSON.stringify(currencyPair))
  // },[currencyPair])

  const getCurrencyData = (showError=true) => {
    if (currencyPair[sourceCurrency.value]) {
      // console.log(sourceCurrency.value,"1 to MYR =",JSON.parse(currencyPair[sourceCurrency.value])["MYR"])

      // loop through all the target currency result
      let calculationRes = []
      for (let i=0; i<currentTargetCurrencies.length; i++) {
        const res = sourceCurrencyValue*JSON.parse(currencyPair[sourceCurrency.value])[currentTargetCurrencies[i].value];
        calculationRes.push(res.toFixed(2))
      }
      setTargetCurrencyValue(calculationRes)
    }
    else { // not in local database, send to server
      fetch(`${process.env.REACT_APP_BACKEND_URI}/currency-exchange?currency=${sourceCurrency.value}`).then((res)=>res.json()).then((data)=>{
        if (data["result"] === "success") {
          sessionStorage.setItem(sourceCurrency.value, JSON.stringify(data["conversion_rates"])) // set the data to session storage

          // loop through all the target currency result
          let calculationRes = []
          for (let i=0; i<currentTargetCurrencies.length; i++) {
            const res = sourceCurrencyValue*data["conversion_rates"][currentTargetCurrencies[i].value];
            calculationRes.push(res.toFixed(2))
          }
          setTargetCurrencyValue(calculationRes)
        }
        else {
          throw new Error(`Failed to fetch data`);
        }
          
      }).catch((error)=>{
        if (showError) {
          setErrorMessage(error.message)
          setErrorVisible(true)
        }
        // console.error("ERROR",error)
        
      })
    }
    
  }
  useEffect(()=>{
    if (errorVisible) {
      setTimeout(()=>{
        setErrorVisible(false)
      },5000);
    }
  },[errorVisible])

  useEffect(()=>{
    // console.log("currentTargetCurrencies",currentTargetCurrencies)
    // console.log("currentTargetCurrencies length",currentTargetCurrencies.length)
    if (currentTargetCurrencies.length && sourceCurrency !== "" && parseFloat(sourceCurrencyValue)){
      if (currentTargetCurrencies[currentTargetCurrencies.length-1] !== ""){
        getCurrencyData();
      }
    }
  },[currentTargetCurrencies,sourceCurrency,sourceCurrencyValue])
  
  const updateTargetCurrencyList = (index,currency) => {
    let copyList = [...currentTargetCurrencies]
    copyList[index] = currency
    setCurrentTargetCurrencies(copyList)
  }

  return (
    <div>
      <header>
      </header>
      <body className='min-h-screen h-full flex flex-col justify-center items-center bg-emerald-600 font-lexend'>
        <div class="font-bold m-2 text-center text-emerald-950">Currency Converter by <a target="blank" href="https://jcloh-98.web.app/" className='underline'>JCLOH98</a></div>
        <div className='flex flex-col justify-center items-center space-y-5 border border-hidden bg-green-300 rounded-xl px-5 py-10'>
          <div id="source-currency" className=''>
            <CurrencyEditbox currencyContent={currencyContent} defaultCurrency={sourceCurrency} index={0} setGlobalCurrency={setSourceCurrency} readonly={false} currencyValue={sourceCurrencyValue} setSourceCurrencyValue={setSourceCurrencyValue}></CurrencyEditbox>
          </div>
          <Button goto={swapCurrency} title="Swap currency" icon="fa-solid fa-arrows-rotate" animation={swapAnimation}></Button>
          <div className="sm:h-60 h-32 overflow-x-hidden y-scroll" id='target-currencies'>
            {/* loop the target currencies */}
            {
              currentTargetCurrencies.map((_, index) =>(
                <div key={index} className='my-2'>
                  <CurrencyEditbox key={index} currencyContent={currencyContent} index={index} defaultCurrency={currentTargetCurrencies[index]} updateCurrencyList={updateTargetCurrencyList} currencyValue={`${targetCurrencyValue[index]?targetCurrencyValue[index]:0}`}></CurrencyEditbox>
                </div>
              ))
            }
          </div>
          <div className='flex space-x-10'>
            <Button goto={addCurrency} title="Add currency" icon="fa-solid fa-add"></Button>
            <Button goto={removeCurrency} title="Remove currency" icon="fa-solid fa-minus"></Button>
          </div>
        </div>
        <div className={`${errorVisible?"block":"hidden"} 
        bg-slate-50 text-red-400 rounded fixed break-words p-2 text-center border-red-400 border-2`}>
          <div className=' font-bold'>Please contact the developer</div>
          <div>Error: {errorMessage}</div>
        </div>

        <div className='fixed bottom-5 right-5 bg-green-300 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-emerald-600 flex items-center justify-center group'>
          <FontAwesomeIcon className='w-5 h-5 sm:w-7 sm:h-7' icon="fa-solid fa-address-book" />
          <div className='absolute border rounded opacity-0 group-hover:opacity-100 bg-slate-50 text-center sm:right-7 sm:bottom-7 sm:px-2 -left-20 bottom-5 right-5 px-1'>
            <a target="blank" className='sm:text-md text-xs font-bold text-emerald-950' href="https://forms.gle/oTmmZedRWva3qzqg6">Report Issue</a>
          </div>
        </div>
        <Analytics />
      </body>
    </div>
  );
}

export default App;
