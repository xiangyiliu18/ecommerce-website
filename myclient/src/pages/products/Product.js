import React from "react";
import { connect } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductTable from "./ProductTable";
import { getAllProducts } from "../../actions/product.action";

class Product extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
  }
  render() {
    return (
      <>
        <PageTitle title="Product Management" icon="product" />
        {this.props.products ?
          (
            <ProductTable props={this.props}/>
          ): (<CircularProgress/>)
        }
      </>
    )
  }
}

function mapStateToProps({products}) {
  return { products };
}
export default connect(mapStateToProps,{getAllProducts})(Product);



