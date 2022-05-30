import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import { Container } from "@mui/material";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/new" element={<TaskForm />} />
          <Route path="/task/:id/edit" element={<TaskForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
