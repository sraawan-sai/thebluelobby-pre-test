interface FilterProps {
  setFilter: (value: string) => void;
  filter: string;
}

const Filter = ({ setFilter, filter }: FilterProps) => {
  return (
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
  );
};

export default Filter;
