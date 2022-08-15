import { Button, Form, Input, Modal, Upload } from "antd"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInput } from "./hooks"
import { UploadOutlined } from '@ant-design/icons';



export default function Register() {
  var name = useInput('')
  var password = useInput('')
  var email = useInput('')
  var navigate = useNavigate()
  var [avatarUrl, setAvatarUrl] = useState('')

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    // files 可能不存在 需要判断
    if (e.target.files && e.target.files?.length > 0) {
      var file = e.target.files[0]
      console.log(file)
      var fd = new FormData()
      fd.append('avatar', file)
      var res = await axios.post('/upload', fd)
      setAvatarUrl(res.data[0])
    }
  }
  async function register(e: any) {
    e.preventDefault()
    await axios.post('/account/register', {
      name: name.value,
      password: password.value,
      email: email.value,
      avatar: avatarUrl,
    })

    navigate('/login')
  }

  return (
    <div>
      <h3>注册</h3>
      <Form className="register" name="register">
        <Form.Item name="username" label="Username" labelCol={{span: 8,}} labelAlign={"left"}
          rules={[{ required: true, message: 'Please input your Username' }]}
        >
          <Input style={{  width: "200px" }} name="Username" placeholder="Username" {...name}></Input>
        </Form.Item>
        <Form.Item name="password" label="Password" labelCol={{ span: 8, }} labelAlign={"left"}
          rules={[{ required: true, message: 'Please input your Password' }]}
        >
          <Input style={{  width: "200px" }} name="Password" placeholder="Password" {...password}></Input>
        </Form.Item>
        <Form.Item name="email" label="E-mail" labelCol={{ span: 8, }} labelAlign={"left"}
          rules={[{ required: true, message: 'Please input your E-mail' }]}
        >
          <Input style={{  width: "200px" }} name="E-mail" placeholder="E-mail" {...email}></Input>
        </Form.Item>

        <Form.Item name="avatar" label="Avatar">
          <div className="avatar" >
            <label form="name">
              <UploadOutlined style={{fontSize: "30px"}} />
              <input type="file" name="name" style={{ display: "none" }} accept="image/*" onChange={handleFileSelect} />
            </label>

            <span className="text">上传文件</span>
            {avatarUrl && <img src={avatarUrl}></img>}
          </div>

        </Form.Item>

        <Form.Item>
          <Button type="primary" disabled={!Boolean(avatarUrl)} onClick={register}>注册</Button>
        </Form.Item>
      </Form>





      {/* <div>
        <h3>注册</h3>
        <form onSubmit={register}>
          <div>Name: <input required type="text" {...name} /></div>
          <div>Pass: <input required type="password" {...password} /></div>
          <div>Email: <input required type="email" {...email} /></div> */}
      {/* accept="image/*"属性表示所有图片类型都可以 */}
      {/* <div>Avatar: <input type="file" accept="image/*" onChange={handleFileSelect} /></div>
          <div><button disabled={!Boolean(avatarUrl)}>注册</button></div>
        </form>
      </div > */}


    </div >

  )
}
