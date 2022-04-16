import React from "react";

import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from "./routs/home/home.component";
import Navigation from "./routs/navigation/navigation.component";
import Authentication from "./routs/authentication/authentication.componant";

const Shop=()=>(
  <div>
     <h1>I am the shop page</h1>
  </div>
)
function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
      <Route index element={<Home />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/auth" element={<Authentication />} />
      </Route>
      
    </Routes>
  );
}

export default App;
