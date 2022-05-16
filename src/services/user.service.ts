import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import useUserStore from "stores/useUserStore";

import { fetchWrapper } from 'helpers';
import { notify } from 'utils/notifications';

const { publicRuntimeConfig } = getConfig();
const baseUrl = process.env.BASE_URL;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
    getAllNFT,
    setMintNewNFT,
    getById,
    update,
    delete: _delete,
    getUser,
    setStartAuction,
    getNFTDetail,
    getProfile,
    setProfile,
    getNFTBids,
    addWish,
    getWatchList,
    setBidOnNft,
    getStatusOfNft,
    setWinner,
    getMyNFTBids,
    register,
    setSubscribe,
    getSearchNFT,
    isLoggedIn,
    getContactUs,
    getAdminWallet
};

function login(email, password, publicKey) {
    return fetchWrapper.post(`${baseUrl}Account/Login`, { email, password, publicKey })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            // console.log("from API",user);
            if(user.statusCode === 200) {
                userSubject.next(user.data);
                localStorage.setItem('user', JSON.stringify(user.data));
            }
            // const apppp = useUserStore.userSetAuth(user.data);
            // useUserStore.userSetAuth(user.data);
            return user;
        })
        .catch((e) => {
            // console.log(e);
            notify({ type: 'error', message: e.message ? `${e.name}: ${e.message}` : e.name });
        });
}

function isLoggedIn() {
    const loggedinusr = getUser()
    if(loggedinusr && loggedinusr?.accessToken) {
        return true
    } else {
        return false
    }
}

