import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { saveResetUserPassword } from "../../utils/tools/userTools";
import AuthInputForm from "../../components/Profile/AuthInputForm/AuthInputForm";

export default function ResetPasswordPage () {
  const navigate = useNavigate();
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
      onSubmit: async (e) => {
        e.preventDefault();
        const result = await saveResetUserPassword(password, key);
        if (result) {
          navigate("/login");
        }
      }
    },
    footer: [
      {
        linkText: 'Вспомнили пароль?',
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