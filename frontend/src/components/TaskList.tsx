import { Task } from "../Task";
import { BiTrash } from "react-icons/bi";

interface TaskListProps {
  tasks: Task[];
  handleDeleteTask: (taskId: number) => Promise<void>;
  handleUpdateTask: (task: Task) => Promise<void>;
}

const TaskList = ({
  tasks,
  handleDeleteTask,
  handleUpdateTask,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white text-gray-800 px-4 py-2 rounded-md shadow-sm text-center">
        No tasks to show.
      </div>
    );
  } else {
    return (
      <div className="w-1/2 mt-4">
        {tasks.map((task) => (
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
    );
  }
};

export default TaskList;
