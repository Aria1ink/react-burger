import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signIn } from "../../utils/user";
import AuthInputForm from "../../components/AuthInputForm/AuthInputForm";
import style from './login.module.css';

export default function LoginPage () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let fromPage = "/";
  if (location.state) {
    fromPage = location.state.from;
  }
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
      onSubmit: async (e) => {
        e.preventDefault();
        const result = await signIn({ email: email, password: password }, dispatch);
        if (result) {
          navigate(fromPage, {replace: true});
        }
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