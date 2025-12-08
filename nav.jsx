import { NavLink } from "react-router-dom";

export default function Nav() {
  const linkStyle = ({ isActive }) => ({
    padding: "8px 12px",
    marginRight: 8,
    borderRadius: 6,
    textDecoration: "none",
    color: isActive ? "#fff" : "#333",
    backgroundColor: isActive ? "#2563eb" : "#e5e7eb",
  });

  return (
    <nav style={{ marginBottom: 16 }}>
      <NavLink to="/students" style={linkStyle}>
        Students
      </NavLink>
      <NavLink to="/teachers" style={linkStyle}>
        Teachers
      </NavLink>
      <NavLink to="/courses" style={linkStyle}>
        Courses
      </NavLink>
      <NavLink to="/assign" style={linkStyle}>
        Assign Courses
      </NavLink>
      <NavLink to="/enroll" style={linkStyle}>
        Enroll Students
      </NavLink>
      <NavLink to="/report" style={linkStyle}>
        Enrollment Report
      </NavLink>
    </nav>
  );
}