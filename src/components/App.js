import React from 'react';
import './App.css';
import Image from '../img/fitness-background.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${Image})`,
    color: 'white',
    height: 800,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Paper className={classes.root}>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <Typography variant="h1" component="h1">
          Welcome to FitnessX
        </Typography>
        <br></br><br></br><br></br>
        <Typography variant="h5" component="h3">
          A Free Fitness Tracking Solution For Beginners
        </Typography>
      </Paper>
    </div>
  );
}

export default App;
