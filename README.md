<<<<<<< HEAD
<<<<<<< HEAD
# 这是一个市值500兆亿的项目

## 嘘..用心去感受他的价值

### 代码只可意会不可言传

#### 告辞

##### 制作首页app组件
1.完成header组件 ,使用Mint-Ui中的header组件
2.制作底部tabbar区域,使用的是MUI中的tabbar区域
  + 运用到扩展图标的css样式,需要手动导入在index.js入口文件里
3.在中间放置了router-view来展示路由匹配到的组件

##设置路由高亮
## 改造tabbar中的a标签为router-link

##制作home页面
1.渲染轮播图
    ---获取数据,使用vue-resource.js
    ---调用 this.$http.get(url).then(成功的函数,失败的函数)
2.使用mui中的九宫格


##新闻资讯 页面 制作
  1. 绘制界面， 使用 MUI 中的 media-list.html
  2. 使用 vue-resource 获取数据
  3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面  NecwsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

## 实现 新闻详情 的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器
5. 当发表评论OK后，重新刷新列表，以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到
 + 换一种思路： 当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用 数组的 unshift 方法， 把最新的评论，追加到  data 中 comments 的开头；这样，就能 完美实现刷新评论列表的需求；

 ## 改造图片分析 按钮为 路由的链接并显示对应的组件页面

 ## 绘制 图片列表 组件页面结构并美化样式
  1. 制作 顶部的滑动条
  2. 制作 底部的图片列表
 ### 制作顶部滑动条的坑们：
  1. 需要借助于 MUI 中的 tab-top-webview-main.html
  2. 需要把 slider 区域的 mui-fullscreen 类去掉
  3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
   + 导入 mui.js
   + 调用官方提供的 方式 去初始化：