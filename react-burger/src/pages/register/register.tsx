import React, { useState } from 'react';
import AuthInputForm from "../../components/Profile/AuthInputForm/AuthInputForm";
import { signUp } from "../../utils/tools/userTools"
import { FormAuth } from '../../services/types/data';
import { useAppDispatch, useAppLocation, useAppNavigate } from '../../utils/tools/hooks';

export default function RegisterPage () {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const location = useAppLocation();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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