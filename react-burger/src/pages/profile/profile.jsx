import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import AuthInputForm from '../../components/AuthInputForm/AuthInputForm';
import styles from './profile.module.css';

export default function ProfilePage () {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formProfile = {
    input: [
      {name: 'name', placeHolder: 'Имя', state: { value: name, setValue: setName }, key: 'inputName'},
      {name: 'email', placeHolder: 'E-mail', state: { value: email, setValue: setEmail }, key: 'inputEmail'},
      {name: 'password', placeHolder: 'Пароль', state: { value: password, setValue: setPassword }, key: 'inputPassword'}
    ],
    submit: {
      name: 'Сохранить',
      onSubmit: (e) => {
        e.preventDefault();
        
      }
    }
  };

  return (
    <div className={styles.profileMain}>
      <ProfileMenu />
      <div>
        <Input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          />
        <EmailInput
          placeholder="Логин"
          onChange={(e) => {setEmail(e.target.value)}}
          value={email}
          name={'email'}
          extraClass="mb-2"
        />
        <PasswordInput
          onChange={(e) => {setPassword(e.target.value)}}
          value={password}
          name={'password'}
          extraClass="mb-2"
        />
      </div>
      <div>
        <button className={styles.cancelButton}>
          Отмена
        </button>
        <Button>
          Сохранить
        </Button>
      </div>
    </div>
  );
}