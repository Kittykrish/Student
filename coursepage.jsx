import { useState } from "react";
import { useStore } from "../store";

export default function CoursesPage() {
  const { state, actions, selectors } = useStore();
  const [title, setTitle] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    actions.addCourse(title);
    setTitle("");
  };

  return (
    <section>
      <h2>Courses</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 12 }}>
        <input
          placeholder="Course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Add Course
        </button>
      </form>
      <ul>
        {state.courses.map((c) => {
          const teachers = selectors.getTeachersForCourse(c.id);
          const students = selectors.getStudentsForCourse(c.id);
          return (
            <li key={c.id} style={{ marginBottom: 8 }}>
              <strong>{c.title}</strong>{" "}
              <small style={{ color: "#555" }}>
                ({teachers.length} teacher{teachers.length !== 1 ? "s" : ""},{" "}
                {students.length} student{students.length !== 1 ? "s" : ""})
              </small>
            </li>
          );
        })}
      </ul>
    </section>
  );
}