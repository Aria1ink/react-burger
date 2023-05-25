import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setUserProfile, getUserProfileWithCheck } from "../../utils/user";
import { getAuthUser } from "../../utils/tools";
import style from './ProfileEditForm.module.css';

export default function ProfileEditForm () {
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
    setName({value: user.user.name, status: false});
    setEmail({value: user.user.email, status: false});
    setPassword({value: "******", status: false});
  };
  const saveProfile = (e) => {
    e.preventDefault();
    const profile = {};
    if (name.status) profile.name = name.value;
    if (email.status) profile.email = email.value;
    if (password.status) profile.password = password.value;
    setUserProfile(profile, dispatch);
  };

  return (
    <form className={style.profileEditForm}>
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
      (name.status || email.status || password.status ) && <div className={style.profileButtons}>
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
          size="medium"
          onClick={saveProfile}
        >
          Сохранить
        </Button>
      </div>
    }
    </form>
  );
}