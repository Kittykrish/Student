import { useState } from "react";
import { useStore } from "../store";

export default function StudentsPage() {
  const { state, actions, selectors } = useStore();
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    actions.addStudent(name);
    setName("");
  };

  return (
    <section>
      <h2>Students</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 12 }}>
        <input
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Add Student
        </button>
      </form>
      <ul>
        {state.students.map((s) => {
          const courses = selectors.getCoursesForStudent(s.id);
          return (
            <li key={s.id} style={{ marginBottom: 8 }}>
              <strong>{s.name}</strong>{" "}
              <small style={{ color: "#555" }}>
                ({courses.length} course{courses.length !== 1 ? "s" : ""})
              </small>
            </li>
          );
        })}
      </ul>
    </section>
  );
}