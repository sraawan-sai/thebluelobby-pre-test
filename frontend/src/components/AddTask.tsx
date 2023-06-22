interface AddTaskProps {
  handleAddTask: () => Promise<void>;
  newTaskDescription: string;
  setNewTaskDescription: (value: string) => void;
}

const AddTask = ({
  handleAddTask,
  newTaskDescription,
  setNewTaskDescription,
}: AddTaskProps) => {
  return (
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
  );
};

export default AddTask;
