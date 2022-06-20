import { useTasks2 } from "./hooks";
import { IProps } from "./NewTask";
import { Link } from "react-router-dom"


export default function Stopped({client}: IProps) {
  var tasks = useTasks2(async () => {
    await client.ready()

    //@ts-ignore
    return client.tellStopped(0, 100)
  }, 1000)

  return (
    <div>
      已停止...
      <ul>
        {
          tasks.map(task => {
            return <li key={task.gid}>
              <span>{task.files[0].path}</span>
              |
              <span>{task.completedLength}</span>
              |
              <span>{task.downloadSpeed}B/s</span>
              |
              <Link to={"/task/detail/" + task.gid}>详情</Link>
            </li>
          })
        }
      </ul>
    </div>
  )
}
