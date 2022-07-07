
import { Button, Form } from "antd"
import axios from "axios"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import "./Home.css"
import Task from "./Task"


interface IProps {
  a?: number,
  b?: string
}

// 描述一个接收IProps类型props的函数组件
const Home: React.FC<IProps> = (props) => {
  var navigate = useNavigate()

  async function logout() {
    await axios.get('/account/logout')
    navigate('/login')
  }

  return (
    <div>
      <Button onClick={logout}>
        登出
      </Button>
      <Outlet />
      <Form className="footer">
        <Button><NavLink end to="/home/create">创建</NavLink></Button>
        <Button><NavLink to="/home/me">我</NavLink></Button>
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

