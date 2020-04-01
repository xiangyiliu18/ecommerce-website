import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(0.5),
  },
  typo: {
    color:'white',
    padding: 10,
    boxShadow: "0 10px 10px -5px",
    borderRadius:8
  },
  tagIcon: {
    color: theme.palette.myYellow.main
  },
}));
