import { Button } from "antd"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SelectedTasksContext } from "./hooks"
import { PlusCircleOutlined } from '@ant-design/icons';

interface IProps {
  listComp: any
}

export default function Header({ listComp }: IProps) {
  var navigate = useNavigate()
  var tasksContext = useContext(SelectedTasksContext)
  var [selectedTasks, setSelectedTasks] = useState<any>([])

  // 打印出选中的任务
  // console.log('listComp_', listComp.current);
  // console.log('tasksContext.selectedTasks_', tasksContext.selectedTasks);

  useEffect(() => {
    // setSelectedTasks(listComp.current.getSelectedTasks())
    if (listComp.current) {
      listComp.current.onSelectedTaskChanged = function (tasks: any) {
        setSelectedTasks(tasks)
      }
    }

    return () => {
      if (listComp.current) {
        listComp.current.onSelectedTaskChanged = null
      }
    }
  }, [listComp.current])


  function goNew() {
    navigate('/new')
  }


  // 切换全选的状态
  const [selected, setSelected] = useState(false)

  function selectAll() {
    if (!selected) {
      listComp.current.selectAll()
      setSelected(true)
    } else {
      listComp.current.selectAllNot()
      setSelected(false)
    }
  }

  function StopDown() {
    console.log(listComp.current)
    listComp.current.StopDown()
    navigate('/waiting')
  }

  function ResumeDownload() {
    listComp.current.ResumeDownload()
    navigate('/downloading')
  }

  function ForceRemove() {
    listComp.current.ForceRemove()
  }

  function RemoveStopped() {
    listComp.current.RemoveStopped()
  }
  return (
    <div>
      {/* <div>
        <button onClick={goNew}>新建下载</button>
        <button hidden={tasksContext.selectedTasks.length <= 0}>删除任务</button>
        <button>清空已完成任务</button> */}
      {/* <button onClick={selectAll}>全选</button> */}
      {/* <button onClick={selectAll}>{selected ? '全不选' : '全选'}</button>
      </div> */}

      <Button onClick={goNew} type="primary" > <PlusCircleOutlined /> 新建 </Button>
      <Button hidden={tasksContext.selectedTasks.length <= 0} onClick={ForceRemove}> 删除任务 </Button>
      <Button onClick={RemoveStopped}> 清空已完成任务 </Button>
      <Button onClick={selectAll}>{'全选'}</Button>
      <Button onClick={StopDown}>暂停下载</Button>
      <Button onClick={ResumeDownload}>恢复下载</Button>
    </div>
  )
}
