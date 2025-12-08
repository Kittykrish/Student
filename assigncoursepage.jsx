import { useState } from "react";
import { useStore } from "../store";

export default function AssignCoursesPage() {
  const { state, actions, selectors } = useStore();
  const [courseId, setCourseId] = useState(state.courses[0]?.id ?? "");
  const [teacherId, setTeacherId] = useState(state.teachers[0]?.id ?? "");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!courseId || !teacherId) return;
    actions.assignCourseToTeacher(courseId, teacherId);
  };

  return (
    <section>
      <h2>Assign Courses to Teachers</h2>
      <form onSubmit={onSubmit} style={{ marginBottom: 12 }}>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        >
          {state.courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        >
          {state.teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <button type="submit" style={{ padding: "8px 12px" }}>
          Assign
        </button>
      </form>

      <h3>Current Assignments</h3>
      {state.assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <ul>
          {state.assignments.map((a) => {
            const course = selectors.getCourseById(a.courseId);
            const teacher = selectors.getTeacherById(a.teacherId);
            return (
              <li key={a.id} style={{ marginBottom: 8 }}>
                <strong>{course?.title}</strong> → {teacher?.name}
                <button
                  onClick={() => actions.removeAssignment(a.id)}
                  style={{
                    marginLeft: 8,
                    padding: "4px 8px",
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                  }}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}