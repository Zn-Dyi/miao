import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useInput } from './hooks'
import { UserOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons';
import Icon from './Icon';



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
    <div >
      <Form >
        <Form.Item name="username" rules={[{required: true, message: 'Please input your Username'}]}>
          <Input prefix={<UserOutlined />} placeholder="Username" {...name} ></Input>
          {/* <Input prefix={<Icon />}></Input> */}
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password' }]}>
          <Input prefix={<LockOutlined />} placeholder="password"  {...password} ></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={login} className="login-form-button">
            登录
          </Button>
          Or <Link to="/register">注册</Link>
        </Form.Item>
      </Form>

      {/* <div>
        <div> Username: <input type="text" {...name} /></div>
        <div> Password: <input type="text" {...password} /></div>
        <div> <button onClick={login}>登录</button></div>
        <div><Link to="/register">注册</Link></div>
      </div> */}
    </div>

  )
}
