import React from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import PageTitle from "../../components/PageTitle/PageTitle";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import SimpleWidget from "./components/SimpleWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faShoppingCart, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function DashboardWrapper(props) {
  const classes = useStyles();
  const { products10 , count} = props;
  // const tableData = [{
  //   id: 9383963,
  //   name: "Black & Decker - Dustbuster Automotive Hand Vac - Silver",
  //   brand: "Black & Decker",
  //   price: "$19.99",
  //   sell: 10,
  // },
  //   {
  //     id: 1696302,
  //     name: "3-Year Unlimited Cloud Storage Service Activation Card - Other",
  //     brand: "Pogoplug",
  //     price: "$19.99",
  //     sell: 10,
  //   },
  //   {
  //     id: 6627506,
  //     name: "Conair - ExtremeSteam Professional Handheld Garment Steamer - White/Blue",
  //     brand: "Conair",
  //     price: "$34.99",
  //     sell: 9,
  //   },
  //   {
  //     id: 4759806,
  //     name: "Rowenta - Effective Cord Reel Iron - White/Maroon",
  //     brand: "Rowenta",
  //     price: "$59.99",
  //     sell: 9,
  //   },
  //   {
  //     id: 4472168,
  //     name: "Shop-Vac - 5 Gallon Stainless Steel Wet/Dry Vacuum Cleaner - Black, White",
  //     brand: "Shop-Vac",
  //     price: "$69.99",
  //     sell: 3
  //   },
  //   {
  //     id: 5045018,
  //     name: "Samsung - 24.5 Cu. Ft. Side-by-Side Refrigerator with Thru-the-Door Ice and Water - White",
  //     brand: "Samsung",
  //     price: "$1199.99",
  //     sell:2
  //   },
  //   {
  //     "id": 6819666,
  //     "name": "GermGuardian - Filter for GermGuardian AC5000 Series 3-in-1 Air Cleaning Systems - Blue",
  //     "brand": "GermGuardian",
  //     "price": "$39.99",
  //     sell: 2
  //   },
  //   {
  //     id: 4991132,
  //     name: "Proctor Silex - Steam Iron - Blue",
  //     brand: "Proctor Silex",
  //     price: "$17.99",
  //     sell: 2
  //
  //   },{
  //     id: 4759797,
  //     name: "Rowenta - Effective Iron - White/Turquoise",
  //     brand: "Rowenta",
  //     price: 49.99,
  //     sell: 1
  //   },
  //   {
  //     id: 9643682,
  //     name: "Honeywell - Replacement HEPA Filter for Select Honeywell Air Purifiers - White",
  //     brand: "Honeywell",
  //     price: 19.99,
  //     sell: 1
  //   }
  // ];

  const bigStat = [
    {
      title: "Total Customers",
      icon: (<FontAwesomeIcon size="3x" icon={faUsers} className={classes.usersIcon} />),
      total: 500,
      color:'primary'
    },
    {
      title: "Total Products",
      icon: (<FontAwesomeIcon size="3x" icon={faShoppingCart} className={classes.productsIcon} />),
      total: count,
      color:'myYellow'
    },
    {
      title: "Total Received Orders",
      icon: (<FontAwesomeIcon size="3x" icon={faShoppingBag} className={classes.ordersIcon} />),
      total: 8,
      color:'success'
    }
  ];
  return (
    <>
      <Grid container spacing={4}>
        {bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.title}>
            <BigStat {...stat} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <SimpleWidget
            title="Top Ten Selling Products"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={products10} />
          </SimpleWidget>
        </Grid>
      </Grid>
    </>
  );
}

