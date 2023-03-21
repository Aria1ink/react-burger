import React from 'react';
import AuthInputForm from "../../components/AuthInputForm/AuthInputForm";
import { v4 as uuid } from "uuid";
import styles from './login.module.css';

export default function LoginPage () {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const formLogin = {
    title: 'Вход',
    input: [
      {name: 'email', placeHolder: 'E-mail', state: { value: email, setValue: setEmail }, key: uuid()},
      {name: 'password', placeHolder: 'Пароль', state: { value: password, setValue: setPassword }, key: uuid()}
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
        key: uuid()
      }
    ]
  };

  return (
    <AuthInputForm form={formLogin} />
  );
}