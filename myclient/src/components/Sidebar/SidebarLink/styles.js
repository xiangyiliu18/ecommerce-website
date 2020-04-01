import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.light,
    },
    boxShadow: "10px 0 50px 0 rgba(61, 110, 146, 0.10)",
    opacity: 0.8
  },
  linkActive: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: theme.palette.primary.light
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: 'white',
    boxShadow: "10px 0 50px 0 rgba(61, 110, 146, 0.10)",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
  },
  linkIconActive: {
    boxShadow: "10px 0 50px 0 rgba(61, 110, 146, 0.10)",
  },
  linkText: {
    padding: 0,
    color: 'white',
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
    fontFamily: 'Roboto,sans-serif',
    fontWeight: 'bold'
  },
  linkTextActive: {
    color:'white',
    fontWeight: 'bold',
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight:'bold',
    color: 'white'
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
