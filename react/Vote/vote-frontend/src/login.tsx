import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useInput } from './hooks'


export function Login() {
  var name = useInput('')
  var password = useInput('')
  var navigate = useNavigate()

  async function login() {
      var res = await axios('/account/login', {
        method: "post",
        data: {
          name: name.value,
          password: password.value,
        }
      })
    // async function login() {
    //   var res = await axios.post('/account/login', {
    //       name: name.value,
    //       password: password.value,
    //   })

    navigate('/')
  }


  return (
    <div>
      <div> Username: <input type="text" {...name} /></div>
      <div> Password: <input type="text" {...password} /></div>
      <div> <button onClick={login}>登录</button></div>
      <div><Link to="/register">注册</Link></div>
    </div>
  )
}
