import React, {useState} from 'react';
import AuthInputForm from "../../components/AuthInputForm/AuthInputForm";
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
      onSubmit: () => {}
    },
    footer: [
      {
        text: 'Вспомнили пароль?',
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