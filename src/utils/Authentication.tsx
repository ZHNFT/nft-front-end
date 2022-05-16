import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import useUserStore from '../stores/useUserStore';
import { User } from '../models/types';

// type AuthResponse = {
//     statusCode: Number
//     message: String | null
//     statusMessage: String | null
//     data: User
// }

// export const useApiGet = (url: string, requestdata): AuthResponse => {
//   const [statusCode, setStatus] = useState<Number>(0);
//   const [message, setStatusText] = useState<String>('');
//   const [statusMessage, setStatusMessage] = useState<String>('');
//   const [data, setData] = useState<User>();

//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(requestdata)
//   };

//   const getAPIData = async () => {
//     try {
//       const apiResponse = await fetch(url, requestOptions);
//       const json = await apiResponse.json();
//       console.log(json);
//       setStatus(json.statusCode);
//       setStatusText(json.message);
//       setStatusMessage(json.statusMessage);
//       setData(json.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAPIData();
//   }, []);

//   return { statusCode, message, statusMessage, data };
// };

export  const isAuth = () => {
    const { publicKey } = useWallet();
    const { currentUser, userSetAuth } = useUserStore();
    if(publicKey) {
        // console.log(currentUser === null);
        if(currentUser !== null) {
            return true
        }
    }
    return false
}