
import React from "react";

import defaultImg from "../../assets/image/j-C.gif"


import { connect } from "react-redux";
import { extend } from "jquery";

class Girl extends React.Component {


  render() {
    console.log('Girl:', this.props);
    return (
      <div>
        <img src={defaultImg}></img>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}


export default connect(mapStateToProps)(Girl)
