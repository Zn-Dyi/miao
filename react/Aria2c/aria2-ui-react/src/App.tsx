import React, { useMemo, Component } from 'react';
import './App.css';
import { HashRouter, NavLink, Routes, Route, useLocation } from 'react-router-dom'

import Aria2Client from './aria2-client';
import Downloading from './Downloading';
import Waiting from './Waiting';
import NewTask from './NewTask';
import Header from './Header';
import Stopped from './Stopped';
import { useState } from 'react';
import TaskDetail from './TaskDetail';
import { SelectedTasksContext } from './hooks';
import { useRef } from 'react';
import Settings from './Settings';
import Servers from './Servers';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



//@ts-ignore  //  不检查此行代码
globalThis.Aria2Client = Aria2Client

function App() {
  var currentServerIdx = useMemo(() => localStorage.currentServerIdx ?? 0, [])
  var aria2Server = useMemo(() => {
    return JSON.parse(localStorage.ARIA2_SERVER ?? '[]')
  }, [])

  var [connectState, setConnectState] = useState('连接中...')
  var [selectedIdx, setSelectedIdx] = useState(currentServerIdx)
  var [globalStat, setGlobalStat] = useState<any>({
    numActive: '0',
    numWaiting: '0',
    numStoppedTotal: '0',
    uploadSpeed: '0',
    downloadSpeed: '0',
  })

  var [aria2, setAria2] = useState(
    useMemo(() => {
      var server = aria2Server[currentServerIdx]
      var aria2 = new Aria2Client(server.ip, server.port, server.secret)
      return aria2
    }, [])
  )

  useEffect(() => {

    aria2.ready().then(() => {
      setConnectState(connState => {
        if (connState == '连接中...') {
          return '已连接'
        } else {
          return connState
        }
      })
    }, () => {
      setConnectState(connState => {
        if (connState == '连接中...') {
          return '连接失败'
        } else {
          return connState
        }
      })
    })

    var id: NodeJS.Timer
    aria2.ready().then(() => {
      id = setInterval(() => {
        console.log('timer...')

        //@ts-ignore
        aria2.getGlobalStat().then(stat => {
          setGlobalStat(stat)
        })
      }, 1000)
    })

    async function onComplete(taskInfo: any) {

      var task = await aria2.tellStatus(taskInfo.gid)
      toast('有任务下载完成了', task.files[0].path)
    }

    aria2.on('DownloadComplete', onComplete)

    return () => {
      clearInterval(id)
      aria2.off('DownloadComplete', onComplete)
      aria2.destroy()
      // 解绑事件的同时还应该销毁aria2对象， 如里面的websocket连接
    }

  }, [aria2])

  var [selectedTasks, setSelectedTasks] = useState([])

  var listComp = useRef()

  function changeServer(e: React.ChangeEvent<HTMLSelectElement>) {
    var idx = e.target.value
    setSelectedIdx(idx)
    localStorage.currentServerIdx = idx
  }

  useEffect(() => {
    var serverInfo = aria2Servers[selectedIdx]
    setConnectState('连接中...')
    var aria2 = new Aria2Client(serverInfo.ip, serverInfo.port, serverInfo.secret)
    setAria2(aria2)
  }, [selectedIdx])






  return (
    <SelectedTasksContext.Provider value={{ selectedTasks, setSelectedTasks }}>
      <ToastContainer />
      <HashRouter>
        <div className="App">
          <div className="App-left">
            <select onChange={changeServer} value={selectedIdx}>
              {
                aria2Servers.map((server: any, idx: number) => {
                  return <option key={idx} value={idx}>{server.ip}:{server.port}</option>
                })
              }
            </select>
            <div>{connectState}</div>
            <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/downloading">下载中({globalStat.numActive})</NavLink></div>
            <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/wating">等待中({globalStat.numWaiting})</NavLink></div>
            <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/stopped">已完成({globalStat.numStoppedTotal})</NavLink></div>
            <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/settings">设置</NavLink></div>
            <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/servers">服务器</NavLink></div>

            <hr />

            <div>上传：{globalStat.uploadSpeed}B/s</div>
            <div>下载：{globalStat.downloadSpeed}B/s</div>
          </div>
          <div className="App-right">
            <div className="App-header">
              <Header listComp={listComp} />
            </div>
            <div>
              <Routes>
                <Route path="/downloading" element={<Downloading client={aria2} />}>
                </Route>
                <Route path="/wating" element={<Waiting client={aria2} />}>
                </Route>
                <Route path="/stopped" element={<Stopped ref={listComp} client={aria2} />}>
                </Route>
                <Route path="/new" element={<NewTask client={aria2} />}>
                </Route>
                <Route path="/settings" element={<Settings client={aria2} />}>
                </Route>
                <Route path="/servers" element={<Servers />}>
                </Route>
                <Route path="/task/detail/:gid" element={<TaskDetail client={aria2} />} />
              </Routes>
            </div>
          </div>
        </div>
      </HashRouter>
    </SelectedTasksContext.Provider>
  );
}

export default App;
function toast(arg0: string, path: any) {
  throw new Error('Function not implemented.');
}

