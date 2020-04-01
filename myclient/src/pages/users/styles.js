import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    boxShadow: theme.customShadows.widget
  },
  submit: {
    background: 'linear-gradient(45deg, #66bb6a 30%, #43a047 90%)',
    borderRadius: 5,
    border: 0,
    fontSize: 20,
    color: 'white',
    padding: '0 30px',
    margin: theme.spacing(3, 1, 2),
  },
  textField: {
    marginBottom: theme.spacing(1),
    borderBottomColor: theme.palette.background.light,
  },
  editBtn:{
    color: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.primary.light,
    }
  },
  dialogForm: {
    minHeight: 200,
    minWidth: 350,
  },
  formControl:{
    minWidth: 300,
    marginBottom: "3%"
  },
  dialogText:{
    textAlign: 'center',
    color:'white',
    backgroundColor: theme.palette.primary.main
  },
  stockBtn2: {
    backgroundColor:  theme.palette.success.main,
    marginRight: theme.spacing(5),
    "&:hover": {
      color:'white',
      backgroundColor: theme.palette.success.dark,
    }
  },
  chip: {
    backgroundColor: theme.palette.warning.light,
    "&:hover": {
      backgroundColor: theme.palette.warning.main,
    }
  },
}));
