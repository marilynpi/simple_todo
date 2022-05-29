import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const [btnText, setBtnText] = useState(id ? "Save" : "Create");
  const [titleText, setTitleText] = useState(id ? "Edit" : "Create");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (id) {
      console.log("editing");
      await fetch(`http://localhost:4000/task/${id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false);
      navigate("/");
    } else {
      const res = await fetch("http://localhost:4000/task", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const getTask = async (id) => {
    const res = await fetch(`http://localhost:4000/task/${id}`);
    const data = await res.json();
    setTask({ title: data.title, description: data.description });
  };

  useEffect(() => {
    if (id) {
      getTask(id);
    } else {
      setTask({ title: "", description: "" });
    }
    setBtnText(id ? "Save" : "Create");
    setTitleText(id ? "Edit" : "Create");
  }, [id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
    >
      <Paper
        elevation={0}
        style={{
          padding: "1rem",
        }}
      >
        <Typography variant="h6">{`${titleText} Task`}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="filled"
            label={"Task title"}
            name="title"
            value={task.title}
            sx={{
              display: "block",
              margin: ".5rem 0",
            }}
            onChange={handleChange}
          />
          <TextField
            variant="filled"
            label={"Task description"}
            value={task.description}
            multiline
            rows={4}
            name="description"
            sx={{
              display: "block",
              margin: ".5rem 0",
            }}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!task.title || !task.description}
          >
            {loading ? <CircularProgress color="inherit" size={24} /> : btnText}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
