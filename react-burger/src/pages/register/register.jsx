import React, {useState} from 'react';
import AuthInputForm from "../../components/AuthInputForm/AuthInputForm";
import styles from './register.module.css';

export default function RegisterPage () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formRegister = {
    title: 'Регистрация',
    input: [
      {name: 'name', placeHolder: 'Имя', state: { value: name, setValue: setName }, key: 'inputName'},
      {name: 'email', placeHolder: 'E-mail', state: { value: email, setValue: setEmail }, key: 'inputEmail'},
      {name: 'password', placeHolder: 'Пароль', state: { value: password, setValue: setPassword }, key: 'inputPassword'}
    ],
    submit: {
      name: 'Зарегистрироваться',
      onSubmit: () => {}
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