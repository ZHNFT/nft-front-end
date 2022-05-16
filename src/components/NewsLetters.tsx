import React, { useState } from 'react'
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from 'services';
import { notify } from "../utils/notifications";

export const NewsLetters: FC = () => {

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // console.log("user data from form" + formOptions.resolver.toString);

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState

    function onSubmit(data) {

        return userService.setSubscribe(data.email)
            .then((res) => {
                // console.log(res);
                if(res.statusCode === 200) {
                    notify({ type: 'success', message: `You are subscribed` });
                } else {
                    notify({ type: 'error', message: `${res.message}` });
                }
            })
            .catch();
    }

    return (
        <div className="form-subscribe">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('email')} className={`${errors.Title ? 'is-invalid' : ''}`} placeholder="Enter your email.." />

                <button className="btn btn-dark" disabled={formState.isSubmitting}>
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Subscribe Now</button>
            </form>
        </div>
    )
}
