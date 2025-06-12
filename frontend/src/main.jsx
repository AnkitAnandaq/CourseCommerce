import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51RYJbO2Nl9aj9R5n96mhZFnfkz9Ueo1IHSuWOshRBbYaw1Ttq1x1hS75x5ksMbk6A84dvKfvsyHr5nchQX4RO6kC00HLEXOVtC"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);