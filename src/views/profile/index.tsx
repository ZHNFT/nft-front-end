import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from 'services';
import { notify } from "../../utils/notifications";
import { useRouter } from "next/router";
import moment from "moment"
import Select from "react-select";

export const ProfileView: FC = ({ }) => {
    // const router = useRouter();
    const baseurl = process.env.BASE_URL;

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState<any | null>(null)

    const [selectedCover, setSelectedCover] = useState()
    const [previewCover, setPreviewCover] = useState<any | null>(null)

    const [data, setData] = useState<any>({});

    // const [userimage, setUserImage ] = useState('');
    // const [coverimage, setCoverImage ] = useState();

    const options = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'NotToSay', label: 'I prefer not to say' },
    ];
    const default_value = 'Male';

    // form validation rules 
    const validationSchema = Yup.object().shape({
        DisplayImage: Yup.mixed(),
        CoverImage: Yup.mixed(),
        DisplayName: Yup.string(),
        Dob: Yup.string(),
        Gender: Yup.string(),
        Bio: Yup.string(),
        Email: Yup.string().email('Please enter valid email address'),
        FacebookLink: Yup.string(),
        TwitterLink: Yup.string(),
        YoutubeLink: Yup.string(),
        DiscordLink: Yup.string(),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // console.log("user data from form" + formOptions.resolver.toString);

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, setValue, control } = useForm(formOptions);
    const { errors } = formState;

    useEffect(() => {
        const user = userService.getUser();
        // console.log(user);
        if (user && user != null) {
            userService.getProfile().then(x => setData(x));
        }
    }, []);



    // console.log(data);
    // setValue('DisplayImage', data.displayImageURL && data.displayImageURL !== null ? data.displayImageURL : '')
    // setValue('CoverImage', data.coverImageURL && data.coverImageURL !== null ? data.coverImageURL : '')
    setValue('DisplayName', data.displayName && data.displayName !== null ? data.displayName : '')
    setValue('Email', data.email && data.email !== null ? data.email : '')
    setValue('Dob', data.dob && data.dob !== null ? moment(data.dob).format('yyyy-MM-DD') : '')
    setValue('Bio', data.bio && data.bio !== null ? data.bio : '')
    setValue('FacebookLink', data.facebookLink && data.facebookLink !== null ? data.facebookLink : '')
    setValue('TwitterLink', data.twitterLink && data.twitterLink !== null ? data.twitterLink : '')
    setValue('YoutubeLink', data.youtubeLink && data.youtubeLink !== null ? data.youtubeLink : '')
    setValue('DiscordLink', data.discordLink && data.discordLink !== null ? data.discordLink : '')

    // console.log(data);

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    /* For Cover selection Preview*/
    useEffect(() => {
        if (!selectedCover) {
            setPreviewCover(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedCover)
        setPreviewCover(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedCover])

    function onSubmit(form) {

        let formData = new FormData();
        if(data.displayImage) {
            formData.append('DisplayImage', data.displayImage[0]);
        }
        if(data.coverImage) {
            formData.append('CoverImage', data.coverImage[0]);
        }
        formData.append('DisplayName', data.displayName);
        formData.append('Dob', data.dob);
        formData.append('Bio', data.bio);
        formData.append('Gender', data.gender);
        formData.append('Email', data.email);
        formData.append('FacebookLink', data.facebookLink);
        formData.append('TwitterLink', data.twitterLink);
        formData.append('YoutubeLink', data.youtubeLink);
        formData.append('DiscordLink', data.discordLink);

        // console.log('form form', formData)

        return userService.setProfile(formData)
            .then((res) => {
                // alertService.success('Registration successful', { keepAfterRouteChange: true });
                // console.log(res);
                if (res.statusCode === 200) {
                    notify({ type: 'success', message: `${res.message}` });
                    // router.push('nft');
                    userService.getProfile().then(x => setData(x));
                }
                //notify({ type: 'success', message: `New NFT is Minted` });
                // router.push('login');
                //console.log(res);
            })
            .catch(e => console.log(''));
    }

    const onChangeText = (val, key) => {
        let user = { ...data, [key]: val }
        setData(user)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className="cover_banner">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="banner_upload">

                                    {/* <!-- IMG Uploaded -->
                                    <!-- <img src="/hands-digital-universe-background 1.png" className="cover-image img-fluid banner_img" alt="" /> className={`form-control ${errors.TwitterLink ? 'is-invalid' : ''}`} -->
                                <!-- IMG Uploaded --> */}

                                    {selectedCover ? <img src={previewCover} className="cover-image img-fluid banner_img" alt="" /> : <img className={`cover-image img-fluid banner_img ${data.coverImageURL && data.coverImageURL !== null ? 'd-block' : 'd-none'}`} src={data.coverImageURL && data.coverImageURL !== null ? `${baseurl}${data.coverImageURL}` : ''} />}

                                    <label htmlFor="cover_image" className="changeorreplace">
                                        <img src="/edit-fill.png" alt="" />
                                        <p>Upload Cover Image</p>
                                    </label>
                                    <input type="file" className="hidden" id="cover_image" {...register('CoverImage', {
                                        onChange: (e) => {
                                            if (!e.target.files || e.target.files.length === 0) {
                                                setSelectedCover(undefined)
                                                return
                                            }
                                            // I've kept this example simple by using the first image instead of multiple
                                            setSelectedCover(e.target.files[0])
                                        }
                                    })} />
                                </div>
                                <div className="user_profile">
                                    <div className="user_image">
                                        {selectedFile ? <img src={preview} /> : <img src={data.displayImageURL && data.displayImageURL !== null ? `${baseurl}${data.displayImageURL}` : '/no-user-image.png'} alt="" />}
                                        <label htmlFor="user_image">
                                            <img src="/edit-fill-1.png" alt="" />
                                        </label>
                                        <input type="file" className="hidden" id="user_image" {...register('DisplayImage', {
                                            onChange: (e) => {
                                                if (!e.target.files || e.target.files.length === 0) {
                                                    setSelectedFile(undefined)
                                                    return
                                                }
                                                // I've kept this example simple by using the first image instead of multiple
                                                setSelectedFile(e.target.files[0])
                                                let user = { ...data, displayImage: e.target.files }
                                                setData(user)
                                            }
                                        })} />
                                    </div>
                                    <h2>{data.displayName && data.displayName !== null ? data.displayName : 'UNNAMMED'}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="row bg-light">
                            <div className="col-md-12 col-lg-6">
                                <h3>Account info</h3>
                                <div className="col-md-12">
                                    <label>Display Name</label>
                                    <input
                                        type="text"
                                        {...register('DisplayName').onChange}
                                        value={data.displayName && data.displayName !== null ? data.displayName : ''}
                                        onChange={(val) => onChangeText(val.currentTarget.value, 'displayName')} 
                                        className={`form-control ${errors.DisplayName ? 'is-invalid' : ''}`}
                                        placeholder="Username here" />
                                </div>
                                <div className="col-md-12">
                                    <label>Email</label>
                                    <input type="text"
                                        {...register('Email').onChange} 
                                        value={data.email && data.email !== null ? data.email : ''}
                                        onChange={(val) => onChangeText(val.currentTarget.value, 'email')} 
                                        className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                                        placeholder="Enter your email here" />
                                    {/* <div className="invalid-feedback">{errors.Email?.message}</div> */}
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="">DOB</label>
                                        <input type="date"
                                            placeholder="DOB"
                                            value={data.dob && data.dob !== null ? data.dob : ''}
                                            {...register('Dob').onChange} 
                                            onChange={(val) => onChangeText(val.currentTarget.value, 'dob')}
                                            className={`form-control ${errors.Dob ? 'is-invalid' : ''}`} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="">
                                            Gender
                                        </label>

                                        <select name="Gender" id="" value={data.gender ? data.gender : ''} 
                                        onChange={(res) => {
                                            let user = { ...data, gender: res.currentTarget.value }
                                            // console.log("sdafsdf", user)
                                            setData(user)
                                        }} {...register('Gender').onChange} 
                                        className={`form-control ${errors.Gender ? 'is-invalid' : ''}`}>
                                            <option value="null">Select Any</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="NotToSay">I prefer not to say</option>
                                        </select>

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="">Bio</label>
                                    <textarea name=""
                                            value={data.bio && data.bio !== null ? data.bio : ''}
                                        placeholder="Type your bio here"
                                        {...register('Bio').onChange} 
                                        onChange={(val) => onChangeText(val.currentTarget.value, 'bio')}
                                        className={`form-control ${errors.Bio ? 'is-invalid' : ''}`}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <h3>Add Your SOCIAL mEDIA</h3>
                                <div className="col-md-12">
                                    <label htmlFor="">
                                        Facebook
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            value={data.facebookLink && data.facebookLink !== null ? data.facebookLink : ''}

                                            {...register('FacebookLink').onChange}
                                            onChange={(val) => onChangeText(val.currentTarget.value, 'facebookLink')}
                                            className={`form-control ${errors.FacebookLink ? 'is-invalid' : ''}`}
                                            placeholder="Facebook username here" />
                                        <span className="bg-dark btn"><img src="/fb.png" alt="" /></span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="">
                                        Twitter
                                    </label>
                                    <div className="input-group">
                                        <input type="text"
                                            {...register('TwitterLink').onChange}
                                            value={data.twitterLink && data.twitterLink !== null ? data.twitterLink : ''}
                                            onChange={(val) => onChangeText(val.currentTarget.value, 'twitterLink')}
                                            className={`form-control ${errors.TwitterLink ? 'is-invalid' : ''}`}
                                            placeholder="Twitter username here" />
                                        <span className="bg-dark btn"><img src="/twitter-line.png" alt="" /></span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="">
                                        Youtube
                                    </label>
                                    <div className="input-group">
                                        <input type="text"
                                            value={data.youtubeLink && data.youtubeLink !== null ? data.youtubeLink : ''}
                                            {...register('YoutubeLink').onChange}
                                            onChange={(val) => onChangeText(val.currentTarget.value, 'youtubeLink')} 
                                            className={`form-control ${errors.YoutubeLink ? 'is-invalid' : ''}`}
                                            placeholder="Youtube username here" />
                                        <span className="bg-dark btn"><img src="/youtube-line.png" alt="" /></span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="">
                                        Discord
                                    </label>
                                    <div className="input-group">
                                        <input type="text"
                                            value={data.discordLink && data.discordLink !== null ? data.discordLink : ''}
                                            {...register('DiscordLink').onChange}
                                            onChange={(val) => onChangeText(val.currentTarget.value, 'discordLink')} 
                                            className={`form-control ${errors.DiscordLink ? 'is-invalid' : ''}`}
                                            placeholder="Discord username here" />
                                        <span className="bg-dark btn"><img src="/discord-line.png" alt="" /></span>
                                    </div>
                                </div>
                                {/* <!-- Show on add more social media button click --> */}
                                {/* <div className="col-md-12 d-none">
                                <label htmlFor="">
                                    Add Social Account
                                </label>
                                <div className="input-group">
                                    <div className="addsocial w-100">
                                    <input type="text" className="form-control" placeholder="Social Link " />
                                    </div>
                                </div>
                            </div> */}
                                {/* <!-- //Show on add more social media button click --> */}

                                {/* <div className="col-md-12">
                                <button className="btn btn-nobg"><img src="/plus.png" alt="" /> Add More Social Media</button>
                            </div> */}
                            </div>
                            <div className="col-md-12 mb-5">
                                <hr />
                                <p>To update your settings you should sign message through your wallet. Click 'Update profile' then sign the message.</p>
                                <button className="btn btn-dark sm-text d-block d-md-inline-block" disabled={formState.isSubmitting}>
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Update User Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </>
    );
};
