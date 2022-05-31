import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
/**
 *
 *
 * @export
 * @return {*}
 */
export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const { user, isAuthenticated } = useAuth0();

  const getTasks = async () => {
    if(user || user.email){
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/tasks/${user.email}`);
      const data = await response.json();
      setTasks(data);
    }
    
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_SERVER}/task/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (task) => {
    task.finished = !task.finished;
    console.log(task);
    try {
      await fetch(`${process.env.REACT_APP_API_SERVER}/task/${task.id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) {
      getTasks();
    }
  }, [isAuthenticated]);

  return (
    isAuthenticated && (
      <>
        <h1>Intentions</h1>
        {tasks.map((task) => (
          <Card key={task.id} disabled={tasks.finished} className={(task.finished)? "intention done" : "intention"}>
            <CardContent>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
              <Button variant="text" onClick={() => handleDone(task)} title="Done">
              {(task.finished) ? <CheckIcon/> : <AutoAwesomeIcon/> }
              </Button>
              <Button variant="outlined" onClick={() => navigate(`/task/${task.id}/edit`)} title="Edit">
                <AutoFixNormalIcon/>
              </Button>
              <Button variant="contained" onClick={() => handleDelete(task.id)} title="Delete">
                <DeleteIcon/>
              </Button>
            </CardContent>
          </Card>
        ))}
      </>
    )
  );
}
