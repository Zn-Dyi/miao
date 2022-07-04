
// 查看投票

import axios from "axios"
import { spawn } from "child_process"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import _, { includes } from "lodash"
import { useImmer } from "use-immer"
import { forceLogin, useForceLogin } from "./hooks"
import { useRequest } from "ahooks"

// useRequest的hook函数优化组件的请求
// async function getVoteInfo(voteId: any) {

//   return await axios.get('/vote/' + voteId).then(res => {
//     return (res.data.result)
//   })
// }

export default function ViewVote() {
  // 利用hooks组将实行强制登录
  useForceLogin()

  var params = useParams() // 获取路由路径，获取子路由继承父路由的所有参数。
  var voteId = params.id
  var [voteInfo, setVoteInfo] = useState<any>({
    vote: {},
    options: [],
    userVotes: [],
  })

  var [userInfo, setUserInfo] = useState<any>({})

  // useRequest的hook函数优化组件的请求
  // const {
  //   data: voteInfo = { vote: {}, options: [], userVotes: [], },
  //   error,
  //   loading,
  //   mutate,
  // } = useRequest(getVoteInfo, {
  //   defaultParams: [voteId]
  // })


  useEffect(() => {
    // 获取用户信息
    axios.get('/account/current-user').then(res => {
      setUserInfo(res.data.result)
      console.log(res.data.result)
    }, () => {
      // 如果请求不到依然设置为空
      setUserInfo({})
    })
  }, [])

  useEffect(() => {
    axios.get('/vote/' + voteId).then(res => {
      setVoteInfo(res.data.result)

      console.log(res.data.result)
    })
  }, [voteId])


  // 实时投票显示
  useEffect(() => {
    //                           无法插值location.host 只能写死， 随之域名更改
    var ws = new WebSocket(`ws://localhost:3000/realtime-voteinfo/${voteId}`)
    ws.onmessage = function (e) {
      var votes = JSON.parse(e.data)
      setVoteInfo((voteInfo: any) => ({
        ...voteInfo,
        userVotes: votes,
      }))
    }

    return () => {
      ws.close()
      ws.onmessage = null
    }
  }, [voteId])


  // // 实时投票显示
  // // useRequest的hook函数优化组件的请求
  // useEffect(() => {
  //   //                           无法插值location.host 只能写死， 随之域名更改
  //   var ws = new WebSocket(`ws://localhost:3000/realtime-voteinfo/${voteId}`)
  //   ws.onmessage = function (e) {
  //     var votes = JSON.parse(e.data)
  //     mutate({
  //       ...voteInfo,
  //       userVotes: votes,
  //     })
  //   }

  //   return () => {
  //     ws.close()
  //     ws.onmessage = null
  //   }
  // }, [voteId])

  async function voteOption(option: any) {
    var voteId = option.voteId
    var optionId = option.optionId
    await axios.post('/vote/' + voteId, {
      optionIds: [optionId]
    })
    console.log('投票成功')
  }

  // var [selectedOptionIds, setselectedOptionIds] = useState<any[]>([])
  var [selectedOptionIds, updateSelectedOptionIds] = useImmer<any[]>([])

  function handleOptionClick(option: any) {
    if (voteInfo.vote.anonymous) {
      updateSelectedOptionIds((ids: any[]) => {
        // 如果该选项已经选中，则删除它
        if (ids.includes(option.optionId)) {
          return ids.filter((it: any) => it !== option.optionId)
        } else { // 否则添加它
          ids.push(option.optionId)
        }
      })
    } else {
      voteOption(option)
    }
  }

  if (!voteInfo) {
    return <span>'Loading...'</span>
  }

  // useRequest的hook函数优化组件的请求
  // if (loading) {
  //   return <span>'Loading...'</span>
  // }

  // 用户的投片按选项id分组的结果
  var groupedVotes = _.groupBy(voteInfo.userVotes, 'optionId')
  // 总用户的数量
  var totalVoteUsersCount = _.uniq(voteInfo.userVotes.map((it: any) => it.userId)).length // 对票数去重

  var currentUserVoted = !!voteInfo.userVotes.find((vote: any) => vote.userId == userInfo.userId)

  async function submitVote() {
    var voteId = voteInfo.vote.voteId
    await axios.post('/vote/' + voteId, {
      optionIds: selectedOptionIds
    })
  }


  return (
    <div>
      <h3>{voteInfo.vote.title}</h3>
      <h2>{voteInfo.vote.desc}</h2>
      {
        voteInfo.options.map((option: any) => {
          // 当前选项的每一票们
          var thisOptionVotes = groupedVotes[option.optionId] ?? []
          // 总票数
          var voteCount = thisOptionVotes.length
          return (
            <div key={option.optionId} onClick={() => handleOptionClick(option)}>
              <span>{option.content}({option.optionId})</span>

              <span style={{ float: 'right' }}>[{voteCount}票]</span>
              {voteInfo.vote.anonymous && !currentUserVoted
                ? <span className="当前用户是否选择该选项">{selectedOptionIds.find(id => id == option.optionId) ? '✔️' : ''}</span>
                : <span className="当前用户有无投票">{thisOptionVotes.find(it => it.userId == userInfo.userId) ? '✔️' : ''}</span>
              }

              <progress style={{ display: "block" }} value={voteCount / totalVoteUsersCount}></progress>
              {!voteInfo.vote.anonymous &&
                thisOptionVotes.map(vote => {
                  return <img width="30" height="30" style={{ border: '1px solid', borderRadius: '999px' }} key={vote.userId} src={vote.avatar?.replace('http://localhost:8008', '')} />
                })
              }
            </div>
          )
        })
      }

      <div>截止日期：{new Date(voteInfo.vote.deadline).toLocaleDateString()}</div>

      {/* 表达是返回真和假在react中0和数字会显示在页面，可以把值转成布尔或默认赋值为1 */}
      {/* {voteInfo.vote.anonymous == 1 && !currentUserVoted && */}
      {Boolean(voteInfo.vote.anonymous) && !currentUserVoted &&
        <button disabled={selectedOptionIds.length <= 0} onClick={submitVote}>提交投票</button>
      }

    </div >
  )
}


// export default forceLogin(ViewVote)
