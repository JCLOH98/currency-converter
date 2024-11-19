
// Import the express module
const express=require('express');

// Create an instance of the express application
const app=express();

// simple get request
app.get("/",(req, res)=>{
    res.json({
        method: req.method,               // The HTTP method (GET, POST, etc.)
        url: req.url,                     // The requested URL
        headers: req.headers,             // Request headers
        query: req.query,                 // Query parameters (e.g., ?name=John)
        params: req.params,               // URL parameters (e.g., /users/:id)
        body: req.body,                   // The body of the request (for POST/PUT)
        cookies: req.cookies,             // Cookies sent by the client (requires cookie-parser middleware)
    });
})

// mockup currency exchange
app.get("/currency-exchange",(req,res)=> {
    // expected json
    // {
    //     "currency": "USD",
    // }
    if (req.query.currency=="USD") {
        // return json
        res.json({
            "result": "success",
            "conversion_rates": {
                "USD": 1,
                "MYR": 4.4,
                "AUD": 1.4817,
                "BGN": 1.7741,
                "CAD": 1.3168,
            }
        });
    }
    else {
        res.json(req.query);
    }

    

    // if got some error
    // {
    //     "result": "error",
    // }
})


// Specify a port number for the server
const port=5000;

// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});