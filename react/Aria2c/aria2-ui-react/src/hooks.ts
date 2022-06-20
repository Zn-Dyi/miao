import { useRef } from "react";
import { useCallback, useEffect, useState } from "react";
import Aria2Client from "./aria2-client";


export function useInput(init = "") {
  var [value, setValue] = useState(init);
  // var [checked, setChecked] = useState(init);

  function onChange(e: any) {
    var target = e.target;
    // if (target.type == "checked" || target.type == "radio") {
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

export function useTasks(client: Aria2Client, interval: number, state: 'Active' | 'Waiting' | 'Stopped') {
  var [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    var id = setInterval(() => {
      client.ready().then(client => {
        // @ts-ignore
        client['tell' + state](0, 100).then(tasks => {
          setTasks(tasks)
        })
      })
    }, interval)

    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    client.ready().then(client => {
      // @ts-ignore
      client['tell' + state](0, 100).then(tasks => {
        //   客户下载状态  从0-100的任务
        setTasks(tasks)
        console.log(tasks)
      })
    })
  }, [])

  return tasks
}

export function useTasks2(getTasks: () => Promise<any[]>, interval: number) {
  var [tasks, setTasks] = useState<any[]>([])

  var ref = useRef<typeof getTasks>(getTasks)

  ref.current = getTasks

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
  }, [])

  return tasks
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
