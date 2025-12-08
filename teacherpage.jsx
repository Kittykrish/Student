import { useState } from "react";
import { useStore } from "../store";

export default function TeachersPage() {
  const { state, actions, selectors } = useStore();
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    actions.addTeacher(name);
    setName("");
  };

  return (
    <section>
      <h2>Teachers</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 12 }}>
        <input
          placeholder="Teacher name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Add Teacher
        </button>
      </form>
      <ul>
        {state.teachers.map((t) => {
          const courses = selectors.getCoursesForTeacher(t.id);
          return (
            <li key={t.id} style={{ marginBottom: 8 }}>
              <strong>{t.name}</strong>{" "}
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