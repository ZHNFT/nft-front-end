import { FC, useEffect, useRef, useState } from "react";
import { userService } from "services";

export const ContactUsView: FC = ({ }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const validationRef = useRef(false);
  const [inputValues, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [validation, setValidation] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  //handle submit updates
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }



  useEffect(() => {
    if (validationRef.current) checkValidation();
  }, [inputValues]);

  useEffect(() => {
    validationRef.current = true;
  }, []);

  const checkValidation = () => {
    let errors = validation;
    //first Name validation
    if (!inputValues.name.trim()) {
      errors.name = "Name is required";
    } else {
      errors.name = "";
    }

    // email validation
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!inputValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputValues.email.match(validRegex)) {
      errors.email = "Please enter a valid email address";
    } else {
      errors.email = "";
    }

    // Phone validation
    var phoneno = /^[0-9\b]+$/;
    if (!phoneno.test(inputValues.phone)) {
      errors.phone = "Please enter a valid phone number";
    } else {
      errors.phone = "";
    }

    // Message validation
    if (!inputValues.message.trim()) {
      errors.message = "Message is required";
    } else {
      errors.message = "";
    }

    // console.log(errors);

    setValidation({ ...errors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validation.name == "" &&
      validation.email == "" &&
      validation.phone == "" &&
      validation.subject == "" &&
      validation.message == ""
    ) {
      setLoading(true);
      userService
        .getContactUs(
          inputValues.name,
          inputValues.email,
          inputValues.phone,
          inputValues.subject,
          inputValues.message
        )
        .then((res) => {
          setResponse(res);
          setLoading(false);
        });
      window.scrollTo(0, 0);
      resetform();
    }

  };

  function resetform() {
    setInputValue({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-3 pb-5 mw-70">
              <h2 className="text-center">Contact Us</h2>
              <p className="text-center">
                Please feel free to contact us with any queries you might have for us, we will reach out to you as soon as possible!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container pb-5">
          {response?.statusCode == 200 && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {response?.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="col-md-12 col-lg-12">
                <div className="col-md-12 mb-4">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    className={`form-control mb-0 ${validation?.name ? "is-invalid" : ""
                      }`}
                    value={inputValues.name}
                    required
                    name="name"
                    placeholder="Name here"
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="invalid-feedback">{validation?.name}</div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label>Email Address *</label>
                    <input
                      type="text"
                      className={`form-control mb-0 ${validation?.email ? "is-invalid" : ""
                        }`}
                      placeholder="enter your email address"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      value={inputValues.email}
                      required
                    />
                    <div className="invalid-feedback">{validation?.email}</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      className={`form-control mb-0 ${validation?.phone ? "is-invalid" : ""
                        }`}
                      placeholder="number here"
                      onChange={(e) => handleChange(e)}
                      name="phone"
                      value={inputValues.phone}
                    />
                    <div className="invalid-feedback">{validation?.phone}</div>
                  </div>
                </div>
                <div className="col-md-12">
                  <label htmlFor="">Subject</label>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="form-control"
                    name="subject"
                    onChange={(e) => handleChange(e)}
                    value={inputValues.subject}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <label htmlFor="">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    placeholder="Type something here...."
                    className={`form-control mb-0 ${validation.message ? "is-invalid" : ""
                      }`}
                    onChange={(e) => handleChange(e)}
                    value={inputValues.message}
                  ></textarea>
                  <div className="invalid-feedback">{validation?.message}</div>
                </div>
              </div>
              <div className="col-md-12">
                <button
                  type="submit"
                  className="btn btn-dark sm-text"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
