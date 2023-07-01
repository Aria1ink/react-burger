import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router';
import AuthInputForm from "../../components/Profile/AuthInputForm/AuthInputForm";
import { signUp } from "../../utils/tools/userTools"
import { FormAuth } from '../../services/types/data';

export default function RegisterPage () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formRegister: FormAuth = {
    title: 'Регистрация',
    input: [
      {name: 'name', placeHolder: 'Имя', state: { value: name, setValue: setName }, key: 'inputName'},
      {name: 'email', placeHolder: 'E-mail', state: { value: email, setValue: setEmail }, key: 'inputEmail'},
      {name: 'password', placeHolder: 'Пароль', state: { value: password, setValue: setPassword }, key: 'inputPassword'}
    ],
    submit: {
      name: 'Зарегистрироваться',
      onSubmit: async (e) =>  {
        e.preventDefault();
        const result = await signUp({name: name, email: email, password: password}, dispatch);
        if (result) {
          navigate("/", {replace: true, state: {from: location.pathname}});
        }
      }
    },
    footer: [
      {
        linkText: 'Уже зарегистрированы?',
        linkName: 'Войти',
        linkUrl: '/login',
        key: 'linkLogin'
      }
    ]
  };

  return (
    <AuthInputForm form={formRegister} />
  );
}