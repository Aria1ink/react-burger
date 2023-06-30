import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ChapterPanel.module.css";
import { MenuState, setActiveTabMenu } from "../../../services/slices/menu";
import { getMenuStatusFromStore } from "../../../utils/tools/storeTools";
import { Chapter } from "../../../services/types/ingredients";

type Props = {
  chapters: Chapter[]
};

export default function ChapterPanel (props: Props) {
  const currentMenu = useSelector(getMenuStatusFromStore);
  const dispatch = useDispatch();
  const handleClick = (target: string) => {
    dispatch(setActiveTabMenu(target as MenuState));
    const chapter = document.getElementById(target);
    if (chapter) {
      chapter.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={style.ChapterPanel + " pb-10"} >
      {
        props.chapters.map((chapter) =>
          <Tab key={chapter.type} value={chapter.type} active={currentMenu === chapter.type} onClick={handleClick}>
            {chapter.title}
          </Tab>
        )
      }  
    </div>
  );
};