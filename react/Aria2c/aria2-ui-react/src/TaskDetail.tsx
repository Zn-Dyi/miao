import { useCallback } from "react"
import { useParams } from "react-router-dom"
import Aria2Client from "./aria2-client"
import { useAsync } from "./hooks"



interface IProps {
  client: Aria2Client
}

export default function TaskDetail({ client }: IProps) {
  var params = useParams()
  //                                     加上( useCallback ，[] )   没有变化不更新
  var { pending, value: task } = useAsync(useCallback(async () => {
    // debugger
    // @ts-ignore
    // 任务的详细信息, 返回client方法 tellStatus
    var task = await client.tellStatus(params.gid)
    // console.log(task)
    return task
  }, []))



  if (task) {
    return (
      <div>
        <div>
          <h3>总览</h3>
          {/*             */}
          <div>任务名称: {task.files[0].path}</div>
        </div>
        <div>
          <h3>区块信息</h3>
        </div>
        <div>
          <h3>总览</h3>
        </div>
      </div>
    )
  }
  if (pending) {
    return <div>loading...</div>
  }
  return null
}
