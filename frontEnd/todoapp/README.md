<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 21:44:39
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-05 17:24:11
-->

# todoapp

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## axios

https://www.e-learn.cn/topic/3156016

## 思路笔记 

### 面板详情页

- 头部
- 面板说明，名称
- 面板的列表获取显示

#### 头部

换成自己组装的头部 <tHeader>

#### 面板说明

可以从vuex拿去。

computed ，利用store getter属性 

```
在组件中访问模块里的getter
this.$store.getters['模块名/属性名'](arguments)

mapGetters方法
import { mapGetters } from 'vuex'
mapGetters方法 不能传参好像不能用这个

```

![](https://img2020.cnblogs.com/blog/1228394/202102/1228394-20210205112333456-1769243169.png)

渲染标题

> 问题：刷新会消失这个属性 

- created() 声明周期 actived声明周期中使用

  - 判断有没有这个getter，如果有就vuex，没有就要发起后端请求了

  - computed首次渲染会报错，应是空，发完请求才有，怎么解决这个错误呢？可以添加v-if判断，如果有才去渲染这个说明

    - 这里会有问题，可能是异步或者Keep-alive的原因，getter没有更新，导致仓库还是空的获取不到元素，这里使用方法调用来处理

    - ```js
          getboardName() {
            if (!this.boardName) {
              this.$api.board.getBoard(this.$route.params.id).then(res => {
                this.boardName = res.data
              })
            } else {
              this.boardName = this.$store.getters['board/getBoardName'](
                this.$route.params.id
              )
            }
          }
      ```

      

  - inited 判断

    - 但是发起请求后，回到首页，因为仓库board不为空了，所以不会再去发起请求。那么要怎么做呢？vuex 里面添加一个判断属性，去判断那个是否初始化了，而不是单纯判断它是否为null=> inited : false，让他在获取单次请求时候还是false ，那么返回首页它还是重新获取的。

### 面板详情列表

- 列表获取
  - 传递boarid去查询对应面板下列表。获取的方式参照`面板详情页的名称说明`
  - lists 在vuex仓库中的状态是累加而不是覆盖，是累加。方便以后的复用
  - getters 利用数组过滤的方法挑选适当的list

- 列表容器

  面板列表容器封装成一个组件

  - 控制列表样式显示添加列表
  - 显示便标题

- 无内容列表容易

  通过类标签来控制样式

  - 光标锁定
  - 添加列表，通过vuex发起请求

- order的问题

  - 每一次排序都会重新计算order 数据量会变大

  - 设置最大order值，65535是为了有足够大的数去算插值。

    例如：order:  100 200 300 500 400 ,想把300差进100 200 之间，那么可以区100 200 之间差值，就是除2 150 可以

    order:  100 150 200 500 400 ，再想把  400 插进100 150之间按也是这样处理，而且order还可以有小数据。所以可以将数给到足够大。

  - 后端，查询，相关boardid 按照order降序排列，取第一个是最大值，如果列表存在，就将它的order值设置成为65535，否则就原有的order值加65535.就是添加的值都加65535

- 拖拽问题

  - 冲突，鼠标点击时候会有输入框，也可以触发拖拽。那么思路是当鼠标按下并且移动超过10px才会触发拖拽

  - 拖拽体，

    - 最外层包裹列表的外层容器仍然占据文档流，拖拽的是里面的容器。
    - 所以这个两个元素$el（list-header,list）都是要去获取的

  - 取消默认行为 @mousedown.prevent 

  - 拖拽方法

    - 用到mousedown,mousemove,mouseup 和对应的方法
    - 位置：
      - 鼠标按下的位置 xy
      - 移动过程中元素的初始的距离页面的位置(getBoundingClientRect): xy  
    - mousedown
      - 获取 鼠标按下的位置 xy  移动过程中元素的初始的位置: xy  
      - 移动标志 true false

    - mousemove
      - 移动标志 true false判断
      - 计算插值：鼠标当前的位置 - 移动过程中元素的初始的位置: xy 
      - 判断x y 的距离大于10 px,即输出移动，否则就是默认行为。

