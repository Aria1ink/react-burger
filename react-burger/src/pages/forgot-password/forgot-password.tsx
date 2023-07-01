import React, {useState} from 'react';
import AuthInputForm from "../../components/Profile/AuthInputForm/AuthInputForm";
import { resetUserPassword } from "../../utils/tools/userTools";
import { FormAuth } from '../../services/types/data';
import { useAppLocation, useAppNavigate } from '../../utils/tools/hooks';

export default function ForgotPasswordPage () {
  const [email, setEmail] = useState<string>('');
  const navigate = useAppNavigate();
  const location = useAppLocation();
  const formForgotPassword: FormAuth = {
    title: 'Восстановление пароля',
    input: [
      {name: 'email', placeHolder: 'E-mail', state: { value: email, setValue: setEmail }, key: 'inputEmail'}
    ],
    submit: {
      name: 'Восстановить',
      onSubmit: async (e) => {
        e.preventDefault();
        if (await resetUserPassword(email)) {
          navigate("/reset-password", {replace: true, state: {from: location.pathname}});
        };
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
    <AuthInputForm form={formForgotPassword} />
  );
}