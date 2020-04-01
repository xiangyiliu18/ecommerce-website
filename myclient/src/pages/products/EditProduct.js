import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import {useStyles} from "./styles";
import EditForm from "./EditForm";
import {CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { getProduct } from "../../actions/product.action";
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

class EditProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render(){
      const {isAdd} = this.props;
      let pageTitle = 'View & Edit Product';
      if(isAdd) { // not edit, but create new
        pageTitle = 'New Product';
      }else{
        pageTitle = 'View & Edit Product';
      }
    return(
      <>
      <SimpleBreadcrumbs pageTitle={pageTitle}/>
      <PageTitle title={pageTitle} icon="product" />
        { isAdd ? <AddForm props={this.props}/> : (this.props.product1? <EditForm product={this.props.product1} props={this.props}/>: <CircularProgress/> )}
    </>
    )
  }
}
function mapStateToProps({product1}) {
  return { product1 };
}
export default connect(mapStateToProps,{getProduct})(EditProduct);
