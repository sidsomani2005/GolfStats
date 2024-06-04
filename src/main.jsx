import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx';
import Beginning from './beginning.jsx';
import Entry from './entry.jsx';
import Summary from './summary.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={"/GolfStats/"}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/beginning" element={<Beginning />} />
        <Route path="/entry/:courseName" element={<Entry />} />
        <Route
					path="/summary/:courseName/:fwHit/:lessTwenty/:twenty30/:thirty40/:forty50/:fifty60/:sixty70/:seventy80/:eighty90/:ninety100/:putts/:penalties/:gir/:totalFW/:threePuttCount/:longPutts/:shortPutts/:totalGSBunker/:totalFWBunker/:totalPay/:totalScore/:pars/:birdies/:eagles/:bogeys/:doubleBogeys"
					element={<Summary />}
				/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
