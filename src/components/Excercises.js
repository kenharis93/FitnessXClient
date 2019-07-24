import React, { useState, useEffect, useContext } from 'react';
import Image from '../img/fitness-background.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import TokenContext from '../contexts/TokenContext';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "repeat",
    backgroundSize: "cover",
    color: 'white',
    height: '100%',
  },
  card: {
    maxWidth: 345,
    backgroundColor: '#424242',
    color: 'white',
  },
  media: {
    height: 300,
  }
}));


function Excercises(props) {
  const tokenContext = useContext(TokenContext);
  const classes = useStyles();
 
  //FETCHING DATA FROM API
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
    .get("https://project-server-mernmonks.herokuapp.com/api/excercises")
    .then(result => setData(result.data));
  }, []);
  if (!tokenContext.token) {
    return (<Redirect to="/login" />)
  } 
//
  return( 
    <div className='App'>
    <Paper className={classes.root}>
    <Container maxWidth="lg">
      <br></br><br></br><br></br><br></br>
      <Typography variant="h2" component="h2">
        Excercises
      </Typography>

  <Grid container spacing={4}>
      {data.map(item => (
          <Grid item key={item} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.image}
            title={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {item.name}
            </Typography>
            <Typography variant="body2" component="p">
              Type: {item.type}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <a href={item.video}>
          <Button size="small" color="secondary">
            Watch How to Do It
          </Button>
          </a>
        </CardActions>
      </Card>
            </Grid>		
            ))}
            </Grid>
    </Container>
    </Paper>
</div>
  );
}

export default Excercises;
