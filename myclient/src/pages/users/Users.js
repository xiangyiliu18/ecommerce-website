import React from "react";
import { connect } from "react-redux";
import { allUsers } from "../../actions/user.action";
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import PageTitle from "../../components/PageTitle/PageTitle";
import CircularProgress from '@material-ui/core/CircularProgress';
import UserTable from "./UserTable";
import IconButton from "@material-ui/core/IconButton";


class Users extends React.Component {
    componentDidMount() {
      this.props.allUsers();
    }

  render() {
    return (
      <>
        <PageTitle title="User Roles Management" icon="users"/>
        {this.props.users ?
          (
            <UserTable dataSource={this.props.users}/>
          ) : (
            <IconButton style={{color: 'white'}}><CircularProgress/>Please waiting for a moment here. Data is loading...</IconButton>)
        }
      </>
    );
  }
}

function mapStateToProps({users}) {
  return { users };
}
export default connect(mapStateToProps,{allUsers})(Users);


