import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Aria2Client from "./aria2-client";


// useTasks 封装刷新一秒一次
export function useTasks(client: Aria2Client, interval: number, state: 'Active' | 'Waiting' | 'Stopped') {
  var [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    var id = setInterval(() => {
      client.ready().then(client => {
        // @ts-ignore
        client['tell' + state](0, 100).then(tasks => {
          setTasks(tasks)
          // console.log(tasks)
        })
      })
    }, interval)

    return () => clearInterval(id)
  }, [])

  // 获取 client 上的属性方法 tellActive
  useEffect(() => {
    client.ready().then(client => {
      // @ts-ignore
      client['tell' + state](0, 100).then(tasks => {
        setTasks(tasks)
        console.log(tasks)
      })
    })
  }, [])

  return tasks
}


//                       提供一个函数返回Tasks    并且每秒中更新
export function useTasks2(getTasks: () => Promise<any[]>, interval: number, client?: Aria2Client) {
  var [tasks, setTasks] = useState<any[]>([])
  // 让返回的ref指向 getTasks这种类型函数
  // useRef 创建出来可能指向 空， 需要传入一个值 “getTasks”
  var ref = useRef<typeof getTasks>( getTasks )
  ref.current = getTasks

  useEffect(() => {
    setTasks([])
  }, [client])

  useEffect(() => {
    ref.current().then(tasks => {
      setTasks(tasks)
    })
    var id = setInterval(() => {
      ref.current().then(tasks => {
        setTasks(tasks)
      })
    }, interval)

    return () => {
      clearInterval(id)
    }
  }, [client])

  return tasks
}

export function useInput(init = "") {
  var [value, setValue] = useState(init);
  var [checked, setChecked] = useState(init)

  function onChange(e: any) {
    var target = e.target;
    // if (target.type == 'checkbox' || target.type == 'radio') {
    //   setChecked(target.checked)
    // } else {
    //   setValue(target.value);
    // }

    setValue(target.value);


  }

  function clear() {
    setValue("");
  }

  var ret = {
    value,
    // checked,
    onChange: useCallback(onChange, [])
    // clear: useCallback(clear, []),
  };

  Object.defineProperty(ret, "clear", {
    value: useCallback(clear, []),
  });

  return ret;
}


export const useAsync = (asyncFunction: () => Promise<any>, immediate = true) => {
  const [pending, setPending] = useState<boolean>(false);
  const [value, setValue] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // useCallback ensures useEffect is not called on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setError(null);
    setPending(true);
    setValue(null);

    return asyncFunction()
      .then((response: any) => setValue(response))
      .catch((err: any) => setError(err))
      .finally(() => setPending(false));
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    error, execute, pending, value,
  };
};


// 选择任务环境
export const SelectedTasks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Context = React.createContext<{ selectedTasks: any[], setSelectedTasks: Function }>({
  selectedTasks: [],
  setSelectedTasks: (tasks: any[]) => { },
})
SelectedTasksContext.displayName = 'SelectedTasksContext'
