import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SiteStates from './context/SiteStates'
import Login from './Components/Login'
import ManuFacturerLogin from './Components/ManuFacturerLogin'
import SellerLogin from './Components/SellerLogin'
import Home from './Components/Home'
import Footer from './Components/Footer'
import ConsumerLogin from './Components/ConsumerLogin'
import img from '../5039684.jpg'
import About from './Components/About'
import Alerts from './Components/Alerts'
import SignOut from './Components/SignOut'
import AdminLogin from './Components/AdminLogin'
function App() {
    return (
        <>
            <SiteStates>

                <BrowserRouter>
                    
                    <Navbar />
                    <Alerts/>
                    {/* <div style={{backgroundImage: `url(${img})`,minHeight:"100vh"} }> */}
                    <Routes>
                        <Route path='/signout' element={<SignOut/>}></Route>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/login/manufacturerLogin' element={<ManuFacturerLogin />}></Route>
                        <Route path='/login/sellerLogin' element={<SellerLogin />}></Route>
                        <Route path='/login/consumerLogin' element={<ConsumerLogin/>}></Route>
                        <Route path='/login/adminLogin' element={<AdminLogin/>}></Route>

                        <Route path='/about' element={<About/>} ></Route>
                    </Routes>
                    
                    <Footer/>
                    {/* </div> */}
                </BrowserRouter>
            </SiteStates>
        </>
    )
}

export default App
