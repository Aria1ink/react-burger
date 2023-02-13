import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ChapterPanel.module.css";
import { setActiveMenuTab } from "../../services/actions/menu";
import { getMenuStatusFromStore } from "../../utils/tools";

export default function ChapterPanel (props) {
  const currentMenu = useSelector(getMenuStatusFromStore);
  const dispatch = useDispatch();
  const handleClick = (target) => {
    dispatch(setActiveMenuTab(target));
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

ChapterPanel.propTypes = {
  chapters: PropTypes.array.isRequired
}; 