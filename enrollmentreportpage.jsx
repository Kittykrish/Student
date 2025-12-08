import { useStore } from "../store";

export default function EnrollmentReportPage() {
  const { state, selectors } = useStore();

  return (
    <section>
      <h2>Enrollment Report</h2>
      {state.courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div>
          {state.courses.map((course) => {
            const teachers = selectors.getTeachersForCourse(course.id);
            const students = selectors.getStudentsForCourse(course.id);
            return (
              <div
                key={course.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12,
                }}
              >
                <h3 style={{ marginTop: 0 }}>{course.title}</h3>
                <p style={{ margin: "6px 0" }}>
                  <strong>Teachers:</strong>{" "}
                  {teachers.length > 0
                    ? teachers.map((t) => t.name).join(", ")
                    : "None"}
                </p>
                <p style={{ margin: "6px 0" }}>
                  <strong>Students:</strong>{" "}
                  {students.length > 0
                    ? students.map((s) => s.name).join(", ")
                    : "None"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
