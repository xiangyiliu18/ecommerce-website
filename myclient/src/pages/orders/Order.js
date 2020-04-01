import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import OrderTable from "./OrderTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { getAllOrders } from "../../actions/order.action";
import IconButton from "@material-ui/core/IconButton";

class Order extends  React.Component{
  componentDidMount() {
     this.props.getAllOrders();
  }
  render() {
    return (
      <>
        <PageTitle title="Orders Management"  icon="orders" />
        {this.props.orders ?
          (
            <OrderTable orders={this.props.orders}/>
          ):  <IconButton style={{color: 'white'}}><CircularProgress/>Please waiting for a moment here. Data is loading...</IconButton>
        }
      </>
    )
  }
}
function mapStateToProps({orders}){
  return {orders};
}
export default connect(mapStateToProps, {getAllOrders})(Order);
