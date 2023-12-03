import React, { useState, useContext } from 'react'
import abi from '../abi/fakeProduct.json'
import { Contract, ethers } from 'ethers'
import context from '../context/SiteContext'


function ConsumerLogin() {
    const [sno, setSno] = useState('')
    const { contractAdd, handleAlerts } = useContext(context)
    const [walletAddress, setWalletAddress] = useState(true);
    const [productData, setProductData] = useState(null);
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
    const providerManufacturerAdd = async (event) => {
        event.preventDefault();
        if(typeof window.ethereum!=='undefined'){
        try {
            setProductData(null)
            const provider = new ethers.BrowserProvider(window.ethereum)
            // console.log(walletAddress)
            const signer = await provider.getSigner()
            const addManufacturer = new ethers.Contract(contractAdd, abi.abi, signer)
            const chainData = await addManufacturer.viewAllProduct(sno);
            // console.log(chainData)
            function replacer(key, value) {
                if (typeof value === 'bigint') {
                    return value.toString();
                }
                return value;
            }
            const resultdata = JSON.parse(JSON.stringify(chainData, replacer));
            if (resultdata.length != 0) {
                handleAlerts('Fetched Successfully', 'success')
                setProductData(resultdata)
            }
            else {
                handleAlerts('Product does not exist', 'warning')
            }
        }
        catch (err) {
            if (err.code == 'INVALID_ARGUMENT') {
                const a = String(err.shortMessage).split(':')
                handleAlerts(`${a[1]}`, "warning")
            }
        }
    }
    else{
        handleAlerts('Please instal MetaMask','warning')
    }

    }
 // web3
//  const requestAccount = async () => {

//     if (window.ethereum) {
//         // console.log('metamask exist')

//         try {
//             const accounts = await window.ethereum.request({
//                 method: "eth_requestAccounts",
//             });


//             setWalletAddress(accounts[0]);
//             if (walletAddress === 'null')
//                 handleAlerts(`Wallet Connected Successfully`, 'success')
//         } catch (error) {
//             handleAlerts(`${error.message}`, 'danger')
//         }

//     }
//     else
//         console.log('metamask does not exist');
// }

// async function connectWallet(event) {
//     event && event.preventDefault();
//     if (typeof window.ethereum !== 'undefined') {
//         await requestAccount();

//         //   const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const provider = new ethers.BrowserProvider(window.ethereum)
//         // console.log(provider)
//     }
// }

    const timeconverter = (stamp) => {
        let time = new Date(stamp * 1000)
        return time;

    }
    return (
        <div className='mt-5' style={{ minHeight: "calc(100vh - 180px)" }}>
            <div className='d-flex justify-content-center ' style={{ flexDirection: "column" }}>
                {walletAddress?<h1 style={{margin:"auto"}}>{walletAddress}</h1>:
            <button className='btn btn-primary' style={{margin:"auto"}} /*onClick={connectWallet}*/>Connect Wallet</button>
                }
                {walletAddress?<form onSubmit={providerManufacturerAdd}>
                    <h1 className='pt-3 text-center'>Enter Product Serial Number</h1>
                    <input required placeholder='Serial Number' onChange={(event) => setSno(event.target.value)} style={{ width: "15rem", margin: "auto" }} type="number" name="sellerAddress" className='form-control mt-3' />
                    <button style={{ width: "20%", margin: "auto", display: "block" }} type='submit' className='btn btn-primary mt-3'>Add</button>
                </form>:<div></div>}
            </div>
            {walletAddress?<h1 className='mt-3 text-center'>Product Flow</h1>:<div></div>}
            <div className="row d-flex justify-content-center align-iteams-center flex-column" style={{ margin: 'auto' }}>
                {productData && productData.map((product, index) => (
                    // <div  key={index}>
                    //     {index==0?<h2>Product Added by Manufacturer</h2>:
                    //     <h2>Product #{index + 1}</h2>
                    //     }

                    //   <p>
                    //     <strong>SNO:</strong> {product[0]}
                    //   </p>
                    //   <p>
                    //     <strong>Name:</strong> {product[1]}
                    //   </p>
                    //   <p>
                    //     <strong>Origin:</strong> {product[2]}
                    //   </p>
                    //   <p>
                    //     <strong>Destination:</strong> {product[3]}
                    //   </p>
                    //   {/* Add more details as needed */}
                    //   <hr />
                    // </div> 

                    <div key={index} className="card mt-3" style={{ margin: "auto", width: "18rem", infoStyle }}>
                        <div className="card-body">
                            <h5 className="card-title">SNO:{product[0]}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">Product Name:{product[1]}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">Source:{product[2]}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">Destination:{product[3]}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">TimeStamp:{String(timeconverter(product[4]))}</h5>

                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default ConsumerLogin