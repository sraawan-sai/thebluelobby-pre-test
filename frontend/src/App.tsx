import { useState, useEffect } from "react";
import { initFetch, HttpMethod } from "./utils/fetch";
import { Task } from "./Task";
import { BiTrash } from "react-icons/bi";
import { HiCheck } from "react-icons/hi";

const apiUrl = "http://localhost:3000";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [filter, setFilter] = useState("");

  const fetchTasks = async () => {
    const taskdata: Task[] = await initFetch(apiUrl)(HttpMethod.GET, "/tasks");

    setTasks(taskdata);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    console.log(newTaskDescription, "newTask");
    if (newTaskDescription.trim() !== "") {
      const newTask: Task = await initFetch(apiUrl)(HttpMethod.POST, "/tasks", {
        body: { description: newTaskDescription },
      });
      setTasks([...tasks, newTask]);
      setNewTaskDescription("");
    }
  };

  // const handleDeleteTask = async (taskId: number) => {
  //   console.log(tasks);
  //   await initFetch(apiUrl)(HttpMethod.DELETE, `/tasks/${taskId}`);
  //   setTasks(tasks.filter((task) => task.id !== taskId));
  // };
  // interface DeleteResponse {
  //   message: string;
  // }
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
      <div className="flex w-full justify-center mb-8">
        <input
          type="text"
          placeholder="Add a new task"
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddTask}
          disabled={newTaskDescription.trim() === ""}
        >
          Add
        </button>
      </div>
      <div className="w-1/2">
        <button
          className={`mx-2 px-4 py-2 rounded-lg shadow-md focus:outline-none ${
            filter === ""
              ? "bg-blue-500 text-white font-semibold"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => setFilter("")}
        >
          All
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded-lg shadow-md focus:outline-none ${
            filter === "pending"
              ? "bg-blue-500 text-white font-semibold"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded-lg shadow-md focus:outline-none ${
            filter === "completed"
              ? "bg-blue-500 text-white font-semibold"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div className="w-1/2 mt-4">
        {filteredTasks.length === 0 && (
          <div className="bg-white text-gray-800 px-4 py-2 rounded-md shadow-sm text-center">
            No tasks to show.
          </div>
        )}
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between bg-white text-gray-800 px-4 py-2 rounded-md shadow-sm my-2 ${
              task.completed ? "line-through" : ""
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                checked={task.completed}
                onChange={() => handleUpdateTask(task)}
              />
              <div>{task.description}</div>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteTask(task.id)}
            >
              <BiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
