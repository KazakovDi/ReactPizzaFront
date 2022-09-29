import React from 'react'
import {useForm} from "react-hook-form"
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { fetchLogin, selectAuth } from '../../../redux/slices/authSlice'

import styles from "./Auth.module.scss"


const Auth = () => {
    const isAuth = useSelector(selectAuth)
    const dispatch = useDispatch()
    const {register, formState: {errors, isValid}, handleSubmit} = useForm({
        defaultValues: {email:"admin@gmail.com", password:"123"},
        mode: "onBlur"
    })
    const onSubmitHandler = async values => {
       try {
        const data = await dispatch(fetchLogin(values))
        if("token" in data.payload)
            window.localStorage.setItem("token", data.payload.token)
       } catch(err) {
        console.log("err", err)
       }
    }
    if(isAuth)
        return <Navigate to="/"/>
  return (
    <div className='wrapper'>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input 
            className={errors.email ? styles.failedInput : ""}
            placeholder="Email"
            {...register("email",{
                required: "Поле обязательно к заполнению",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Некорректный email"
                 }
                })}
            type="email"/>
            <div className={styles.errorBlock}>
                {errors?.email && <p>{errors?.email?.message || "Ошибка входа"}</p>}
            </div>
            <input 
            className={errors.password ? styles.failedInput : ""}
            placeholder="Пароль"
            {...register("password",{
                required: "Поле обязательно к заполнению",       
                minLength: {
                    value: 3,
                    message: "Пароль должен быть от 3-х до 12-ти символов"
                },
                maxLength: {
                    value: 12,
                    message: "Пароль должен быть от 3-х до 12-ти символов"
                },
            })}
            type="text"/>
            <div className={styles.errorBlock}>
                {errors?.password && <p>{errors?.password?.message || "Ошибка входа"}</p>}
            </div>
            <input disabled={!isValid} type='submit' value="Авторизоваться" />
        </form>
    </div>
  )
}

export default Auth