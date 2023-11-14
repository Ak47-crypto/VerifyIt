import React, { useState, useContext, useEffect } from 'react'
import context from '../context/SiteContext'
import { ethers } from 'ethers'
import Spinner from './Spinner'
function ManuFacturerLogin() {
    const { host, alerts, handleAlerts, connection, setConnection } = useContext(context)
    const [data, setData] = useState(null);
    const [walletAddress, setWalletAddress] = useState('null')
    const [fetchData, setFetchData] = useState(null)
    const [spinner, setSpinner] = useState({
        sign: null,
        load: null
    })
    const infoStyle = {

        box: {
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f9fa"
        },



        h: {
            color: "#28a745",
            fontSize: "24px",
            marginBottom: "20px"
        }

    }

    async function fetchDetails() {
        try {

            const response = await fetch(`${host}/fetchuser`, {
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
        async function fetchDetail() {
            try {
                spinner.load = true
                setSpinner({ ...spinner })
                if (localStorage.getItem('token')) {
                    setConnection(true)
                    const response = await fetch(`${host}/fetchuser`, {
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
            const response = await fetch(`${host}/login`, {
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

            //   const provider = new ethers.providers.Web3Provider(window.ethereum);
            const provider = new ethers.BrowserProvider(window.ethereum)
            // console.log(provider)
        }
    }

    if (!connection)
        return (
            // <div className="container my-3" style={{ width: "50%" }}>
            //     <form onSubmit={handleSubmit}>
            //         <h2 className='text-center'>Manufacturer Login</h2>
            //         <div className="mb-3">
            //             <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            //             <input onChange={handleInput} required type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            //             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            //         </div>
            //         <div className="mb-3">
            //             <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            //             <input onChange={handleInput} required type="password" name='password' className="form-control" id="exampleInputPassword1" />
            //         </div>
            //         <div className="mb-3 form-check">
            //             <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            //             <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            //         </div>
            //         <button type="submit" className="btn btn-primary">Submit</button>
            //     </form>
            // </div>
            <section className="" style={{minHeight:"calc(100vh - 152px)"}}>
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
                    <Spinner /> :
                    <div className="d-flex flex-column justify-content-center my-3 mx-3" style={{minHeight:"calc(100vh - 152px)"}}>
                        <div className="row">
                            <div className="col-md-8 p-5" >
                                <div className="card" >
                                    {/* <img src="..." className="card-img-top" alt="..."/> */}
                                    <div className="card-body" style={infoStyle.box}>
                                        <h5 className="card-title" style={infoStyle.h}>Company name : {fetchData && fetchData.name}</h5>
                                        <div >
                                            <p className="card-text">Address : {fetchData && fetchData.address}</p>
                                            <p href="#" >Company Email : {fetchData && fetchData.email}</p>
                                            <p>Wallet Address : {walletAddress}</p>
                                        </div>
                                        {/* <button className='btn btn-warning'>Add Product </button> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <form /*onSubmit={connectWallet}*/ >

                                    <div className="mb-3">
                                        <label className="form-label">Serial Number</label>
                                        <input style={infoStyle.box} required name='sn' onChange={handleInput} type="text" className="form-control" aria-describedby="emailHelp" />
                                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Product Name</label>
                                        <input style={infoStyle.box} required name='productName' onChange={handleInput} type="text" className="form-control" />
                                    </div>
                                    <div className="mb-3 ">
                                        <label className="form-label">Source</label>

                                        <input style={infoStyle.box} required name='source' onChange={handleInput} type="text" className="form-control" />

                                    </div>
                                    <div className="mb-3 ">
                                        <label className="form-label">Destination</label>

                                        <input style={infoStyle.box} required name='destination' onChange={handleInput} type="text" className="form-control" />

                                    </div>
                                    <div className="mb-3 ">
                                        <label className="form-label">Remarks</label>

                                        <input style={infoStyle.box} required name='remarks' onChange={handleInput} type="text" className="form-control" />

                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary">Add Product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>}
            </>
        )

}


export default ManuFacturerLogin