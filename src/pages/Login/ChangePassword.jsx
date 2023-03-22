import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Button,
  FormControl,
  FormHelperText,
  PasswordTextField,
} from "../../components/index";
import { GlobalContext, actions } from "../../context";
import AuthServices from "../../api/services/auth-services";
import "../../assets/styles/pages/Login/Login.scss";

function ChangePassword() {
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
    password: "",
  });
  
  const onSubmitUserData = () => {
    // console.log("userData: ", userData);
    storeHandler(actions.SHOW_LOADER, true);

    AuthServices.confirmPassword({ email: localStorage.getItem("email"), password: userData.password })
      .then((res) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(res.message, { variant: "success" });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(err.data.message, { variant: "error" });
      });
  };

  useEffect(() => {
    localStorage.getItem("email") === null && navigate("/login");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login_cont container">
      <div className="row">
        <div className="col">
          <div className="login_box">
            <form onSubmit={handleSubmit(onSubmitUserData)}>
              <h4 className="text-center mt-2 mb-3" color="secondary">
              Change Password
              </h4>

              <FormControl>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <PasswordTextField
                      id="password"
                      label="Enter your new password"
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
                Confirm
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
