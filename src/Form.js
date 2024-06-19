import { useState } from "react";
export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [queryType, setQueryType] = useState("");
  const [message, setMessage] = useState("");
  const [checkbox, setCheckBox] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  function handleSuccess() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setQueryType("");
    setMessage("");
    setCheckBox(false);
    setIsSubmitted(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 1800);
    var radiosAndCheckbox = document.querySelectorAll(
      'input[type="radio"],input[type="checkbox"]'
    );
    // Loop through the NodeList and uncheck each radio button
    radiosAndCheckbox.forEach(function (input) {
      input.checked = false;
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errors = document.querySelectorAll(".error");
    // let errorsCount = 0;
    let submitForm = true;
    errors.forEach((error) => {
      if (error.textContent !== "") {
        submitForm = false;
      }
    });
    if (submitForm) {
      handleSuccess();
    }
  }

  return (
    <>
      <div
        className={`${
          showSuccessMessage ? "active" : ""
        } success-message`}
      >
        <h2>✅ Message Sent</h2>
        <p>Thanks for completing the form. We'll be in touch soon!</p>
      </div>
      <div className="form">
        <form action="" className="col" onSubmit={(e) => handleSubmit(e)}>
          <h1>Contact Us</h1>
          <div className="row">
            <div className="input-container col">
              <label htmlFor="first-name">First Name *</label>
              <input
                type="text"
                className="required"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <p className="error">
                {isSubmitted && firstName === ""
                  ? "This Field is required"
                  : ""}
              </p>
            </div>
            <div className="input-container col">
              <label htmlFor="last-name">Last Name *</label>
              <input
                type="text "
                className="required"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <p className="error">
                {isSubmitted && lastName === "" ? "This Field is required" : ""}
              </p>
            </div>
          </div>
          <div className="input-container col">
            <label htmlFor="email">Email Address *</label>
            <input
              type="text"
              className="required"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="error">
              {isSubmitted
                ? email === ""
                  ? "This Field is required"
                  : /^[a-zA-Z](\w+[\._]?\w+)*@\w+\.[a-zA-Z]{2,}/gi.test(email)
                  ? ""
                  : "This email isn't valid"
                : ""}
            </p>
          </div>

          <div className="input-container col">
            <label>Query Type *</label>
            <div className="row ">
              <div className="radio-container">
                <input
                  type="radio"
                  name="gender"
                  value="General Enquiry"
                  className="required"
                  id="general-enquiry"
                  onChange={(e) => setQueryType(e.target.value)}
                />
                <label htmlFor="general-enquiry">General Enquiry</label>
              </div>
              <div className="radio-container">
                <input
                  type="radio"
                  name="gender"
                  value="Support Request"
                  className="required"
                  id="support-request"
                  onChange={(e) => setQueryType(e.target.value)}
                />
                <label htmlFor="support-request">Support Request</label>
              </div>
            </div>
            <p className="error">
              {isSubmitted && queryType === ""
                ? "Please select query type"
                : ""}
            </p>
          </div>

          <div className="input-container col">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              className="required"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="error">
              {isSubmitted && message === "" ? "This Field is required" : ""}
            </p>
          </div>
          <div className="input-container">
            <input
              className="required"
              type="checkbox"
              onChange={(e) => setCheckBox(!checkbox)}
            />
            <label> I consent to being contacted by the team *</label>
            <p className="error">
              {isSubmitted && !checkbox ? "This Field is required" : ""}
            </p>
          </div>
          <button onClick={() => setIsSubmitted(true)}>Submit</button>
        </form>
      </div>
    </>
  );
}
