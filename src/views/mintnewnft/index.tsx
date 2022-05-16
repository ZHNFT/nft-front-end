import { useRouter } from "next/router";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { userService, alertService } from "services";
import { notify } from "../../utils/notifications";

export const MintNewNFTView: FC = ({}) => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<any | null>(null);

  const user = userService.getUser()

    useEffect(() => {
        if(user && user?.roleTypeId === 1) {
        } else {
            router.push("/")
        }
    }, []);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // foir rerouting if not admin
  useEffect(() => {}, []);

  const onSelectFile = (e) => {
    // console.log("select Profile Image");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required("File is required"),
    Title: Yup.string().max(50).required("Title is required"),
    ExternalLink: Yup.string(),
    ShortDescription: Yup.string(),
    LongDescription: Yup.string(),
    TermsAndConditions: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // console.log("user data from form" + formOptions.resolver.toString);

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // console.log("data ============", data)

    return userService
      .setMintNewNFT(data)
      .then((res) => {
        // alertService.success('Registration successful', { keepAfterRouteChange: true });
        // console.log(res);
        if (res?.statusCode === 200) {
          notify({
            type: "success",
            message: `New NFT is Minted Successfully`,
          });
          router.push("adminnftlist");
        } else if (res?.statusCode === 400) {
          notify({
            type: "error",
            message: `${res.message}`,
          });
        } else {
          notify({
            type: "error",
            message: `Something Went wrong, Please Contact the Team`,
          });
        }
        //notify({ type: 'success', message: `New NFT is Minted` });
        // router.push('login');
        //console.log(res);
      })
      .catch();
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-3 pb-5 mw-70">
              <h2 className="text-center">MINT New NFT</h2>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                etiam viverra tellus imperdiet. Ipsum dolor sit amet,
                consectetur adipiscing elit. Aliquam etiam viverra tellus
                imperdiet.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row bg-light">
              <div className="col-md-12">
                <div className="upload_nft">
                  <div className="imgbox position-relative">
                    <label htmlFor="upload_nft">
                      <div className="img">
                        {selectedFile ? (
                          <img src={preview} />
                        ) : (
                          <img src="/upload_nft.png" alt="" />
                        )}
                      </div>
                      {selectedFile ? (
                        <small>Image Selected</small>
                      ) : (
                        <small>Select image here</small>
                      )}
                    </label>
                    <input
                      type="file"
                      className="hidden position-absolute fileinput"
                      {...register("file", {
                        onChange: (e) => {
                          if (!e.target.files || e.target.files.length === 0) {
                            setSelectedFile(undefined);
                            return;
                          }
                          // I've kept this example simple by using the first image instead of multiple
                          setSelectedFile(e.target.files[0]);
                        },
                      })}
                      id="upload_nft"
                    />
                  </div>
                  <small>File types supported: JPG and PNG.</small>
                </div>
              </div>
              <div className="col-md-12">
                <label>Name*</label>
                <input
                  type="text"
                  {...register("Title")}
                  className={`form-control ${errors.Title ? "is-invalid" : ""}`}
                  placeholder="Nft title here"
                />
              </div>
              <div className="col-md-12">
                <label>External Link</label>
                <input
                  type="text"
                  {...register("ExternalLink")}
                  className={`form-control ${
                    errors.ExternalLink ? "is-invalid" : ""
                  }`}
                  placeholder="www.bluchip.com/"
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="">Short Description</label>
                <textarea
                  placeholder="Description here..."
                  {...register("ShortDescription")}
                  className={`form-control ${
                    errors.ShortDescription ? "is-invalid" : ""
                  }`}
                ></textarea>
              </div>
              <div className="col-md-12">
                <label htmlFor="">Long Description</label>
                <textarea
                  placeholder="Description here..."
                  {...register("LongDescription")}
                  className={`form-control ${
                    errors.LongDescription ? "is-invalid" : ""
                  }`}
                ></textarea>
              </div>
              <div className="col-md-12">
                <label htmlFor="">Terms & Conditions</label>
                <textarea
                  name=""
                  placeholder="Terms and conditions here..."
                  {...register("TermsAndConditions")}
                  className={`form-control ${
                    errors.TermsAndConditions ? "is-invalid" : ""
                  }`}
                ></textarea>
              </div>
              <div className="col-md-12">
                <label htmlFor="">Blockchain</label>
                <input
                  type="text"
                  className="form-control icon_left_sona"
                  placeholder="Solana"
                  value="Solana"
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label>Payment Token</label>
                <input
                  type="text"
                  className="form-control icon_left_sona"
                  placeholder="SOL"
                  value="SOL"
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label>Supply</label>
                <input
                  type="text"
                  className="form-control icon_left_sona"
                  placeholder="1"
                  value="1"
                  disabled
                />
              </div>
              <div className="col-md-12">
                <button
                  className="btn btn-dark sm-text"
                  disabled={formState.isSubmitting}
                >
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Mint NFT
                </button>
                <Link href="/adminnftlist">
                  <button className="btn btn-outline-dark sm-text ms-2">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
