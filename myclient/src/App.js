
import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import { applyMiddleware, createStore } from "redux";
import ReduxPromise from 'redux-promise';
import { Provider } from "react-redux";
import { rootReducer } from "./reducers/root.reducer";
import { SnackbarProvider } from "notistack";
import StorageUtils from "./components/Storage/StorageUtils";
import ServerError from "./pages/error/500";
import Login from "./pages/login/Login";

export default function App() {
  const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);
  return (
      <Provider store={createStoreWithMiddleWare(rootReducer)}>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home/dashboard" />} />
              <Route
                exact
                path="/home"
                render={() => <Redirect to="/home/dashboard" />}
              />
              <PrivateRoute path="/home" component={Home} />
              <PublicRoute path="/login" component={Login} />
            </Switch>
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
  );

  function PrivateRoute({ component: Component, ...rest }) {
    const authUser = StorageUtils.getToken();
    return (
      <Route
        {...rest}
        render={props =>
          (authUser)? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component: Component, ...rest }) {
    const authUser = StorageUtils.getToken();
    return (
      <Route
        {...rest}
        render={props =>
          (authUser) ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  }
}
