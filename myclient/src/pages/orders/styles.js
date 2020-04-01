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
    // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    // "&:hover": {
    //   boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    // }
  },
  cardContent: {
    size: "100%",
    margin: "auto",
  },
  divider: {
    height: 5,
    backgroundColor: theme.palette.info.light
  },
  divider2: {
    height: 2,
    marginTop: theme.spacing(2)
  },
  divider3: {
    height: 2,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  stepOneBtn: {
    marginBottom: theme.spacing(2),
  },
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  header: {
    marginTop: theme.spacing(3),
    textAlign: "center",
    fontWeight: 'bold'
  },
  form: {
    width: '100%',
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
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
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
  infoBtn: {
    color: theme.palette.info.main,
    "&:hover": {
      color: theme.palette.info.light,
    }
  },

  nextLevelBtn: {
    backgroundColor: theme.palette.info.main,
    color: 'white',
    "&:hover": {
      backgroundColor: theme.palette.info.light,
    }
  },

  stockBtn: {
    backgroundColor: theme.palette.success.light,
    "&:hover": {
      color: 'white',
      backgroundColor: theme.palette.success.main,
    }
  },
  addBtn: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.success.light,
    "&:hover": {
      color: 'white',
      backgroundColor: theme.palette.success.main,
    }
  },
  lowBtn: {
    backgroundColor: theme.palette.warning.light,
    "&:hover": {
      color: 'white',
      backgroundColor: theme.palette.warning.main,
    }
  },
  outBtn: {
    backgroundColor: theme.palette.error.dark,
    "&:hover": {
      color: 'white',
      backgroundColor: theme.palette.error.main,
    }
  },
  operations: {
    display: 'flex',
    justifyContent: "space-between"
  },
  errorMessage: {
    color: theme.palette.error.dark
  },
  productInfo: {
    marginTop: theme.spacing(1),
    fontWeight: "bold",
  },
  tagIcon: {
    color: theme.palette.myOrange.main
  },

  tagText: {
    color: theme.palette.background.light,
  },
  // Order Parts
  deliveredOrderBtn: {
    backgroundColor: theme.palette.warning.main,
    marginLeft: theme.spacing(2),
    color: 'white',
    "&:hover": {
      color: 'white',
      backgroundColor: theme.palette.warning.light,
    }
  },
  newOrderBtn: {
    backgroundColor: theme.palette.info.main,
    marginLeft: theme.spacing(2),
    color: 'white',
    "&:hover": {
      color: 'white',
      backgroundColor: theme.palette.info.light,
    }
  },
  completeOrderBtn: {
    backgroundColor: theme.palette.success.main,
    marginLeft: theme.spacing(2),
    color: 'white',
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    }
  },
  cancelledOrderBtn: {
    backgroundColor: theme.palette.error.dark,
    marginLeft: theme.spacing(2),
    color: 'white',
    "&:hover": {
      color: 'white',
      backgroundColor: theme.palette.error.light,
    }
  },

  returnOrderBtn: {
    backgroundColor: theme.palette.myOrange.dark,
    marginLeft: theme.spacing(2),
    color: 'white',
    "&:hover": {
      color: 'white',
      backgroundColor: theme.palette.myOrange.light,
    }
  },

  deliveredOrderDot: {
    color: theme.palette.warning.main,
    marginLeft: theme.spacing(2),
  },
  newOrderDot: {
    color: theme.palette.info.main,
    marginLeft: theme.spacing(2),
  },
  completeOrderDot: {
    color: theme.palette.success.main,
    marginLeft: theme.spacing(2),
    "&:hover": {
      color: theme.palette.success.light,
    }
  },
  cancelledOrderDot: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(2),
  },
  returnOrderDot: {
    color: theme.palette.myOrange.dark,
    marginLeft: theme.spacing(2),

  },
// Edit Order
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 500,
    boxShadow: "0 10px 10px -5px",
    borderRadius:  10,
    border: "0px solid #000000",
  },
  operationBtn: {
   position: 'absolute',
    right: "5%",
    marginTop: theme.spacing(1),
  },
  stepper: {
    size: "100%",
    marginTop: theme.spacing(5),
  },
  cellText : {
    fontWeight: 'bold'
  },
  skip: {
    marginRight: theme.spacing(2)
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

}));
