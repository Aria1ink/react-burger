import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import './ChapterPanel.css'

export default function ChapterPanel (props) {
  const [current, setCurrent] = React.useState(props.chapters[0].type)
  const handleClick = (target) => {
    setCurrent();
    const chapter = document.getElementById(target);
    if (chapter) {
      chapter.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='ChapterPanel'>
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