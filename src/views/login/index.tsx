import Link from "next/link";
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from "react";
import { alertService, userService } from 'services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useWallet } from '@solana/wallet-adapter-react';
import { notify } from "utils/notifications";
import { type } from "os";
import useUserStore from 'stores/useUserStore';

export const LoginView: FC = ({ }) => {
    const router = useRouter();
    const { publicKey } = useWallet();
    const { userSetAuth } = useUserStore();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ email, password }) {
        return userService.login(email, password, publicKey.toBase58())
            .then((res) => {
                // get return url from query parameters or default to '/'
                if (res.statusCode === 200) {
                    console.log('from Login page', res)
                    userSetAuth(res.data)
                    // const returnUrl = router.query.returnUrl || '/';
                    // window.location.reload();
                    router.back();

                }
                else {
                    notify({ type: 'error', message: res.message ? `${res.message}` : `Something went wrong` });
                }
            })
            .catch((e) => console.log(e));
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-3 pb-3 mw-70">
                            <h2 className="text-center">LOGIN</h2>
                            <p className="text-center">Please enter your credentials in order to gain access to the NFT management module.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row bg-light">
                            <div className="col-md-12 col-lg-12">
                                <h3>Login Details</h3>
                                <div className="col-md-12">
                                    <label>Email</label>
                                    <input type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter your email here" />
                                </div>
                                <div className="col-md-12">
                                    <label>Password</label>
                                    <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Enter your Password" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-5">
                                <hr />
                                <button disabled={formState.isSubmitting} className="btn btn-dark sm-text">
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};


