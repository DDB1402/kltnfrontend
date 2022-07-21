import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { AuthActions, selectAuthError } from "../../../redux/reducer/auth";
import Helmet from "../../components/Helmet";
import Layout from "../../components/Layout";
import SVGIcon from "../../shared/SVGIcon";
import TextField from "../../shared/TextField";

function SignIn({ history }) {
  const dispatch = useDispatch();
  const loginError = useSelector(selectAuthError);
  const { isLogin } = useAuth();

  const schema = yup.object({
    email: yup
      .string()
      .required("Please enter your email!")
      .email("Email is not valid!"),
    password: yup.string().required("Please enter your password!"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const handleLogin = (values) => {
    // login({
    //   email: 'huyred1003@gmail.com',
    //   password: '10032000',
    // });
    dispatch(
      AuthActions.loginRequest({
        email: values.email,
        password: values.password,
      })
    );
  };

  useEffect(() => {
    if (!isLogin) return;
    history.replace("/home");
  }, [history, isLogin]);

  return (
    <Helmet title="Login">
      <Layout>
        <div className="sign-in">
          <div className="sign-in__top">
            <h1>Chào mừng đến với Belo</h1>
            <small>
              Chưa có tài khoản?
              <Link to="/signup">Đăng ký</Link>
            </small>
          </div>
          <form className="sign-in__form" onSubmit={handleSubmit(handleLogin)}>
            <div className="sign-in__form__content">
              <Controller
                control={control}
                name="email"
                render={({ field: { name, onChange } }) => (
                  <div className="input-field">
                    <TextField
                      type="text"
                      label="Email"
                      inputChange={(e) => onChange(e)}
                      error={!!errors[name]}
                    />
                    {errors && errors[name] && (
                      <div className="input-field__error">
                        {errors[name].message}
                      </div>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { name, onChange } }) => (
                  <div className="input-field">
                    <TextField
                      type="password"
                      label="Mật khẩu"
                      inputChange={(e) => onChange(e)}
                      error={!!errors[name]}
                    />
                    {errors && errors[name] && (
                      <div className="input-field__error">
                        {errors[name].message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            {loginError && (
              <div
                className="input-field__error"
                style={{ textAlign: "center", marginBottom: "1rem" }}
              >
                {loginError}
              </div>
            )}
            <button className="btn">Đăng nhập</button>
          </form>
        </div>
      </Layout>
    </Helmet>
  );
}

export default SignIn;
