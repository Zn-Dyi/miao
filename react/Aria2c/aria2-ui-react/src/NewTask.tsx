

import { Button, Form, Input } from "antd"
import TextArea from "antd/lib/input/TextArea"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Aria2Client from "./aria2-client"
import { useInput } from "./hooks"
import Torrent from "./Torrent"

interface IProps {
  client: Aria2Client
}

export default function NewTask({ client }: IProps) {
  var uris = useInput('')
  var downloadSpeed = useInput('1M')
  var navigate = useNavigate()

  function start() {
    if (torrentFile) {
      var reader = new FileReader()
      reader.onload = function () {
        if (typeof reader.result === 'string') {
          var base64Idx = reader.result.indexOf('base64')
          var torrentBase64 = reader.result.slice(base64Idx + 7)
          // @ts-ignore
          client.addTorrent(torrentBase64) // 拿到文件base64的内容
          navigate('/downloading')
        }
      }
      reader.readAsDataURL(torrentFile)

    } else {
      //                                                      链接非空的取出来
      var links = uris.value.split('\n').map(it => it.trim()).filter(it => it)

      for (let link of links) {
        // @ts-ignore
        client.addUri([link], {
          // aria2下载界面查询属性 设置下载速度
          'max-download-limit': downloadSpeed.value
        })
      }

      navigate('/downloading')
    }
  }

  var [torrentFile, setTorrentFile] = useState<File | null>(null)
  function onBTfileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setTorrentFile(e.target.files[0] ?? null)
    }
  }

  return (
    <div>
      {
        /* <div>
          选项
          <div>
            下载速度
            <input type="text" {...downloadSpeed} />
          </div>
        </div>
        <div>
          <div>下载链接，一行一个。</div>
          <div>选择BT种子文件: <input type="file" onChange={onBTfileSelect} /></div>
          <div>
            <textarea name="" id="" cols={60} rows={10} {...uris}></textarea>
          </div>
          <button onClick={start}>开始下载</button>
        </div> */
      }

      <Form>
        <Form.Item label="下载速度">
          <Input style={{ width: "200px" }} type="text" {...downloadSpeed}></Input>
        </Form.Item>
        <Form.Item label="选择BT种子文件">
          <label form="name">
            <Torrent />
            <Input name="name" style={{ display: "none", width: "200px" }} type="file"></Input>
          </label>

        </Form.Item>
        {/* <div>下载链接，一行一个。</div> */}
        <TextArea rows={10} size="large" placeholder="下载链接，一行一个。"  {...uris} ></TextArea>
        <Button type="primary" onClick={start}>开始下载</Button>
      </Form>
    </div>
  )
}
