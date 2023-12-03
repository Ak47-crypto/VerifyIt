import React, { useState, useContext, useEffect, useRef } from 'react'
import context from '../context/SiteContext'
import { ethers } from 'ethers'
import Spinner from './Spinner'
import abi from '../abi/fakeProduct.json'
import QrScanner from 'qr-scanner';


function ManuFacturerLogin() {
    const { host, alerts, handleAlerts, connection, setConnection, contractAdd } = useContext(context)
    const [data, setData] = useState({});
    const [walletAddress, setWalletAddress] = useState('null')
    const [fetchData, setFetchData] = useState(null)
    const [QrData, setQrData] = useState({})
    const [blockData, setBlockData] = useState({})

    const [choice, setChoice] = useState('')
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



        h: {
            color: "#black",
            sizes: {
                h1: { fontSize: "30px" },
                label: { fontSize: "20px" }
            },
            marginBottom: "20px"
        }

    }
    const setJsonData = (decodedResult) => {
        const jsonObj = JSON.parse(decodedResult.data)
        QrData.sn = jsonObj.sn
        QrData.name = jsonObj.name
        // QrData.source = jsonObj.source
        // QrData.destination = jsonObj.destination
        // console.log(jsonObj.sn)
        // data.sn = jsonObj.sn;
        // data.name = jsonObj.name;
        setQrData({ ...QrData })
        // setData({ ...data })

        console.log(QrData)
    }
    //qr-scanner
    const readcode = (event) => {
        const file = event.target.files[0];
        console.log(file)
        if (!file) {
            return;
        }
        QrScanner.scanImage(file, { returnDetailedScanResult: true })
            .then(result => setJsonData(result))
        // .catch(e => console.log(e));
    }


    const [decodedResults, setDecodedResults] = useState([]);

    const onNewScanResult = async (decodedText, decodedResult) => {

        // console.log("App [result]", JSON.parse(decodedResult.result.text));
        await setJsonData(decodedResult);
        setDecodedResults(prev => [...prev, decodedResult]);

        // console.log(decodedResults)
    };

    const providerWalletAdd = async (event) => {
        event.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            if (window.ethereum.networkVersion !== 11155111) {
                try{    
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0xaa36a7' }]
                });
            try {
                // console.log(data)
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner(walletAddress)
                const setProduct = new ethers.Contract(contractAdd, abi.abi, signer)
                console.log(QrData, blockData)
                await setProduct.productSeller(parseInt(QrData.sn), QrData.name, blockData.source, blockData.destination)
            }
            catch (err) {
                console.log(err)
                if (err.code === 'INVALID_ARGUMENT')
                    handleAlerts(`${err.code}: Please provide valid inputs`, 'warning')
                else
                    handleAlerts(`${err.reason}`, 'warning')
            }
        }
        catch(err){
            handleAlerts(`${err.message}`,'warning')
        }
        }
        else{
            handleAlerts('Please Switch to Sepolia Testnet','danger')
        }
        }
        else {
            handleAlerts('Please install MetaMask', 'warning')
        }
    }

    const providerWalletGet = async () => {
        // event.preventDefault();
        // if (ref.current) {
        //     ref.current.style.display = 'block';
        // }
        // const provider = new ethers.BrowserProvider(window.ethereum)
        // const signer = await provider.getSigner(walletAddress)
        // const setProduct = new ethers.Contract('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', abi.abi, signer)
        // // await setProduct.addProduct(parseInt(data.sn),data.productName,data.source,data.destination)

        // // 
        // console.log(choice);
        // setQrData(await setProduct.productSeller(parseInt(choice)))
        // console.log(QrData[0])
    }
    async function fetchDetails() {
        try {

            const response = await fetch(`${host}/fetchSeller`, {
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

        if (typeof window.ethereum !== 'undefined') {
            ethereum.on('accountsChanged', (accounts) => {
                // Handle the new account
                setWalletAddress(accounts[0])
                console.log(accounts[0])
            })
            ethereum.on('chainChanged', (chainId) => {
                console.log(chainId)
                if (chainId === '0xaa36a7')
                    handleAlerts('successfully connected to sepolia test network', 'success')
                else
                    handleAlerts('please switched to sepolia test network', 'danger')

            })
        }

        async function fetchDetail() {

            try {
                spinner.load = true
                setSpinner({ ...spinner })
                if (localStorage.getItem('token')) {
                    setConnection(true)
                    const response = await fetch(`${host}/fetchSeller`, {
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
                        console.log(connection);
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
        if (typeof window.ethereum !== 'undefined') {
            return () => {
                ethereum.off('accountsChanged', (accounts) => {
                    // Handle the new account
                    setWalletAddress(accounts[0])
                    console.log(accounts[0])
                });
            }
        }

    }, [connection])
    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
        console.log(data)
    }
    const handleInput2 = (event) => {
        setBlockData({ ...blockData, [event.target.name]: event.target.value })
        console.log(blockData, event.target.name, event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        spinner.sign = true
        spinner.load = true
        setSpinner({ ...spinner })
        try {
            const response = await fetch(`${host}/loginSeller`, {
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
                localStorage.setItem("token", data2.token)
                localStorage.setItem("name", data2.name)
                localStorage.setItem("email", data2.email)
                localStorage.setItem("status", data2.status)
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

                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xaa36a7' }]
                });
            }
            //   const provider = new ethers.providers.Web3Provider(window.ethereum);
            const provider = new ethers.BrowserProvider(window.ethereum)
            // console.log(provider)
        }
        else {
            handleAlerts('Please install MetaMask', 'warning')
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
                            <h1 className='my-3 text-center'>Seller Login</h1>
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
                        <div className="d-flex flex-column justify-content-center my-3 mx-3" style={{ minHeight: "calc(100vh - 152px)", opacity: ".9" }}>
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
                                                {/* {QrData?<div>
                                                <p>Serial Number : {String(QrData[0])}</p>
                                                <p>Name : {QrData[1]}</p>
                                                <p>Destination : {QrData[2]}</p>
                                                <p>Source : {QrData[3]}</p>
                                                </div>:
                                                <div>
                                                <label className="form-label">Enter Serial Number</label>
                                                <input style={infoStyle.box} required name='productName' onChange={(event)=>setChoice(event.target.value)} type="text" className="form-control" /></div>} */}

                                                {/* <button ref={ref}  style={{display:"none"}} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Generate QR
                                                </button> */}
                                                {/* <Html5QrcodePlugin
                                                    fps={10}
                                                    qrbox={250}
                                                    disableFlip={false}
                                                    qrCodeSuccessCallback={onNewScanResult}
                                                />
                                                <ResultContainerPlugin results={decodedResults} /> */}
                                                {/* <input type="file" onChange={(event) => readcode(event)} /> */}
                                                <label className="form-label" >Upload QRcode</label>
                                                <div class="input-group">

                                                    <input onChange={(event) => readcode(event)} type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                                    {/* <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button> */}
                                                </div>
                                            </div>
                                            {/* <button className='btn btn-warning'>Add Product </button> */}
                                        </div>

                                    </div>
                                    {/* <div className=" mt-3 d-flex justify-content-center">
                                        <button type="submit" onClick={providerWalletGet} className="btn btn-primary">Get Product Details</button>
                                    </div> */}
                                </div>
                                <div className="col-md-4">
                                    <form onSubmit={providerWalletAdd}>

                                        <div className="mb-3">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Serial Number</label>
                                            <input placeholder='From QRcode' readOnly value={QrData.sn} style={infoStyle.box} required name='sn' type="text" className="form-control" aria-describedby="emailHelp" />
                                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                        </div>
                                        <div className="mb-3">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Product Name</label>
                                            <input placeholder='From QRcode' readOnly value={QrData.name} style={infoStyle.box} required name='productName' type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3 ">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Source</label>

                                            <input style={infoStyle.box} required name='source' onChange={handleInput2} type="text" className="form-control" />

                                        </div>
                                        <div className="mb-3 ">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Destination</label>

                                            <input style={infoStyle.box} required name='destination' onChange={handleInput2} type="text" className="form-control" />

                                        </div>
                                        <div className="mb-3 ">
                                            <label style={infoStyle.h.sizes.label} className="form-label">Remarks</label>

                                            <input style={infoStyle.box} required name='remarks' onChange={handleInput2} type="text" className="form-control" />

                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary">Add Product</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                        {/* <!-- Modal --> */}
                        {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">QR CODE</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body d-flex justify-content-center">
                                        <QRCodeSVG value={JSON.stringify({
                                            sn: String(QrData[0]),
                                            name: QrData[1],
                                            source: QrData[2],
                                            destination: QrData[3]
                                        })} />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                }

            </>
        )

}


export default ManuFacturerLogin