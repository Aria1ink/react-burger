import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfileMenu from "../../components/Profile/ProfileMenu/ProfileMenu";
import style from './profile.module.css';
import { useAppLocation } from '../../utils/tools/hooks';

export default function ProfilePage () {
  const location = useAppLocation();

  return (
    <div className={style.profileMain}>
      <div className={style.profileMenuContainer}>
        <ProfileMenu />
        {location.pathname === "/profile" && <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете
           изменить свои персональные данные</p>}
      </div>
      <Outlet />
    </div>
  );
}