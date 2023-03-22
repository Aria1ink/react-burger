import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { signIn } from "../../services/actions/auth";
import AuthInputForm from "../../components/AuthInputForm/AuthInputForm";
import styles from './login.module.css';

export default function LoginPage () {
  const dispatch = useDispatch();
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
      onSubmit: (e) => {
        e.preventDefault();
        signIn({ email: email, password: password }, dispatch);
      }
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