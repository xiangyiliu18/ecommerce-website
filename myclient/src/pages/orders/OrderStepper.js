import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { useStyles } from "./styles";
import { CardContent, CircularProgress, Divider, FormControl } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Img from 'react-image'
import {
  ArrowBack, ArrowForward,
  Assignment,
  AssignmentReturn,
  Cancel,
  LocalShipping, Send,
} from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import TableHead from "@material-ui/core/TableHead";
import * as Moment from "moment";
import { connect } from "react-redux";
import { updateOrder } from "../../actions/order.action";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { noticeOptions } from "../../components/GlobalParams";
import { useSnackbar } from "notistack";


const orderStatus = ["New","In Delivering", "Completed", "Cancelled","Returned"];
function BasicStep(dataSource, classes){
  //console.log(dataSource);
   return(
     <>
     <Grid container justify="center" alignItems="center">
       <Grid item xs={5}>
       <Button className={classes.nextLevelBtn}>Customer Information</Button>
         <Table className={classes.table}>
           {dataSource && dataSource.customer && (<TableBody>
             <TableRow key={dataSource.customer.username}>
             <TableCell className={classes.cellText}>Username:</TableCell>
             <TableCell align="right">{dataSource.customer.username}</TableCell>
            </TableRow>
             <TableRow key={dataSource.customer.id}>
               <TableCell className={classes.cellText}>FullName:</TableCell>
               <TableCell align="right">{dataSource.customer.lastname + "," + dataSource.customer.firstname}</TableCell>
             </TableRow>
           <TableRow key={dataSource.customer.phone}>
             <TableCell  className={classes.cellText}>Phone:</TableCell>
             <TableCell align="right">{dataSource.customer.phone}</TableCell>
           </TableRow>
           <TableRow key={dataSource.customer.email}>
             <TableCell className={classes.cellText}>Email:</TableCell>
             <TableCell align="right">{dataSource.customer.email}</TableCell>
           </TableRow>
           <TableRow key={dataSource.customer.address}>
             <TableCell  className={classes.cellText}>Address:</TableCell>
             <TableCell align="right">{dataSource.customer.address}</TableCell>
           </TableRow>
           </TableBody>
               )}
         </Table>
       </Grid>
       <Grid item xs={1}/>
       <Grid item xs={6}>
         <Button className={classes.nextLevelBtn}> Address/Receiver Information</Button>
         <Table className={classes.table}>
           {dataSource && dataSource.customer &&(
           <TableBody>
             <TableRow key={dataSource.customer.receiver}>
               <TableCell  className={classes.cellText}>Receiver Name:</TableCell>
               <TableCell align="right">{dataSource.receiver}</TableCell>
             </TableRow>
             <TableRow key={dataSource.phone}>
               <TableCell  className={classes.cellText}>Receiver Phone:</TableCell>
               <TableCell align="right">{dataSource.phone}</TableCell>
             </TableRow>
             <TableRow key={dataSource.payment_method}>
               <TableCell  className={classes.cellText}>Payment Method:</TableCell>
               <TableCell align="right">{dataSource.paymentMethod}</TableCell>
             </TableRow>
             <TableRow key={dataSource.shippingAddress+dataSource.id}>
               <TableCell className={classes.cellText}>Shipping Address:</TableCell>
               <TableCell align="right">{dataSource.shippingAddress}</TableCell>
             </TableRow>
             <TableRow key={dataSource.billingAddress}>
               <TableCell  className={classes.cellText}>Billing Address:</TableCell>
               <TableCell align="right">{dataSource.billingAddress}</TableCell>
             </TableRow>
           </TableBody>
           )}
         </Table>
       </Grid>
     </Grid>
       <Divider className={classes.divider3}/>
     </>
   )
}
function ProductStep (dataSource, classes){
  let data = dataSource.purchases;
  data && data.map((ele)=> {ele.product.total = ele.product.price * ele.qty ; return ele;});
  //console.log(data);
  const columns = [
    {name: 'product.image', label: "Image",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <Img
              src={value}
              decode={false}
              loader={<CircularProgress/>}

            />)
        }
      }},
    { name: "product.name", label: "Name"},
    { name: "product.brand", label: "Brand"},
    { name: "product.price", label: "Unit Price",
      options:{
      customBodyRender: (value, tableMeta) => {
        return ( '$ ' + value )
      }},
    },
    { name: "qty", label: "Qty"},
    { name: "product.total", label: "Total",
      options: {
        customBodyRender: (value, tableMeta) => {
          return ( '$ ' + value  )
        }
      }},
  ];
  const options = {
    filter: false,
    sort: false,
    search: false,
    download: false,
    viewColumns: false,
    print: false,
    responsive: "scrollMaxHeight",
    rowsPerPageOptions: [5, 10],
    selectableRows: 'none',
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
     <><Button className={classes.nextLevelBtn}>Purchased Product Details</Button>
         <MUIDataTable
           data={data}
              columns={columns}
              options={options}
         />
       <Divider className={classes.divider3}/>
     </>
     )
}

