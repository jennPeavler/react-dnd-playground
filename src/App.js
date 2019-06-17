import React from 'react';
import { DndProvider, DragDropContext, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { DragItemTypes } from './DragItemTypes';


import './App.scss';

function App() {
  const [{isDragging}, drag] = useDrag({
    item: { type: DragItemTypes.DIV },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  });



  const [, drop] = useDrop({
    accept: DragItemTypes.DIV,
    drop: () => console.log('i dropped a div')
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App'>
        <aside className='App__element-list'>
          <div ref={drag} style={{opacity: isDragging ? 0.5 : 1, cursor: 'move'}}>div</div>
        </aside>
        <main className='App__workpage' ref={drop}>
        
        </main>
      </div>
    </DndProvider>
  );
}

export default DragDropContext(HTML5Backend)(App);
