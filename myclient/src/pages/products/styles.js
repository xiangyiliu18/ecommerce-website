import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    size: "100%",
    margin: "auto",
    transition: "0.3s",
    borderRadius: 5,
    boxShadow: theme.customShadows.widget
  },
  divider: {
    height: 5,
    backgroundColor: theme.palette.info.light
  },
  divider2: {
    height: 2,
    marginTop: theme.spacing(2)
  },
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  header: {
    marginTop: theme.spacing(3),
    textAlign:"center",
    fontWeight: 'bold'
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
  },
  submit: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    borderRadius: 5,
    border: 0,
    fontSize: 20,
    color: 'white',
    padding: '0 30px',
    margin: theme.spacing(3, 1, 2),
  },
  reset: {
    backgroundColor: theme.palette.info.light,
    "&:hover": {
      backgroundColor: theme.palette.info.main,
    },
    borderRadius: 5,
    border: 0,
    fontSize: 20,
    color: 'white',
    padding: '0 30px',
    margin: theme.spacing(3, 1, 2),
  },
  textField: {
     marginBottom: '2%',
     marginRight: '2%',

  },
  selectField: {
    marginBottom: '2%',
    borderBottomColor: theme.palette.error.light,
  },
  labelText: {
    marginTop: theme.spacing(1),
    fontWeight: 'bold'
  },
  radio: {
    marginBottom: theme.spacing(10),
  },
  errorBtn: {
    color: theme.palette.error.main,
    "&:hover": {
      color: theme.palette.error.light,
    }
  },
  editBtn:{
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.light,
    }
  },
  infoBtn: {
    color:  theme.palette.info.main,
    "&:hover": {
      color: theme.palette.info.light,
    }
  },

  nextLevelBtn:{
    backgroundColor:  theme.palette.info.main,
    color: 'white',
    "&:hover": {
      backgroundColor: theme.palette.info.light,
    }
  },

  stockBtn: {
    backgroundColor:  theme.palette.success.light,
    "&:hover": {
      color:'white',
      backgroundColor: theme.palette.success.main,
    }
  },
  stockBtn2: {
    backgroundColor:  theme.palette.success.main,
    "&:hover": {
      color:'white',
      backgroundColor: theme.palette.success.dark,
    }
  },
  stockIcon: {
    color:  theme.palette.success.light,
    "&:hover": {
      color: theme.palette.success.main,
    }
  },
  addBtn: {
    marginTop: theme.spacing(1),
    backgroundColor:  theme.palette.success.light,
    "&:hover": {
      color:'white',
      backgroundColor: theme.palette.success.main,
    }
  },
  lowBtn: {
    backgroundColor:  theme.palette.warning.light,
    "&:hover": {
      color:'white',
      backgroundColor: theme.palette.warning.main,
    }
  },
  lowIcon: {
    color:  theme.palette.warning.light,
    "&:hover": {
      color:theme.palette.warning.main,
    }
  },
  tagText: {
    color: theme.palette.background.light,
  },
  outBtn: {
    backgroundColor:  theme.palette.error.dark,
    "&:hover": {
      color:'white',
      backgroundColor: theme.palette.error.main,
    }
  },
  outIcon: {
    color:  theme.palette.error.dark,
    "&:hover": {
      color: theme.palette.error.main,
    }
  },
  operations: {
     display: 'flex',
    justifyContent: "space-between"
  },
  errorMessage: {
    color: theme.palette.error.dark
  },
  productInfo:{
    marginTop: theme.spacing(1),
    fontWeight: "bold",
  },
  tagIcon: {
    color: theme.palette.myOrange.main
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
  }
}));
