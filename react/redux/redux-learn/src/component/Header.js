import React from 'react'
import { connect } from 'react-redux';
import store from '../redux/store'


function Header(props) {
  const handleSec = () => {
    console.log(props)
    props.send()
    // store.dispatch({
    //   type: "change_check"
    // })
    console.log('重置')
  }

  return (
    <div className='heads'>
      <button onClick={handleSec}>重置</button>
      <button>开始</button>
      <button>开始</button>
    </div>
  )
}

const mapDispatchToProps = {
  send() {
    return {
      type: "change_check"
    }
  }
}

export default connect(null, mapDispatchToProps)(Header)
