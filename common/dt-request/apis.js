/**
 * 接口配置文件
 * 
 * 键为接口名
 * 值为接口配置，可以自定义属性
 */
export default {
    simpleWeather: {
        uri: 'simpleWeather/query',
    },

    // 可以设置接口是否需要授权访问
    // login: {
    //     uri: "login",
    //     auth: false
    // },

    // 支持参数
    // 'resource.detail': {
    //     uri: 'resources/:id',
    //     auth: 'required',
    // }
};
