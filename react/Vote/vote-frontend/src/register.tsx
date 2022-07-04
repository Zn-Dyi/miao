import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInput } from "./hooks"


export default function Register() {
  var name = useInput('')
  var password = useInput('')
  var email = useInput('')
  var avatar = useInput('')
  var navigate = useNavigate()
  var [avatarUrl, setAvatarUrl] = useState('')

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    // files 可能不存在 需要判断
    if (e.target.files && e.target.files?.length > 0) {
      var file = e.target.files[0]
      var fd = new FormData()
      fd.append('avatar', file)
      var res = await axios.post('/upload', fd)
      setAvatarUrl(res.data[0])
    }
  }
  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await axios.post('/register', {
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
      <form onSubmit={register}>
        <div>Name: <input required type="text" {...name} /></div>
        <div>Pass: <input required type="password" {...password} /></div>
        <div>Email: <input required type="email" {...email} /></div>
        {/*                        accept="image/*"属性表示所有图片类型都可以    */}
        <div>Avatar: <input type="file" accept="image/*" onChange={handleFileSelect} /></div>
        <div><button disabled={!Boolean(avatarUrl)}>注册</button></div>
      </form>
    </div>
  )
}
