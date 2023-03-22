import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { GlobalContext, actions } from "../../context";
import AuthServices from "../../api/services/auth-services";
import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
  PasswordTextField,
} from "../../components/index";
import "../../assets/styles/pages/Login/Login.scss";

function Login() {
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
    password: "",
  });

  const onSubmitUserData = () => {
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.login(userData)
      .then((res) => {
        storeHandler(actions.SHOW_LOADER, false);
        storeHandler(actions.LOG_IN, true);
        localStorage.setItem("authToken", res.access_token);
        // localStorage.setItem("refreshToken", res.access_token);
        localStorage.setItem("user_id", res.user_id);
        localStorage.setItem("user_name", res.userName);
        localStorage.setItem("role", res.role);
        enqueueSnackbar(res.message, { variant: "success" });
        // console.log("logined", res);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(error.data.message, { variant: "error" });
      });
  };
  

  return (
    <div className="login_cont container">
      <div className="row">
        <div className="col">
          <div className="login_box">
            <form onSubmit={handleSubmit(onSubmitUserData)}>
              <h4 className="text-center mt-2 mb-3" color="secondary">
                Log in to Dashboard
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

              <FormControl>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <PasswordTextField
                      id="password"
                      label="Enter your password"
                      color="secondary"
                      className="required"
                      value={value}
                      onChange={(event) => {
                        onChange(event);
                        setUserData((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }));
                      }}
                    />
                  )}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 Characters Required for Password",
                    },
                    // maxLength: {
                    //   value: 30,
                    //   message: "Password was Too High",
                    // },
                  }}
                />
                <FormHelperText className="font-error">
                  {errors.password && errors.password.message}
                </FormHelperText>
              </FormControl>

              <Button
                color="secondary"
                variant="outlined"
                className="py-2 my-2"
                type="submit"
              >
                Login
              </Button>
              <div className="d-flex align-items-center justify-content-center">
                <Link
                  to="/forgot-password"
                  className="nav-link linkUrl mt-2 mb-1"
                >
                  Forgot Password ?
                </Link>
                |
                <Link
                  to="/register"
                  className="nav-link linkUrl mt-2 mb-1 me-3"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
