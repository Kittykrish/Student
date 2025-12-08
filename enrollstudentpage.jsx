import { useState } from "react";
import { useStore } from "../store";

export default function EnrollStudentsPage() {
  const { state, actions, selectors } = useStore();
  const [studentId, setStudentId] = useState(state.students[0]?.id ?? "");
  const [courseId, setCourseId] = useState(state.courses[0]?.id ?? "");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!studentId || !courseId) return;
    actions.enrollStudentInCourse(studentId, courseId);
  };

  return (
    <section>
      <h2>Enroll Students in Courses</h2>
      <form onSubmit={onSubmit} style={{ marginBottom: 12 }}>
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        >
          {state.students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

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

        <button type="submit" style={{ padding: "8px 12px" }}>
          Enroll
        </button>
      </form>

      <h3>Current Enrollments</h3>
      {state.enrollments.length === 0 ? (
        <p>No enrollments yet.</p>
      ) : (
        <ul>
          {state.enrollments.map((e) => {
            const course = selectors.getCourseById(e.courseId);
            const student = selectors.getStudentById(e.studentId);
            return (
              <li key={e.id} style={{ marginBottom: 8 }}>
                <strong>{student?.name}</strong> → {course?.title}
                <button
                  onClick={() => actions.removeEnrollment(e.id)}
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