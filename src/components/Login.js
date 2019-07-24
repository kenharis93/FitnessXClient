import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Image from '../img/fitness-background.jpg';
import { Formik } from "formik";
import axios from 'axios';
import TokenContext from '../contexts/TokenContext';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
        backgroundImage: `url(${Image})`,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'grey',
    color: 'white',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const tokenContext = useContext(TokenContext);

  if (tokenContext.token) {
    props.history.push('/dashboard');
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik onSubmit={(values) => {  
          // Below to test how values being passed
          // alert(JSON.stringify(values, null, 2));
          axios.post('https://project-server-mernmonks.herokuapp.com/api/auth', values)
          .then((response) => {
            console.log(response);
            let { token } = response.data;
            // props.setToken(token);
            tokenContext.setToken(token);
            props.history.push('/dashboard')
         })
          .catch((error) => {
            console.log(error);
          });     
        }} 
        >
        {({ handleSubmit, handleChange, values  }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField onChange={handleChange}
            value={values.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField onChange={handleChange}
            value={values.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        )}
        </Formik>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}