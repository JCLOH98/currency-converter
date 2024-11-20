
// Import the express module
const express=require('express');
const dotenv = require('dotenv');
const path = require('path');
const port = process.env.PORT || 5000;
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();

// Create an instance of the express application
const app=express();

// Serve the React frontend app
app.use(express.static(path.join(__dirname, '../build')));

// Middleware to inject the API key
app.use((req, res, next) => {
    req.apiKey = process.env.EXCHANGE_RATE_API_KEY; // Attach the API key to the
    next(); // Proceed to the next middleware or route
  });

app.use(cors());  // Allow all origins


// Catch-all to serve React app's static files
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
//   });

// mockup currency exchange
app.get("/currency-exchange",(req,res)=> {
    console.log(req)
    if (req.query.currency=="USD") {
        // return json
        res.json({
            "result": "success",
            "conversion_rates": {
                "USD": 1,
                "AED": 3.6725,
                "AFN": 67.9279,
                "ALL": 92.6801,
                "AMD": 389.0944,
                "ANG": 1.79,
                "AOA": 922.1152,
                "ARS": 1003.25,
                "AUD": 1.5332,
                "AWG": 1.79,
                "AZN": 1.7003,
                "BAM": 1.8474,
                "BBD": 2,
                "BDT": 119.4765,
                "BGN": 1.8476,
                "BHD": 0.376,
                "BIF": 2931.6504,
                "BMD": 1,
                "BND": 1.3385,
                "BOB": 6.9214,
                "BRL": 5.7654,
                "BSD": 1,
                "BTN": 84.4258,
                "BWP": 13.6173,
                "BYN": 3.3278,
                "BZD": 2,
                "CAD": 1.3979,
                "CDF": 2841.2857,
                "CHF": 0.8823,
                "CLP": 972.1016,
                "CNY": 7.2387,
                "COP": 4388.9959,
                "CRC": 508.6571,
                "CUP": 24,
                "CVE": 104.1541,
                "CZK": 23.8814,
                "DJF": 177.721,
                "DKK": 7.0438,
                "DOP": 60.1162,
                "DZD": 133.3123,
                "EGP": 49.5158,
                "ERN": 15,
                "ETB": 121.1134,
                "EUR": 0.9445,
                "FJD": 2.2685,
                "FKP": 0.7892,
                "FOK": 7.0442,
                "GBP": 0.7892,
                "GEL": 2.7362,
                "GGP": 0.7892,
                "GHS": 15.9828,
                "GIP": 0.7892,
                "GMD": 71.7331,
                "GNF": 8585.2773,
                "GTQ": 7.7155,
                "GYD": 209.0888,
                "HKD": 7.7838,
                "HNL": 25.2154,
                "HRK": 7.1169,
                "HTG": 131.5607,
                "HUF": 385.4242,
                "IDR": 15861.61,
                "ILS": 3.7441,
                "IMP": 0.7892,
                "INR": 84.4241,
                "IQD": 1307.9372,
                "IRR": 41915.2072,
                "ISK": 137.3243,
                "JEP": 0.7892,
                "JMD": 158.7708,
                "JOD": 0.709,
                "JPY": 154.4299,
                "KES": 129.1283,
                "KGS": 86.4346,
                "KHR": 4044.2789,
                "KID": 1.5333,
                "KMF": 464.7029,
                "KRW": 1392.5218,
                "KWD": 0.3073,
                "KYD": 0.8333,
                "KZT": 496.9524,
                "LAK": 21893.2329,
                "LBP": 89500,
                "LKR": 290.8379,
                "LRD": 182.7126,
                "LSL": 18.0465,
                "LYD": 4.8837,
                "MAD": 9.9884,
                "MDL": 18.1408,
                "MGA": 4654.7166,
                "MKD": 58.2761,
                "MMK": 2099.5598,
                "MNT": 3401.317,
                "MOP": 8.017,
                "MRU": 39.9012,
                "MUR": 46.227,
                "MVR": 15.4356,
                "MWK": 1744.6625,
                "MXN": 20.1557,
                "MYR": 4.4732,
                "MZN": 63.923,
                "NAD": 18.0465,
                "NGN": 1673.8619,
                "NIO": 36.7326,
                "NOK": 10.9846,
                "NPR": 135.0813,
                "NZD": 1.6928,
                "OMR": 0.3845,
                "PAB": 1,
                "PEN": 3.7951,
                "PGK": 4.0011,
                "PHP": 58.9066,
                "PKR": 278.1453,
                "PLN": 4.0926,
                "PYG": 7842.2437,
                "QAR": 3.64,
                "RON": 4.7055,
                "RSD": 110.5755,
                "RUB": 100.2935,
                "RWF": 1381.6598,
                "SAR": 3.75,
                "SBD": 8.5102,
                "SCR": 13.7111,
                "SDG": 449.1809,
                "SEK": 10.928,
                "SGD": 1.3386,
                "SHP": 0.7892,
                "SLE": 22.8387,
                "SLL": 22838.7053,
                "SOS": 571.3003,
                "SRD": 35.4499,
                "SSP": 3523.4932,
                "STN": 23.1422,
                "SYP": 12903.7051,
                "SZL": 18.0465,
                "THB": 34.5309,
                "TJS": 10.6683,
                "TMT": 3.5,
                "TND": 3.1492,
                "TOP": 2.3475,
                "TRY": 34.5217,
                "TTD": 6.7556,
                "TVD": 1.5333,
                "TWD": 32.3615,
                "TZS": 2643.0891,
                "UAH": 41.3003,
                "UGX": 3674.6438,
                "UYU": 42.7558,
                "UZS": 12827.7981,
                "VES": 45.841,
                "VND": 25377.5404,
                "VUV": 118.5502,
                "WST": 2.7699,
                "XAF": 619.6038,
                "XCD": 2.7,
                "XDR": 0.762,
                "XOF": 619.6038,
                "XPF": 112.7186,
                "YER": 249.6781,
                "ZAR": 18.0467,
                "ZMW": 27.7002,
                "ZWL": 5.2847
              }
        });
    }
    else if (req.query.currency=="MYR") {
        res.json({
            "result": "success",
            "conversion_rates": {
                "MYR": 1,
                "AED": 0.821,
                "AFN": 15.1971,
                "ALL": 20.7348,
                "AMD": 87.0848,
                "ANG": 0.4002,
                "AOA": 205.979,
                "ARS": 224.2803,
                "AUD": 0.344,
                "AWG": 0.4002,
                "AZN": 0.3799,
                "BAM": 0.4132,
                "BBD": 0.4471,
                "BDT": 26.7194,
                "BGN": 0.4132,
                "BHD": 0.08406,
                "BIF": 661.5096,
                "BMD": 0.2236,
                "BND": 0.2995,
                "BOB": 1.5484,
                "BRL": 1.2902,
                "BSD": 0.2236,
                "BTN": 18.871,
                "BWP": 3.0397,
                "BYN": 0.7293,
                "BZD": 0.4471,
                "CAD": 0.3136,
                "CDF": 637.0093,
                "CHF": 0.1974,
                "CLP": 217.4173,
                "CNY": 1.6182,
                "COP": 981.8078,
                "CRC": 113.7943,
                "CUP": 5.3653,
                "CVE": 23.2949,
                "CZK": 5.3394,
                "DJF": 39.7302,
                "DKK": 1.5752,
                "DOP": 13.4491,
                "DZD": 29.8244,
                "EGP": 11.0702,
                "ERN": 3.3533,
                "ETB": 27.5519,
                "EUR": 0.2112,
                "FJD": 0.507,
                "FKP": 0.1768,
                "FOK": 1.5752,
                "GBP": 0.1768,
                "GEL": 0.6115,
                "GGP": 0.1768,
                "GHS": 3.5702,
                "GIP": 0.1768,
                "GMD": 16.0478,
                "GNF": 1911.0278,
                "GTQ": 1.7261,
                "GYD": 46.8007,
                "HKD": 1.7403,
                "HNL": 5.6412,
                "HRK": 1.5918,
                "HTG": 29.4508,
                "HUF": 86.0912,
                "IDR": 3536.6358,
                "ILS": 0.8368,
                "IMP": 0.1768,
                "INR": 18.8701,
                "IQD": 292.7532,
                "IRR": 9828.1429,
                "ISK": 30.6552,
                "JEP": 0.1768,
                "JMD": 35.4742,
                "JOD": 0.1585,
                "JPY": 34.517,
                "KES": 28.8806,
                "KGS": 19.3685,
                "KHR": 905.2237,
                "KID": 0.344,
                "KMF": 103.9346,
                "KRW": 311.4205,
                "KWD": 0.06837,
                "KYD": 0.1863,
                "KZT": 111.2424,
                "LAK": 4897.8225,
                "LBP": 20008.0564,
                "LKR": 65.1731,
                "LRD": 40.8658,
                "LSL": 4.0362,
                "LYD": 1.0933,
                "MAD": 2.2354,
                "MDL": 4.0514,
                "MGA": 1042.3788,
                "MKD": 13.0279,
                "MMK": 643.8304,
                "MNT": 760.5553,
                "MOP": 1.7925,
                "MRU": 8.9312,
                "MUR": 10.4054,
                "MVR": 3.4526,
                "MWK": 388.6836,
                "MXN": 4.5396,
                "MZN": 14.3059,
                "NAD": 4.0362,
                "NGN": 374.3509,
                "NIO": 8.2178,
                "NOK": 2.466,
                "NPR": 30.1936,
                "NZD": 0.3798,
                "OMR": 0.08596,
                "PAB": 0.2236,
                "PEN": 0.8481,
                "PGK": 0.8951,
                "PHP": 13.1693,
                "PKR": 62.1512,
                "PLN": 0.9141,
                "PYG": 1754.5564,
                "QAR": 0.8137,
                "RON": 1.0516,
                "RSD": 24.7305,
                "RUB": 22.4339,
                "RWF": 305.7644,
                "SAR": 0.8383,
                "SBD": 1.8861,
                "SCR": 3.2088,
                "SDG": 99.9956,
                "SEK": 2.4486,
                "SGD": 0.2995,
                "SHP": 0.1768,
                "SLE": 5.1057,
                "SLL": 5105.6771,
                "SOS": 127.8755,
                "SRD": 7.936,
                "SSP": 787.6906,
                "STN": 5.1759,
                "SYP": 2886.6777,
                "SZL": 4.0362,
                "THB": 7.7304,
                "TJS": 2.385,
                "TMT": 0.7825,
                "TND": 0.7053,
                "TOP": 0.5339,
                "TRY": 7.7229,
                "TTD": 1.5159,
                "TVD": 0.344,
                "TWD": 7.2359,
                "TZS": 593.0776,
                "UAH": 9.2367,
                "UGX": 819.0119,
                "USD": 0.2236,
                "UYU": 9.5665,
                "UZS": 2866.5417,
                "VES": 10.248,
                "VND": 5674.7807,
                "VUV": 27.0211,
                "WST": 0.6197,
                "XAF": 138.5794,
                "XCD": 0.6036,
                "XDR": 0.1704,
                "XOF": 138.5794,
                "XPF": 25.2104,
                "YER": 55.8572,
                "ZAR": 4.0361,
                "ZMW": 6.1946,
                "ZWL": 1.1814
              }
        })
    }

    else {
        res.json(req.query);
    }

    

    // if got some error
    // {
    //     "result": "error",
    // }
})

// GET data from server
// app.get("/currency-exchange", async (req,res)=> {
//     try {
//         const response = await fetch(`https://v6.exchangerate-api.com/v6/${req.apiKey}/latest/${req.query.currency}`);

//         if (!response.ok) {
//             throw new Error('Failed to fetch data');
//         }

//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching data'});
//     }
// })


// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});