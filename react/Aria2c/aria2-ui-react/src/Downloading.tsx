import { Progress } from "antd"
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import Aria2Client from "./aria2-client"
import { SelectedTasksContext, useTasks, useTasks2 } from "./hooks"
import "./Downloading.css"
import { humanizeSpeed } from "./Helpers"



// 为Downloading 组件声明一个属性接口
interface IProps {
  //      class 本身可以作为一个类型
  client: Aria2Client
}

function Downloading({ client }: IProps, ref: React.Ref<any>) {
  // var tasks = useTasks(client, 1000, "Active")
  var tasks = useTasks2(() => {
    return client.ready().then((client: any) => client.tellActive())
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
    StopDown: function () {
      tasksContext.setSelectedTasks(tasks)
      // @ts-ignore
      tasks.map(it => client.pause(it.gid))
    },
    ForceRemove: function () {
      tasksContext.setSelectedTasks(tasks)
      // @ts-ignore
      tasks.map(it => client.forceRemove(it.gid))
    }

  }), [tasks])

  {
    // 一下注释代码可以实现useTasks 进行封装刷新一秒一次 以封装到'./hooks'中
    // var [tasks, setTasks] = useState<any[]>([])
    // useEffect(() => {
    //   var id = setInterval(() => {
    //     client.ready().then(client => {
    //       // @ts-ignore
    //       client.tellActive().then(tasks => {
    //         setTasks(tasks)
    //       })
    //     })
    //   }, 1000)

    //   return () => {
    //     clearInterval(id)
    //    }

    // }, [])

    // // 获取 client 上的属性方法 tellActive
    // useEffect(() => {
    //   client.ready().then(client => {
    //     // @ts-ignore
    //     client.tellActive().then(tasks => {
    //       setTasks(tasks)
    //       console.log(tasks)
    //     })
    //   })
    // }, [])

  }

  return (
    <div>
      <h2><strong>下载中...</strong></h2>
      {/* <ul>
        {
          tasks.map(task => {
            return <li key={task.gid}>
              <input type="checkbox" checked={selectedGids.includes(task.gid)} onChange={(e) => selectTask(e, task.gid)} />
              <span>{task.files[0].path}</span>
              <br />
              <span>{task.completedLength / task.totalLength}</span>
              <br />
              <span>{task.downloadSpeed} B/s </span>
            </li>
          })
        }
      </ul> */}

      <table className="DownloadTable">
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

export default forwardRef(Downloading)
