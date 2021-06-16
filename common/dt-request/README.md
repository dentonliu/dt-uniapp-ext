# dt-request - uniapp request组件封装

## 引入
将下载的组件目录放入common目录，或其他app目录。

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
+ options 请求参数，用以覆盖默认参数
+ interceptor 拦截器
  - request: 请求拦截器，形如function(options) {}，其中options为请求对象
  - response: 响应拦截器，形如function(response) {}，其中response为响应对象

## 使用
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