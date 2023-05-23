import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { setUserProfile, getUserProfileWithCheck } from "../../utils/user";
import { getAuthUser } from "../../utils/tools";
import styles from './profile.module.css';

export default function ProfilePage () {
  const dispatch = useDispatch();
  const [changingStatus, setChangingStatus] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(getAuthUser);

  useEffect(() => {
    fillFormDefaultValues();
  }, []);
  const fillFormDefaultValues = async () => {
    const result = await getUserProfileWithCheck(dispatch);
    if (result && user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setPassword("******");
    }
  };
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
          placeholder="Имя"
          type="text"
          value={name}
          icon="EditIcon"
          onChange={(e) => {setName(e.target.value)}}
          />
        <EmailInput
          placeholder="Логин"
          value={email}
          icon="EditIcon"
          onChange={(e) => {setEmail(e.target.value)}}
          extraClass="mb-2"
        />
        <PasswordInput
          placeholder="Пароль"
          value={password}
          icon="EditIcon"
          onChange={(e) => {setPassword(e.target.value)}}
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