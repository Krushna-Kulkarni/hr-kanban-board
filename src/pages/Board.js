import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import BoardCard from "../components/BoardCard";
import { data } from "../data/kanabanDatabase";

const Board = () => {
  const { boardId } = useParams();
  const [currentBoard, setCurrentBoard] = useState([]);

  const dataBaseData = data?.find((board) => board.id === boardId);
  const storedData = JSON.parse(localStorage.getItem("kanbanDataBase"));
  const currentData = storedData?.find((board) => board.id === boardId);
  useEffect(() => {
    if (storedData) {
      setCurrentBoard(currentData?.sections);
    } else {
      setCurrentBoard(dataBaseData?.sections);
    }
    // eslint-disable-next-line
  }, [boardId]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = currentBoard.findIndex(
        (e) => e.id === source.droppableId
      );
      const destinationColIndex = currentBoard.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = currentBoard[sourceColIndex];
      const destinationCol = currentBoard[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      currentBoard[sourceColIndex].tasks = sourceTask;
      currentBoard[destinationColIndex].tasks = destinationTask;

      setCurrentBoard(currentBoard);
      const updatedBoard = storedData?.map((board) =>
        board.id === boardId ? { ...board, sections: [...currentBoard] } : board
      );

      localStorage.setItem("kanbanDataBase", JSON.stringify(updatedBoard));
    }
  };

  return (
    <div className="kanban_page">
      <div className="kanban__header">
        <div className="board__header">
          <h1>{currentData?.name}</h1>
        </div>
        <div className="board__subheader">
          <p>{currentData?.description}</p>
        </div>
      </div>
      <div className="kanban__content">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban">
            {currentBoard?.map((section) => (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    className="kanban__section"
                    ref={provided.innerRef}
                  >
                    <div className="kanban__section__title">
                      {
                        <>
                          <span>{section?.title}</span>{" "}
                          <span>{section?.tasks?.length}</span>
                        </>
                      }
                    </div>
                    <div className="kanban__section__content">
                      {section.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.5" : "1",
                              }}
                              className="kanban__section__card"
                            >
                              <BoardCard applicant={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
