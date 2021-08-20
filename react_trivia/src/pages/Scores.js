import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import Score from './Score';
import Typography from '@material-ui/core/Typography';
import UserStore, { userStore } from './stores/UserStore';

const Scores = () => {
  var [categories, setCategories] = useState([]);
  var [scores, setScores] = useState([]);
  var [currentScores, setCurrentScores] = useState([]);
  var userId = userStore.userId;

  function findCat(id) {
    var output = "";
    categories.forEach(element => {
      if (element.categoryId === id) {
        output = element.categoryName;
      }
    });
    return output;
  }

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('http://localhost:8080/api/category/get_all', {
          method: 'GET',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
      const fetchedCategories = await response.json(response);
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchScores() {
      const response = await fetch('http://localhost:8080/api/score/get_by_user?userId=' + userId, {
          method: 'GET',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
      const fetchedScores = await response.json(response);
      setScores(fetchedScores);
      setCurrentScores(fetchedScores)
    }
    fetchScores();
  }, []);

  const filterBySearch = (e) => {
      const searchString = e.target.value

      const cats = categories.filter((cat) => cat.categoryName.toLowerCase().includes(searchString.toLowerCase()))
      const catIds = Array.from(cats, cat => cat.categoryId)
      const newScores = scores.filter((score) => catIds.includes(score.categoryId))

      setCurrentScores(newScores)
  }
    if (userStore.isLoggedIn) {
      return (
        <div className="scoreTable">
        <br/> <br/>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {userStore.username}'s Scores
        </Typography>
        <TextField 
          size = "small"
          id="scoreSearch"
          variant="outlined"
          label="Search Scores"
           InputLabelProps={{
            shrink: true,
          }}
          onChange = {filterBySearch}
          />
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category Name</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentScores.map((score) =>(
              <Score 
                scoreId = {score.ScoreId}
                categoryName = {findCat(score.categoryId)}
                categoryId = {score.categoryId}
                scoreNum = {score.scoreNum}
                scoreTotal = {score.scoreTotal} 
              />
          ))}
        </TableBody>
      </Table>
      </TableContainer>
        </div>
      )
    }
    else {
      return (
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        <br/>
        Please log in.
      </Typography>)
    }
}

export default Scores
