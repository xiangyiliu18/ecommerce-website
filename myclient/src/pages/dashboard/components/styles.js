import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
widgetWrapper: {
    display: "flex",
    minHeight: "100%",
},
widgetHeader: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
},
widgetRoot: {
    boxShadow: theme.customShadows.widget,
},
widgetBody: {
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
},
noPadding: {
    padding: 0,
},
paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
},
moreButton: {
    margin: -theme.spacing(1),
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
"&:hover": {
             backgroundColor: theme.palette.primary.main,
             color: "rgba(255, 255, 255, 0.35)",
         },
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
}));
