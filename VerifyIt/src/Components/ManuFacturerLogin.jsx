import React, { useState, useContext, useEffect } from 'react'
import context from '../context/SiteContext'
function ManuFacturerLogin() {
    const {host,alerts,handleAlerts,connection,setConnection} = useContext(context)
    const [data, setData] = useState(null);
    
    const [fetchData, setFetchData] = useState(null)

    async function fetchDetail() {
        try{const response = await fetch(`${host}/fetchuser`, {
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
    catch(err){
        handleAlerts("Server Down",'warning')
    }
    }
    

    useEffect(() => {
        async function fetchDetail() {
            
            try{
                if(localStorage.getItem('token')){
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
            }}
        }
        catch(err){
            handleAlerts("Server Down",'warning')
        }
        }
        fetchDetail()

    }, [])
    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
        
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
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
            fetchDetail()
        }
        else if(response.status===400){
           
            handleAlerts(`${data2.result}`,'warning')
        }
        
    }
    if (!connection)
        return (
            <div className="container my-3" style={{ width: "50%" }}>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-center'>Manufacturer Login</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={handleInput} required type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={handleInput} required type="password" name='password' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    else if (connection)
        return (
            <>
                <div className="container">
                    <div className="d-flex justify-content-center my-3">
                        <div className="card" style={{ width: "18rem" }}>
                            {/* <img src="..." className="card-img-top" alt="..."/> */}
                            <div className="card-body">
                                <h5 className="card-title">Company name : {fetchData && fetchData.name}</h5>
                                <p className="card-text">Address : {fetchData && fetchData.address}</p>
                                <p href="#" >Company Email : {fetchData && fetchData.email}</p>
                                {/* <button className='btn btn-warning'>Add Product </button> */}
                            </div>
                        </div>
                    </div>
                    <div  className="d-flex justify-content-center my-3">
                        <form style={{width:"50rem"}}>

                            <div className="mb-3">
                                <label  className="form-label">Serial Number</label>
                                <input name='sn'  onChange={handleInput} type="text" className="form-control" aria-describedby="emailHelp" />
                                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <input name='productName'  onChange={handleInput} type="text" className="form-control" />
                            </div>
                            <div className="mb-3 ">
                                <label className="form-label">Source</label>

                                <input name='source' onChange={handleInput}  type="text" className="form-control" />

                            </div>
                            <div className="mb-3 ">
                                <label className="form-label">Destination</label>

                                <input name='destination' onChange={handleInput}  type="text" className="form-control" />

                            </div>
                            <div className="mb-3 ">
                                <label className="form-label">Remarks</label>

                                <input name='remarks'  onChange={handleInput} type="text" className="form-control" />

                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </>
        )
}

export default ManuFacturerLogin