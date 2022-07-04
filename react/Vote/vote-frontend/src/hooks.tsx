import axios from "axios";
import React, { useRef } from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export function useInput(init = "") {
  var [value, setValue] = useState(init);
  // var [checked, setChecked] = useState(init);

  function onChange(e: React.ChangeEvent<HTMLInputElement> | string) {
    if (typeof e == "string") {
      setValue(e)
    } else {
       var target = e.target;
    // if (target.type == "checked" || target.type == "radio") {
    //   setChecked(target.checked)
    // } else {
    //   setValue(target.value);
    // }
    setValue(target.value);
    }

  }

  function clear() {
    setValue("");
  }

  var ret = {
    value,
    // checked,
    onChange: useCallback(onChange, [])
    // clear: useCallback(clear, []),
  };

  Object.defineProperty(ret, "clear", {
    value: useCallback(clear, []),
  });

  return ret;
}

// 强制登录 hooks方法
export function useForceLogin() {
  var navigate = useNavigate()
  useEffect(() => {
    // 获取当前登录用户
    axios.get('/account/current-user').then(() => {

    }, () => {
      navigate('/login')
    })
  }, [])
}

// 高阶组件方法
function withRouter(Comp) {
  return function () {
    var navigate = useNavigate()
    var params = useParams()

    return <Comp navigate={navigate} params={params} />
  }
}


export function forceLogin(Comp) {
  // return withRouter(class extends React.Component{
  //   componentDidMount() {
  //     axios.get('/account/current-user').then(() => {

  //     }, () => {
  //       this.props.navigate('/login')
  //     })
  //   }
  //   render() {
  //     return <Comp {...this.props} />
  //   }
  // })

  return function Wrapped(props) {

    useForceLogin()

    return <Comp {...props}/>
  }
}

