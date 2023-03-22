import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
} from "../../components/index";
import { GlobalContext, actions } from "../../context";
import AuthServices from "../../api/services/auth-services";
import "../../assets/styles/pages/Login/Login.scss";

function ForgotPassword() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [userData, setUserData] = useState({
    email: "",
  });

  const onSubmitUserData = () => {
    // console.log("userData: ", userData);
    storeHandler(actions.SHOW_LOADER, true);

    AuthServices.forgotPassword(userData)
      .then((res) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(res.message, { variant: "success" });
        setTimeout(() => {
          navigate("/verify-otp-password");
        }, 1000);
      })
      .catch((err) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(err.data.message, { variant: "error" });
      });
  };

  return (
    <div className="login_cont container">
      <div className="row">
        <div className="col">
          <div className="login_box">
            <form onSubmit={handleSubmit(onSubmitUserData)}>
              <h4 className="text-center mt-2 mb-3" color="secondary">
                Forget Password
              </h4>
              <FormControl>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="email"
                      label="Enter your Email address"
                      className="required"
                      color="secondary"
                      value={value}
                      onChange={(event) => {
                        onChange(event);
                        setUserData((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }));
                      }}
                      // type="email"
                    />
                  )}
                  rules={{
                    required: "Email address is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  }}
                />
                <FormHelperText className="font-error">
                  {errors.email && errors.email.message}
                </FormHelperText>
              </FormControl>
              <Button
                color="secondary"
                variant="outlined"
                className="py-2 my-2"
                type="submit"
              >
                Send OTP
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
