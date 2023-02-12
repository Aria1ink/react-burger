import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Chapter from "../Chapter/Chapter";
import style from "./BurgerIngredients.module.css";
import ChapterPanel from "../ChapterPanel/ChapterPanel";
import {chapters} from "../../variables/data";
import { setActiveMenuTab } from "../../services/actions/menu";

export default function BurgerIngredients () {
  const dispatch = useDispatch();

  useEffect( () => {
    const observerOptions = {
      root: document.querySelector('#scrollContainer'),
      rootMargin: '0px 0px 30% 0px',
      threshold: 0
    };
    const callback = function(entries, observer) {
      dispatch(setActiveMenuTab((entries[0].target.id)));
    };
    const observer = new IntersectionObserver(callback, observerOptions);
    const chapterBun = document.querySelector('#bun');
    const chapterMain = document.querySelector('#main');
    const chapterSauce = document.querySelector('#sauce');
    observer.observe(chapterBun);
    observer.observe(chapterMain);
    observer.observe(chapterSauce);
  }, []);

  return (
    <div className={style.BurgerIngredients} >
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <ChapterPanel chapters={chapters} />
      <div id="scrollContainer" className={style.IngredientsContainer}>
        {
          chapters.map( (chapter) => 
          <Chapter 
            key={"chapter-" + chapter.type} 
            title={chapter.title} 
            type={chapter.type} 
            name={chapter.title}>
          </Chapter>
          )
        }
      </div>
    </div>
  );
};