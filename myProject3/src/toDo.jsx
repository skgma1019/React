import { useState } from "react";

export function ToDo() {
  const [todos, setTodos] = useState(["아침", "점심"]);
  const [newTodos, newSetTodos] = useState("");
  const deleteTodos = (index) => {
    setTodos(todos.filter((todo, i) => i != index));
  };
  const addNewTodos = (todo) => {
    if (!todo.trim()) return;
    if (todos.includes(todo)) {
      alert("이미 존재하는 글");
      return;
    }
    setTodos([...todos, todo]);
    newSetTodos("");
  };
  return (
    <>
      <ul className="MyTodoWrapper">
        {todos.map((todos, index) => (
          <li className="MyTodoCard" key={index}>
            {todos}{" "}
            <button className="delete-btn" onClick={() => deleteTodos(index)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodos}
        onChange={(e) => newSetTodos(e.target.value)}
        className="todo-input-row"
      />
      <button onClick={() => addNewTodos(newTodos)}>추가</button>
    </>
  );
}
