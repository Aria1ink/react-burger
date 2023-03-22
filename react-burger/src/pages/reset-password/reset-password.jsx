import React, {useState} from 'react';
import AuthInputForm from "../../components/AuthInputForm/AuthInputForm";
import styles from './reset-password.module.css';

export default function ResetPasswordPage () {
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');
  const formResetPassword = {
    title: 'Восстановление пароля',
    input: [
      {name: 'password', placeHolder: 'Введите новый пароль', state: { value: password, setValue: setPassword }, key: 'inputPassword'},
      {name: 'key', placeHolder: 'Введите код из письма', state: { value: key, setValue: setKey }, key: 'inputKey'}
    ],
    submit: {
      name: 'Сохранить',
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
    <AuthInputForm form={formResetPassword} />
  );
}