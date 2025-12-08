import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/nav.jsx";
import { StoreProvider } from "./store.jsx";
import StudentsPage from "./components/studentspage.jsx";
import TeachersPage from "./components/teacherpage.jsx";
import CoursesPage from "./components/coursepage.jsx";
import AssignCoursesPage from "./components/assigncoursepage.jsx";
import EnrollStudentsPage from "./components/enrollstudentpage.jsx";
import EnrollmentReportPage from "./components/enrollmentreportpage.jsx";


export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
          <h1 style={{ marginTop: 0 }}>School Admin</h1>
          <Nav />
          <Routes>
            <Route path="/" element={<Navigate to="/students" replace />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/assign" element={<AssignCoursesPage />} />
            <Route path="/enroll" element={<EnrollStudentsPage />} />
            <Route path="/report" element={<EnrollmentReportPage />} />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </div>
      </BrowserRouter>
      </StoreProvider>
  );
}
