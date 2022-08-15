import { Button, Form, Input } from "antd"
import { useMemo, useState } from "react"
import { servicesVersion } from "typescript"
import Aria2Client from "./aria2-client"
import { SelectedTasksContext, useInput } from "./hooks"
import "./Servers.css"


interface IProps {
  client: Aria2Client
}

export default function Servers({ client }: IProps) {
  var ip: any = useInput('')
  var port: any = useInput('')
  var secret: any = useInput('')


  var aria2Servers = useMemo(() => {
    return JSON.parse(localStorage.ARIA2_SERVERS ?? '[]')
  }, [])

  var [servers, setSevers] = useState(aria2Servers)


  function addSever() {
    var newSevers = [...servers, {
      ip: ip.value,
      port: port.value,
      secret: secret.value,
    }]

    setSevers(newSevers)
    localStorage.ARIA2_SERVERS = JSON.stringify(newSevers)

    ip.clear()
    port.clear()
    secret.clear()
  }

  function deleteed() {
    localStorage.clear()
  }

  return (
    <div>
      <h2><strong>服务器管理</strong></h2>
      {/* <ul>
        {
          servers.map((server: any, idx: number) => {
            return (
              <li key={idx}>
                <div>ip: {server.ip}</div>
                <div>port: {server.port}</div>
                <div>secret: {server.secret}</div>
              </li>
            )
          })
        }
      </ul>

        <div>ip: <input type="text" {...ip} /></div>
        <div>port: <input type="text" {...port} /></div>
        <div>secret: <input type="text" {...secret} /></div>
        <button onClick={addSever}>添加</button> */}


      <Form>
        <Button onClick={addSever}>添加</Button>
        <Form.Item labelCol={{ span: 2 }} labelAlign={"left"} label="IP">
          <Input style={{ width: "200px" }} {...ip}></Input>
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} labelAlign={"left"} label="Port">
          <Input style={{ width: "200px" }} {...port}></Input>
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} labelAlign={"left"} label="Secret">
          <Input style={{ width: "200px" }} {...secret}></Input>
        </Form.Item>
        {
          <ul>
            {
              servers.map((server: any, idx: number) => {
                return (
                  <li key={idx} className="servers-li" >
                    <div>ip: {server.ip}</div>
                    <div>port: {server.port}</div>
                    <div>secret: {server.secret}</div>
                    <button  onClick={ deleteed }>删除</button>
                  </li>


                )
              })
            }
          </ul>

        }
      </Form>
    </div>
  )
}
