# dt-request - uniapp request组件封装

## 引入
将下载的组件目录放入common目录，或其他app目录。本组件依赖[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)组件，使用前请自行安装。

### 作为vue组件
```JavaScript
// 导入组件
import { HttpWidget } from './common/dt-request';
Vue.use(new HttpWidget());
// 使用组件
this.$http
    .post('/auth', { username: 'demo', password: 'demo' })
    .then((response) => {})
    .catch((response) => {});
```

### 作为独立组件
```JavaScript
// 导入组件
import { Http } from './common/dt-request';
const http = new Http();
// 使用组件
http.post('/auth', { username: 'demo', password: 'demo' })
    .then((response) => {})
    .catch((response) => {});
```

## 配置说明
所有配置写在config.js文件里
+ baseUrl 根路径
+ mode 组件模式，支持两种模式。NAME：接口名模式（默认）；URI：相对地址模式
+ apis 接口配置，NAME模式下必须提供
+ options 请求参数，用以覆盖默认参数
+ interceptor 拦截器
  - request: 请求拦截器，形如function(options, api) {}。其中options为请求对象，api为NAME模式下匹配到的接口地址对象。拦截器方法返回false会阻止请求的进行
  - response: 响应拦截器，形如function(response) {}

## 使用

### NAME模式
该模式下接口使用名称来指定，接口路径可以包含参数
```JavaScript
// HEAD, OPTIONS, DELETE调用方法相同
// 第一个参数是接口的名称
// 第二个参数是路径中的参数对象
// 
// 假设接口配置：
// { 'user.detail': { uri: 'users/:id' }}
this.$http.delete('user.detail', {id: 1});

// GET, POST, PATCH, PUT调用方法相同
// 第一个参数是接口的名称
// 第二个参数是请求数据
// 第三个参数是路径中的参数对象
// 
// 假设接口配置：
// {'user.detail': {uri: 'users/:id'}, 'user.list': {uri: 'users'}}

// 创建用户名和密码都是demo的用户
this.$http.post('user.list', {username: 'demo', password: 'demo'});

// 获取id为1的用户详情
this.$http.get('user.detail', null, {id: 1});

// 获取用户名为demo的所有用户
this.$http.get('user.list', {username: 'demo'});

// 更新id为1的用户的用户名
this.$http.patch('user.detail', {username: 'new_name'}, {id: 1});
```

### URI模式
该模式下接口使用相对路径指定
```JavaScript
// HEAD, OPTIONS, DELETE调用方法相同
// 第一个参数是接口的路径
// 第二个参数可选，可以用来覆盖请求参数
this.$http.delete('/users/1', {header: {Authorization: 'Bearer json.web.token'}});

// GET, POST, PATCH, PUT调用方法相同
// 第一个参数是接口的路径
// 第二个参数是请求数据
// 第三个参数可选，可以用来覆盖请求参数

// 创建用户名和密码都是demo的用户
this.$http.post('/users', {username: 'demo', password: 'demo'}, {header: {'Content-Type': 'application/json'}});

// 获取id为1的用户详情
this.$http.get('/users/1');

// 获取用户名为demo的所有用户
this.$http.get('/users', {username: 'demo'});

// 更新id为1的用户的用户名
this.$http.patch('/users/1', {username: 'new_name'});
```

### request方法
依然可以使用request方法直接传请求参数
```JavaScript
this.$http.request({
    name: 'user.detail',
    params: {id: 1},
});

// 或者
this.$http.request({
    url: '/users/1',
});

this.$http.request({
    url: 'http://api.cn/test', // url为完整地址时，baseUrl则不会附加到地址上
});
```

### 中断请求
使用对象提供的abort()方法可以中断请求
```JavaScript
// 发起请求
this.$http.request({
    name: 'user.detail',
    params: {id: 1},
});

// 终端请求
this.$http.abort();
```