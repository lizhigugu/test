// react import
import { useState } from "react";
import './App.css';

// Container Import
import MainPage from './containers/MainPage';
import TestPage from "./containers/testPage";
import ProductPage from "./components/ProductPage";
import CartList from './components/CartList';
import PersonalPage from "./containers/PersonalPage";
import BillPage from "./containers/BillPage";
import ManagerPage from "./containers/ManagerPage";
import CheckPage from "./containers/CheckPage";
import Login from "./containers/Login";

// Bar Component Import
import NavBar from "./components/BarComponent/NavBar";
import {Main, DrawerHeader} from "./components/BarComponent/barPositionHandler";

// Router import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Provider import
import {WebsiteProvider} from './containers/hooks/WebsiteContext'
function App() {
  // set state
  const [open, setOpen] = useState(false);

  return (
    
    <WebsiteProvider>
    <Router>
      <NavBar open={open} setOpen={setOpen}/>
      <Main open={open}>
        <DrawerHeader>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/check" element={<CheckPage />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/personal/bills" element={<BillPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cartlist" element={<CartList />} />
          <Route path="/manager" element={<ManagerPage />} />
        </Routes>
        </DrawerHeader>
      </Main>
    </Router>
    </WebsiteProvider>
  );
}

export default App;
