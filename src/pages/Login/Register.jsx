import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { GlobalContext, actions } from "../../context";
import {
  Button,
  Radio,
  RadioGroup,
  TextField,
  Datepicker,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  PasswordTextField,
} from "../../components/index";
import AuthServices from "../../api/services/auth-services";
import "../../assets/styles/pages/Login/Login.scss";

function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const {
    // register,
    handleSubmit,
    formState: { errors },
    control,
    // reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: null,
    dob: null,
    password: "",
  });

  const onSubmitAddPersons = () => {
    // console.log('userData', userData);
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.register(userData)
      .then((res) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(res.message, { variant: "success" });
        localStorage.setItem("email", userData.email);
        setTimeout(() => {
          navigate("/verify-otp");
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
            <form onSubmit={handleSubmit(onSubmitAddPersons)}>
              <h4 className="text-center mt-2 mb-3" color="secondary">
                Register to Dashboard
              </h4>
              <FormControl>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="name"
                      label="Enter your Name"
                      className="required"
                      color="secondary"
                      value={value}
                      onChange={(event) => {
                        onChange(event);
                        setUserData((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }));
                      }}
                    />
                  )}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 Characters Required for Name",
                    },
                    maxLength: {
                      value: 30,
                      message: "Name was Too High",
                    },
                    pattern: {
                      value: /^[a-zA-z ]{3,30}$/,
                      message: "Enter a valid Name",
                    },
                  }}
                />
                <FormHelperText className="font-error">
                  {errors.name && errors.name.message}
                </FormHelperText>
              </FormControl>

              <FormControl className="d-flex flex-row align-items-center">
                <div className="d-flex align-items-center">
                  <div className="required mx-2">
                    <FormLabel htmlFor="gender">Gender</FormLabel>
                  </div>
                  <Controller
                    rules={{
                      required: {
                        value: userData.gender === null,
                        message: "Gender is required",
                      },
                    }}
                    control={control}
                    name="gender"
                    id="gender"
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        className="d-flex flex-row"
                        value={userData.gender}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio color="primary" />}
                          className="ms-1 mr-3 mt-1"
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio color="primary" />}
                          className="ms-1 mr-3 mt-1"
                          label="Female"
                        />
                        {/* <FormControlLabel
                      value="Other"
                      control={<Radio color="primary" />}
                      label="Other"
                    /> */}
                      </RadioGroup>
                    )}
                  />
                </div>
                <FormHelperText className="font-error">
                  {errors.gender && errors.gender.message}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <Controller
                  name="dob"
                  control={control}
                  defaultValue={null}
                  render={({ field: { onChange, value } }) => (
                    <Datepicker
                      id="dob"
                      label="Enter your DOB"
                      className="required"
                      color="secondary"
                      value={value}
                      onChange={(event) => {
                        onChange(event);
                        setUserData((prev) => ({
                          ...prev,
                          dob: moment(event).format("DD-MM-YYYY"),
                        }));
                      }}
                    />
                  )}
                  rules={{
                    required: "DOB is required",
                  }}
                />
                <FormHelperText className="font-error">
                  {errors.dob && errors.dob.message}
                </FormHelperText>
              </FormControl>

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
                    maxLength: {
                      value: 30,
                      message: "Password was Too High",
                    },
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
                Submit
              </Button>
              <div className="d-flex align-items-center justify-content-center">
                <p className="m-0">Already have you registered ?</p>
                <Link to="/login" className="nav-link linkUrl m-0">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
