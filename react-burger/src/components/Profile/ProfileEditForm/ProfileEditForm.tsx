import React, { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setUserProfile, getUserProfile, checkRequestToken } from "../../../utils/tools/userTools";
import { getAuthUser } from "../../../utils/tools/storeTools";
import style from './ProfileEditForm.module.css';
import { User } from '../../../services/types/user';

type State = {
  value: string | undefined; 
  status: boolean
};

export default function ProfileEditForm () {

  const dispatch = useDispatch();
  const user = useSelector(getAuthUser);
  const [name, setName] = useState<State>({value: user.user.name, status: false});
  const [email, setEmail] = useState<State>({value: user.user.email, status: false});
  const [password, setPassword] = useState<State>({value: "******", status: false});

  useEffect( () => {
    checkRequestToken(getUserProfile, dispatch);
  }, []);

  useEffect( () => {
    if (user.user) {
      setName({value: user.user.name, status: false});
      setEmail({value: user.user.email, status: false});
      setPassword({value: "******", status: false});
    }
  }, [user]);

  const resetForm = async () => {
    setName({value: user.user?.name, status: false});
    setEmail({value: user.user?.email, status: false});
    setPassword({value: "******", status: false});
  };
  const saveProfile = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    const profile: User = {};
    if (name.status) profile.name = name.value;
    if (email.status) profile.email = email.value;
    if (password.status) profile.password = password.value;
    checkRequestToken(setUserProfile, dispatch, profile);
  };

  return (
    <form className={style.profileEditForm}>
      <Input
        placeholder="Имя"
        type="text"
        value={name.value as string}
        icon="EditIcon"
        onChange={(e) => {setName({value: e.target.value, status: true})}}
        />
      <EmailInput
        placeholder="Логин"
        value={email.value as string}
        isIcon={true}
        onChange={(e) => {setEmail({value: e.target.value, status: true})}}
      />
      <PasswordInput
        placeholder="Пароль"
        value={password.value as string}
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