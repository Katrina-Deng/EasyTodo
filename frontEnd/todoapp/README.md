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

- created()

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

