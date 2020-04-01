import React from 'react';
import { connect } from "react-redux";
import { getAllOrders } from "../../actions/order.action";
import PageTitle from "../../components/PageTitle/PageTitle";
import { getTop10Products } from "../../actions/product.action";
import OrderTable from "../orders/OrderTable";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import DashboardWrapper from "./DashboardWrapper";

class Dashboard extends  React.Component{
  componentDidMount() {
    this.props.getTop10Products();
  }
  render() {
    return (
      <>
        <PageTitle title="Dashboard"/>
        {this.props.top10 ?
          (
            <DashboardWrapper products10={this.props.top10.products} count={this.props.top10.count}/>
          ):  <IconButton style={{color: 'white'}}><CircularProgress/>Please waiting for a moment here. Data is loading...</IconButton>
        }
      </>
    )
  }
}

function mapStateToProps({top10}){
  return {top10};
}
export default connect(mapStateToProps, {getTop10Products})(Dashboard);
