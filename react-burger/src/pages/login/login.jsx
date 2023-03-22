import React, {useState} from 'react';
import AuthInputForm from "../../components/AuthInputForm/AuthInputForm";
import styles from './login.module.css';

export default function LoginPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formLogin = {
    title: 'Вход',
    input: [
      {name: 'email', placeHolder: 'E-mail', state: { value: email, setValue: setEmail }, key: "inputEmail"},
      {name: 'password', placeHolder: 'Пароль', state: { value: password, setValue: setPassword }, key: "inputPassword"}
    ],
    submit: {
      name: 'Войти',
      onSubmit: () => {}
    },
    footer: [
      {
        linkText: 'Вы — новый пользователь?',
        linkName: 'Зарегистрироваться',
        linkUrl: '/register',
        key: "urlRegister"
      },
      {
        linkText: 'Забыли пароль?',
        linkName: 'Восстановить пароль',
        linkUrl: '/forgot-password',
        key: "urlRForgotPassword"
      }
    ]
  };

  return (
    <AuthInputForm form={formLogin} />
  );
}