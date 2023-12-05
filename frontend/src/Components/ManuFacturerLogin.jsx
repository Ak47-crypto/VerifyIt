import React, { useState, useContext, useEffect, useRef } from 'react'
import context from '../context/SiteContext'
import { ethers } from 'ethers'
import Spinner from './Spinner'
import abi from '../abi/fakeProduct.json'
import { QRCodeSVG } from 'qrcode.react'

function ManuFacturerLogin() {
    const { host, alerts, handleAlerts, connection, setConnection, contractAdd } = useContext(context)
    const [data, setData] = useState(null);
    const [walletAddress, setWalletAddress] = useState('null')
    const [fetchData, setFetchData] = useState(null)
    const [blockData, setBlockData] = useState()
    const [choice, setChoice] = useState('')
    const [loadData, setLoadData] = useState(false)
    const [qrName,setQrName]=useState('')
    const [spinner, setSpinner] = useState({
        sign: null,
        load: null
    })
    const ref = useRef();
    const infoStyle = {

        box: {
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f9fa"
        },

        widths:{width:"50%"},

        h: {
            color: "#black",
            sizes:{
            h1:{fontSize: "30px"},
            label:{fontSize: "20px"}
            },
            marginBottom: "20px"
        }

    }
    // qr image download
    const onImageCownload = () => {
        const svg = document.getElementById("QRCodeScaled");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = `${qrName?qrName:blockData[1]+blockData[2].replace(/\s/g,'')}`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    const providerWalletAdd = async (event) => {
        event.preventDefault();
        if(window.ethereum){
        if (window.ethereum.networkVersion !== 11155111) {
            try{    
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xaa36a7' }]
            });
          
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner(walletAddress)
            const setProduct = new ethers.Contract(contractAdd, abi.abi, signer)
            await setProduct.addProduct(parseInt(data.sn), data.productName, data.source, data.destination)
        }
        catch (err) {
            if (err.code === 'INVALID_ARGUMENT'&&String(err.value)==='NaN'){
                handleAlerts(`${err.code}: Serial Number must be a Number`, 'warning')
            }
            else 
                handleAlerts(`${err.reason}`, 'warning')
        }
    }catch(err){
        handleAlerts(`${err.message}`,'warning')
    }
    }
    else
    handleAlerts('sepolia network not added','danger')
    }
    else
{handleAlerts('Please install MetaMask','warning')
} 
}
   // useEffect(() => {
    //     // console.log(blockData)
    //     if (blockData && String(blockData[1]) !== '0') {
    //         if (ref.current) {
    //             ref.current.style.display = 'block';
    //         }
    //         setLoadData(true)
    //     }
    //     else {
    //         if (ref.current) {
    //             ref.current.style.display = 'none';
    //         }
    //         setLoadData(false)
    //         handleAlerts('Product does not exist ', 'warning')
    //     }
    // }, [blockData])

    const providerWalletGet = async (event) => {
        event.preventDefault();

        if(window.ethereum){
        if (window.ethereum.networkVersion !== 11155111) {
            try{    
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xaa36a7' }]
            });

        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner(walletAddress)
        const setProduct = new ethers.Contract(contractAdd, abi.abi, signer)
        // await setProduct.addProduct(parseInt(data.sn),data.productName,data.source,data.destination)

        // 
        const getData = await setProduct.getProduct(parseInt(choice))
        setBlockData(getData)
        setBlockData((prev)=>{
            if (prev && String(prev[1]) !== '0') {
                if (ref.current) {
                    ref.current.style.display = 'block';
                }
                setLoadData(true)
                setBlockData(getData)
            }
            else {
                if (ref.current) {
                    ref.current.style.display = 'none';
                }
                setLoadData(false)
                handleAlerts('Product does not exist ', 'warning')
            }
        })
    }catch(err){
        handleAlerts(`${err.message}`,'warning')
    }
    }
        }
        else{
            handleAlerts('Please install MetaMask','warning')
        }

    }
    async function fetchDetails() {
        try {

            const response = await fetch(`${host}/fetchManufacturer`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            })

            if (response.status === 200) {
                const data2 = await response.json()
                setFetchData(
                    {
                        name: data2.name,
                        email: data2.email,
                        address: data2.address
                    }
                )
                setConnection(true)

            }
        }
        catch (err) {
            handleAlerts("Server Down", 'warning')
        }
    }


    useEffect(() => {
        if(window.ethereum){
        ethereum.on('accountsChanged', (accounts) => {
            // Handle the new account
            setWalletAddress(accounts[0])
            console.log(accounts[0])
        })
        ethereum.on('chainChanged',(chainId)=>{
            console.log(chainId)
            if(chainId==='0xaa36a7')
            handleAlerts('successfully connected to sepolia test network','success')
            else
            handleAlerts('please switched to sepolia test network','danger')

        })}
        async function fetchDetail() {
            try {
                spinner.load = true
                setSpinner({ ...spinner })
                if (localStorage.getItem('token')) {
                    setConnection(true)
                    const response = await fetch(`${host}/fetchManufacturer`, {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json",
                            "auth-token": localStorage.getItem('token')
                        }
                    })

                    if (response.status === 200) {
                        const data2 = await response.json()
                        setFetchData(
                            {
                                name: data2.name,
                                email: data2.email,
                                address: data2.address
                            }
                        )
                        setConnection(true)
                        // console.log(connection);
                        spinner.load = false
                        setSpinner({ ...spinner })
                        connectWallet();
                    }
                }
            }
            catch (err) {
                handleAlerts("Server Down", 'warning')
            }
        }
        fetchDetail()
        if(window.ehereum){
        return () => {
            ethereum.off('accountsChanged',(accounts) => {
                // Handle the new account
                setWalletAddress(accounts[0])
                console.log(accounts[0])
            });
        }
    }
    }, [connection])
    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        spinner.sign = true
        spinner.load = true
        setSpinner({ ...spinner })
        try {
            const response = await fetch(`${host}/loginManufacturer`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body:
                    JSON.stringify(
                        {
                            "email": data.email,
                            "password": data.password
                        }
                    )

            })
            const data2 = await response.json();
            if (response.status === 200) {
                console.log(data2,data2.ids)
                localStorage.setItem("token", data2.token)
                localStorage.setItem("name", data2.name)
                localStorage.setItem("email", data2.email)
                localStorage.setItem("status", data2.status)
                localStorage.setItem("ids", data2.ids)
                setConnection(true)

                connectWallet();
                fetchDetails()
                setData(null)
            }
            else if (response.status === 400) {

                handleAlerts(`${data2.result}`, 'warning')
            }
            else if (response.status === 500) {
                handleAlerts(`Internal Server Error`, 'danger')
            }
        }
        catch (err) {
            handleAlerts(`${err.message == 'Failed to fetch' ? 'Server Down' : err.message}`, "danger")
        }
        spinner.sign = false
        spinner.load = false
        setSpinner({ ...spinner })
    }

    // web3
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
        
        if (window.ethereum.networkVersion !== 11155111) {
                try{
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xaa36a7' }]
                  });
                }
                catch(err){
                    handleAlerts(`${err.message}`,'warning')
                }
                }       

            //   const provider = new ethers.providers.Web3Provider(window.ethereum);
            const provider = new ethers.BrowserProvider(window.ethereum)
            // console.log(provider)
        }
        else{
            handleAlerts('Please install MetaMask','warning')
        }
    }

    if (!connection)
        return (
            <section className="" style={{ minHeight: "calc(100vh - 135px)" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h1 className='my-3 text-center'>Manufacturer Login</h1>
                            <form onSubmit={handleSubmit}>
                                {/* <!-- Email input --> */}

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example13">Email address</label>

                                    <input required type="email" onChange={handleInput} name='email' id="form1Example13" className="form-control form-control-lg" />
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example23">Password</label>

                                    <input required type="password" name='password' onChange={handleInput} id="form1Example23" className="form-control form-control-lg" />
                                </div>

                                <br />

                                {/* <!-- Submit button --> */}
                                <div className="d-flex justify-content-center">
                                    {spinner.sign ? <button disabled type="submit" className="btn btn-primary btn-lg " style={{ width: "12rem" }}><div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    </button> :
                                        <button type="submit" className="btn btn-primary btn-lg " style={{ width: "12rem" }}>Log In
                                        </button>}
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    else if (connection)
        return (
            <>
                {spinner.load ?
                    // <div style={{ minHeight: "calc(100vh - 56px)" }} className="d-flex justify-content-center align-items-center">
                    //     <img src={Spinner} />
                    // </div> 
                    <Spinner /> : <div>
                        <div className="d-flex flex-column justify-content-center my-3 mx-3 opacity75" style={{ minHeight: "calc(100vh - 152px)",opacity:".8" }}>
                            <div className="row">
                                <div className="col-md-8 p-5" >
                                    <div className="card" style={infoStyle.box} >
                                        {/* <img src="..." className="card-img-top" alt="..."/> */}
                                        <div className="card-body" >
                                            <h5 className="card-title" style={infoStyle.h.sizes.h1}>Company name : {fetchData && fetchData.name}</h5>
                                            <div >
                                                <p className="card-text">Address : {fetchData && fetchData.address}</p>
                                                <p href="#" >Company Email : {fetchData && fetchData.email}</p>
                                                <p>Wallet Address : {walletAddress}</p>
                                                {loadData ? <div>
                                                    <p>Serial Number : {String(blockData&&blockData[1])}</p>
                                                    <p>Name : {blockData&&blockData[2]}</p>
                                                    <p>Destination : {blockData&&blockData[3]}</p>
                                                    <p>Source : {blockData&&blockData[4]}</p>

                                                </div> : <div>
                                                    {/* <label className="form-label">Enter Serial Number</label>
                                                    <input style={infoStyle.box} required name='productName' onChange={(event) => setChoice(event.target.value)} type="text" className="form-control" /> */}
                                                </div>}
                                                {/* <button ref={ref} className="btn btn-primary" style={{ display: "none" }}>Generate QR</button> */}
                                                <button ref={ref} style={{ display: "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Generate QR
                                                </button>


                                            </div>
                                            {/* <button className='btn btn-warning'>Add Product </button> */}
                                        </div>

                                    </div>
                                    <div style={infoStyle} className='mt-5'>
                                        <div className="container">
                                            <form onSubmit={providerWalletGet}>
                                                <div className=" d-flex flex-column justify-content-center">
                                        <label style={infoStyle.h.sizes.label} className="form-label text-center">Enter Serial Number</label>
                                        <input  style={infoStyle.widths} required name='productName' onChange={(event) => setChoice(event.target.value)} type="text" className="form-control m-auto" />
                                        
                                    
                                        <button type="submit"  className="mt-3 btn btn-primary m-auto">Get Product Details</button>
                                        </div>
                                        </form>
                                    </div>
                                        </div>
                                </div>
                                <div className="col-md-4">
                                    <form onSubmit={providerWalletAdd}>

                                        <div className="mb-3">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Serial Number</label>
                                            <input style={infoStyle.box} required name='sn' onChange={handleInput} type="text" className="form-control" aria-describedby="emailHelp" />
                                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                        </div>
                                        <div className="mb-3">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Product Name</label>
                                            <input style={infoStyle.box} required name='productName' onChange={handleInput} type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3 ">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Source</label>

                                            <input style={infoStyle.box} required name='source' onChange={handleInput} type="text" className="form-control" />

                                        </div>
                                        <div className="mb-3 ">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Destination</label>

                                            <input style={infoStyle.box} required name='destination' onChange={handleInput} type="text" className="form-control" />

                                        </div>
                                        <div className="mb-3 ">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Remarks</label>

                                            <input style={infoStyle.box} required name='remarks' onChange={handleInput} type="text" className="form-control" />

                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary">Add Product</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">QR CODE</h5>
                                        
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body d-flex justify-content-center">
                                        {blockData && <QRCodeSVG
                                            id="QRCodeScaled"
                                            value={JSON.stringify({
                                                sn: String(blockData[1]),
                                                name: blockData[2],
                                                source: blockData[3],
                                                destination: blockData[4]

                                            })} />}
                                        {/* <QRCode
                                            id="QRCodeScaled"
                                            size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            title="Custom Title"
                                            value={JSON.stringify({
                                                sn:String(blockData[1]),
                                                name:blockData[2],
                                                source:blockData[3],
                                                destination:blockData[4]
                                            })}
                                            viewBox={`0 0 256 256`}
                                            
                                        /> */}
                                    </div>
                                    <div className="modal-footer">
                                    <label >Qr Code Name</label>
                                        <input placeholder='Default sn+name' style={{width:"30%"}} required name='destination' onChange={(event)=>setQrName(event.target.value)} type="text" className="form-control mr-3" />

                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" onClick={onImageCownload} className="btn btn-success" data-bs-dismiss="modal">Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </>
        )

}


export default ManuFacturerLogin