function HistoryStep (dataSource, classes){
  const histories = dataSource.histories;
 // console.log(histories);
 return (

   <Grid
     container
     direction="column"
     justify="center"
     alignItems="stretch"
   >
     <Grid item>
       <Button className={classes.nextLevelBtn}>Order Summary Details</Button>
     <Table className={classes.table}>
       <TableBody>
         <TableRow key="subtotal">
           <TableCell className={classes.cellText}>Item(s) Subtotal:</TableCell>
           <TableCell align="right">{'$ '+dataSource.subtotal}</TableCell>
         </TableRow>
         <TableRow key="shippingFee">
           <TableCell className={classes.cellText}>Shipping Fee:</TableCell>
           <TableCell align="right">{'$ '+dataSource.shippingFee}</TableCell>
         </TableRow>
         <TableRow key="tax">
           <TableCell className={classes.cellText}>Shipping tax:</TableCell>
           <TableCell align="right">{Number.parseFloat(dataSource.tax).toPrecision(4) +"%"}</TableCell>
         </TableRow>
         <TableRow key="total">
           <TableCell className={classes.cellText}>Grand Total:</TableCell>
           <TableCell align="right">{'$ '+dataSource.total}</TableCell>
         </TableRow>
       </TableBody>
     </Table>
       <Divider className={classes.divider3}/>
       <Grid item>
         <Button className={classes.nextLevelBtn}>Order Histories</Button>
     <Table className={classes.table}>
       <TableHead>
         <TableRow>
           <TableCell>Operator</TableCell>
           <TableCell align="right" className={classes.cellText}>Operation Date</TableCell>
           <TableCell align="right" className={classes.cellText}>Order status</TableCell>
           <TableCell align="right" className={classes.cellText}>Comments</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {histories && histories.map(row => (
               <TableRow key={row.id}>
                 <TableCell component="th" scope="row">
                   {row.operationUsername}
                 </TableCell>
                 <TableCell align="right">{Moment(row.operationDate).format("DD-MM-YYYY, h:mm:ss")}</TableCell>
                 <TableCell align="right">{row.status}</TableCell>
                 <TableCell align="right">{row.comment === ''? 'None': row.comment}</TableCell>
               </TableRow>
             ))}
       </TableBody>
     </Table>
     </Grid>
     </Grid>
     <Divider className={classes.divider3}/>
   </Grid>
  )
}
function getSteps() {
  return ['Basic Order Information', 'Products Detail', 'Order Summary & History'];
}

function getStepContent(stepIndex, dataSource, classes) {
  switch (stepIndex) {
    case 0:
      return BasicStep(dataSource, classes);
    case 1:
      return ProductStep(dataSource,classes);
    default :
      return HistoryStep(dataSource, classes);
  }
}

