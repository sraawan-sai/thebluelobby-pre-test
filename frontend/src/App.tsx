import { useState, useEffect } from "react";
import { initFetch, HttpMethod } from "./utils/fetch";
import { Task } from "./Task";
import { BiTrash } from "react-icons/bi";
import { HiCheck } from "react-icons/hi";
import AddTask from "./components/AddTask";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";

const apiUrl = "http://localhost:3000";

// export default App;
const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [filter, setFilter] = useState("");

  const fetchTasks = async () => {
    const taskdata: Task[] = await initFetch(apiUrl)(HttpMethod.GET, "/tasks");
    // const taskdata: Task[] = await initFetch(apiUrl.GET, "/tasks");

    setTasks(taskdata);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskDescription.trim() !== "") {
      const newTask: Task = await initFetch(apiUrl)(HttpMethod.POST, "/tasks", {
        body: { description: newTaskDescription },
      });
      setTasks([...tasks, newTask]);
      setNewTaskDescription("");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response: Response = await initFetch(apiUrl)(
        HttpMethod.DELETE,
        `/tasks/${taskId}`
      );

      if (response.status === 204) {
        // Deletion was successful, update the state by removing the deleted task
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        // Handle other non-successful responses here, e.g., show an error message to the user
        console.error(
          "An error occurred while deleting the task. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("An error occurred while deleting the task:", error);
      // Handle the error here, e.g., show an error message to the user
    }
  };

  const handleUpdateTask = async (task: Task) => {
    const updatedTask: Task = await initFetch(apiUrl)(
      HttpMethod.PATCH,
      `/tasks/${task.id}`,
      {
        body: { completed: !task.completed },
      }
    );
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === updatedTask.id ? { ...t, completed: updatedTask.completed } : t
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "pending") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <AddTask
        handleAddTask={handleAddTask}
        newTaskDescription={newTaskDescription}
        setNewTaskDescription={setNewTaskDescription}
      />
      <Filter setFilter={setFilter} filter={filter} />
      <TaskList
        tasks={filteredTasks}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default App;
