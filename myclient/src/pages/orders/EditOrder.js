import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import {useStyles} from "./styles";
import OrderStepper from "./OrderStepper";
import { connect } from "react-redux";
import { getOrder} from "../../actions/order.action";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";


function SimpleBreadcrumbs(props) {
  const {pageTitle} = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink color="inherit" style={{fontWeight: 'bold'}} to="/home/orders/all">
            Orders
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
class EditOrder extends React.Component {
  componentDidMount() {
    this.props.getOrder(this.props.match.params.id);
  }

  render() {
    const pageTitle = 'Order Details & Edit';
    return (
      <>
      <SimpleBreadcrumbs pageTitle={pageTitle}/>
        <PageTitle title={pageTitle} icon="order"/>
        {this.props.order?
          (
            <OrderStepper dataSource={this.props.order} props = {this.props}/>
          ) : (
            <IconButton style={{color: 'white'}}><CircularProgress/>Please waiting for a moment here. Data is loading...</IconButton>)
        }
      </>

    )
  }
};
function mapStateToProps({order}) {
  return { order };
}
export default connect(mapStateToProps,{getOrder})(EditOrder);
