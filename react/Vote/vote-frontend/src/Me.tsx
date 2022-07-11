import { Form } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Delete from "./Delete"
import { forceLogin, useForceLogin } from "./hooks"
import See from "./See"



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
    <div >
      {
        votes.map((vote: any, index: any) => {
          return (
            <div className="Me-box">
              <h3 className="Me" onClick={() => { setExpandIdx(index) }}>{vote.title}</h3>
              {expandIdx == index &&
                <div>
                  <div className="MeIcon">
                    <Link key={vote.userId} to={`/vote/${vote.voteId}`}><See /></Link>
                    <span onClick={() => { deleteVote(vote.voteId) }}><Delete /></span>
                  </div>
                  {/* <div className="MeIcon">
                    <Link key={vote.userId} to={`/vote/${vote.voteId}`}><See /></Link>
                  </div> */}
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
