import React from "react";
import {
  BorderColor, Description, FiberManualRecord,
} from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import {useStyles} from "./styles";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

// 1--new, 2 --- in delivering, 3 -- completed/delivered, 4--- cancelled, 5 --returned
const orderStatus = ["newOrderBtn", "deliveredOrderBtn", "completeOrderBtn", "cancelledOrderBtn", "returnOrderBtn"];
const orderLabel =["New","Delivering","Completed", "Cancelled", "Returned"];

const OrderTable = (props) => {
  const classes = useStyles();
  const {orders} = props;

  const columns = [
    {
      name: '#',
      options: {
        filter: false,
        sort: false,
        viewColumns: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          return (
              <>
                {tableMeta.rowData  &&
                (<NavLink  to={ "/home/orders/view_edit/" +tableMeta.rowData[1] } className={classes.editBtn}>
                  <Description/>&<BorderColor/>
                  </NavLink>
                )}
             </>
          )
        }
      }
    },
    { name: "id", label: "Order ID",
      options: {
          viewColumns: false,
          filterType: "dropdown",
           sortDirection: 'asc',
      }},
    { name: "customer", label:"Customer Username",
          options: {
            customBodyRender: (value, tableMeta) => {
              return value && value.username;
            }
          } },
    {
      name: "date", label: "Date Purchased",
    },
    { name:"total", label: "Total Spent",
      options: {
        customBodyRender: (value, tableMeta) => {
          return ('$ ' + value)
        }

      }},
    { name: "paymentMethod", label: "Payment Method", options:
        {
          filterType: "multiselect",
        }},
    { name: "status", label: "Order Status",
      options: {
        filterType: "multiselect",
        customBodyRender: (value, tableMeta) => {
          return (<Button variant="contained" className={classes[orderStatus[value-1]]}> {orderLabel[value-1]} </Button>)
        }
      }
    }
  ];

  const options = {
    filter: true,
    filterType: "textField",
    responsive: "scrollMaxHeight",
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: 'none',
    print: false,
    downloadOptions: {
      filename: 'orders.csv',
      separator: ',',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: false
      }
    }
  };
  return (
        <>
            <IconButton size="small" >
              <FiberManualRecord className={classes.newOrderDot} fontSize="small"/> <Typography className={classes.tagText}>New</Typography>
              <FiberManualRecord className={classes.deliveredOrderDot} fontSize="small"/> <Typography className={classes.tagText}>Delivering</Typography>
              <FiberManualRecord className={classes.completeOrderDot} fontSize="small"/> <Typography className={classes.tagText}>Completed</Typography>
              <FiberManualRecord className={classes.cancelledOrderDot} fontSize="small"/> <Typography className={classes.tagText}>Cancelled </Typography>
              <FiberManualRecord className={classes.returnOrderDot} fontSize="small"/> <Typography className={classes.tagText}>Returned </Typography>

              </IconButton>
        <Card className={classes.card}>
         <MUIDataTable
                    title="Orders List"
                    data={orders}
                    columns={columns}
                    options={options}
            />
        </Card>
    </>
  );
};
export default OrderTable;
