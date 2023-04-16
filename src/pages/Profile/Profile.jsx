import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { GlobalContext, actions } from "../../context";
import AuthServices from "../../api/services/auth-services";
import {
  Grid,
  Card,
  HeaderTitle,
  Button,
  Radio,
  RadioGroup,
  TextField,
  Datepicker,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  // PasswordTextField,
} from "../../components/index";
import "./Profile.scss";

function Profile() {
  const { enqueueSnackbar } = useSnackbar();

  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const {
    // register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [imageFile, setImageFile] = useState();
  const [image, setImage] = useState(null);
  const [invalidFileSize, setInvalidFileSize] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    gender: null,
    dob: null,
    profileImg: null,
    // email: "",
    // password: "",
  });

  const addImg = (event) => {
    const img = event.target.files[0];
    const isValidFileSize = Number((img.size / 1024 / 1024).toFixed(4)) <= 2;
    if (isValidFileSize) {
      setImage(URL.createObjectURL(img));
      setImageFile(img);
      setInvalidFileSize(false);
    } else {
      setImage(null);
      setImageFile(null);
      setInvalidFileSize(true);
    }
  };

  
  const getUserData = () => {
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.getUser()
      .then((user) => {
        storeHandler(actions.SHOW_LOADER, false);
        localStorage.setItem("user_name", user?.name);
        localStorage.setItem("profile_image", user?.profileImg);
        reset({
          name: user?.name,
          gender: user?.gender,
          dob: moment(user?.dob),
        });
        setUserData((prev) => ({
          ...prev,
          name: user?.name,
          gender: user?.gender,
          dob: moment(user?.dob).format("DD-MM-YYYY"),
          profileImg: user?.profileImg,
        }));
        // console.log(user);
      })
      .catch((err) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(err.data.message, { variant: "error" });
      });
  };

  const onSubmitEditDetails = () => {
    storeHandler(actions.SHOW_LOADER, true);
    const editUserData = {
      ...userData,
      profileImg: !invalidFileSize ? imageFile : userData.profileImg,
    };
    AuthServices.editUser(editUserData)
      .then((res) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(res.message, { variant: "success" });
        getUserData();
      })
      .catch((err) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(err.data.message, { variant: "error" });
      });
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeaderTitle title="Profile" />
      <Grid container spacing={2} justifyContent="center" className="pb-4 mt-0">
        <Card variant="outlined">
          <div className="login_box">
            <form onSubmit={handleSubmit(onSubmitEditDetails)}>
              {/* <h4 className="text-center mt-2 mb-3" color="secondary">
                Edit Profile
              </h4> */}

              <div className="w-100 d-flex flex-column justify-content-center align-items-center profile-con">
                <div
                  className={`d-flex flex-column justify-content-between addImg mb-1`}
                >
                  <div className="text-center">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        src={image ? image : userData.profileImg}
                        alt={userData.name}
                        className="upload"
                      />
                    </IconButton>
                  </div>
                  <label
                    className={`txt-primary uploadTitle mb-0 py-2 d-flex align-items-center justify-content-center cursor`}
                    // for="uploadImg"
                  >
                    Upload Profile Photo
                  </label>
                  <TextField
                    className="uploadImg"
                    inputProps={{
                      type: "file",
                      accept: "image/*",
                      id: "uploadImg",
                    }}
                    onChange={addImg}
                  />
                </div>
                <FormHelperText className="font-error mb-2">
                  {invalidFileSize && "Upload Profile Image less than 2mb"}
                </FormHelperText>
              </div>

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

              {/* <FormControl>
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
              </FormControl> */}

              {/* <FormControl>
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
              </FormControl> */}

              <Button
                color="secondary"
                variant="outlined"
                className="py-2 my-2"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </Card>
      </Grid>
    </div>
  );
}

export default Profile;
