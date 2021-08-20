import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import styles from './styles/trivstyles.module.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import { ThemeProvider } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import IconButton from'@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { userStore } from './stores/UserStore';
import { display } from '@material-ui/system';

const theme = createMuiTheme({
  palette: {
     primary: {
        light:'rgb(70, 181, 255)',
        main:'rgb(65, 105, 225)',
     },
     secondary: {
       main: 'rgb(70, 181, 255)',
       light:'rgb(255, 255, 255)',
     }
  },
});

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor:"rgb(245,245,245)",
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  title: {
    backgroundColor: 'rgb(65, 105, 225)',
    color:theme.palette.background.paper, 
  },
  selected: {
    backgroundColor: 'rgb(70, 181, 255)',
    color:'rgb(255, 255, 255) !important' , 

  },
  buttonoverride:{
    "&:hover":{
      backgroundColor:'rgb(70, 181, 255) !important',
      color:theme.palette.background.paper,
    }
  },
  startbutton:{
    "&:hover":{
      backgroundColor:'rgb(70, 181, 255) !important',
      color:theme.palette.background.paper,
    },
    width:'36em',
    height:'4em',
  },
  leftbar: {
    backgroundColor: theme.palette.background.paper,
  },

  sortBox: {
    padding: theme.spacing(8),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

}));




export default function CategoriesDisplay() {

  var [categories, setCategories] = useState([]);
  var [sortMethod, setSortMethod] = useState("");
  var [searchString, setSearchString] = useState("");
  var [searchHolder, setSearchHolder] = useState("");
  var [showClear, setShowClear] = useState(false);
  var [searchText, setSearchText] = useState("");
  var [searchBox, setSearchBox] = useState("");
  var [catID, setCatID] = useState("");
  var [catName, setCatName] = useState("");
  var [numQuest, setNumQuest] = useState("");
  const classes = useStyles();
 

  
  function SortButton(props) {
    return(
      <ListItem button onClick={() => setSortMethod(props.sort)} className={classes.buttonoverride}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItem>
    )
  }

  function setCategory(catName, catId, numQuest)
  {
    setCatName(catName);
    setNumQuest(numQuest);
    setCatID(catId);
  }

  function clearSearchBox()
  {
    setSortMethod(" ");
    setShowClear(false);
    setSearchBox("");
  }

  useEffect(()=> {
    if (searchBox === "")
    {
        setShowClear(false);
    }
    else
    {
      setShowClear(true);
    }
    setSearchHolder(searchBox);
    setSearchText(searchBox);
  } , [searchBox])
  
  
   useEffect(() => {
    async function fetchCategories(sortType) {
      const response = await fetch('http://localhost:8080/api/category/sort_category', {
          method: 'POST',
          body: 'sortMethod=' + sortType,
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
      const fetchedCategories = await response.json(response);
      setCategories(fetchedCategories);
    }
    fetchCategories(sortMethod);
  }, [sortMethod]);

  useEffect(() => {
    async function searchCategories(searchVal) {
        const response = await fetch('http://localhost:8080/api/category/search_category', {
            method: 'POST',
            body: 'searchString=' + searchVal,
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
            },
          });
        const fetchedCategories = await response.json(response);
        setCategories(fetchedCategories);
      }
      if (searchString !== "") {
        searchCategories(searchString);
      }
  }, [searchString]);
 
  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
  <main>
     {/* Hero unit */}
  {/*Main body below nav bar*/}
  <Grid container className={classes.leftbar} >
       
  {/* Left bar */}
  <Grid 
      container item
      direction="column"
      spacing={5}
      xs={3}
    >
     {/* White space */} 
    <Grid item >
    <div className={styles.spacer}>
    </div>
    </Grid>
    
    
     {/* Search Field */} 
      <Grid container spacing={0} alignItems="center" justify="flex-start">
        <Grid item xs={2}/>
        <Grid item>
          <IconButton className={styles.singleButton} onClick={() => setSearchString(searchHolder)}>
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField 
          clearButtonMode ="while-editing"
          size = "small"
          id="categorySearch"
          variant="outlined"
          label="Search Categories"
           InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setSearchBox(e.target.value)}
          value={searchBox}
          />
        </Grid>
        <Grid item >
          {showClear ? (
              <IconButton 
                className={styles.singleButton} 
                onClick={() => clearSearchBox()}>
              <ClearIcon />
              </IconButton> ) : null}
        </Grid>
      </Grid>
    {/* Sort Options */}
    <Container className={classes.sortBox} maxWidth="md" >
    <Card className={classes.card}>
    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
      Sort Options
    </Typography>
    <SortButton sort="Alpha" title="A-Z"/>
    <SortButton sort="RevAlpha" title="Z-A"/>
    <SortButton sort="ID" title="Oldest First"/>
    <SortButton sort="Newest" title="Newest First"/>
    </Card>
  </Container>

  </Grid> {/* Left Bar*/}
  
  {/*Right body*/}
  <Grid item xs={9}>
    {/* Page Title Space*/}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Categories
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Please select a category from those displayed below.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary"  
                    className={classes.startbutton}
                    disabled={catName === ""? true: false}
                    href={"http://localhost:3000/quiz/"+catID+"/"+numQuest}>
                    Start Quiz
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" className={classes.startbutton}
                    href={"http://localhost:3000/admin/"} disabled={!userStore.isAdmin}>
                    Admin Access
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          {/* Begin Category Cards */}
          <Grid container spacing={4}>
            {categories.map((categor) => (
              <Grid item key={categor} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" 
                    className={categor.categoryName == catName? classes.selected: classes.title }>
                      {categor.categoryName}
                    </Typography>
                    <Typography>
                      {categor.categoryDescription}  
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container direction="row" spacing={1}>
                      <Grid item alignContent="flex-start" xs={6}
                      style={{ display: "flex", justifyContent: "flex-start" }}>
                        <Button 
                          size="small" 
                          variant = {numQuest == 10 && catName == categor.categoryName ? "contained": "text"}
                          color = {numQuest == 10 && catName == categor.categoryName ? "secondary" : "primary" }
                          onClick={() => setCategory(categor.categoryName,categor.categoryId, 10)}> 
                         10 Questions
                        </Button>
                      </Grid>
                      <Grid item justify="flex-end" xs={6}
                        style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button size="small" 
                          variant = {numQuest == 20 && catName == categor.categoryName ? "contained": "text"}
                          color = {numQuest == 20 && catName == categor.categoryName ? "secondary" : "primary" }
                          className={classes.twentyquestions} align="right" 
                          onClick={() => setCategory(categor.categoryName,categor.categoryId,20)}>
                          20 Questions
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
  </Grid> {/* Album body */}
  </Grid> {/*main page */}
  </main>
  <Typography>.</Typography>
  <Typography>.</Typography>
    </React.Fragment>
    </ThemeProvider>
  );
}