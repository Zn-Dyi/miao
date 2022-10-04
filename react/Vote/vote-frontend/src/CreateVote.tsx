import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { useForceLogin, useInput } from "./hooks";
import { useToggle } from "ahooks";
import { Button, Form, Input, DatePicker, Switch } from 'antd'
import moment from "moment";
import axios from "axios"; // 默认转成JSON格式

var map = {
  single: '单选',
  multiple: '多选',
}

type VoteType = keyof typeof map

export default function CreateVote() {
  // 利用hooks组将实行强制登录
  useForceLogin()

  var [params, setParams] = useSearchParams()
  var navigate = useNavigate()
  var type = params.get('type') as VoteType

  console.log(params, params.get('type'))

  useEffect(() => {
    if (type !== 'single' && type !== 'multiple') {
      console.log('跳走')
      setParams('type=single')
    }
  }, [type])

  var title = useInput('')
  var desc = useInput('')
  var deadline = useInput('')
  var [anonymous, { toggle }] = useToggle(false)
  var [options, updateOptions] = useImmer<string[]>(['', ''])

  function addOption() {
    updateOptions(options => {
      options.push('')
    })
  }

  function deleteOption(idx: number) {
    updateOptions(options => {
      options.splice(idx, 1)
    })
  }

  function editOption(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    updateOptions(options => {
      options[idx] = e.target.value
    })
  }

  function onFinish(data: any) {
    console.log(data)
  }

  async function createVote() {
    var voteInfo = {
      title: title.value,
      desc: desc.value,
      deadline: deadline.value,
      anonymous: anonymous,
      multiple: type == 'multiple',
      options: options,
    }


    var res = await axios.post('/vote', voteInfo)

    console.log(res)
    var voteId = res.data.result.voteId

    navigate('/vote/' + voteId)
  }

  return (
    <div>
      {/*       获取地址栏类型     */}
      {/* <h2>创建{params.get('type')}投票</h2> */}
      <h2>创建{map[type]}投票</h2>


      <Form onFinish={onFinish} onSubmitCapture={onFinish}>
        <Form.Item name="title" >
          {/*      必填项                placeholder 组件自带属性 */}
          <Input required size="large" {...title} placeholder="投片标题" />
        </Form.Item>
        <Form.Item label="补充描述(选填) " name="desc">
          <Input {...desc} />
        </Form.Item>
        {
          options.map((option, idx) => {
            return <Form.Item key={idx}>
              <Button onClick={() => deleteOption(idx)}>-</Button>
              <Input placeholder="选项" value={option} onChange={e => editOption(e, idx)} />
            </Form.Item>
          })
        }
        <Form.Item>
          <Button onClick={addOption}>添加选项</Button>
        </Form.Item>
        <Form.Item label="截止日期" name="deadline">
          {/* <DatePicker format="YYYY-MM-DDTHH:mm" showTime value={moment(deadline.value)} onChange={m => deadline.onChange(m?.toISOString() ?? '')} /> */}
          <DatePicker format="YYYY-MM-DD HH:mm" showTime value={moment(deadline.value)} onChange={m => deadline.onChange(m?.format('YYYY-MM-DD HH:mm') ?? '')} />
          {/*                                                                                                           使用format方法设定格式化的形式                      */}
        </Form.Item>
        <Form.Item label="匿名投片" valuePropName="checked" name="anonymous">
          <Switch checked={anonymous} onChange={toggle} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={createVote}>创建投票</Button>
        </Form.Item>
      </Form>


      {/* <div>
        <div>
          标题：<input type="text" {...title} />
        </div>
        <div>
          描述：<input type="text" {...desc} />
        </div>
        {
          options.map((it, idx) => {
            return (
              <div key={idx}>
                <button onClick={() => deleteOption(idx)}>-</button>
                <input type="text" value={it} onChange={(e) => editOption(e, idx)} />
              </div>
            )
          })
        }
        <div>
          <button onClick={addOption}>添加</button>
        </div>

        <div>
          截止日期 <input type="datetime-local" {...deadline} />
        </div>

        <div>
          <label >
            <input type="checkbox" checked={anonymous} onChange={toggle} />   匿名投票

          </label>
        </div>
        <button onClick={createVote}>创建投票</button>
      </div> */}


    </div>
  )
}
