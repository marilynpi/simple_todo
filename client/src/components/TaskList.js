import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 *
 *
 * @export
 * @return {*}
 */
export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await fetch("http://localhost:4000/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/task/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent>
            <Typography>{task.title}</Typography>
            <Typography>{task.description}</Typography>
            <Button variant="outlined" onClick={() => navigate(`/task/${task.id}/edit`)}>
              Edit
            </Button>
            <Button variant="contained" onClick={() => handleDelete(task.id)}>
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
