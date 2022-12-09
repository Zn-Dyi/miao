import React, { useState } from 'react'
import { connect } from 'react-redux';

function Second(props) {
  console.log(props.show)

  const [sec, setSec] = useState(10)

  return (
    <div>
      Second
      <div>
        {
          props.show ? sec : "0"
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({Reset: {show}}) => {
  return {
    show: show
  }
}

export default connect(mapStateToProps)(Second)
