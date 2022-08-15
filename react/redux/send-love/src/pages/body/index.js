import React from "react";

import defaultImg from "../../assets/image/小团.png"
import sendImg from "../../assets/image/R-C.gif"

import { connect } from "react-redux";

class Boy extends React.Component {

  state = {
    isSend: false
  }
  handleClick = () => {
    let { isSend } = this.state
    
    if (!isSend) {
      this.props.sendLove()
    } else {
      this.props.stopLove()
    }

    this.setState({
      isSend: !isSend
    })
  }

  render() {
    return (
      <div>
        <img src={this.state.isSend ? sendImg : defaultImg}></img>
        <div>
          <button onClick={this.handleClick}>
            {this.state.isSend ? '停止' : '开始'}
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLove: () => {
      dispatch({ type: "send_love"})
    },
    stopLove: () => {
      dispatch({ type: "stop_love"})
    }
  }
}

export default connect(null, mapDispatchToProps)(Boy);
