import React, { useState, useEffect, useContext } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../img/fitness-background.jpg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import TokenContext from '../contexts/TokenContext';
import { Redirect } from 'react-router-dom';

// Generate Order Data
// function createData(id, exercise, sets, reps, weight, date) {
//   return { id, exercise, sets, reps, weight, date };
// }

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundImage: `url(${Image})`,
//     color: 'white',
//     height: 800,
//   },
//   card: {
//     maxWidth: 345,
//     backgroundColor: '#424242',
//     color: 'white',
//   },
//   media: {
//     height: 300,
//   }
// }));

function Excercises(props) {
  const tokenContext = useContext(TokenContext);
  const classes = useStyles();
 
  //FETCHING DATA FROM API
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
    .get("https://project-server-mernmonks.herokuapp.com/api/completedExcercise",  {
      headers: {
        'x-auth-token': tokenContext.token
      }
    })
    .then(result => setData(result.data));
  }, []);
  if (!tokenContext.token) {
    return (<Redirect to="/login" />)
  }

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>Sets</TableCell>
            <TableCell>weight</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.excercise}</TableCell>
              <TableCell>{row.reps}</TableCell>
              <TableCell>{row.sets}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>      
    </React.Fragment>
  );
}

export default Excercises;