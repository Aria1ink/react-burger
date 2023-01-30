import React from "react";
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ChapterPanel.module.css";

export default function ChapterPanel (props) {
  const [current, setCurrent] = React.useState(props.chapters[0].type)
  const handleClick = (target) => {
    setCurrent();
    const chapter = document.getElementById(target);
    if (chapter) {
      chapter.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={style.ChapterPanel + " pb-10"} >
      {
        props.chapters.map((chapter) =>
          <Tab key={chapter.type} value={chapter.type} active={current === chapter.type} onClick={handleClick}>
            {chapter.title}
          </Tab>
        )
      }  
    </div>
  );
};

ChapterPanel.propTypes = {
  chapters: PropTypes.array
}; 