import { Progress } from "antd"
import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react"
import Aria2Client from "./aria2-client"
import { humanizeSpeed } from "./Helpers"
import { SelectedTasksContext, useTasks2 } from "./hooks"
import "./Waiting.css"



interface IProps {
  client: Aria2Client
}

function Waiting({ client }: IProps, ref: React.Ref<any>) {
  var tasks = useTasks2(() => {
    return client.ready().then((client: any) => client.tellWaiting(0, 100))
  }, 1000)


  var tasksContext = useContext(SelectedTasksContext)
  var [selectedGids, setSelectedGids] = useState<string[]>([])
  // console.log(selectedGids)

  var gidRef = useRef<string[]>()
  gidRef.current = selectedGids

  function selectTask(e: any, gid: string) {
    if (e.target.checked) {
      var gids
      gids = [...selectedGids, gid]
    } else {
      gids = selectedGids.filter(it => it !== gid)
    }
    setSelectedGids(gids)

    tasksContext.setSelectedTasks(
      gids.map(gid => {
        return tasks.find(it => it.gid === gid)
      })
    )
    console.log(tasks);

  }

  useImperativeHandle(ref, () => ({
    selectAll: function () {
      tasksContext.setSelectedTasks(tasks) // 为了向上层组件传递选中的任务
      setSelectedGids(tasks.map(it => it.gid)) // 为了切换下方的多选框
    },

    selectAllNot: function () {
      if (selectedGids) {
        tasksContext.setSelectedTasks(tasks) // 为了向上层组件传递选中的任务
        setSelectedGids(tasks.splice(0, tasksContext.selectedTasks.length)) // 为了切换下方的多选框 （删除数据）
      }
    },

    ResumeDownload: function () {
      tasksContext.setSelectedTasks(tasks)
      // @ts-ignore
      tasks.map(it => client.unpause(it.gid))
    },
    ForceRemove: function () {
      tasksContext.setSelectedTasks(tasks)
      // @ts-ignore
      tasks.map(it => client.forceRemove(it.gid))
    },

  }), [tasks])



  return (
    <div>
      <h2><strong>等待中...</strong></h2>
      {/* <ul>
        {
          tasks.map(task => {
            return <li key={task.gid}>
              <input type="checkbox" checked={selectedGids.includes(task.gid)} onChange={(e) => selectTask(e, task.gid)} />
              <span>{task.files[0].path}</span>
              |
              <span>{task.completedLength / task.totalLength}</span>
              |
              <span>{task.downloadSpeed} B/s </span>
            </li>
          })
        }
      </ul> */}


      <table className="WaitingTable">
        <thead>
          <tr>
            <th>文件路径</th>
            <th>下载速度</th>
            <th>下载进度</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(task => {
              return <tr>
                <td>
                  <input type="checkbox" checked={selectedGids.includes(task.gid)} onChange={(e) => selectTask(e, task.gid)} />
                  {task.files[0].path}
                </td>

                <td>{humanizeSpeed(task.downloadSpeed)} /s </td>

                <td><Progress percent={(task.completedLength / task.totalLength) * 100}></Progress></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}


export default forwardRef(Waiting)
