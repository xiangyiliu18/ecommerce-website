import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  AddOutlined, ArrowForward,
  Assignment, Category as CategoryIcon,
  DeleteForeverRounded,
  EditRounded, LocalOffer, Save, ShoppingCart,
} from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import {useStyles} from "./styles";
import CustomToolbarSelect from "../../components/CustomToolbarSelect";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { confirmAlert } from "react-confirm-alert";
import { useSnackbar } from "notistack";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addCategory, deleteCategory, updateCategory } from "../../actions/category.action";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { CardHeader, FormControl, FormControlLabel } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const CategoryTable = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const {categories} = props;
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  function handleClickOpenAdd() {
    setOpenAdd(true);
  }

  function handleCloseAdd() {
    setOpenAdd(false);
  }

  function handleClickOpenEdit() {
    setOpenEdit(true);
  }

  function handleCloseEdit() {
    setOpenEdit(false);
  }
  const animatedComponents = makeAnimated();
  const confirmDelete = (tableMetadata) => {
    console.log(tableMetadata)
  };

  const handleDelete = (tableMetadata) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure you want to delete this product',
      buttons: [
        {
          label: 'Yes',
          onClick: () => confirmDelete(tableMetadata)
        },
        {
          label: 'No',
          onClick: () => {enqueueSnackbar('Nothing Changes!')}
        }
      ],
    });
    console.log("Delete");
  };

  const columns = [
    { name: "id", label: "ID"},
    { name:"name", label: "Name"},
    { name: "level", label: "Level"},
    {
      name: 'Settings',
      options: {
        filter: false,
        sort: false,
        viewColumns: false,
        searchable: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div>
              <Tooltip title={"Edit"}>
                <EditRounded onClick={handleClickOpenEdit} className={classes.editBtn} />
              </Tooltip>
              <Tooltip title={"Delete"} >
                <DeleteForeverRounded className={classes.errorBtn} onClick={event => {
                  handleDelete(tableMeta)
                }}/>
              </Tooltip>
            </div>
          )
        }
      }
    }
  ];

  const testOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const options = {
    filter: true,
    filterType: "textField",
    responsive: "scrollMaxHeight",
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    // selectableRows: false
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
    ),
  };

  return (
    <>
      <PageTitle title="Category Management" />} />
      <Card className={classes.card}>
        <CardHeader avatar={<LocalOffer  fontSize="large" className={classes.tagIcon}/>} title="Categories" action={
          <Button variant="contained" color="primary" onClick={handleClickOpenAdd}> <AddOutlined/>Add New Category </Button>}/>
        <CardContent>
          <MUIDataTable
            title="Category List"
            data={categories}
            columns={columns}
            options={options}

          />
          <div>
            <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="add-category">
              <DialogTitle id="add-category" className={classes.dialogText}>Add New Category</DialogTitle>
              <DialogContent>
                <form className={classes.dialogForm} name="add-category" id="add-category">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="name">Name</InputLabel>
                      <Input id="name" name="name" type="text" aria-describedby="name" placeholder="Select Category Name please" autoFocus required fullWidth/>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="level">Level</InputLabel>
                      <Input autoFocus id="level" name="level" type="number" aria-describedby="level" placeholder="Select Category Level please" defaultValue={1} min={1} max={3} step={1} required fullWidth />
                      <FormHelperText id="my-helper-text">Level should between 1 and 3</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <label className={classes.labelText}>Parent Category*:</label>
                      <Input id="parent" name="parent" type="text" aria-describedby="parent" placeholder="Select Category Level please" defaultValue={1} min={1} max={3} step={1} required fullWidth />

                    </FormControl>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions>
                <Button  type="submit" variant="contained" className={classes.stockBtn2} name="add-category-save" id="add-category-save">
                  <Save/> Save
                </Button>
                <Button onClick={handleCloseAdd} variant="contained" color="secondary" name="add-category-save" id="add-category-save">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div>
            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="edit-category">
              <DialogTitle id="add-category" className={classes.dialogText}>Edit Category</DialogTitle>
              <DialogContent>
                <form className={classes.dialogForm} name="edit-category" id="edit-category">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="name">Name:</InputLabel>
                      <Input id="name" name="name" type="text" placeholder="Enter Category name here" autoFocus required fullWidth/>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="level">Level(1-3):</InputLabel>
                      <Input id="level" name="level" type="number" placeholder="Enter Category Level" defaultValue={1} min={1} max={3} step={1} required fullWidth />
                    </FormControl>
                    <FormControl fullWidth>
                      <label className={classes.labelText}>Parent Category*:</label>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={testOptions[0]}
                        isClearable={true}
                        isSearchable={true}
                        name="parent_select"
                        id="parent_select"
                        required
                        options={testOptions}
                      >
                      </Select>
                    </FormControl>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions>
                <Button  type="submit" variant="contained" className={classes.stockBtn2} name="edit-category-save" id="edit-category-save">
                  <Save/> Save
                </Button>
                <Button onClick={handleCloseEdit} variant="contained" color="secondary" name="edit-category-close" id="edit-category-close">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default connect(null, {addCategory, updateCategory, deleteCategory})(CategoryTable);
