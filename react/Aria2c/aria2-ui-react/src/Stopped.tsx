import { Progress } from "antd";
import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Aria2Client from "./aria2-client";
import { humanizeSpeed } from "./Helpers";
import { SelectedTasksContext, useTasks2 } from "./hooks";
import "./Stopped.css"





interface IProps {
  client: Aria2Client
}

function Stopped({ client }: IProps, ref: React.Ref<any>) {
  // 拿到上层组件中的数据
  var tasksContext = useContext(SelectedTasksContext) // {selectedTasks: [], setSelectedTasks: f}

  var [selectedGids, setSelectedGids] = useState<string[]>([])
  // console.log(selectedGids)

  var gidRef = useRef<string[]>()
  gidRef.current = selectedGids

  function selectTask(e: any, gid: string) {
    // function selectTask(e: any, task: any) {

    // 如果当前元素被打钩了就把taskContext添加到数组中去
    if (e.target.checked) {  // 现在只记录选中了那些id
      var gids // 用自己的变量接住

      gids = [...selectedGids, gid]

      // setSelectedGids([...selectedGids, gid]) // 这种设置组件无法获取到最新状态

      //                              当前的
      // tasksContext.setSelectedTasks([...tasksContext.selectedTasks, task])

    } else { // 加上！选择的是去掉勾的任务
      gids = selectedGids.filter(it => it !== gid)


      // setSelectedGids(selectedGids.filter(it => it !== gid)) // 这种设置组件无法获取到最新状态

      // tasksContext.setSelectedTasks(tasksContext.selectedTasks.filter(it => it.gid !== task.gid))
    }

    setSelectedGids(gids) // 获取最新状态

    if (typeof ref === 'object') { // 类型守卫判断是否是对象
      ref?.current?.onSelectedTaskChanged?.(
        // gids.map(gid => {
        //   return tasks.find(it => it.gid === gid)
        // }).filter(it => it)
      )
    }

    // 根据已选中的任务id得到所有任务对象并设置到上层组件的状态中
    tasksContext.setSelectedTasks(
      gids.map(gid => {
        return tasks.find(it => it.gid === gid)
      })
    )
      console.log(tasks)

  }
  // console.log(selectedGids)

  // 每次返回的是新的数组
  var tasks = useTasks2(async () => {
    await client.ready()
    // @ts-ignore·
    return client.tellStopped(0, 100)
  }, 10)

  // 父组件拿到当前组件的实例，并且传到<header />中 搭配forwardRef使用。
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
      // console.log('tasks_', tasks);
    },
    RemoveStopped: function () {
      tasksContext.setSelectedTasks(tasks)
      // @ts-ignore
      tasks.map(it => client.removeDownloadResult(it.gid))
    },

    // 获取已选中的任务
    // getSelectedTasks() {
    //   return selectedGids.map(gid => { // 由一个id 映射一个任务
    //     return tasks.find(task => task.gid == gid)
    //   }).filter(it => it)
    // },

    // 监听功能
    onSelectedTaskChanged: null
  }), [tasks])







  return (
    <div>
      <h2><strong>已完成</strong></h2>
      {/* <ul>
        {
          tasks.map(task => {
            return <li key={task.gid}>

              <input type="checkbox" checked={selectedGids.includes(task.gid)} onChange={(e) => selectTask(e, task.gid)} />
              |
              <span>{task.files[0].path}</span>
              |
              <span>{task.completedLength / task.totalLength}</span>
              |
              <span>{task.downloadSpeed} B/s </span>
              <br />
              <div><Link to={"/task/detail/" + task.gid}>详情</Link></div>
            </li>
          })
        }
      </ul> */}

      <table className="StoppedTable">
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

                <td><Progress percent={ (task.completedLength / task.totalLength) * 100 }></Progress></td>
              </tr>
            })
          }
        </tbody>
      </table>


    </div>
  )
}

// forwardRef是通过组件向子组件自动传递 引用ref
export default forwardRef(Stopped)
