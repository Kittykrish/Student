import React, { createContext, useContext, useEffect, useReducer } from "react";

const STORAGE_KEY = "school-app-state:v1";

const initialState = {
  students: [
    { id: "stu-1", name: "Alice" },
    { id: "stu-2", name: "Bob" },
  ],
  teachers: [
    { id: "teach-1", name: "Dr. Smith" },
    { id: "teach-2", name: "Prof. Rao" },
  ],
  courses: [
    { id: "course-1", title: "Mathematics" },
    { id: "course-2", title: "Physics" },
  ],
  assignments: [
    // in the output we can see assigned list
  ],
  enrollments: [
    //in the output we can see enrolled list
  ],
};

function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload ?? state;

    case "ADD_STUDENT": {
      const name = action.payload.name.trim();
      if (!name) return state;
      const exists = state.students.some(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      );
      if (exists) return state;
      return {
        ...state,
        students: [...state.students, { id: uid("stu"), name }],
      };
    }

    case "ADD_TEACHER": {
      const name = action.payload.name.trim();
      if (!name) return state;
      const exists = state.teachers.some(
        (t) => t.name.toLowerCase() === name.toLowerCase()
      );
      if (exists) return state;
      return {
        ...state,
        teachers: [...state.teachers, { id: uid("teach"), name }],
      };
    }

    case "ADD_COURSE": {
      const title = action.payload.title.trim();
      if (!title) return state;
      const exists = state.courses.some(
        (c) => c.title.toLowerCase() === title.toLowerCase()
      );
      if (exists) return state;
      return {
        ...state,
        courses: [...state.courses, { id: uid("course"), title }],
      };
    }

    case "ASSIGN_COURSE_TO_TEACHER": {
      const { courseId, teacherId } = action.payload;
      const dup = state.assignments.some(
        (a) => a.courseId === courseId && a.teacherId === teacherId
      );
      if (dup) return state;
      return {
        ...state,
        assignments: [
          ...state.assignments,
          { id: uid("assign"), courseId, teacherId },
        ],
      };
    }

    case "ENROLL_STUDENT_IN_COURSE": {
      const { studentId, courseId } = action.payload;
      const dup = state.enrollments.some(
        (e) => e.studentId === studentId && e.courseId === courseId
      );
      if (dup) return state;
      return {
        ...state,
        enrollments: [
          ...state.enrollments,
          { id: uid("enroll"), studentId, courseId },
        ],
      };
    }

    case "REMOVE_ASSIGNMENT": {
      const { id } = action.payload;
      return {
        ...state,
        assignments: state.assignments.filter((a) => a.id !== id),
      };
    }

    case "REMOVE_ENROLLMENT": {
      const { id } = action.payload;
      return {
        ...state,
        enrollments: state.enrollments.filter((e) => e.id !== id),
      };
    }

    default:
      return state;
  }
}

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch(err) {
      console.log(err);
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // selectors
  const selectors = {
    getTeacherById: (id) => state.teachers.find((t) => t.id === id),
    getCourseById: (id) => state.courses.find((c) => c.id === id),
    getStudentById: (id) => state.students.find((s) => s.id === id),
    getTeachersForCourse: (courseId) =>
      state.assignments
        .filter((a) => a.courseId === courseId)
        .map((a) => selectors.getTeacherById(a.teacherId))
        .filter(Boolean),
    getCoursesForTeacher: (teacherId) =>
      state.assignments
        .filter((a) => a.teacherId === teacherId)
        .map((a) => selectors.getCourseById(a.courseId))
        .filter(Boolean),
    getStudentsForCourse: (courseId) =>
      state.enrollments
        .filter((e) => e.courseId === courseId)
        .map((e) => selectors.getStudentById(e.studentId))
        .filter(Boolean),
    getCoursesForStudent: (studentId) =>
      state.enrollments
        .filter((e) => e.studentId === studentId)
        .map((e) => selectors.getCourseById(e.courseId))
        .filter(Boolean),
  };

  const actions = {
    addStudent: (name) => dispatch({ type: "ADD_STUDENT", payload: { name } }),
    addTeacher: (name) => dispatch({ type: "ADD_TEACHER", payload: { name } }),
    addCourse: (title) => dispatch({ type: "ADD_COURSE", payload: { title } }),
    assignCourseToTeacher: (courseId, teacherId) =>
      dispatch({
        type: "ASSIGN_COURSE_TO_TEACHER",
        payload: { courseId, teacherId },
      }),
    enrollStudentInCourse: (studentId, courseId) =>
      dispatch({
        type: "ENROLL_STUDENT_IN_COURSE",
        payload: { studentId, courseId },
      }),
    removeAssignment: (id) =>
      dispatch({ type: "REMOVE_ASSIGNMENT", payload: { id } }),
    removeEnrollment: (id) =>
      dispatch({ type: "REMOVE_ENROLLMENT", payload: { id } }),
  };

  return (
    <StoreContext.Provider value={{ state, actions, selectors }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("some thing went wrong");
  return ctx;
}