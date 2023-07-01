import React, { useEffect } from "react";
import Chapter from "../Chapter/Chapter";
import style from "./BurgerIngredients.module.css";
import ChapterPanel from "../ChapterPanel/ChapterPanel";
import {chapters} from "../../../variables/data";
import { MenuState, setActiveTabMenu } from "../../../services/slices/menu";
import { useAppDispatch } from "../../../utils/tools/hooks";

export default function BurgerIngredients () {
  const dispatch = useAppDispatch();

  useEffect( () => {
    const observerOptions = {
      root: document.querySelector('#scrollContainer'),
      rootMargin: '0px 0px -60% 0px',
      threshold: [0]
    };
    const callback: IntersectionObserverCallback = function(entries) {
      dispatch(setActiveTabMenu(entries[0].target.id as MenuState));
    };
    const observer = new IntersectionObserver(callback, observerOptions);
    const chapterBun = document.querySelector('#bun') as Element;
    const chapterMain = document.querySelector('#main') as Element;
    const chapterSauce = document.querySelector('#sauce') as Element;
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
            type={chapter.type} 
            name={chapter.title}>
          </Chapter>
          )
        }
      </div>
    </div>
  );
};