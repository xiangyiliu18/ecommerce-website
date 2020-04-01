import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css'
import {
  AddOutlined,
  Assignment,
  DeleteForeverRounded,
  EditRounded, FiberManualRecord, LocalMall,
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
import { CardHeader, MuiThemeProvider, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { deleteProduct } from "../../actions/product.action";
import { useMuiTheme } from "../../components/GlobalParams"; // Import css

const productStatus = {
  'in stock': "stockBtn",
  'low stock': "lowBtn",
  'out of stock': "outBtn",
};

const ProductTable = (props) => {
  const getMuiTheme = useMuiTheme();
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  // const {dataSource} = props;
  // {id --integer, name----string, brand---string, price --- double, stock ----int, status --- int, sell---integer}
  const confirmDelete = (tableMetadata) => {
    const optionsSnackbar = {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 2000,
    };
    let id = tableMetadata.rowData[0];
    props.deleteProduct(id,
      (res)=> {
        if(res.success){
          optionsSnackbar.variant = 'success';
          enqueueSnackbar(res.message, optionsSnackbar);
        }else{
          optionsSnackbar.variant = 'error';
          enqueueSnackbar(res.message, optionsSnackbar);
        }
      },
      (err)=> {
        optionsSnackbar.variant = 'error';
        enqueueSnackbar(err.message, optionsSnackbar);
      }
      )

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
          onClick: () => {enqueueSnackbar('Not delete!')}
        }
      ],
    });
    console.log("Delete");
  };

  const columns = [
    { name: "id", label:"ID", options: {
         viewColumns: false, sortDirection: 'asc'
      }},
    { name: "name", label:"Name"},
    { name: "brand", label: "Brand"},
    { name: "price", label: "Price",
      options: {
        customBodyRender: (value, tableMeta) => {
          return ( '$ ' + value )
        }
      }},
    { name: "sell", label:"Stock Status",
      options: {
        customBodyRender: (value, tableMeta) => {
          let tmp = 'out of stock';
          if(value < 1){
              tmp = 'out of stock';
          }else if(value < 5){
              tmp = 'low stock';
          }else{
              tmp = 'in stock'
          }
          return (
            <Button
              className={classes[productStatus[tmp]]}
              size="small"
              variant="contained"
            >
              {value}
            </Button>
          )
        }
      }},
    {
      name: "status", label: "Status",
      options: {
        customBodyRender: (value, tableMeta) => {
          if(value === 1){
            return (<Button>Launching</Button>)
          }else{
            return (<Button>Not Available</Button>)
          }
        }
      },
    },
    {
      name: 'Operations',
      options: {
        filter: false,
        sort: false,
        viewColumns: false,
        searchable: false,
        customBodyRender: (value,tableMeta) => {
          return (
            <div className={classes.operations}>
              {tableMeta.rowData && <NavLink to={"/home/products/view_edit/" + tableMeta.rowData[0]} className={classes.infoBtn}>
                <Tooltip title={"More Details & Edit"}>
                 <EditRounded/>
                </Tooltip>
              </NavLink>
              }
              <Tooltip title={"Delete"}>
                <DeleteForeverRounded className={classes.errorBtn} onClick={event => {handleDelete(tableMeta)}}/>
              </Tooltip>
            </div>
          )
        }
      }
    },
  ];
  const options = {
    filter: true,
    filterType: "textField",
    responsive: "scrollMaxHeight",
    selectableRows: 'none',
    rowsPerPageOptions: [5, 10, 20, 50],
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
    ),
  };

  return (
    <>
    <Typography align="right">
      <NavLink to="/home/products/add">
        <Button variant="contained" color="primary" size="small">
          <AddOutlined/>New Product
        </Button>
      </NavLink>
    </Typography>
        <IconButton size="small">
          <FiberManualRecord className={classes.stockIcon} fontSize="small"/><Typography className={classes.tagText}>In Stock</Typography>
          <FiberManualRecord className={classes.lowIcon} fontSize="small"/><Typography className={classes.tagText}>Low Stock </Typography>
          <FiberManualRecord className={classes.outIcon} fontSize="small"/><Typography className={classes.tagText}>Out of Stock </Typography>
        </IconButton>
      <Card className={classes.card}>
        <MUIDataTable
          title={"Product List"}
          data={props.products}
          columns={columns}
          options={options}
        />
      </Card>
      </>
  );
};
function mapStateToProps({products}) {
  return { products };
}
export default connect(mapStateToProps, {deleteProduct})(ProductTable);
