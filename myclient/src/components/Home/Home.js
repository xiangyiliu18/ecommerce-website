import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import { useLayoutState } from "../../context/LayoutContext";
import Order from "../../pages/orders/Order";
import Product from "../../pages/products/Product";
import Category from "../../pages/products/Category";
import Analytics from "../../pages/marketing/Analytics";
import MarketEvent from "../../pages/marketing/marketEvents";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import StorageUtils from "../Storage/StorageUtils";
import EditProduct from "../../pages/products/EditProduct";
import EditOrder from "../../pages/orders/EditOrder";
import Users1 from "../../pages/users/Users";
import AddProduct from "../../pages/products/AddComponent";
import Dashboard from "../../pages/dashboard/Dashboard";


function Home(props) {
  const classes = useStyles();
  const layoutState = useLayoutState();
  const userRoles = StorageUtils.getToken().roles;
  return (
       <div className={classes.root}>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/home/dashboard" component={Dashboard} />
              {userRoles.includes('admin') && <Route path="/home/users" component={Users1}/> }
              {userRoles.includes('admin') || userRoles.includes('product') ? (
                  <Route
                  exact
                  path="/home/products"
                  render={() => <Redirect to="/home/products/all"/>}
                />) : <Redirect to="/home/dashboard"/> }
              { (userRoles.includes('admin') || userRoles.includes('product'))  && <Route path="/home/products/all" component={Product}/> }
              { (userRoles.includes('admin') || userRoles.includes('product') )&&  <Route path="/home/products/view_edit/:id" render={(props) => <EditProduct {...props} isAdd={false}/>}  />  }
              { (userRoles.includes('admin') || userRoles.includes('product'))  &&  <Route path="/home/products/add" render={(props) => <AddProduct {...props} />}/> }
              {/*{ (userRoles.includes('admin') || userRoles.includes('product')) && <Route path="/home/products/categories" component={Category}/> }*/}
              { (userRoles.includes('admin') || userRoles.includes('order')) && <Route exact path="/home/orders" render={() => <Redirect to="/home/orders/all" />}/>}
              { (userRoles.includes('admin') || userRoles.includes('order'))  &&  <Route path="/home/orders/all" component={Order} />}
              { (userRoles.includes('admin') || userRoles.includes('order')) && <Route path="/home/orders/view_edit/:id" render={(props) => <EditOrder {...props}/>} />}
              { (userRoles.includes('admin') || userRoles.includes('marketing')) && <Route exact path="/home/marketing" render={() => <Redirect to="/home/marketing/daily" />}/>}
              { (userRoles.includes('admin') || userRoles.includes('marketing')) && <Route path="/home/marketing/daily" component={Analytics} /> }
              { (userRoles.includes('admin') || userRoles.includes('marketing')) && <Route path="/home/marketing/analytics" component={MarketEvent} /> }
              <Route component={Error} />
            </Switch>
          </div>
      </div>
  );
}

export default withRouter(Home);
