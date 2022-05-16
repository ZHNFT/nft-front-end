import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { userService } from "services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useWallet } from "@solana/wallet-adapter-react";
import { notify } from "utils/notifications";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const RegisterView: FC = ({ }) => {
    const validationRef = useRef(false);
    const router = useRouter();
    const { publicKey } = useWallet();
    const [userdata, setuserdata] = useState<any>();
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        confirmPwd: "",
    });
    const [disableInput, setDisableInput] = useState(false);
    const [validation, setValidation] = useState({
        email: "",
        password: "",
        confirmPwd: "",
    });

    useEffect(() => {
        if (validationRef.current) checkValidation();
    }, [inputValues]);

    useEffect(() => {
        validationRef.current = true;
    }, []);

    const checkValidation = () => {
        let errors = validation;
        //first Name validation

        // email validation
        var validRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!inputValues.email.trim()) {
            errors.email = "Email is required";
        } else if (!inputValues.email.match(validRegex)) {
            errors.email = "Please enter a valid email address";
        } else {
            errors.email = "";
        }

        //password validation
        // const cond1 = "/^(?=.*[a-z]).{6,20}$/";
        // const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
        // const cond3 = "/^(?=.*[0-9]).{6,20}$/";
        let password = inputValues.password;
        if (!password) {
            errors.password = "password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be longer than 6 characters";
        } else if (password.length >= 20) {
            errors.password = "Password must shorter than 20 characters";
        } else {
            errors.password = "";
        }

        //matchPassword validation
        if (!inputValues.confirmPwd) {
            errors.confirmPwd = "Password confirmation is required";
        } else if (inputValues.confirmPwd != inputValues.password) {
            errors.confirmPwd = "Password does not match confirmation password";
        } else {
            errors.confirmPwd = "";
        }

        // console.log(errors);

        setValidation({ ...errors });
    };

    const email1 = "";
    const password1 = "";

    // form validation rules
    // const validationSchema = Yup.object().shape({
    //     email: Yup.string().email('Invalid email format').required('Email is mendatory'),
    //     password: Yup.string().min(6, "Atleast 6 Charachters").required('Password is mendatory'),
    //     confirmPwd: Yup.string().required('Password is mendatory').oneOf([Yup.ref('password')], 'Passwords does not match'),
    // });
    // const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    // const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    // const { errors } = formState;

    // setValue('email', userdata?.email && userdata?.email != null ? userdata?.email : '')

    function handleSubmit(e) {
        e.preventDefault();
        return userService
            .register(inputValues.email, inputValues.password, inputValues.confirmPwd)
            .then((res) => {
                // get return url from query parameters or default to '/'
                if (res.statusCode === 200) {
                    // const returnUrl = router.query.returnUrl || '/';
                    // router.back();
                    notify({
                        type: "success",
                        message: res.message ? `${res.message}` : `Updated Successfully`,
                    });
                } else {
                    notify({
                        type: "error",
                        message: res.message ? `${res.message}` : `Something went wrong`,
                    });
                    if (!publicKey) {
                        notify({ type: "error", message: "Please connect your Wallet" });
                    }
                }
            })
            .catch((e) => {
                if (!publicKey) {
                    notify({ type: "error", message: "Please connect your Wallet" });
                }
                // console.log(e);
            });
    }

    function loginUserOnWalletConnect() {
        return userService
            .login(email1, password1, publicKey.toBase58())
            .then((res) => {
                if (res.statusCode === 200) {
                    setuserdata(res.data);
                    // debugger;
                    //   console.log(res.data)
                    if (res.data?.email) {
                        // console.log(res.data);
                        setInputValues({ ...inputValues, email: res.data?.email });
                        setDisableInput(true)
                    } else {
                    }
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
        if (publicKey) {
            loginUserOnWalletConnect();
        }
    }, [publicKey]);

    //handle submit updates
    function handleChange(event) {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    //   const onChangeText = (val, key) => {
    //     let user = { ...userdata, [key]: val }
    //     setuserdata(user)
    // }

    return (
        <>
            <header className="mb-0">
                <div className="container text-center">
                    <img src="/logo.png" alt="" className="img-fluid" />
                </div>
            </header>
            <section>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-12 pt-3 pb-3 mw-70">
                            {/* <h2 className="text-center">REGISTER</h2> */}
                            <p className="text-center">
                                First Connect your wallet and then fill the form
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container text-center mb-3 mt-3">
                    <WalletMultiButton className="btn btn-dark mx-auto" />
                </div>
            </section>
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row bg-light">
                            <div className="col-md-12 col-lg-12">
                                <div className="col-md-12 mb-4">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className={`form-control mb-0 ${inputValues.email && validation.email ? "is-invalid" : ""
                                            }`}
                                        disabled={disableInput ? true : false}
                                        placeholder="enter your email address"
                                        name="email"
                                        onChange={(e) => handleChange(e)}
                                        value={inputValues.email}
                                        required
                                    />
                                    {inputValues.email && validation.email ? (
                                        <div className="invalid-feedback">{validation?.email}</div>
                                    ) : null}
                                </div>
                                <div className="col-md-12 mb-4">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control mb-0 ${inputValues.password && validation.password
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Enter your Password"
                                    />
                                    {inputValues.password && validation.password ? (
                                        <div className="invalid-feedback">
                                            {validation.password}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-12 mb-4">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPwd"
                                        className={`form-control mb-0 ${inputValues.confirmPwd && validation.confirmPwd
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Confirm your Password"
                                    />
                                    {inputValues.confirmPwd && validation.confirmPwd ? (
                                        <div className="invalid-feedback">
                                            {validation.confirmPwd}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-12 mb-5">
                                <hr />
                                <button className="btn btn-dark sm-text d-block">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};
