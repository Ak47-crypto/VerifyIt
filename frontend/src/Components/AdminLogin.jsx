import React, { useState, useContext, useEffect } from "react";
import context from "../context/SiteContext";
import abi from "../abi/fakeProduct.json";
import { ethers } from "ethers";
import "../css/Admin.css";
import Spinner from "./Spinner";
function AdminLogin() {
  const [connectionAdmin, setConnectionAdmin] = useState(false);
  const { handleAlerts, contractAdd, host, connection, setConnection } =
    useContext(context);
  const [walletAddress, setWalletAddress] = useState(null);
  const [addressSM, setAddressSM] = useState(null);
  const [data, setData] = useState(null);
  const [spinner, setSpinner] = useState(false);

  // web3
  const providerSellerAdd = async (event) => {
    event.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(walletAddress.sellerAddress);
    const addSeller = new ethers.Contract(contractAdd, abi.abi, signer);
    await addSeller.addSeller(addressSM.sellerAddress);
  };
  const providerManufacturerAdd = async (event) => {
    event.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(walletAddress);
    const addManufacturer = new ethers.Contract(contractAdd, abi.abi, signer);
    await addManufacturer.addManufacture(addressSM.manufacturerAddress);
  };
  const requestAccount = async () => {
    if (window.ethereum) {
      // console.log('metamask exist')

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setWalletAddress(accounts[0]);
        if (walletAddress === "null")
          handleAlerts(`Wallet Connected Successfully`, "success");
      } catch (error) {
        handleAlerts(`${error.message}`, "danger");
      }
    } else console.log("metamask does not exist");
  };

  async function connectWallet(event) {
    event && event.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      //   const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.BrowserProvider(window.ethereum);
      // console.log(provider)
    }
  }
  // web3-end

  const handleInput = (event) => {
    setAddressSM({ ...addressSM, [event.target.name]: event.target.value });
    console.log(addressSM);
  };
  const handleInputLogin = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  // backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    setConnection(true)
    setSpinner(true);
    const response = await fetch(`${host}/loginAdmin`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    console.log(response);
    const data2 = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", data2.token);
      localStorage.setItem("name", data2.name);
      localStorage.setItem("email", data2.email);
      localStorage.setItem("status", data2.status);
      localStorage.setItem("ids", data2.ids);
      localStorage.setItem("walletAddress", data2.walletAddress);
      setConnectionAdmin(true);
      // setConnection(true);
    }
    else
    setConnection(false)
    setSpinner(false);
  };
  // fetchAdmin
  useEffect(() => {
    async function fetchAdmin() {
      // setConnection(true);

      setSpinner(true);
      if (localStorage.getItem("token") || connection) {
        const response = await fetch(`${host}/fetchAdmin`, {
          method: "POST",
          headers: {
            "content-type": "applicaton/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          // setConnection(true);
          setSpinner(false);
        }
      }
    };
    fetchAdmin();
  }, []);
  console.log(spinner);

  if (!connection&&!localStorage.getItem("token"))
    return (
      <div
        class="m-3 d-flex flex-column align-iteams-center"
        style={{ minHeight: "calc(100vh - 155px)" }}
      >
        <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-12 login-key">
              <i class="fa fa-key" aria-hidden="true"></i>
            </div>
            <div class="col-lg-12 login-title">ADMIN PANEL</div>

            <div class="col-lg-12 login-form">
              <div class="col-lg-12 login-form">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label class="form-control-label">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInputLogin}
                      style={{ marginBottom: "20px" }}
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInputLogin}
                      style={{ marginBottom: "20px" }}
                      class="form-control"
                      
                    />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-text">
                      {/* <!-- Error Message --> */}
                    </div>
                    <div class="col-lg-6 login-btm login-button d-flex">
                      <button type="submit" class="btn btn-outline-primary">
                        LOGIN
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    );
  else if (connection||localStorage.getItem("token"))
    return (
      <div>
        {spinner ? (
          <Spinner />
        ) : (
          <div className="container" style={{ height: "calc(100vh - 56px)" }}>
            <div className="d-flex justify-content-center flex-column">
              <h1 className="text-center">{walletAddress}</h1>
              <button
                className="btn btn-primary"
                style={{ width: "20%", margin: "auto" }}
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
            <div className="row">
              <div className="col">
                <label>Enter Manufacturer wallet address to add</label>
                <input
                  onChange={handleInput}
                  type="text"
                  name="manufacturerAddress"
                  className="form-control mt-3"
                />
                <button
                  onClick={providerManufacturerAdd}
                  className="btn btn-primary mt-3"
                >
                  Add
                </button>
              </div>
              <div className="col">
                <label>Enter seller wallet address to add</label>
                <input
                  onChange={handleInput}
                  type="text"
                  name="sellerAddress"
                  className="form-control mt-3"
                />
                <button
                  onClick={providerSellerAdd}
                  className="btn btn-primary mt-3"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default AdminLogin;
