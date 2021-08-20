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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import { userStore } from './stores/UserStore';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://franklin.edu/">
        Franklin University COMP 394 - Summer 2021 Team 2
      </Link>{' '}
      {'.'}
    </Typography>
  );
}


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

  questionedit: {
    backgroundColor: 'rgb(65, 105, 225)',
    color:theme.palette.background.paper ,
    paddingLeft:"1em",
    paddingRight:"1em",
    paddingBottom:".25em",
    width:"100%",
  },
  questiontextedit: {
    backgroundColor: theme.palette.background.paper,
    color:theme.palette.background.paper,
    width:"90%",
  },
  questionprimaryedit: { 
    color:'white !important',
    paddingBottom:".5em",
    width:"100%",
  },



  selected: {
    backgroundColor: 'rgb(70, 181, 255)',
    color:'rgb(255, 255, 255) !important', 

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
    height:'200em',
  },

  sortBox: {
    padding: theme.spacing(8),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

}));




export default function AdminPage() {

  var [categories, setCategories] = useState([]);
  var [sortMethod, setSortMethod] = useState("");
  var [searchString, setSearchString] = useState("");
  var [searchHolder, setSearchHolder] = useState("");
  var [showClear, setShowClear] = useState(false);
  var [newQuestionEdit, setNewQuestionEdit] = useState(false);
  var [newCategoryEdit, setNewCategoryEdit] = useState(false);
  var [searchText, setSearchText] = useState("");
  var [searchBox, setSearchBox] = useState("");
  var [catID, setCatID] = useState("");
  var [catDescription, setCatDescription] = useState("");
  var [catName, setCatName] = useState("");
  var [numQuest, setNumQuest] = useState("");
  var [newName, setNewName] = useState("");
  var [newDescription, setNewDescription]= useState("");
  var [questns, setQuestns] = useState([]);
  var [editQuestion, setEditQuestion ] = useState("");
  const classes = useStyles();
  const newAnswers = [{"answerText" : "New Answer1", "answerId": "001"},
    {"answerText" : "New Answer2", "answerId": "002"},
    {"answerText" : "New Answer3", "answerId": "003"}, 
    {"answerText" : "New Answer4", "answerId": "004"}];
  var [answerTextList,setAnswerTextList] =useState([]);
  var [reloadData, setReloadData ] = useState("");
  var [editingQuestionText,setEditingQuestionText] = useState("");
  var [editingAnswerText,setEditingAnswerText] = useState("");
  var [editingAnswerId,setEditingAnswerId] = useState("");
  var [editingCorrectAnswer, setEditingCorrectAnswer]= useState(""); 
  var [reloadCat, setReloadCat]= useState("");
  const inputRef = useRef();

  const handleDescInput = event => {
    setNewDescription(event.target.value);
  };



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
 
 


  function CategoryCard(props) {
    return (
    <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" 
                     className={props.categoryName === catName && !props.editmode? classes.selected: classes.title }>
                      {props.editmode ?
                        <TextField 
                        InputProps={{
                          className: classes.questionprimaryedit
                        }}
                        className={classes.questionedit}
                        onChange={(e) => setNewName(e.target.value)}
                        value={newName}
                        />
                      : 
                      <Grid container justify="center">
                      {props.categoryName} 
                      </Grid> }
                    </Typography>
                    {props.editmode ?
                    <Typography  key={"TYPOG2" +props.categoryId + props.editmode}>
                    <TextField
                      multiline
                      variant="outlined"
                      style={{ width: "80%" }}
                      rows={3}
                      onChange={handleDescInput} 
                      value={newDescription}
                      />
                    </Typography>
                  :
                    <Typography >
                      {props.categoryDescription}  
                    </Typography> }
                  </CardContent>
                  <CardActions>
                    <Grid container direction="row" spacing={1}  key={"Grid1" +props.categoryId + props.editmode}>
                      <Grid item alignContent="flex-start" xs={6}
                      style={{ display: "flex", justifyContent: "flex-start" }}>
                        <Button
                           key={"ButtonSave" +props.categoryId + props.editmode} 
                          size="small" 
                          variant = {numQuest === 10 && catName === props.categoryName && !props.editmode ? "contained": "text"}
                          color = {numQuest === 10 && catName === props.categoryName && !props.editmode ? "secondary" : "primary" }
                          onClick={() => ! props.editmode? primeCategory(props.categoryName, props.categoryId, props.categoryDescription)
                            : updateCategory(newName, newDescription, props.categoryId)}> 
                          {props.editmode ? <SaveIcon /> : <EditIcon /> }
                            
                        </Button>
                      </Grid>
                      <Grid
                      item justify="flex-end" xs={6}
                        style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button 
                          size="small" 
                          variant = {numQuest === 20 && catName === props.categoryName && !props.editmode ? "contained": "text"}
                          color = {numQuest === 20 && catName === props.categoryName && !props.editmode ? "secondary" : "primary" }
                          className={classes.twentyquestions} align="right" 
                          onClick={() => deleteCategory(props.categoryName, props.categoryId, props.editmode)}>
                         {props.editmode? <ClearIcon /> : <DeleteIcon /> }
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
    )
  }

  

  function QuestionBox(props) {
    var questionID = props.newQuestion? "New": props.Question.question.questionId;
    var questionText =props.newQuestion? "New Question": props.Question.question.questionText;
    var answersList = props.newQuestion?  answerTextList: props.Question.answers;
    var correctAnswer = props.newQuestion? "001": props.Question.correctAnswer;

    return (
      <Typography gutterBottom variant="h6" component="h2" className={classes.questionedit} >
      <Grid container spacing={1} align="center"  justify="space-between">
     {editQuestion === questionID || questionID === "New" ? 
        <Grid item backgroundColor="secondary"  xs={11}>
        <TextField 
        InputProps={{
          className: classes.questionprimaryedit
        }}
        className={classes.questionedit}
        onChange={(e) => setEditingQuestionText(e.target.value)}
        value={editingQuestionText} />
        </Grid>
        : 
        <Grid item backgroundColor="secondary" >
        {questionText}
        </Grid>
        }
        <Grid item  align="center">
        <IconButton size="small" align="right" className={styles.questionButton}  
          onClick={() => primeEditQuestion(questionID,questionText,answersList, correctAnswer)}
          disabled= {editQuestion === questionID? true: false }
          >
          <EditIcon  />
        </IconButton>
        </Grid>
      </Grid>
      {props.editmode?
      <Grid container >
      <Grid item>
          {AnswerList ({
          answers:answersList,
          correctAnswer:correctAnswer})}
      </Grid> 
      <Grid container justify="flex-end" item spacing={1}> 
      <Grid item >
         <Button size="small" className={styles.singleButton} variant="contained"
          onClick={() => saveQuestion()}>
           <SaveIcon />
         </Button>
       </Grid>
       <Grid item>
         <Button size="small" className={styles.singleButton} variant="contained"
           paddingRight="2em"
           onClick={() => deleteQuestion(questionID)}>
           <DeleteIcon />
         </Button>
       </Grid>
       <Grid item>
         <Button size="small" className={styles.singleButton} variant="contained"
           paddingRight="2em"
           onClick={() => closeQuestionEdit()}>
           <ClearIcon />
         </Button>
       </Grid>
     </Grid>
      </Grid>
      : "" }
      </Typography>
    )
  }


  function AnswerList(props) {
    var newArray = Array.from(props.answers);

      return(
      
      <Grid Container  justify="space-between" > 
        {newArray.map((currAnswer,index) => ( 
          
            <Grid item align="center" xs={12}>
              <Checkbox
              className={styles.checker}
              checked={ currAnswer.answerId=== editingCorrectAnswer? true: false}    
              onChange={(e) => setCorrectAnswer(e.target.checked, currAnswer.answerId, props.correctAnswer)}
              />
            <TextField
            size="small"
            variant="filled"
            className={classes.questiontextedit}
            onChange= {(e) => setAnswer(e.target.value, index)}
            value={editingAnswerText !== "" && index === editingAnswerId ? editingAnswerText: currAnswer.answerText}
            />
          </Grid>
        ))}
      </Grid>
    )}

  function setCorrectAnswer(isChecked, currId, corrAnswer)
  {
    if (isChecked )
    {
      setEditingCorrectAnswer(currId);
    }
  }
  
  async function saveQuestion()
  {
    if (editQuestion === "New")
    {
      editQuestion = "";
    }
      
      var subQuestion = {
        "questionText" : editingQuestionText,
        "questionId"  : editQuestion,
        "categoryId" : catID,
      }

      var submitQuestion = { 
          "question" : subQuestion,
          "answers" : answerTextList,
          "correctanswer" : editingCorrectAnswer,
      }
      const response = await fetch('http://localhost:8080/api/question/create', {
          method: 'POST',
          body: JSON.stringify(submitQuestion),
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
          },
        });
      const createdQuestion = await response.json(response);
      setReloadCat("Saved");
      setNewQuestionEdit(false);
  }

 

  function setAnswer(ansText, index)
    {
      setEditingAnswerId(index);
      setEditingAnswerText(ansText);
      let tempAnswers = answerTextList;
      tempAnswers[index].answerText = ansText;
      setAnswerTextList(tempAnswers);
    } 
   
  function primeCategory(catName, catId, catDesc)
  {
    setCatDescription(catDesc);
    setCatName(catName);
    setNumQuest(numQuest);
    setCatID(catId);
    setEditQuestion("");
    setNewQuestionEdit(false);
    setNewCategoryEdit(false);
    setNewName(catName);
    setNewDescription(catDesc);
    setReloadCat("Loaded");
  }

  function deleteCategory(catTitle, catId, editmode)
  { 
    if (!editmode)
    {
      var confDelete = window.confirm("Are you sure you want to delete " + catTitle +"?")
      if (confDelete)
      {
        const response =  fetch('http://localhost:8080/api/category/delete', {
          method: 'POST',
          body: 'categoryId=' + catId,
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
        setReloadData("Deleted");
      }
      setCatID("");
      setNewCategoryEdit(false);
    }
    setCatID("");
    setNewCategoryEdit(false);
    setNewQuestionEdit(false);
    setReloadData("NotDeleted");
  }

  function deleteQuestion(questID) {
    var conf = window.confirm("Are you sure you want to delete this question?")
      if (conf)
      {
        fetch('http://localhost:8080/api/question/delete?questionId=' + questID, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        setCatID("");
        setNewQuestionEdit(false);
        setEditQuestion("");
      }
  }

  function clearSearchBox()
  {
    setSortMethod(" ");
    setShowClear(false);
    setSearchBox("");
  }

  function primeEditQuestion(questID, questText, answers, corrAnswer)
  {
    setAnswerTextList(answers);
    setEditQuestion(questID);
    setNewQuestionEdit(false);
    setEditingQuestionText(questText);
    setEditingAnswerText("");
    setEditingAnswerId("");
    setEditingCorrectAnswer(corrAnswer);

  }

  function closeQuestionEdit() {
    setNewQuestionEdit(false);
    setEditQuestion("");
    setEditingAnswerText("");
  }

  function primeNewQuestion()
  {
    setNewQuestionEdit(true);
    setEditQuestion("New");
    setNumQuest("");
    setAnswerTextList(newAnswers);
    setEditingCorrectAnswer("1");
    setEditingQuestionText("New Question");
    setReloadCat("");
  }

  function primeNewCategory()
  {
    setNewCategoryEdit(true);
    setCatID("");
    setNewQuestionEdit(false);
    setNewName("");
    setNewDescription("");
    setReloadData("Loaded");

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
    setReloadData("Loaded");
  }, [sortMethod, reloadData]);
  
  useEffect(() => {
    async function fetchQuestions(categoryID) {
      const response = await fetch('http://localhost:8080/api/question/get_allcategory', {
          method: 'POST',
          body: 'categoryId=' + categoryID,
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
      const fetchedQuestions = await response.json(response);
      const returnedArray = Array.from(fetchedQuestions)
      setQuestns(returnedArray);
    }
    fetchQuestions(catID);
  }, [catID, reloadCat]);

  function updateCategory(categoryName, categoryDescription, categoryID) {
    const response =  fetch('http://localhost:8080/api/category/update_category', {
          method: 'POST',
          body: 'categoryName=' + categoryName + '&categoryDescription=' + categoryDescription +
            '&categoryId=' + categoryID,
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
        setReloadData("New");
        setNewCategoryEdit(false);
    }
   
 
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

  if (!userStore.isAdmin) {
    return ('');
  }
  
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

  {/* Edit/ Add Category section ********************************/}
  <Container fixed >
  
    {/* Add Category *****************************/}
    {newCategoryEdit && catID ===""? 
              <Grid item>
              {CategoryCard({
                categoryName:"New Category",
                categoryId:"New Category",
                categoryDescription:"New Category Description",
                editmode:true})}
              </Grid>
                : /* Edit Category *******************************/
              catID !== "" ? 
              <Grid item>
                {CategoryCard({
                  categoryName:catName,
                  categoryId:catID,
                  categoryDescription:catDescription,
                  editmode:true})}
                </Grid> :
                "" }
    
    {/* Add Question *************************/}
    {catID !== ""?
    <Typography gutterBottom variant="h6" component="h2" className={classes.questionedit} >
      <Grid container  justify="space-between"
      align="center">
        <Grid item>
        Add Question
        </Grid>
        <Grid item>
        <IconButton size="small" align="right" className={styles.questionButton}
        onClick={()=> primeNewQuestion() }
        disabled={newQuestionEdit}>
            <AddIcon  />
          </IconButton> 
        </Grid>
      </Grid>
    </Typography>
   : "" } 
   
   {/*New Question ******************************/}
   {newQuestionEdit? 
   (QuestionBox  (
    {editmode: true,
    newQuestion:true}))
    
   : ""}               
   

   {/*Edit Questions section *****************************/}
   {questns.map((currQuestion) => (
     QuestionBox(
       {Question:currQuestion,
        editmode:(currQuestion.question.questionId===editQuestion)})
       ))
      }
  </Container>
  </Grid> {/* Left Bar*/}
  
  {/*Right body****************************************/}
  <Grid item xs={9}>
    {/* Page Title Space*********************************/}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Admin
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Please select a category from those displayed below to edit or delete.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary"  
                    className={classes.startbutton} 
                    disabled={newCategoryEdit}
                    onClick={() => primeNewCategory()} >
                    Add Category 
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
                <CategoryCard 
                  categoryName={categor.categoryName}
                  categoryId={categor.categoryId} 
                  categoryDescription={categor.categoryDescription}/>

              </Grid>
            ))}
          </Grid>
        </Container>
  </Grid> {/* Album body */}
  </Grid> {/*main page */}
  </main>
  
    </React.Fragment>
    </ThemeProvider>
  );
}