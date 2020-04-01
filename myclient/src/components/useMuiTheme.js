import React from 'react';
import { createMuiTheme } from "@material-ui/core";

const useMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        backgroundColor: 'inherit',
        fontSize: 16,
        color: 'black'
      }
    },
  }
});

export default  useMuiTheme;
