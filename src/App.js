// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

import CurrencyEditbox from './components/CurrencyEditbox';
import Button from './components/Button';

function App() {
  
  // variables
  const [currencyContent, setCurrencyContent] = useState({}) // available currencies
  
  const [targetCurrencyCount, setTargetCurrencyCount] = useState(1) // amount of target currency
  const [currentTargetCurrencies, setCurrentTargetCurrencies] = useState([]) // array of true and false
  const [swapAnimation, setSwapAnimation] = useState(false);

  const [sourceCurrency, setSourceCurrency] = useState({})
  // const [targetCurrency, setTargetCurrency] = useState({}) 
  const [sourceCurrencyValue, setSourceCurrencyValue] = useState(0)
  const [targetCurrencyValue, setTargetCurrencyValue] = useState([])
  const [currencyPair, setCurrencyPair] = useState({})

  // currency pair data
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
          // setTargetCurrency(currency);
          setCurrentTargetCurrencies([currency])
        }
      }
    }
    // add initial target currency box
  },[currencyContent])

  // add the target currency
  const addCurrency = () => {
    setTargetCurrencyCount(prevCount => prevCount + 1);
    setCurrentTargetCurrencies((prevUse) => [...prevUse, [...prevUse][0]]);
  }

  // remove the target currency
  const removeCurrency = () => {
    if (targetCurrencyCount>1) {
      setTargetCurrencyCount(prevCount => prevCount - 1);
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
  
  useEffect(()=> {
    console.log("currencyPair",JSON.stringify(currencyPair))
  },[currencyPair])

  const getCurrencyData = (sourceValue) => {
    console.log("getting currency data")

    if (currencyPair[sourceCurrency.value]) {
      console.log(sourceCurrency.value,"1 to MYR =",JSON.parse(currencyPair[sourceCurrency.value])["MYR"])

      // loop through all the target currency result
      let calculationRes = []
      for (let i=0; i<targetCurrencyCount; i++) {
        const res = sourceValue*JSON.parse(currencyPair[sourceCurrency.value])[currentTargetCurrencies[i].value];
        calculationRes.push(res.toFixed(2))
      }
      setSourceCurrencyValue(sourceValue) // improvement need to be made
      setTargetCurrencyValue(calculationRes)
    }
    else { // not in local database, send to server
      fetch(`/currency-exchange?currency=${sourceCurrency.value}`).then((res)=>res.json()).then((data)=>{
        if (data["result"] === "success") {
          sessionStorage.setItem(sourceCurrency.value, JSON.stringify(data["conversion_rates"])) // set the data to session storage

          // loop through all the target currency result
          let calculationRes = []
          for (let i=0; i<targetCurrencyCount; i++) {
            const res = sourceValue*data["conversion_rates"][currentTargetCurrencies[i].value];
            calculationRes.push(res.toFixed(2))
          }
          setSourceCurrencyValue(sourceValue) // improvement need to be made
          setTargetCurrencyValue(calculationRes)
        }
        else {
          console.log("No data on server")
          console.log(data)
        }
          
      }).catch((error)=>{
        console.error(error)
      })
    }
    
  }
  
  const updateTargetCurrencyList = (index,currency) => {
    let copyList = [...currentTargetCurrencies]
    copyList[index] = currency
    setCurrentTargetCurrencies(copyList)
  }

  return (
    <div>
      <header>
      </header>
      <body className='min-h-screen h-full flex justify-center items-center bg-slate-50'>
        <div className='flex flex-col justify-center items-center space-y-5 border border-hidden bg-green-200 rounded-xl px-5 py-10'>
          <div id="source-currency" className=''>
            <CurrencyEditbox currencyContent={currencyContent} defaultCurrency={sourceCurrency} index={0} setGlobalCurrency={setSourceCurrency} readonly={false} triggerFunction={getCurrencyData} currencyValue={sourceCurrencyValue}></CurrencyEditbox>
          </div>
          <Button goto={swapCurrency} title="Swap currency" icon="fa-solid fa-arrows-rotate" animation={swapAnimation}></Button>
          <div className="h-60 overflow-x-hidden y-scroll" id='target-currencies'>
            {/* loop the target currencies */}
            {
              Array.from({ length: targetCurrencyCount }).map((_, index) =>(
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
      </body>
    </div>
  );
}

export default App;
