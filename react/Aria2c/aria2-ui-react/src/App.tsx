import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';

import Aria2Client from './aria2-client';
import Downloading from './Downloading';
import Header from './Header';
import { SelectedTasksContext } from './hooks';
import NewTask from './NewTask';
import Servers from './Servers';
import Settings from './Settings';
import Stopped from './Stopped';
import TaskDetail from './TaskDetail';
import Waiting from './Waiting';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { humanizeSpeed } from './Helpers';
// @ts-ignore
globalThis.Aria2Client = Aria2Client


function App() {
  // 从localStorage上读一次           默认用的是第0项或是从localStorage上取出的 （读出下标）
  var currentServeIdx = useMemo(() => localStorage.currentServerIdx ?? 0, [])

  // 从localStorage取出，已经保存了的服务器 （读出服务器）
  var aria2Servers = useMemo(() => {
    return JSON.parse(localStorage.ARIA2_SERVERS ?? '[]')
  }, [])

  var [connectState, setConnectState] = useState('连接中。。。')
  var [selectedIdx, setSelectedIdx] = useState(currentServeIdx) // 已选中的状态
  var [globalStat, setGlobalStat] = useState<any>({ // 全局状态
    numActive: '0',
    numWaiting: '0',
    numStopped: '0',
    uploadSpeed: '0',
    downloadSpeed: '0',
  })

  var [aria2, setAria2] = useState(
    useMemo(() => {
      var server = aria2Servers[currentServeIdx]

      var aria2 = new Aria2Client('127.0.0.1', '11000', '111222333', true)
      // var aria2 = new Aria2Client(server.ip, server.port, server.secret)

      return aria2
    }, [])
  )

  // 更新连接状态
  useEffect(() => {
    aria2.ready().then(() => {
      setConnectState(connState => {
        if (connState == '连接中。。。') {
          return '已连接'
        } else {
          return connState
        }
      })
    }, () => {
      setConnectState(connState => {
        if (connState == '连接中。。。') {
          return '连接失败'
        } else {
          return connState
        }
      })
    })

    var id: NodeJS.Timer
    aria2.ready().then(() => {
      id = setInterval(() => {
        // @ts-ignore
        aria2.getGlobalStat().then(stat => {
          setGlobalStat(stat)
        })
      }, 1000)
    })


    // @ts-ignore
    globalThis.toast = toast // 类似alert弹框组件
    async function onComplete(taskInfo: any) {
      // @ts-ignore
      var task = await aria2.tellStatus(taskInfo.gid)
      toast('有任务下载完成', task.files[0].path)
    }

    aria2.on('DownloadComplete', onComplete)

    return () => {
      clearInterval(id)
      aria2.off('DownloadComplete', onComplete)
    }
  }, [aria2])

  var [selectedTasks, setSelectedTasks] = useState([])

  var listComp = useRef()


  function changeServer(e: React.ChangeEvent<HTMLSelectElement>) {
    var idx = e.target.value // 默认先从select元素上选择一个下标先设置上
    setSelectedIdx(idx)

    localStorage.currentServerIdx = idx // 把选中的下标设置到localStorage上方便下次读出来
  }

  // 记录切换的服务器
  useEffect(() => {
    var serverInfo = aria2Servers[selectedIdx] // 通过选中的下标读取服务器
    setConnectState('连接中。。。')
    // 创建新的对象
    var aria2 = new Aria2Client('127.0.0.1', '11000', '111222333')
    // var aria2 = new Aria2Client(serverInfo.ip, serverInfo.port, serverInfo.secret)
    // 把新的对象也设置上去
    setAria2(aria2)
  }, [selectedIdx]) // selectedIdx 选中的下标有变化就刷新

  return (
    <div>
      {/* // 为下层组件传送 选择方法 */}
      {/* <SelectedTasksContext.Provider value={{ selectedTasks, setSelectedTasks }}> */}
      {/* 下载已完成提示框 */}
      {/* <ToastContainer />
        <HashRouter>
          <div className='App'>

            <div className="App-left">
              <select onChange={changeServer} value={selectedIdx}>
                {
                  aria2Servers.map((server: any, idx: number) => {
                    return <option key={idx} value={idx}>{server.ip}:{server.port}</option>
                  })
                }
              </select>
              <div>{connectState}</div>
              <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/downloading">下载中...({globalStat.numActive})</NavLink></div>
              <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/waiting">等待中...({globalStat.numWaiting})</NavLink></div>
              <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/stopped">已完成...({globalStat.numStoppedTotal})</NavLink></div> */}
      {/* <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/new">新建任务</NavLink></div> */}
      {/* <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/settings">设置</NavLink></div>
              <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/servers">服务器管理</NavLink></div>
              <div>上传: {globalStat.uploadSpeed} B/s</div>
              <div>下载: {globalStat.downloadSpeed} B/s</div>
            </div>
            <div className="App-right">
              <div className='App-header'>
                <Header listComp={listComp} />
              </div>
              <div>
                <Routes>
                  <Route path="/downloading" element={<Downloading client={aria2} />}></Route>
                  <Route path="/waiting" element={<Waiting client={aria2} />}></Route>
                  <Route path="/stopped" element={<Stopped ref={listComp} client={aria2} />}></Route>
                  <Route path="/new" element={<NewTask client={aria2} />}></Route>
                  <Route path="/settings" element={<Settings client={aria2} />}></Route>
                  <Route path="/servers" element={<Servers client={aria2} />}></Route>
                  <Route path="/task/detail/:gid" element={<TaskDetail client={aria2} />} />
                </Routes>
              </div>
            </div>
          </div>
        </HashRouter>
      </SelectedTasksContext.Provider> */}



      <Layout>
        <SelectedTasksContext.Provider value={{ selectedTasks, setSelectedTasks }}>
          {/* 下载已完成提示框 */}
          <ToastContainer />
          <HashRouter>
            <div className='App'>
              {/* <Sider> */}
              <div className="App-left">
                <select onChange={changeServer} value={selectedIdx}>
                  {
                    aria2Servers.map((server: any, idx: number) => {
                      return <option key={idx} value={idx}>{server.ip}:{server.port}</option>
                    })
                  }
                </select>
                <div>{connectState}</div>
                <div className='App-navigate'>
                  <div><NavLink style={({ isActive }) => ({ color: isActive ? 'black' : 'black' })} to="/downloading">下载中...({globalStat.numActive})</NavLink></div>
                  <div><NavLink style={({ isActive }) => ({ color: isActive ? 'black' : 'black' })} to="/waiting">等待中...({globalStat.numWaiting})</NavLink></div>
                  <div><NavLink style={({ isActive }) => ({ color: isActive ? 'black' : 'black' })} to="/stopped">已完成...({globalStat.numStopped})</NavLink></div>
                  {/* <div><NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/new">新建任务</NavLink></div> */}
                  <div><NavLink style={({ isActive }) => ({ color: isActive ? 'black' : 'black' })} to="/settings">设置</NavLink></div>
                  <div><NavLink style={({ isActive }) => ({ color: isActive ? 'black' : 'black' })} to="/servers">服务器管理</NavLink></div>
                </div>
                <div className='Speed'>
                  <div>上传: {humanizeSpeed(globalStat.uploadSpeed)} </div>
                  <div>下载: {humanizeSpeed(globalStat.downloadSpeed)} </div>
                </div>
              </div>
              {/* </Sider> */}
              <div className="App-right">
                <div className='App-header'>
                  <Header listComp={listComp} />
                </div>
                <div>
                  <Routes>
                    <Route path="/downloading" element={<Downloading ref={listComp} client={aria2} />}></Route>
                    <Route path="/waiting" element={<Waiting ref={listComp} client={aria2} />}></Route>
                    <Route path="/stopped" element={<Stopped ref={listComp} client={aria2} />}></Route>
                    <Route path="/new" element={<NewTask client={aria2} />}></Route>
                    <Route path="/settings" element={<Settings client={aria2} />}></Route>
                    <Route path="/servers" element={<Servers client={aria2} />}></Route>
                    <Route path="/task/detail/:gid" element={<TaskDetail client={aria2} />} />
                  </Routes>
                </div>
              </div>
            </div>
          </HashRouter>
        </SelectedTasksContext.Provider>
      </Layout>


    </div>





  );
}

export default App;

