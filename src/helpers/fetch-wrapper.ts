import getConfig from 'next/config';

import { userService } from 'services';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    formpost,
    put,
    delete: _delete,
    authHeader
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(url, requestOptions).then(handleResponse);
}


function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}
function formpost(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { "accept": "text/plain",
        'Content-Type': 'multipart/form-data', 
        ...authHeader() },
        body: body
    };
    // console.log("Form dataaaa",body)
    return fetch(url, requestOptions).then((res) => console.log("Succes")).catch((e) => console.log("error"))
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // console.log(user.accessToken);
    }
    // console.log(user.accessToken);
    const isLoggedIn = user && user.accessToken;
    //console.log(isLoggedIn)
    //const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn) {
        return { Authorization: `Bearer ${user.accessToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}