import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import Aria2Client from "./aria2-client";
import { useAsync } from "./hooks";
import "./Settings.css"

// 创建一个映射，转换中文翻译。
var aria2OptionNameMap: any = {
  'max-download-limit': '最大下载速度',
}

interface IProps {
  client: Aria2Client
}

export default function Settings({ client }: IProps) {
  var [option, setOption] = useState<any>(null)

  // var { pending, value: options } = useAsync(useCallback(async () => {
  //   await client.ready()
  //   // @ts-ignore
  //   var options = await client.getGlobalOption()

  //   setOption(options)

  //   return options
  // }, []))

  useEffect(() => {
    // @ts-ignore
    client.getGlobalOption().then(option => {
       setOption(option)
    })
  }, [])

  function saveOptions() {
    // @ts-ignore
    client.changeGlobalOption(option)
  }

  function setOneOption(e: React.ChangeEvent<HTMLInputElement> , key: string) {
    setOption({
      ...option,
      //   如果是输入框 就获取当前值                     如果不是就取决于checkbox 的值是真还是假
      [key]: e.target.type == 'text' ? e.target.value : e.target.checked ? 'true' : 'false'
     })
  }

  if (option  ) {
    return (
      <div>
        <h2><strong>全局设置</strong></h2>
        {
          Object.entries(option).map(
            ([key, val]: [string, any]) => {
              return (
                <div key={key} className="SettingsDiv">
                  <span>{aria2OptionNameMap[key] ?? key}</span>
                  {val == 'true' || val == 'false'
                    ? <input className="SetBox" type="checkbox" checked={val == 'true'} onChange={(e) => setOneOption(e, key)} />
                    : <input className="SetText" type="text" value={val} onChange={(e) => setOneOption(e, key)} />
                  }

                </div>
              )
            })
        }
        <Button type="primary" onClick={saveOptions}>保存</Button>
      </div>

    )
  }


  return <div>Loading Options...</div>

}
