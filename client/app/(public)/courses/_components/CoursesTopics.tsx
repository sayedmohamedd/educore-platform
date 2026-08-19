const topics = ["الكل", "الفيزياء", "الكيمياء", "الرياضيات", "البرمجة"];

const CoursesTopics = () => {
  return (
    <ul className="flex flex-wrap gap-1 md:gap-4 items-center my-2 text-white">
      {topics.map((topic) => (
        <li
          key={topic}
          className="font-bold rounded-2xl bg-secondary px-4 py-2 cursor-pointer"
        >
          {topic}
        </li>
      ))}
    </ul>
  );
};

export default CoursesTopics;