function register(email, password, confirmPwd) {
    let formData = new FormData();

    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('ConfirmPassword', confirmPwd);
    // debugger;
    // console.log('=================', data.file[0]);
    // return fetchWrapper.formpost(`${baseUrl}NFT/MintNft`, formData)
    return fetch(`${baseUrl}Account/ResetPassword`, {
        method: 'POST',
        headers: {
            'accept': 'text/plain',
            ...fetchWrapper.authHeader()
        },
        body: formData
    })
        .then(res => {
            return res.json()
        }).then((data) => {
            return data
        })
        .catch((e) => {
            // console.log(e);
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/');
}

// function register(user) {
//     return fetchWrapper.post(`${baseUrl}/register`, user);
// }

function getAllNFT() {
    return fetchWrapper.post(`${baseUrl}NFT/NftList`, {})
        .then(data => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            return data.data;
        })
        .catch((e) => {
            // console.log(e);
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function getSearchNFT(data) {
    return fetchWrapper.post(`${baseUrl}NFT/NftList?searchText=${data}`, {})
        .then(res => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            return res.data;
        })
        .catch((e) => {
            // console.log(e);
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function getNFTDetail(idt) {
    return fetchWrapper.get(`${baseUrl}NFT/GetNftDetail?nftIdentifier=${idt}`,)
        .then(data => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            return data;
        })
        .catch((e) => {
            // console.log("detail error ======" + e);
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function getAdminWallet() {

    // return fetch(`${baseUrl}Account/GetAdminWallet`, {
    //     method: 'GET',
    //     headers: {...fetchWrapper.authHeader()
    //     }
    // })
    //     .then(res => {
    //         console.log(res)
    //         return res.json()
    //     }).then((data) => {
    //         console.log(data)
    //         return data
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     });

    return fetchWrapper.get(`${baseUrl}Account/GetAdminWallet`)
        .then(data => {
            //console.log('data=========',data)
            return data;
        })
        .catch((e) => {
            //console.log("detail error ======" + e);
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function getStatusOfNft(idt) {
    return fetchWrapper.get(`${baseUrl}NFT/GetStatusOfNft?nftIdentifier=${idt}`,)
        .then(data => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            return data;
        })
        .catch((e) => {
            // console.log("detail error ======" + e);
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function setStartAuction(data) {
    
    return fetch(`${baseUrl}NFT/StartAuction`, {
        method: 'POST',
        headers: {
            'accept': 'text/plain',
            ...fetchWrapper.authHeader()
        },
        body: data
    })
        .then(res => {
            return res.json()
        }).then((data) => {
            return data
        })
        .catch((e) => {
            // console.log(e);
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function setMintNewNFT(data) {
    let formData = new FormData();
    formData.append('ExternalLink', data.ExternalLink);
    formData.append('LongDescription', data.LongDescription);
    formData.append('ShortDescription', data.ShortDescription);
    formData.append('TermsAndCondition', data.TermsAndConditions);
    formData.append('Title', data.Title);
    formData.append('file', data.file[0]);
    // debugger;
    // console.log('=================', data.file[0]);
    // return fetchWrapper.formpost(`${baseUrl}NFT/MintNft`, formData)
    return fetch(`${baseUrl}NFT/MintNft`, {
        method: 'POST',
        headers: {
            'accept': 'text/plain',
            ...fetchWrapper.authHeader()
        },
        body: formData
    })
        .then(res => {
            return res.json()
        }).then((data) => {
            return data
        })
        .catch((e) => {
            // console.log(e);
            notify({ type: 'error', message: e.message ? `${e.name}: ${e.message}` : e.name });
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function getProfile() {
    return fetchWrapper.post(`${baseUrl}Account/GetUpdateProfile/`, {})
        .then(data => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            return data.data;
        })
        .catch((e) => {
            // console.log(e);
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function setProfile(data) {
    return fetch(`${baseUrl}Account/UpdateProfile/`, {
        method: 'POST',
        headers: {
            'accept': 'text/plain',
            ...fetchWrapper.authHeader()
        },
        body: data
    })
        .then(res => {
            return res.json()
        }).then((data) => {
            return data
        })
        .catch((e) => {
            // console.log(e);
            notify({ type: 'error', message: e.message ? `${e.name}: ${e.message}` : e.name });
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function setBidOnNft(data) {
    return fetch(`${baseUrl}NFT/BidOnNft`, {
        method: 'POST',
        headers: {
            'accept': 'text/plain',
            ...fetchWrapper.authHeader()
        },
        body: data
    })
        .then(res => {
            return res.json()
        }).then((rest) => {
            return rest
        })
        .catch((e) => {
            // console.log(e);
            notify({ type: 'error', message: e.message ? `${e.name}: ${e.message}` : e.name });
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function addWish(data) {
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
    return fetchWrapper.get(`${baseUrl}WishNFT/AddWish?Identifier=${data}`)
    .then(res => {
        // publish user to subscribers and store in local storage to stay logged in between page refreshes
        // console.log('nft bid list data', res.data);
        // console.log(res)
        return res;
    })
    .catch((e) => {
        //console.log("detail error ======" + e);
        notify({ type: 'error', message: e.message ? `${e.name}: ${e.message}` : e.name });
    });
}
function setSubscribe(data) {

    return fetchWrapper.post(`${baseUrl}Subscribe?email=${data}`, {})
        .then(data => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            return data;
        })
        .catch((e) => {
            // console.log(e);
            notify({ type: 'error', message: e.message ? `${e.name}: ${e.message}` : e.name });
        });
    
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getUser() {
    
    return typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}


function getNFTBids(nftidt, aucidt) {
    // console.log(`${baseUrl}NFT/GetNftBids?nftIdentifier=${nftidt}&auctionIdentifier=${aucidt}`);
    return fetchWrapper.post(`${baseUrl}NFT/GetNftBids?nftIdentifier=${nftidt}&auctionIdentifier=${aucidt}`, {})
    .then(res => {
        // publish user to subscribers and store in local storage to stay logged in between page refreshes
        // console.log('nft bid list data', res.data);
        return res;
    })
    .catch((e) => {
        //console.log("detail error ======" + e);
        notify({ type: 'error', message: e.message ? `${e.name}: ${e.message}` : e.name });
    });
}

function getMyNFTBids() {
    return fetchWrapper.get(`${baseUrl}NFT/GetNftBidList`)
        .then(data => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            return data;
        })
        .catch((e) => {
            //console.log("detail error ======" + e);
            notify({ type: 'error', message: e.message ? `${e.name}: ${e.message}` : e.name });
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}

function setWinner(nftidt) {
    // console.log(`${baseUrl}NFT/GetNftBids?nftIdentifier=${nftidt}&auctionIdentifier=${aucidt}`);
    return fetchWrapper.post(`${baseUrl}NFT/AnnounceWinner?nftIdentifier=${nftidt}`, {})
    .then(res => {
        // publish user to subscribers and store in local storage to stay logged in between page refreshes
        // console.log('Announce Winner data', res.data);
        return res;
    })
    .catch((e) => {
        //console.log("detail error ======" + e);
    });
}

function getWatchList() {
    return fetchWrapper.get(`${baseUrl}NFT/NftList?filterType=2`)
        .then(data => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            return data;
        })
        .catch((e) => {
            //console.log("detail error ======" + e);
        });
    // return fetchWrapper.get(`${baseUrl}/NFT/NftList`);
}
function getContactUs(Name, Email, Phone, Subject, Message) {
    
    return fetchWrapper.get(`${baseUrl}Account/ContactUs?Name=${Name}&Email=${Email}&Phone=${Phone}&Subject=${Subject}&Message=${Message}`)
        .then(data => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            return data;
        })
        .catch((e) => {
            //console.log("detail error ======" + e);
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
