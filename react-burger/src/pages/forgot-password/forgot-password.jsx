import React, {useState} from 'react';
import AuthInputForm from "../../components/AuthInputForm/AuthInputForm";
import { resetUserPassword } from "../../services/actions/auth";
import styles from './forgot-password.module.css';

export default function ForgotPasswordPage () {
  const [email, setEmail] = useState('');
  const formForgotPassword = {
    title: 'Восстановление пароля',
    input: [
      {name: 'email', placeHolder: 'E-mail', state: { value: email, setValue: setEmail }, key: 'inputEmail'}
    ],
    submit: {
      name: 'Восстановить',
      onSubmit: (e) => {
        e.preventDefault();
        resetUserPassword(email);
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