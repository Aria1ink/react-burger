import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { setUserProfile } from "../../utils/user";
import { getAuthUser } from "../../utils/tools";
import styles from './profile.module.css';

export default function ProfilePage () {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(getAuthUser);

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
    };
  }, []);
  const saveProfile = (e) => {
    e.preventDefault();
    setUserProfile({
      name: name,
      email: email,
      password: password
    })
  };
  const cancelChange = () => {
    setName(user.user.name);
    setEmail(user.user.email);
  };

  return (
    <div className={styles.profileMain}>
      <ProfileMenu />
      <form>
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
      <div>
        <button className={styles.cancelButton}>
          Отмена
        </button>
        <Button htmlType="submit">
          Сохранить
        </Button>
      </div>
      </form>
    </div>
  );
}