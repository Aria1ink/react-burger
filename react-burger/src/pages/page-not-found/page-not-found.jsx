import React from 'react';
import img404 from '../../image/404-error.png'
import style from './page-not-found.module.css';

export default function PageNotFoundPage () {
  return (
    <div className={style.PageNotFoundContainer}>
      <img src={img404} alt="Страница не найдена" />
      <p className="text text_type_main-large">Страница не найдена</p>
    </div>
  );
}