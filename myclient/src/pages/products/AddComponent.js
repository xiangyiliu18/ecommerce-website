import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import {useStyles} from "./styles";
import EditForm from "./EditForm";
import {CircularProgress } from "@material-ui/core";

import AddForm from "./AddForm";

function SimpleBreadcrumbs(props) {
  const {pageTitle} = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink color="inherit" style={{fontWeight: 'bold'}} to="/home/products/all">
          Products
        </NavLink>
        <Link
          style={{color:'white'}}
          aria-current="page"
        >
          {pageTitle}
        </Link>
      </Breadcrumbs>
    </div>
  );
}

class AddProduct extends React.Component {
  render(){
    let pageTitle = 'New Product';

    return(
      <>
        <SimpleBreadcrumbs pageTitle={pageTitle}/>
        <PageTitle title={pageTitle} icon="product" />
         <AddForm {...this.props}/>
      </>
    )
  }
}
export default AddProduct;
