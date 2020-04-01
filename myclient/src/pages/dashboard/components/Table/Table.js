import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import useStyles from "../styles"

const productStatus = {
  'in stock': "stockBtn",
  'low stock': "lowBtn",
  'out of stock': "outBtn",
};

const statusLabel = ['stockBtn', 'outBtn'];
const statusText = ['Launching', 'Not Available'];
export default function TableComponent({ data }) {
  const classes = useStyles();
  const keys = Object.keys(data[0]).map(i => i.toUpperCase());
  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, brand, price, stock, status, sell }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{brand}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>
              {
                (stock < 1) ?  <Button className={classes[productStatus['out of stock']]} size="small" variant="contained">Out of Stock</Button>:
                (stock < 10 )? <Button className={classes[productStatus['low stock']]} size="small" variant="contained"> Low Stock </Button>:
                <Button className={classes[productStatus['in stock']]} size="small" variant="contained">In Stock </Button>
                }
           </TableCell>
            <TableCell> <Button className={classes[statusLabel[status]]} size="small" variant="contained">{statusText[status]} </Button></TableCell>
            <TableCell>{sell}</TableCell>
                </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
