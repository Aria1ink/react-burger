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
  const user = useSelector(getAuthUser);
  const [name, setName] = useState({value: user.user.name, status: false});
  const [email, setEmail] = useState({value: user.user.email, status: false});
  const [password, setPassword] = useState({value: "******", status: false});

  useEffect( () => {
    setName({value: user.user.name, status: false});
    setEmail({value: user.user.email, status: false});
    setPassword({value: "******", status: false});
  }, [user]);

  const resetForm = async () => {
    const result = await getUserProfileWithCheck(dispatch);
    if (result && user) {
      setName({value: user.user.name, status: false});
      setEmail({value: user.user.email, status: false});
      setPassword({value: "******", status: false});
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
      <div className={styles.profileMenuContainer}>
        <ProfileMenu />
        <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете
           изменить свои персональные данные</p>
      </div>
      <form className={styles.profileForm}>
        <Input
          placeholder="Имя"
          type="text"
          value={name.value}
          icon="EditIcon"
          onChange={(e) => {setName({value: e.target.value, status: true})}}
          />
        <EmailInput
          placeholder="Логин"
          value={email.value}
          icon="EditIcon"
          isIcon={true}
          onChange={(e) => {setEmail({value: e.target.value, status: true})}}
        />
        <PasswordInput
          placeholder="Пароль"
          value={password.value}
          icon="EditIcon"
          onChange={(e) => {setPassword({value: e.target.value, status: true})}}
        />
      {
        (name.status || email.status || password.status) && <div>
          <Button
            htmlType="button"
            size="medium"
            type="secondary"
            onClick={resetForm}
          >
            Отмена
          </Button>
          <Button 
            htmlType="submit"
            type="primary" 
            size="medium">
            Сохранить
          </Button>
        </div>
      }
      </form>
    </div>
  );
}