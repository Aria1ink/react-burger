import React, {useState} from 'react';
import { signIn } from "../../utils/tools/userTools";
import AuthInputForm from "../../components/Profile/AuthInputForm/AuthInputForm";
import { FormAuth } from '../../services/types/data';
import { useAppDispatch, useAppLocation, useAppNavigate } from '../../utils/tools/hooks';

export default function LoginPage () {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const location = useAppLocation();
  let fromPage = "/";
  if (location.state) {
    fromPage = location.state.from;
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formLogin: FormAuth = {
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