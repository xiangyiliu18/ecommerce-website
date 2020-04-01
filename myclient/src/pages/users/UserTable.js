import React  from "react";
import { connect } from "react-redux";
import { activeUser, getUser, updateRole } from "../../actions/user.action";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { useSnackbar} from "notistack";
import MUIDataTable from "mui-datatables";
import {FormControl } from "@material-ui/core";
import { useStyles } from "./styles";
import { Assignment, Save } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import { noticeOptions } from "../../components/GlobalParams";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {indexOf, isEqual} from 'lodash'
import Card from "@material-ui/core/Card";
import * as Moment from "moment";


const UserTable = (props)=>{
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();

  const {dataSource} = props;
  const [editData, setEditData] = React.useState({open: false, data: {}});
  const [roles, setRoles] = React.useState([]);
  const roleOptions = ['order','product','marketing'];

   const checkChange = () =>{
     if(roles.length < 1){
       return true;
     }
    return isEqual(roles && roles.sort(), editData.data.roles && editData.data.roles.sort());
  };

  async function handleClickOpenEdit(rowData) {
     let result = await props.getUser(rowData[1]);
     if(result.payload.success){
       const user = result.payload.user;
       user.updateAt = Moment(user.updateAt).format("DD-MM-YYYY, h:mm:ss");
       user.roles = user.roles.map((r)=>{ r = r.type ; return r;} );
       setRoles( user.roles);
       setEditData(
             {
               open:true,
               data:user
             });
      }
  }
  function handleCloseEdit() {
    setEditData({open: false, data: []});
  }
  function  handleRoleOptionChange(event) {
    // [order, product, marketing]
    setRoles(event.target.value);
  }

  const handleStatus = (employeeId, active)=> {
    let alertMessage = "Are you sure you want to INACTIVE the User with ID: "+ employeeId +"; Once inactive, the user is not allowed to login the system any more";
    if(!active){
      alertMessage = 'Are you sure you want to ACTIVE the User with ID: ' + employeeId;
    }
    confirmAlert({
      title: 'Confirmation',
      message: alertMessage,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleConfirm(!active, employeeId),
        },
        {
          label: 'No',
          onClick: () => {noticeOptions.variant = 'info'; noticeOptions.autoHideDuration=2000; enqueueSnackbar('No action apply!',noticeOptions)}
        }
      ],
    });
  };

  const handleConfirm = (active, employeeId) => {
    props.activeUser(employeeId, active,
      (res)=> {
        if(res && res.success) {
          noticeOptions.variant = 'success';
          enqueueSnackbar(res.message, noticeOptions);
        }else{
          noticeOptions.variant = 'error';
          enqueueSnackbar(res.message,noticeOptions);
        }
      },
      (err)=>{
        noticeOptions.variant = 'error';
        enqueueSnackbar(err.message, noticeOptions);
      });
  };

  const handleSubmit = (event)=> {
      event.preventDefault();
      props.updateRole(editData.data.id, roles, (res)=> {
        if(res.success){
            noticeOptions.variant='success';
            setEditData({open: false, data: {}});
          }else{
            noticeOptions.variant='error';
          }
          enqueueSnackbar(res.message, noticeOptions);
        }, (err)=> {
          noticeOptions.variant='error';
          enqueueSnackbar(err.message, noticeOptions);
        });
      };

    const columns = [
      { name: "#",
        options: {
          filter: false,
          sort: false,
          viewColumns: false,
          searchable: false,
          download: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <Assignment onClick={()=> handleClickOpenEdit(tableMeta.rowData)} className={classes.editBtn} />
            )
          }
        }},
      { name: "id", label: "User ID" , options: {filterType: "dropdown",  sortDirection: 'asc', viewColumns: false, }},
      { name: "username", label: "Username", options: {viewColumns: false}},
      { name: "lastname", label: "Last Name" },
      { name: "firstname", label: "First Name"},
      { name: "phone", label: "Phone#"},
      { name: "email", label: "Email"},
      {
        name: 'roles', label: "Roles",
        options: {
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <div>
                {value && value.map((ele) => {
                  return (<Chip key={ele.id} className={classes.chip} label={ele.type}/>)
                })
                }
              </div>
            )
          },
          customFilterListRender: v => `Role: ${v}`,
          filterType: 'multiselect',
          filterOptions: {
            names: ['order', 'product', 'marketing'],
            logic(roles, filters) {
              const temp = roles.filter( r => indexOf(filters,r.type) > -1);
                return temp.length <= 0;
            },
          }
        }
      },
      {
        name: "active", label: "Active",
        options: {
          viewColumns: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <FormControlLabel
                value={Boolean(value) ? 1 : 0}
                label={Boolean(value) ? "Active" : "Inactive"}
                control={<Switch checked={Boolean(value)} size="medium" color="primary"  onChange={() => handleStatus(tableMeta.rowData[1], Boolean(value))}/>}
              >
              </FormControlLabel>
            )
          },
          filterType: 'multiselect',
          filterOptions: {
            names: ['active', 'inactive'],
            logic(active, filters) {
              if(active === 1 && indexOf(filters, "active") > -1){
                  return false;
              }else if (active === 0 && indexOf(filters, 'inactive') > -1){
                return false;
              }
              return true;
            },
          }
        }
      },
      {
        name: "updateAt",
        options: {
          filter: false,
          sort: false,
          viewColumns: false,
          display: 'none'
        }
      }
    ];
    const options = {
      filterType: "textField",
      responsive: "scrollMaxHeight",
      rowsPerPageOptions: [5, 10, 20],
      selectableRows: 'none',
      print: false,
      downloadOptions: {
        filename: 'users.csv',
        separator: ',',
        filterOptions: {
          useDisplayedColumnsOnly: true,
          useDisplayedRowsOnly: false
        }
      }
    };
  return (
    <Card className={classes.card}>
      <MUIDataTable
        title="Users List"
        data={dataSource}
        columns={columns}
        options={options}
      />
      {dataSource && dataSource.length > 0 && <Dialog open={editData.open} aria-labelledby="edit-role" fullWidth>
        <DialogTitle id="add-category" className={classes.dialogText}>Edit User Roles</DialogTitle>
        <DialogContent>
          <form className={classes.dialogForm} name="edit-role" id="edit-role" onSubmit={handleSubmit}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <FormControl className={classes.formControl}  required fullWidth>
                <InputLabel htmlFor="user_id">User ID(readOnly)</InputLabel>
                <Input id="user_id" name="user_id" type="text" aria-describedby="user_id" autoFocus readOnly
                       value={editData.data.id || ""}/>
              </FormControl>
              <FormControl className={classes.formControl}  required fullWidth>
                <InputLabel htmlFor="user_name">Username(readOnly)</InputLabel>
                <Input id="user_name" name="user_name" type="text" aria-describedby="user_name" readOnly
                       value={editData.data.username || ""}/>
              </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="user_firstname">FirstName(readOnly)</InputLabel>
                <Input id="user_firstname" name="user_firstname" type="text" aria-describedby="user_firstname" readOnly
                       required value={editData.data.firstname || ""}/>
              </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="user_lastname">LastName(readOnly)</InputLabel>
                <Input id="user_lastname" name="user_lastname" type="text" aria-describedby="user_lastname" readOnly
                       value={editData.data.lastname || ""}/>
              </FormControl>
              <FormControl className={classes.formControl}  required fullWidth>
                <InputLabel htmlFor="user_phone">Phone Number(readOnly)</InputLabel>
                <Input id="user_phone" name="user_phone" type="text" aria-describedby="user_phone" readOnly
                       value={editData.data.phone || ""}/>
              </FormControl>
              <FormControl className={classes.formControl} required fullWidth>
                <InputLabel htmlFor="user_email">Email(readOnly)</InputLabel>
                <Input id="user_email" name="user_email" type="text" aria-describedby="user_email" readOnly
                       value={editData.data.email || ""}/>
              </FormControl>
              <FormControl className={classes.formControl} required fullWidth>
                <InputLabel htmlFor="user_roles">Roles</InputLabel>
                <Select
                  multiple
                  value={roles}
                  onChange={handleRoleOptionChange}
                  input={<Input id="user_roles"/>}
                  renderValue={selected => (
                    <div>
                      {selected.map(value => (
                        <Chip key={value} className={classes.chip} label={value}/>
                      ))}
                    </div>
                  )}
                >
                  {roleOptions.map(ele => (
                    <MenuItem key={ele} value={ele}>
                      <Checkbox checked={roles.indexOf(ele) > -1}/>
                      <ListItemText primary={ele}/>
                    </MenuItem>
                  ))}
                </Select>
                {roles.length < 1 && <FormHelperText error={true}>Please select at least one role</FormHelperText>}
              </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="user_timestamp">Last Modified(readOnly)</InputLabel>
                <Input id="user_timestamp" name="user_timestamp" type="text" aria-describedby="user_timestamp" readOnly value={editData.data.updateAt || ""}/>
              </FormControl>
            </Grid>
            <Grid container justify="center">
              <Button type='submit' variant="contained" className={classes.stockBtn2} name="submit" id="submit"
                      disabled={checkChange()}>
                <Save/> Submit
              </Button>
              <Button onClick={handleCloseEdit} variant="contained" color="secondary" name="close" id="close">
                Close
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      }
    </Card>
  );
};

export default connect(null,{updateRole,activeUser, getUser})(UserTable);
