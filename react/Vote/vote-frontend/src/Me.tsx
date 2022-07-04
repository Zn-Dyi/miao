import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { forceLogin, useForceLogin } from "./hooks"



const Me: React.FC = () =>
// export default function Me()
{
  // 利用hooks组将实行强制登录
  // useForceLogin()

  var [votes, setVotes] = useState<any>([])
  var [expandIdx, setExpandIdx] = useState(-1)
  useEffect(() => {
    axios.get('/vote').then(res => {
      setVotes(res.data.result)
      console.log(res.data.result)
    })
  }, [])

  async function deleteVote(id: any) {
    await axios.delete('/vote/' + id)
    setVotes((votes: any) => {
      // 返回除了当前项的剩余项
      return votes.filter((it: any) => it.voteId !== id)
    })
  }
  

  return (
    <div>
      {
        votes.map((vote: any, index: any) => {
          return (
            <div>
              <h3 onClick={() => { setExpandIdx(index) }}>{vote.title}</h3>
              {expandIdx == index &&
                <div>
                  <Link key={vote.userId} to={`/vote/${vote.voteId}`}>查看</Link>
                  <span onClick={() => { deleteVote(vote.voteId) }}>删除</span>
                </div>

              }

            </div>
          )
        })
      }
    </div>
  )
}

export default forceLogin(Me)  // 高阶组件方法实现强制登录
