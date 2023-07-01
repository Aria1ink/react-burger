import React, {useState} from 'react';
import { saveResetUserPassword } from "../../utils/tools/userTools";
import AuthInputForm from "../../components/Profile/AuthInputForm/AuthInputForm";
import { FormAuth } from '../../services/types/data';
import { useAppNavigate } from '../../utils/tools/hooks';

export default function ResetPasswordPage () {
  const navigate = useAppNavigate();
  const [password, setPassword] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const formResetPassword: FormAuth = {
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