import Accordion from 'react-bootstrap/Accordion';
import { FaRegEdit, FaRegTrashAlt, FaRegStar } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import axios from "axios";

import toast from "react-hot-toast";

const TodoList = ({ todoData, fetchTodoData }) => {

  // const [todoData, setTodoData] = useState(null);



  // const fetchTodoData = async () => {
  //   const resp = await axios.get("/getTodos");
  //   console.log(resp);

  //   if (resp.data.todos.length > 0) {
  //     setTodoData(resp.data.todos);
  //   }
  // }

  // useEffect(() => {
  //   fetchTodoData();
  // }, [todoData]);


  // Handle

  const handleEdit = async (todoId, todoTitle) => {
    try {
      const newTitle = prompt("Enter new Todo");
      const newTaks = prompt("Enter new tasks");

      if (!newTitle || !newTaks) {
        toast.error("Please enter Tasks and title");
      } else {
        const resp = await axios.put(`/editTodo/${todoId}`, {
          title: newTitle,
          tasks: newTaks
        });
        if (resp.data.success) {
          toast.success(`${todoTitle} Edited Successfully`);
          fetchTodoData();
        }
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Handle Delete
  const handleDelete = async (todoId, todoTitle) => {
    try {
      // Confirmation tp delete Taks are not
      const deleteConfirm = window.confirm(`Are you Sure to Delete ${todoTitle}`);

      if (deleteConfirm) {
        const resp = await axios.delete(`/deleteTodo/${todoId}`);
        console.log(resp);
        if (resp.data.success) {
          toast.success(`${todoTitle} Successfully Deleted`);
          fetchTodoData();
        }
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div>


      <Accordion defaultActiveKey="0" className="todo-list-container">
        {todoData && todoData.map((todo, i) => (
          <Accordion.Item eventKey={`${i}`}>
            <div className="todo-icon-container">

              <button className="todo-icon"
                onClick={() => handleEdit(todo._id, todo.title)}>
                <FaRegEdit className="text-primary" />
              </button>

              <button className="todo-icon"
                onClick={() => handleDelete(todo._id, todo.title)}>
                <FaRegTrashAlt className="text-danger " />
              </button>
            </div>
            <Accordion.Header>
              <h6>
                <span class="todo-star primary">
                  {todo.isPriority ? <BsFillStarFill /> : <FaRegStar />}
                </span>

                <span>  {i + 1}. {todo.title}</span>
                <span className="tasks-number">{todo.tasks.length}</span>
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              {todo.tasks}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default TodoList;