
import { Avatar, Button, Form } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import "./Home.css"
import MyMe from "./MyMe"
import NewFile from "./NewFile"
import Task from "./Task"


interface IProps {
  a?: number,
  b?: string
}

// 描述一个接收IProps类型props的函数组件
const Home: React.FC<IProps> = (props) => {
  var [userInfo, setUserInfo] = useState<any>({})
  useEffect(() => {
    axios.get('/account/current-user').then(res => {
      setUserInfo(res.data.result)
      console.log(res.data.result)
    }, () => {
      setUserInfo({})
    })
  }, [])

  console.log(userInfo.userId)


  var navigate = useNavigate()

  async function logout() {
    await axios.get('/account/logout')
    navigate('/login')
  }

  return (
    <div>
      <div className="home-header">
        <Avatar size={40} key={userInfo.userId} src={userInfo.avatar?.replace('http://localhost:8008', '')}></Avatar>
        <button onClick={logout}>登出</button>
      </div>
      {/* {
        <img width="30" height="30" style={{ border: '1px solid', borderRadius: '999px' }} key={userInfo.userId} src={userInfo.avatar?.replace('http://localhost:8008', '')} />
      } */}


      <Outlet />

      <Form className="footer">
        <Button><NavLink end to="/home/create"><NewFile />新建</NavLink></Button>
        <Button><NavLink to="/home/me"><MyMe />我</NavLink></Button>
      </Form>



      {/* <div>
        <div><button onClick={logout}>登出</button></div>
        ---------------
        <Outlet />
        ---------------

        <div> */}
      {/* NavLink 加上 end 属性就是精确匹配 */}
      {/* <NavLink end style={({isActive}) => ({color: isActive ? 'red' : 'black'})} to="/home">创建</NavLink> */}
      {/* <NavLink end to="/home/create">创建</NavLink>
          |
          <NavLink to="/home/me">我</NavLink>
        </div>

      </div> */}

    </div>


  )
}


export default Home

