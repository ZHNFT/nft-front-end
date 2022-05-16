
import { FC, useEffect, useState } from "react";
import { userService } from "services";
import { notify } from "utils/notifications";
import { useRouter } from "next/router";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import * as Yup from 'yup';
import moment from "moment";


export const TokenView: FC = ({ }) => {
  const router = useRouter();
  // console.log("router", router.query.identity)
  const routed = router.query.identity;
  let [identifier, setIdentifier] = useState(routed)

  const user = userService.getUser()

  useEffect(() => {
    if (user && user?.roleTypeId === 1) {
    } else {
      router.push("/")
    }
  }, []);

  const today = new Date()
  const yesterday = new Date(today)

  yesterday.setDate(yesterday.getDate() - 1)

  // form validation rules 
  const validationSchema = Yup.object().shape({
    InitialBid: Yup.string().required('This is required'),
    MinimumBid: Yup.string().required('This is required'),
    AuctionStartDate: Yup.string().required('This is required'),
    AuctionEndDate: Yup.string().required('This is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;



  function onSubmit(data) {

    // console.log(data)
    let startdate = moment(data.AuctionStartDate).format('YYYY-MM-DD, h:mm:ss a')
    let enddate = moment(data.AuctionEndDate).format('YYYY-MM-DD, h:mm:ss a')



    let formData = new FormData();

    formData.append('NftIdentifier', `${identifier}`);
    formData.append('InitialBid', data.InitialBid);
    formData.append('MinimumBid', data.MinimumBid);
    formData.append('AuctionStartDate', startdate);
    formData.append('AuctionEndDate', enddate);
    return userService.setStartAuction(formData)
      .then((res) => {
        // alertService.success('Registration successful', { keepAfterRouteChange: true });
        // console.log(res);
        if (res.statusCode === 200) {
          // console.log(res.message)
          notify({ type: 'success', message: `${res.message}` });
          router.push('adminnftlist');
        } else {
          notify({ type: 'error', message: res.message });
        }
        //notify({ type: 'success', message: `New NFT is Minted` });
        // router.push('login');
        //console.log(res);
      })
      .catch((e) => console.log("error"));
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3 mw-70">
              <h2 className="text-center">ANNOUNCE AUCTION</h2>
              <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row bg-light">
              <div className="col-md-12 col-lg-12">
                <h3>Auction Detail</h3>
                <div className="col-md-12">
                  <label>Start Date Time</label>
                  <Controller
                    control={control}
                    name="AuctionStartDate"
                    render={({ field }) => (
                      <Datetime
                        onChange={(date) => field.onChange(date)}
                      // initialValue={new Date()}

                      />
                      // <DateTimePicker onChange={(date) => field.onChange(date)} />
                    )}
                  />
                  <div className="invalid-feedback">{errors.AuctionStartDate?.message}</div>
                </div>
                <div className="col-md-12">
                  <label>End Date Time</label>
                  <Controller
                    control={control}
                    name="AuctionEndDate"
                    render={({ field }) => (
                      <Datetime
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                  <div className="invalid-feedback">{errors.AuctionEndDate?.message}</div>
                </div>
                {/* <div className="col-md-12 mb-4">
                  <label>Start date</label>
                  <input type="date" name="AuctionStartDate" 
                  {...register('AuctionStartDate')} 
                  className={`form-control mb-0 ${errors.AuctionStartDate ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.AuctionStartDate?.message}</div>
                </div> */}
                {/* <div className="col-md-12 mb-4">
                  <label>End date</label>
                  <input type="date" name="AuctionEndDate " 
                  {...register('AuctionEndDate')} 
                  className={`form-control mb-0 ${errors.AuctionEndDate ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.AuctionEndDate?.message}</div>
                </div> */}
                <div className="col-md-12 mb-4">
                  <label>Incremented Value</label>
                  <input type="text" name="MinimumBid" {...register('MinimumBid')}
                    className={`form-control mb-0 icon_left_sona ${errors.MinimumBid ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.MinimumBid?.message}</div>
                </div>
                <div className="col-md-12 mb-4">
                  <label>Initial Bid</label>
                  <input type="text" name="InitialBid" {...register('InitialBid')}
                    className={`form-control mb-0 icon_left_sona ${errors.InitialBid ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.InitialBid?.message}</div>
                </div>
              </div>
              <div className="col-md-12 mb-5">
                <hr />
                <button className="btn btn-dark sm-text" disabled={formState.isSubmitting}>
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
