import { rejects } from "assert";
import { resolve } from "path";
import { EventEmitter } from "events";



//                               直接继承EventEmitter 实现事件监听器
export default class Aria2Client extends EventEmitter {
  ip: string;
  port: number | string;
  secret: string;
  ws: WebSocket | null;
  id: number;

  // statusPromise字段保存的是一个Promise，这个Promise最终能resolve出 Aria2Client的对象也就是他自己
  readyPromise: Promise<Aria2Client>

  // 该对象记录每个id的请求对应的回调函数
  // 内容为id => callback
  callbacks: {
    [id: number]: (data: any) => void
  } = {}

  //       public    private 设置IP为私有属性
  // constructor(private ip: string = '127.0.0.1', public  port: number | string, private secret: string) {
  constructor(ip: string = '127.0.0.1', port: number | string, secret: string, first: boolean = false) {
    super()
    this.ip = ip
    this.port = port
    this.secret = secret

    var url = `ws://${ip}:${port}/jsonrpc`

    this.ws = null
    this.id = 1

    // 构建出一个Promise 用来等待ws链接成功的返回状态
    this.readyPromise = new Promise((resolve, reject) => {
      this.ws = new WebSocket(url)
      this.ws.addEventListener('open', e => {
        resolve(this)
      })
      this.ws.addEventListener('error', e => {
        reject(this)
      })
    })

    // 响应请求
    // @ts-ignore
    this.ws.addEventListener('message', (e) => {
      var data = JSON.parse(e.data)
      // 根据data的id来找到当初发请求的id函数
      var id = data.id

      // 主动收到的消息要判断
      if (id) {
        var callback = this.callbacks[id] // 考虑callback内的函数用完后清除
        delete this.callbacks[id]
        callback(data)
      } else {
        // 说明是事件 onDownloadStart, onDownloadError
        var eventName = data.method.slice(8) // 获取事件名称
        this.emit(eventName, ...data.params)

      }
    })
  }

  destroy() { // 销毁方法
    this.ws?.close()
  }

  ready() {
    return this.readyPromise
  }

  // aria2 方法
  // addUri(...args: any[]) {
  //   return new Promise((resolve, reject) => {
  //     var id = this.id++

  //     // message 运行完得到回调 判断成功或失败
  //     function callback(data: any) {
  //       if (data.error) {
  //         reject(data.error)
  //       } else {
  //         resolve(data.result)
  //       }
  //     }

  //     // 根据收到的id返回回调
  //     this.callbacks[id] = callback

  //     // 发请求
  //     this.ws.send(JSON.stringify({
  //       jsonrpc: '2.0',
  //       id: id,
  //       method: 'aria2.addUri',
  //       params: [`token:${this.secret}`, ...args]
  //     }))
  //   })
  // }
}

const aria2Methods = [
  "aria2.addUri",
  "aria2.addTorrent",
  "aria2.getPeers",
  "aria2.addMetalink",
  "aria2.remove",
  "aria2.pause",  // 暂停下载
  "aria2.forcePause",
  "aria2.pauseAll",
  "aria2.forcePauseAll",
  "aria2.unpause",
  "aria2.unpauseAll",
  "aria2.forceRemove",
  "aria2.changePosition",
  "aria2.tellStatus",
  "aria2.getUris",
  "aria2.getFiles",
  "aria2.getServers",
  "aria2.tellActive",  // 相当于下载中
  "aria2.tellWaiting",  // 相当于等待中
  "aria2.tellStopped",  // 相当于已完成
  "aria2.getOption",
  "aria2.changeUri",
  "aria2.changeOption",
  "aria2.getGlobalOption",
  "aria2.changeGlobalOption",
  "aria2.purgeDownloadResult",
  "aria2.removeDownloadResult",
  "aria2.getVersion",
  "aria2.getSessionInfo",
  "aria2.shutdown",
  "aria2.forceShutdown",
  "aria2.getGlobalStat",
  "aria2.saveSession",
  "system.multicall",
  "system.listMethods",
  "system.listNotifications"
] as const

// 便利获取所有方法
aria2Methods.forEach(prefixedMethodName => {
  var [, methodName] = prefixedMethodName.split('.')

  // @ts-ignore
  Aria2Client.prototype[methodName] = function (...args: any[]) {
    return this.ready().then(() => {
      return new Promise((resolve, reject) => {
        var id = this.id++

        // message 运行完得到回调 判断成功或失败
        function callback(data: any) {
          if (data.error) {
            reject(data.error)
          } else {
            resolve(data.result)
          }
        }

        // 根据收到的id返回回调
        this.callbacks[id] = callback

        // 发请求
        // @ts-ignore
        this.ws.send(JSON.stringify({
          jsonrpc: '2.0',
          id: id,
          method: prefixedMethodName,
          params: [`token:${this.secret}`, ...args]
        }))
      })
    })


  }
})


// 把数组的内容构建出一个联合类型 创建createAria2Client动态方法
{
  // // 把数组的内容构建出一个联合类型
  // type Aria2methodName = typeof aria2Methods[number]

  // type Aria2Client2 = {
  //   [method in Aria2methodName]?: () => void;
  // }

  // function createAria2Client(ip: string, port: number | string, secret: string) {
  //   var client: Aria2Client2 = {}

  //   var url = `ws://${ip}:${port}/jsonrpc`
  //   var ws = new WebSocket(url)
  //   var id = 0
  //   var callbacks: any = {}

  //   var readyPromise = new Promise((resolve) => {
  //     ws.addEventListener('message', (e) => {
  //       var data = JSON.parse(e.data)
  //       data = data.id
  //       if (data) {
  //         var callback = callbacks[id]
  //         delete callbacks[id]
  //         callback(data)
  //       } else {
  //         // 说明是事件  onDownloadStart, onDownloadError
  //       }
  //     })
  //   })

  //   for (let methodName of aria2Methods) {
  //     client[methodName] = function (...args: any[]) {
  //       return new Promise((resolve, reject) => {
  //         function callback(data: any) {
  //           if (data.error) {
  //             reject(data.error)
  //           } else {
  //             resolve(data.result)
  //           }
  //         }

  //         callbacks[id++] = callback

  //         ws.send(JSON.stringify({
  //           jsonrpc: '2.0',
  //           id: id,
  //           method: methodName,
  //           params: [`token:${secret}`, ...args]
  //         }))
  //       })
  //     }
  //   }

  //   return client
  // }

  // var client = createAria2Client('', '', '',)
}





// function sendCall(this: Aria2Client, methodName: string, ...args: any) {
//   return new Promise((resolve, reject) => {
//     var id = this.id++

//     // message 运行完得到回调 判断成功或失败
//     function callback(data: any) {
//       if (data.error) {
//         reject(data.error)
//       } else {
//         resolve(data.result)
//       }
//     }

//     // 根据收到的id返回回调
//     this.callbacks[id] = callback

//     // 发请求
//     this.ws.send(JSON.stringify({
//       jsonrpc: '2.0',
//       id: id,
//       method: methodName,
//       params: [`token:${this.secret}`, ...args]
//     }))
//   })
// }



