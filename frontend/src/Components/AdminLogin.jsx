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
  const [spinner, setSpinner] = useState({
    sign: null,
    load: null,
  });

  // web3
  const providerSellerAdd = async (event) => {
    event.preventDefault();
    if (typeof window.ethereum != "undefined") {
      if (window.ethereum.networkVersion !== 11155111) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }],
          });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner(walletAddress.sellerAddress);
          const addSeller = new ethers.Contract(contractAdd, abi.abi, signer);
          await addSeller.addSeller(addressSM.sellerAddress);
        } catch (err) {
          if(err.code===4001){
          handleAlerts(`${err.message}`, "warning");}
          else
          handleAlerts(`${err.reason}`, "warning")
          console.log(err);
        }
      }
    } else handleAlerts("Please install MetaMask", "warning");
  };
  const providerManufacturerAdd = async (event) => {
   event.preventDefault();
    if (typeof window.ethereum != "undefined") {
      if (window.ethereum.networkVersion !== 11155111) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }],
          });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner(walletAddress);
          const addManufacture = new ethers.Contract(contractAdd, abi.abi, signer);
          await addManufacture.addManufacture(addressSM.manufacturerAddress);
        } catch (err) {
          if(err.code===4001){
          handleAlerts(`${err.message}`, "warning");}
          else
          handleAlerts(`${err.reason}`, "warning")
          console.log(err);
        }
      }
    } else handleAlerts("Please install MetaMask", "warning");
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
      if (window.ethereum.networkVersion !== 11155111) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }],
          });
        } catch (err) {
          handleAlerts(`${err.message}`, "warning");
        }
      }
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
    try {
      spinner.sign = true;
      setSpinner({ ...spinner });

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
        connectWallet();
        setConnection(true);
        setConnectionAdmin(true);
        // setConnection(true);
      } else if (response.status === 400) {
        handleAlerts(`${data2.result}`, "warning");
        setConnection(false);
      } else if (response.status === 401) {
        handleAlerts(`${data2.result}`, "warning");
        setConnection(false);
      } else {
        handleAlerts(`${data2.result}`, "warning");
        setConnection(false);
      }
      spinner.sign = false;

      setSpinner({ ...spinner });
    } catch (err) {
      console.log(err);
      handleAlerts(`Server Down `, "warning");
      setConnection(false);
      spinner.sign = false;

      setSpinner({ ...spinner });
    }
  };
  // web3-useEffect
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const accountsChanging = (accounts) => {
        // Handle the new account
        setWalletAddress(accounts[0]);
        // const add=localStorage.getItem("walletAddress")
        if (localStorage.getItem("walletAddress") != accounts[0]) {
          handleAlerts("Please use the contract owner wallet", "danger");
        } else handleAlerts("contract owner wallet connected", "success");
        console.log(typeof accounts[0], add);
      };
      const chainChanging = (chainId) => {
        console.log(chainId);
        if (chainId === "0xaa36a7")
          handleAlerts(
            "successfully connected to sepolia test network",
            "success"
          );
        else handleAlerts("please switched to sepolia test network", "danger");
      };

      ethereum.on("accountsChanged", accountsChanging);
      ethereum.on("chainChanged", chainChanging);
      return () => {
        ethereum.off("accountsChanged", accountsChanging);
        ethereum.off("chainChainged", chainChanging);
      };
    }
  });

  // fetchAdmin
  useEffect(() => {
    async function fetchAdmin() {
      // setConnection(true);

      if (localStorage.getItem("token") || connection) {
        spinner.load = true;
        setSpinner({ ...spinner });
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
          connectWallet()
          spinner.load = false;
          setSpinner({ ...spinner });
        }
      }
    }
    fetchAdmin();
  }, [connection]);
  console.log(spinner);

  if (!connection && !localStorage.getItem("token"))
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
                    {spinner.sign ? (
                      <div class="col-lg-6 login-btm login-button d-flex">
                        <button
                          disabled
                          type="submit"
                          className="btn btn-primary  "
                          style={{ width: "12rem", height: "3rem" }}
                        >
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div class="col-lg-6 login-btm login-button d-flex">
                        <button
                          style={{ width: "12rem" }}
                          type="submit"
                          class="btn btn-lg btn-outline-primary"
                        >
                          LOGIN
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    );
  else if (connection || localStorage.getItem("token"))
    return (
      <div>
        {spinner.load ? (
          <Spinner />
        ) : (
          <div
            className="container mt-5 pt-3"
            style={{ height: "calc(100vh - 56px)" }}
          >
            <div className="d-flex justify-content-center flex-column">
              {localStorage.getItem("walletAddress") == walletAddress ? (
                <h1 className="text-center">Owner Wallet Address</h1>
              ) : (
                <h1 className="text-center">
                  This is not a Owner Wallet Address
                </h1>
              )}

              <h3 className="text-center" style={{whiteSpace:"pre-line",overflow:"hidden"}}>{walletAddress}</h3>
            </div>
            <div className="row">
              <div className="col">
                <form onSubmit={providerManufacturerAdd}>
                <label>Enter Manufacturer wallet address to add</label>
                <input
                  required
                  onChange={handleInput}
                  type="text"
                  name="manufacturerAddress"
                  className="form-control mt-3"
                />
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                >
                  Add
                </button>
                </form>
              </div>
              <div className="col">
                <form onSubmit={providerSellerAdd}>
                <label>Enter seller wallet address to add</label>
                <input required
                  onChange={handleInput}
                  type="text"
                  name="sellerAddress"
                  className="form-control mt-3"
                />
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                >
                  Add
                </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default AdminLogin;
