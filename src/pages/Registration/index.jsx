import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import axios from "../../axios"
import styles from "./Login.module.scss";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: onchange,
  });

  const dispatch = useDispatch();

  const { isAuth } = useSelector(state => state.auth)

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      return navigate("/")
    }
  }, [isAuth])

  const onSubmit = async (values) => {
    const data = await axios.post("auth/register", values);
    console.log(data)
    // if ('token' in data.payload) {
    //   const token = data.payload.token;
    //   localStorage.setItem('token', token)
    // } else {
    //   alert("Не удалось зарегистрироваться!")
    // }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          placeholder="Полное имя"
          type="text"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Полное имя" })}
        />
        <TextField
          className={styles.field}
          placeholder="E-Mail"
          type="email"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "E-mail" })}
        />
        <TextField
          className={styles.field}
          placeholder="Пароль"
          fullWidth
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Пароль" })}
        />
        <Button size="large" variant="contained" fullWidth type={"submit"}>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
