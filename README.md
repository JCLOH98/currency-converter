# currency-converter
 currency-converter is a user-friendly tool that enables seamless conversion of a single currency into multiple other currencies, offering real-time exchange rates for efficient financial transactions.

## Tech stack
- Frontend
    - [React](https://github.com/facebook/create-react-app)
    - TailwindCSS
- Backend
    - Express
- Deployment
    - Vercel

## .env setup
- Frontend
    - **REACT_APP_BACKEND_URI** which is the backend URL
- Backend
    - **EXCHANGE_RATE_API_KEY** which is the API key from https://app.exchangerate-api.com/

### Notes:
- Frontend and backend are setup into 2 project on Vercel
- Express setup with Vercel: https://vercel.com/guides/using-express-with-vercel
- For backend, has to strictly follow the directory path
- For backend, it did not link with GitHub, so need to manually use `vercel --prod` to deploy
---
---

**React commands**

 `npm start`
- Runs the app in the development mode.\
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


`npm run build`
- Builds the app for production to the `build` folder.\
- It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