//    Main Function Component
function OrderStepper(props) {
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const {dataSource} = props;  // Check If edit or not

  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [comment, setComment] =React.useState("None");
  const [editData, setEditData] =React.useState({ open: false, id: 0, status: '' });

  function isStepOptional(step) {
    return step === 1;
  }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function handleNext() {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleSkip() {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }

  function  handleComment(event) {
    setComment(event.target.value);
  }

  const handleStatus = (id, newStatus) => {
    setEditData({
      open: true,
      id: id,
      status: newStatus,
    });
  };

  function handleCloseEdit() {
    setEditData({ open: false, id: 0, status: ''});
  }

  const handleSubmit = (event)=> {
    event.preventDefault();
    props.updateOrder(editData.id, editData.status, comment,
      (res)=> {
        if(res.success){
              noticeOptions.variant='success';
              setEditData({open: false, data: {}});
              enqueueSnackbar(res.message, noticeOptions);
             props.props.history.replace('/home/orders/all');
              // setActiveStep(0);
              // setTimeout(
              //   props.props.history.replace('/home/orders/all'), 1000);
      }else{
          noticeOptions.variant='error';
          enqueueSnackbar(res.message, noticeOptions);
        }
      },
      (err)=> {
        noticeOptions.variant='error';
        enqueueSnackbar(err.message, noticeOptions);
      });
  };

  return (
    <Paper className={classes.card}>
      <Divider variant="middle" className={classes.divider} />
      <CardContent className={classes.cardContent}>
        <div>
          {dataSource && (dataSource.status < 4)&& (
          <Typography align="right" variant='h6' color="textPrimary" display="block" className={classes.productInfo}>
            Operations:
            {dataSource && dataSource.status === 1 && <Button className={classes.deliveredOrderBtn} size="small" onClick={()=> handleStatus(dataSource.id, 2)}><LocalShipping/>To Deliver</Button>}
            {dataSource && dataSource.status === 2 && <Button className={classes.completeOrderBtn} size="small" onClick={()=> handleStatus(dataSource.id, 3)}><Assignment/>Complete Order</Button>}
            {dataSource && dataSource.status < 2 && <Button className={classes.cancelledOrderBtn} size="small"  onClick={()=> handleStatus(dataSource.id, 4)}><Cancel/>Cancel Order</Button>}
            {dataSource && dataSource.status === 3 && <Button className={classes.returnOrderBtn} size="small" onClick={()=> handleStatus(dataSource.id, 5)}> <AssignmentReturn/>Return Order</Button>}
          </Typography>
          )}
            <Typography align="left" variant='h6' color="textPrimary" display="block" className={classes.productInfo}>
              Order ID#:  {dataSource.id}
            </Typography>
          <Typography align="left" variant='h6' color="textPrimary" display="block" className={classes.productInfo}>
            Order Date: {dataSource.date}
          </Typography>
          <Typography align="left" variant='h6' color="textPrimary" display="block" className={classes.productInfo}>
            Order Current Status: {orderStatus[dataSource.status-1]}
          </Typography>
        </div>
         <Divider />
        <div className={classes.root}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
            if (isStepSkipped(index)) {
                 stepProps.completed = false;
            }
            return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
            <div>
                <div>
                  {getStepContent(activeStep, dataSource, classes)}
                  <div>
                    <Button disabled={activeStep === 0} color="primary" onClick={handleBack} >
                     <ArrowBack/> Back
                    </Button>
                    {isStepOptional(activeStep) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                        className={classes.skip}
                      >
                        Skip
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                       disabled={activeStep === steps.length -1}
                      onClick={handleNext}
                    >
                      <ArrowForward />
                      {activeStep === steps.length - 1 ? 'Last' : 'Next'}
                    </Button>
            </div>
          </div>
      </div>
    </div>
    <Dialog open={editData.open} aria-labelledby="edit-role" fullWidth>
          <DialogTitle id="add-category" className={classes.dialogText}>Update Order Status</DialogTitle>
          <DialogContent>
            <form className={classes.dialogForm} name="edit-role" id="edit-role" onSubmit={handleSubmit}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <FormControl className={classes.formControl} required fullWidth>
                  <InputLabel htmlFor="order_id">Order ID(readOnly)</InputLabel>
                  <Input id="order_id" name="order_id" type="number" aria-describedby="order_id" autoFocus readOnly
                         value={editData.id || ""}/>
                </FormControl>
                <FormControl className={classes.formControl} required fullWidth>
                  <InputLabel htmlFor="order_status">New Order Status(readOnly)</InputLabel>
                  <Input id="order_status" name="order_status" type="text" aria-describedby="order_status" readOnly
                         value={orderStatus[editData.status - 1]|| ""}/>
                </FormControl>
                <FormControl className={classes.formControl} required fullWidth>
                  <InputLabel htmlFor="order_comment">Order Comment</InputLabel>
                  <Input id="order_comment" name="order_comment" type="text" rows={3} placeholder="Enter comments here..." multiline={true} aria-describedby="order_comment"
                         onChange={handleComment} value={comment}/>
                </FormControl>
              </Grid>
              <Grid container justify="center">
                <Button type='submit' variant="contained" className={classes.stockBtn2} name="submit" id="submit">
                  <Send/> Submit
                </Button>
                <Button onClick={handleCloseEdit} variant="contained" color="secondary" name="close" id="close">
                  Close
                </Button>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
        }
  </CardContent>
</Paper>
  )
}
export default connect(null,{updateOrder})(OrderStepper);
