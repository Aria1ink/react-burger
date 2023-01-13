import React from 'react';
import Chapter from '../Chapter/Chapter';
import './BurgerIngredients.css';
import { menu } from '../../variables/data'
import ChapterPanel from '../ChapterPanel/ChapterPanel';

export default function BurgerIngredients (props) {
  const chapters = [
    {title: 'Булки', type: 'bun'},
    {title: 'Соусы', type: 'sauce'},
    {title: 'Начинки', type: 'main'}
  ];

  return (
    <div className="BurgerIngredients" >
      <h1>Соберите бургер</h1>
      <ChapterPanel chapters={chapters} />
      <div className='IngredientsContainer'>
        {
          chapters.map( (chapter) => 
          <Chapter key={'chapter-' + chapter.type} title={chapter.title} type={chapter.type} name={chapter.title} ingredients={menu}></Chapter>
          )
        }
      </div>
    </div>
  );
};