import { useRouter } from 'next/router';
import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from 'services';
import { notify } from "../utils/notifications";
import PropTypes from 'prop-types'
// Store
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { type } from 'os';

function BidonNFT({ onHide, nftIdentifier, auctionIdentifier }) {
  const router = useRouter();
  const baseurl = process.env.BASE_URL;
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [inputvalue, setInputValue] = useState(0);
  const [txrid, setTxrid] = useState('');
  const [statusofnft, setStatusofNft] = useState<any>();
  const [nftstatus, setNftStatus] = useState<any>();
  const [adminpublickey, setAdminPublickey] = useState();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  // const adminpublickey = '65Piv7bpTo3A4vNRvB1aWMp5f7EdQNhe7SHNJJaEmJua'

  useEffect(() => {
    userService.getAdminWallet().then(res => {
      console.log(res)
      setAdminPublickey(res?.walletAddress)
    })
  }, [])


  useEffect(() => {
    if (wallet.publicKey) {
      //console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
      userService.getStatusOfNft(nftIdentifier).then(x => {
        setNftStatus(x?.data);
      //  console.log("Status of NFT", x)
        setStatusofNft(x?.data?.nextMinBid)
      });
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  
  // form validation rules 
  const validationSchema = Yup.object().shape({
    BidAmount: Yup.number().typeError('Amount must be a number').min(statusofnft, `Your Bid must be greater than ${statusofnft}`).max(balance, "Your Balance is not enough").required("Should not be empty"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    setLoading(true)
    // console.log("data ============", data)
    setInputValue(data.BidAmount)

    callerBid();
  }

  const callerBid = useCallback(async () => {
    if (!publicKey) {
      notify({ type: 'error', message: `Wallet not connected!` });
      //console.log('error', `Send Transaction: Wallet not connected!`);
      return;
    }

    let signature: TransactionSignature = '';
    // console.log('attempted');
    try {
      // console.log("====================", inputvalue)
      if (inputvalue <= 0) {
        setLoading(false)
        notify({ type: 'error', message: `Please try again` });
        return
      }
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(adminpublickey),
          lamports: inputvalue * LAMPORTS_PER_SOL,
        })
      );

      signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, 'confirmed');
      notify({ type: 'success', message: 'Transaction successful!', txid: signature });
      // console.log(signature);
      setTxrid(signature);
      getUserSOLBalance(publicKey, connection);

      // console.log(publicKey.toBase58(), signature, inputvalue, auctionIdentifier, nftIdentifier);

      let formData = new FormData();
      formData.append('publicKey', publicKey.toBase58());
      formData.append('trxId', signature);
      formData.append('lamport', `${inputvalue}`);
      formData.append('auctionIdentifier', auctionIdentifier);
      formData.append('nftIdentifier', nftIdentifier);

      return userService.setBidOnNft(formData)
        .then((res) => {

          // console.log(res);
          if (res.statusCode === 200) {
            notify({ type: 'success', message: `${res.message}` });
            onHide()
            setLoading(false)
          } else {
            notify({ type: 'error', message: `${res.message}` });
            onHide()
            setLoading(false)
          }
        })
        .catch();



    } catch (error: any) {
      notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
      // console.log('error', `Transaction failed! ${error?.message}`, signature);
      setLoading(false)
      return;
    }
  }, [publicKey, notify, connection, sendTransaction, getUserSOLBalance, setTxrid, inputvalue]);



  return (
    <div className='popup-wrapper'>
      <div className='popup-wrapper-inner'>
        <button className='popup-wrapper-button' onClick={() => onHide()}>X</button>
        {publicKey ? <>
          <div className='nft-image'>
            <img src={`${baseurl}${nftstatus?.thumbnail}`} />
          </div>
          <div className='nft-title text-center'>
            <h4>{nftstatus?.title}</h4>
          </div>
          <div className='nft-bids'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className="col-md-12 mt-2">
                  <label className='mb-0'>Bid Amount </label>
                  <span className='float-end'>Your balance: {balance}</span>
                  <input type="text" {...register('BidAmount', {
                    onChange: (e) => {
                      if (!e.target.value || e.target.value === 0) {
                        return
                      }
                      setInputValue(e.target.value)
                    }
                  })}
                    className={`form-control mb-0 icon_left_sona ${errors.BidAmount ? 'is-invalid' : ''}`}
                    placeholder="Bid Amount" />
                    <div className="invalid-feedback">{errors.BidAmount?.message}</div>
                  <div className='alert alert-info mt-2'>{nftstatus?.msg}</div>
                </div>
                <div className="col-md-12 d-flex justify-content-between align-items-center" >
                  <button className="btn btn-dark sm-text" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Bid Now
                  </button>
                  {nftstatus?.myCurrentBid > 0 ? <span><b>Already Bid Amount:</b> {nftstatus?.myCurrentBid}</span> : null}
                  {/* <Link href="/nft"><button className="btn btn-outline-dark sm-text ms-2">Cancel</button></Link> */}
                </div>
              </div>
            </form>
          </div>
        </> :
        <>
          <div className='alert alert-info'>Please connect your wallet to bid on NFT.</div>
        </>}
        
      </div>
    </div>
  )
}

BidonNFT.propTypes = {
  onHide: PropTypes.func,
  nftIdentifier: PropTypes.string,
  auctionIdentifier: PropTypes.string,
}

export default BidonNFT

