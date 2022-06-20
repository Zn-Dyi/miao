
import { EventEmitter } from "events";


export default class Aria2Client extends EventEmitter {
  tellStatus(gid: any) {
    throw new Error("Method not implemented.");
  }
  ip: string;
  port: string | number;
  secret: string;
  ws: WebSocket | null;
  id: number;

  readyPromise: Promise<Aria2Client>;
  //这个字段保存的是Promise，这个Promise可以resolve出一个<xxx> (这个相当于resolve出自己)

  callbacks: {
    [id: number]: (data: any) => void
  }

  constructor(ip: string, port: string | number, secret: string) {
    super()

    this.ip = ip
    this.port = port
    this.secret = secret

    var url = `ws://${ip}:${port}/jsonrpc`
    this.ws = null
    this.id = 1

    // 该对象记录每个id的请求对应的回调函数
    // 内容为id => callback
    this.callbacks = {
      2: function () { }
    }


    // 用来等待链接成功的状态
    this.readyPromise = new Promise(resolve => {
      this.ws = new WebSocket(url)
      this.ws.addEventListener('open', e => {
        resolve(this)
      })
    })

    this.ws.addEventListener('message', (e) => {
      var data = JSON.parse(e.data)
      var id = data.id
      if (id) {
        var callback = this.callbacks[id]
        delete this.callbacks[id]
        callback(data)
      } else {
        // 说明是事件， onDownloadStart，onDownloadError
      }


    })

  }

  ready() {
    return this.readyPromise
  }

  // addUri(...args: any[]) {
  //   return new Promise((resolve, reject) => {
  //     var id = this.id++

  //     function callback(data: any) {
  //       if (data.error) {
  //         reject(data.error)
  //       } else {
  //         resolve(data.result)
  //       }
  //     }

  //     this.callbacks[id] = callback

  //     this.ws.send(JSON.stringify({
  //       jsonrpc: '2.0',
  //       id: id,
  //       method: 'aria2.addUri',
  //       params: [`token:${this.secret}`, ...args]
  //     }))
  //   })
  // }


  // 查询aria2.listMethods的方法
  // listMethods(...args: any[]) {
  //   return new Promise((resolve, reject) => {
  //     var id = this.id++

  //     function callback(data: any) {
  //       if (data.error) {
  //         reject(data.error)
  //       } else {
  //         resolve(data.result)
  //       }
  //     }

  //     this.callbacks[id] = callback

  //     this.ws.send(JSON.stringify({
  //       jsonrpc: '2.0',
  //       id: id,
  //       method: 'system.listMethods',
  //       params: [`token:${this.secret}`, ...args]
  //     }))
  //   })
  // }
}

const aria2Methods = [
  "addUri",
  "addTorrent",
  "getPeers",
  "addMetalink",
  "remove",
  "pause",
  "forcePause",
  "pauseAll",
  "forcePauseAll",
  "unpause",
  "unpauseAll",
  "forceRemove",
  "changePosition",
  "tellStatus",
  "getUris",
  "getFiles",
  "getServers",
  "tellActive",
  "tellWaiting",
  "tellStopped",
  "getOption",
  "changeUri",
  "changeOption",
  "getGlobalOption",
  "changeGlobalOption",
  "purgeDownloadResult",
  "removeDownloadResult",
  "getVersion",
  "getSessionInfo",
  "shutdown",
  "forceShutdown",
  "getGlobalStat",
  "saveSession",
  "multicall",
  "listMethods",
  "listNotifications",
] as const


aria2Methods.forEach(methodName => {
  // var [, methodName] = prefixedMethodName.split('.')

  //@ts-ignore
  Aria2Client.prototype[methodName] = function (...args: any[]) {
    return new Promise((resolve, reject) => {
      var id = this.id++

      function callback(data: any) {
        if (data.error) {
          reject(data.error)
        } else {
          resolve(data.result)
        }
      }

      this.callbacks[id] = callback

      this.ws.send(JSON.stringify({  // JSON只能编码对象，数组，字符串，undefined，null，
        jsonrpc: '2.0',
        id: id,
        method: 'aria2.' + methodName,
        params: [`token:${this.secret}`, ...args]
      }))
    })
  }
})
