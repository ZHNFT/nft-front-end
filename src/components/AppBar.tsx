import { Children, FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  useWalletModal,
  WalletConnectButton,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { alertService, userService } from "services";
import { useRouter } from "next/router";
import { notify } from "utils/notifications";
import useUserStore from "stores/useUserStore";

export const AppBar: FC = (_props) => {
  // const { autoConnect, setAutoConnect } = useAutoConnect();
  const { publicKey, disconnect, wallet } = useWallet();
  const [userdata, setuserdata] = useState<any>();
  const [search, setSearch] = useState();
  const router = useRouter();

  const userstore = useUserStore((s) => s.currentUser);
  const { userSetAuth } = useUserStore();

  const basrurl = process.env.BASE_URL;

  const email = "";
  const password = "";

  function loginUserOnWalletConnect() {
    
    return userService
      .login(email, password, publicKey.toBase58())
      .then((res) => {
        
        if (res.statusCode === 200) {
          
          setuserdata(res.data);

          if (res.data.roleTypeId === 1 && res.data.accessToken === null) {
            router.push("/login");
          } else if (res?.data?.accessToken != null) {
            // setuserdata(res.data)
            userSetAuth(res.data);
          } else {
          }
          // else if(user.roleType === 2 && user.user.accessToken !== null) {
          //   notify({ type: 'success', message: 'Login Successfull' })
          // }
        } else {
          notify({
            type: "error",
            message: res.message ? `${res.message}` : res.name,
          });
        }
      })
      .catch((e) => {
        // console.log(e);
      });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setuserdata(user);
    }

    if (publicKey) {
      // if(!userdata) {
      //   setuserdata(user)
      // }
      loginUserOnWalletConnect();
    }
  }, [publicKey]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userservices = userService.userValue;
    if (user) {
      setuserdata(user);
    }
  }, []);

  function setLogout() {
    setuserdata({});
    userSetAuth({});
  }

  function handleinputchange(val) {
    setSearch(val);
  }
  function onFormSubmit(e) {
    e.preventDefault();
    if (search != "") {
      
      if (
        userdata &&
        userdata?.roleTypeId === 1 &&
        userdata?.accessToken != null
      ) {
        router.push(`/adminnftlist?searchText=${search}`);
      } else {
        router.push(`/explore?searchText=${search}`);
      }
    }
  }

  return (
    <>
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <div className="logo">
                  <Link href="/">
                    <a className="navbar-brand">
                      <img src="/logo.png" alt="" className="img-fluid" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-2">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse justify-content-end"
                  id="navbarSupportedContent"
                >
                  <div className="form d-flex">
                    <form className="form d-flex" onSubmit={onFormSubmit}>
                      <input
                        className="form-control"
                        onChange={(e) =>
                          handleinputchange(e.currentTarget.value)
                        }
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button type="submit" className="btn">
                        <img className="img-fluid" src="/search.png" alt="" />
                      </button>
                    </form>
                  </div>
                  {/* <input type="checkbox" checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} className="toggle d-none" /> */}
                  <ul className="navbar-nav align-items-center">
                    <li className="nav-item">
                      <Link href="/">
                        <a className="nav-link">Home</a>
                      </Link>
                    </li>
                    {userdata?.roleTypeId == 1 ? (
                      <li className="nav-item">
                        <Link href="/adminnftlist">
                          <a className="nav-link">
                            <i
                              className="fa fa-wpexplorer d-none d-sm-inline-block"
                              aria-hidden="true"
                            ></i>{" "}
                            Explore
                          </a>
                        </Link>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <Link href="/explore">
                          <a className="nav-link">
                            <i
                              className="fa fa-wpexplorer d-none d-sm-inline-block"
                              aria-hidden="true"
                            ></i>{" "}
                            Explore
                          </a>
                        </Link>
                      </li>
                    )}
                    {/* <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-files-o d-none d-sm-inline-block" aria-hidden="true"></i> Resources</a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                         */}
                    {/* <li><Link href="/nft"><a className="dropdown-item">NFT List</a></Link></li> */}
                    {/* <li><Link href="/projectdetail"><a className="dropdown-item">Project Detail</a></Link></li>
                                        <li><Link href="/projectcards"><a className="dropdown-item">Projects List Cards</a></Link></li>
                                        <li><Link href="/projectlist"><a className="dropdown-item">Projects List</a></Link></li> */}
                    {/* </ul>
                                </li> */}
                    {(userstore?.roleTypeId == 1 && userstore?.accessToken) ||
                    userstore?.accessToken ? (
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            src={
                              userdata?.displayImageURL
                                ? `${basrurl}${userdata?.displayImageURL}`
                                : "/no-user-image.png"
                            }
                            width={50}
                            height={50}
                            className="img-fluid logged-in rounded-circle"
                            alt=""
                          />
                          <span className="username d-none d-sm-inline-block">
                            Jhon Doe
                          </span>
                        </a>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <li>
                            <Link href="/profile">
                              <a className="dropdown-item">Profile</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/mywatchlist">
                              <a className="dropdown-item">My Watchlist</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/mybids">
                              <a className="dropdown-item">My Bids</a>
                            </Link>
                          </li>
                          {/* <li><Link href="/mintnewnft"><a className="dropdown-item">Mint New NFTG</a></Link></li> */}
                          {/* <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                        </ul>
                      </li>
                    ) : null}
                    {(userstore?.roleTypeId == 1 && userstore?.accessToken) ||
                    userstore?.accessToken ? (
                      <WalletDisconnectButton
                        onClick={() => {
                          userService.logout();
                          setLogout();
                          disconnect;
                        }}
                        className="btn btn-ghost btn-logout me-2"
                      />
                    ) : (
                      <></>
                    )}
                    <li className="nav-item">
                      {/* <WalletConnectButton className="btn btn-ghost mr-2" /> */}
                      <WalletMultiButton className="btn btn-ghost mr-2" />
                      {/* <WalletDisconnectButton onClick={() => { disconnect }} className="btn btn-ghost mr-2" />
                      <WalletConnectButton /> */}
                      {/* <button className="btn btn-ghost mr-2" onClick={() => { disconnect }}>Disconnect Wallet</button>  */}
                      {/* <WalletDisconnectButton /> */}
                    </li>
                    {/* <li>
                      {!wallet ? <button onClick={onRequestConnectWallet}>Connect Wallet</button> : <></>}
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
