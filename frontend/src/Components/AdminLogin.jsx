import React, { useState,useContext} from 'react'
import context from '../context/SiteContext'
import abi from '../abi/fakeProduct.json'
import { ethers } from 'ethers'

function AdminLogin() {
    const {handleAlerts,contractAdd}=useContext(context)
    const [walletAddress,setWalletAddress]=useState(null);
    const [addressSM,setAddressSM]=useState(null);
    const providerSellerAdd = async (event) => {
        event.preventDefault();
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner(walletAddress.sellerAddress)
        const addSeller = new ethers.Contract(contractAdd, abi.abi, signer)
        await addSeller.addSeller(addressSM.sellerAddress)

        
        
    }
    const providerManufacturerAdd = async (event) => {
        event.preventDefault();
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner(walletAddress)
        const addManufacturer = new ethers.Contract(contractAdd, abi.abi, signer)
        await addManufacturer.addManufacture(addressSM.manufacturerAddress)

        
        
    }
    const requestAccount = async () => {
       
        
        if (window.ethereum) {
            // console.log('metamask exist')

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });


                setWalletAddress(accounts[0]);
                if (walletAddress === 'null')
                    handleAlerts(`Wallet Connected Successfully`, 'success')
            } catch (error) {
                handleAlerts(`${error.message}`, 'danger')
            }

        }
        else
            console.log('metamask does not exist');
    }

    async function connectWallet(event) {
        event && event.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();

            //   const provider = new ethers.providers.Web3Provider(window.ethereum);
            const provider = new ethers.BrowserProvider(window.ethereum)
            // console.log(provider)
        }
    }
    const handleInput = (event) => {
        setAddressSM({ ...addressSM, [event.target.name]: event.target.value })
        console.log(addressSM)
    }
  return (
    <div className='container' style={{height:"calc(100vh - 56px)"}}>
        <div className="d-flex justify-content-center flex-column">
        <h1 className='text-center'>{walletAddress}</h1>
        <button className='btn btn-primary' style={{width:"20%",margin:"auto"}} onClick={connectWallet}>Connect Wallet</button>

        </div>
        <div className="row">
            <div className="col">
                <label >Enter Manufacturer wallet address to add</label>
                <input  onChange={handleInput} type="text" name="manufacturerAddress"  className='form-control mt-3'  />
                <button onClick={providerManufacturerAdd} className='btn btn-primary mt-3'>Add</button>
            </div>
            <div className="col">
                <label >Enter seller wallet address to add</label>
                <input onChange={handleInput} type="text" name="sellerAddress" className='form-control mt-3'  />
                <button onClick={providerSellerAdd} className='btn btn-primary mt-3'>Add</button>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin