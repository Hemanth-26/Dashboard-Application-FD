import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react18-input-otp";
import { useSnackbar } from "notistack";
import { Button } from "../../components/index";
import { GlobalContext, actions } from "../../context";
import AuthServices from "../../api/services/auth-services";
import "../../assets/styles/pages/Login/Login.scss";

function VerifyOtp() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const [otp, setOtp] = useState("");

  const generateOtp = (e) => {
    // console.log("otp", otp);
    e.preventDefault();
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.verifyOtp({ email: localStorage.getItem("email"), otp: otp })
      .then((res) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(res.message, { variant: "success" });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        setOtp("");
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(err.data.message, { variant: "error" });
      });
  };

  const resendOtp = () => {
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.resendOtp({ email: localStorage.getItem("email") })
      .then((res) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((err) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(err.data.message, { variant: "error" });
      });
  };

  useEffect(() => {
    localStorage.getItem("email") === null && navigate("/register");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login_cont container">
      <div className="row">
        <div className="col">
          <div className="login_box">
            <form onSubmit={generateOtp}>
              <div>
                <h4 className="text-center mt-2 mb-3" color="secondary">
                  Verify OTP
                </h4>
                <p className="mt-3 mb-4 text-center">
                  Please Check your Email for a four-digit security code and
                  enter below
                </p>
              </div>
              <div className="mb-2 form-floating">
                <OtpInput
                  value={otp}
                  onChange={(val) => setOtp(val)}
                  numInputs={4}
                  separator={<span className="seperator"></span>}
                  isInputNum={true}
                  isInputSecure={true}
                  shouldAutoFocus={true}
                  inputStyle={"otp txt-grey-drk "}
                  containerStyle={"justify-content-around mb-3"}
                  focusStyle={"otp-focus"}
                  className="otp"
                />
              </div>
              <div className="text-center resent_con mb-3">
                <label>Didn't receive a code?</label>
                <span
                  className="txt-bold cursor ms-1 resend_link"
                  onClick={resendOtp}
                >
                  Resend code
                </span>
              </div>

              <Button
                color="secondary"
                variant="outlined"
                className="py-2 my-1"
                disabled={otp.length < 4 && true}
                type="submit"
              >
                Confirm
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
