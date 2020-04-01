import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { DeleteForeverRounded } from "@material-ui/icons";
import tinycolor from "tinycolor2";
import Button from "@material-ui/core/Button";

const defaultToolbarSelectStyles = {
  deleteIcon: {
    backgroundColor: 'red',
    color: 'white',
    "&:hover": {
      backgroundColor:  tinycolor("red")
        .darken(15)
        .toHexString(),
    }
  }
};

class CustomToolbarSelect extends React.Component {
  handleClick = () => {
    console.log(this.props.displayData); // dataIndex to delete
  };

  render() {
    return (
      <div className={"custom-toolbar-select"}>
        <Tooltip title={"Delete"}>
          <Button size="small" id="delete" aria-label="Delete" onClick={this.handleClick}>
            <DeleteForeverRounded color="error"/>
          </Button>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelect);
