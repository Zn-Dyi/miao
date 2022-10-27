## 题目一

实现mergeObjectListByKey函数，合并对象数组元素，并且做属性的合并

要求：

合并重复元素，即去重（通过参数key判断重复）
重复的对象元素在合并时：
不同的字段全部保留。
相同的字段，若值不同，则认为无法确定准确值，去除，值相同则保留
注重可读性，尽量用Object对象、Array对象的遍历方法实现，不强求

```js
/**
oldList, newList 为要合并的元素
key用来判断是否为同一个元素
返回合并的数组
*/
function mergeObjectListByKey(oldList, newList, key) {
  // TODO:

 }

// 测试数据
const team = [
  {id: 1, name: '张三', age: 11},
  {id: 2, name: 'mike', age: 22},
  {id: 3, name: '小李', age: 44},
  {id: 5, name: '李', age: 44, gender: 1},
]
const newTeam = [
  {id: 2, name: 'mike', age: 99},
  {id: 3, name: '小李', tel: 18899998888},
  {id: 4, name: 'jay'},
  {id: 5, name: '李', age: 44, gender: 0, tel: 12312312312},
]

// 输出验证，预期true
const mergedTeam = mergeObjectListByKey(team, newTeam, 'id').sort((a,b) => a.id - b.id)
const testCase = [
  {id: 1, name: '张三', age: 11},
  {id: 2, name: 'mike'},
  {id: 3, name: '小李', age: 44, tel: 18899998888},
  {id: 4, name: 'jay'},
  {id: 5, name: '李', age: 44, tel: 12312312312},
]
console.log(JSON.stringify(mergedTeam) === JSON.stringify(testCase))
```



## 题目二

path 表示节点的完整路径；leafCount 表示该节点下所有叶子节点的数量；注意叶子节点不需要计算 leafCount。

```js
const input = [
  {
    name: "浙江",
    children: [
      {
        name: "杭州",
        children: [
          { name: "余杭区" },
          { name: "上城区" },
          { name: "下城区" },
          { name: "西湖区" },
          { name: "拱墅区" },
        ],
      },
      {
        name: "绍兴",
        children: [
          { name: "柯桥区" },
          { name: "越城区" },
          { name: "上虞区" },
          { name: "新昌县" },
        ],
      },
    ],
  },
  {
    name: "湖北",
    children: [
      {
        name: "武汉",
        children: [
          { name: "江岸区" },
          { name: "江汉区" },
          { name: "硚口区" },
          { name: "汉阳区" },
          { name: "武昌区" },
          { name: "青山区" },
          { name: "洪山区" },
        ],
      },
    ],
  },
];

function process() {
  // YOUR CODE HERE
}

process(input); // => 返回 output 如下

const output = [
  {
    name: "浙江",
    path: "浙江",
    leafCount: 9,
    children: [
      {
        name: "杭州",
        path: "浙江-杭州",
        leafCount: 5,
        children: [
          { name: "余杭区", path: "浙江-杭州-余杭区" },
          { name: "上城区", path: "浙江-杭州-上城区" },
          { name: "下城区", path: "浙江-杭州-下城区" },
          { name: "西湖区", path: "浙江-杭州-西湖区" },
          { name: "拱墅区", path: "浙江-杭州-拱墅区" },
        ],
      },
      {
        name: "绍兴",
        path: "浙江-绍兴",
        leafCount: 4,
        children: [
          { name: "柯桥区", path: "浙江-绍兴-柯桥区" },
          { name: "越城区", path: "浙江-绍兴-越城区" },
          { name: "上虞区", path: "浙江-绍兴-上虞区" },
          { name: "新昌县", path: "浙江-绍兴-新昌县" },
        ],
      },
    ],
  },
  {
    name: "湖北",
    path: "湖北",
    leafCount: 7,
    children: [
      {
        name: "武汉",
        path: "湖北-武汉",
        leafCount: 7,
        children: [
          { name: "江岸区", path: "湖北-武汉-江岸区" },
          { name: "江汉区", path: "湖北-武汉-江汉区" },
          { name: "硚口区", path: "湖北-武汉-硚口区" },
          { name: "汉阳区", path: "湖北-武汉-汉阳区" },
          { name: "武昌区", path: "湖北-武汉-武昌区" },
          { name: "青山区", path: "湖北-武汉-青山区" },
          { name: "洪山区", path: "湖北-武汉-洪山区" },
        ],
      },
    ],
  },
];
```


## 题目三

对以下数组进行去重：

```js

[123, '123', {}, {}, null, undefined, 'abc', 'abc']

输出：[123, '123', {}, null, undefined, 'abc']


function unique(arr){
    let len = arr.length
    for(let i = 0; i < len ; i++) {
        for(let j = i+1; j < len ; j++) {
            if(JSON.stringify(arr[i]) === JSON.stringify(arr[j])){
                arr.splice(j,1)
                len-- //减少循环次数提高性能
                j-- //保证j的值自加后不变
            }
        }
    }
    return arr
}


function unique(arr) {
  // todo
  const obj = {};
  return arr.filter((item) => {
    const key = typeof item + item;
    return obj.hasOwnProperty(key) ? false : (obj[key] = true);
  });
}


```
