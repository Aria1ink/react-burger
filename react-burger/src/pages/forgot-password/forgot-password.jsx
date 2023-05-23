import React, {useState} from 'react';
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import AuthInputForm from "../../components/AuthInputForm/AuthInputForm";
import { resetUserPassword } from "../../utils/user";
import styles from './forgot-password.module.css';

export default function ForgotPasswordPage () {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const formForgotPassword = {
    title: 'Восстановление пароля',
    input: [
      {name: 'email', placeHolder: 'E-mail', state: { value: email, setValue: setEmail }, key: 'inputEmail'}
    ],
    submit: {
      name: 'Восстановить',
      onSubmit: async (e) => {
        e.preventDefault();
        if (await resetUserPassword(email)) {
          navigate("/reset-password", {replace: true, state: {from: location.pathname}});
        };
      }
    },
    footer: [
      {
        linkText: 'Вспомнили пароль?',
        linkName: 'Войти',
        linkUrl: '/login',
        key: 'linkLogin'
      }
    ]
  };
  return (
    <AuthInputForm form={formForgotPassword} />
  );
}