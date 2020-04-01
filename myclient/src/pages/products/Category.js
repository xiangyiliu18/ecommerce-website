import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { connect } from "react-redux";
import { getAllCategories } from "../../actions/category.action";
import CircularProgress from "@material-ui/core/CircularProgress";
import CategoryTable from "./CategoryTable";

class Category extends  React.Component {
  componentDidMount() {
    this.props.getAllCategories();
  }
  render() {
    return (
      <>
        <PageTitle title="Category Management"  />
        {this.props.categories ?
          (
            <CategoryTable props={this.props}/>
          ): (<CircularProgress/>)
        }
      </>
    )
  }
}
function mapStateToProps({categories}){
  return categories;
}
export default connect(mapStateToProps, {getAllCategories})(Category);
