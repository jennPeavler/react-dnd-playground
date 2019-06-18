import React, { useState } from 'react';
import { DndProvider, DragDropContext, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Draggable from 'react-draggable';

import { DragItemTypes } from './DragItemTypes';


import './App.scss';

function App() {
  const [elements, addElement] = useState([]);
  
  const [{isDragging}, dragListItem] = useDrag({
    item: { fromList: true, type: DragItemTypes.DIV },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  });

  const [{isDrag}, dragWorkpageItem] = useDrag({
    item: { type: DragItemTypes.TEXTAREA },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })

  const handleDivDrop = (item, drop, collectedProps) => {
    console.log({item, drop, collectedProps});
    if(item.fromList) {
      // addElement(elements.concat(<textarea className='App__workpage-div' key={elements.length} ref={dragWorkpageItem} style={{opacity: isDrag ? 0.5 : 1, cursor: 'move'}}></textarea>));
      addElement(elements.concat(<Draggable key={elements.length} handle='.handle'><div><div className='handle'>handle</div><textarea className='App__workpage-div'></textarea></div></Draggable>));
    } else {
      console.log('I need to figure out how to move this shit')
    }
  }


  const [collectedProps, drop] = useDrop({
    accept: [DragItemTypes.DIV, DragItemTypes.TEXTAREA],
    drop: (item, drop) => handleDivDrop(item, drop, collectedProps),
    collect: monitor => ({
      offset: monitor.getDifferenceFromInitialOffset()
    })
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App'>
        <aside className='App__element-list'>
          <div className='App__draggable-list-element--div' ref={dragListItem} style={{opacity: isDragging ? 0.5 : 1, cursor: 'move'}}>div</div>
        </aside>
        <main className='App__workpage' ref={drop}>
          {elements.map(element => element)}
        </main>
      </div>
    </DndProvider>
  );
}

export default DragDropContext(HTML5Backend)(App);
