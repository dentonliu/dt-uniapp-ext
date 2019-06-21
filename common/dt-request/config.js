import apis from "./apis";

export default {
    // 接口主机地址
    baseUrl: 'http://apis.juhe.cn/',

    // 模式，默认NAME。NAME：接口名模式；URI：相对地址模式
    mode: 'NAME',

    // 接口配置
    apis,

    // 请求默认参数
    options: {
        header: {
            'Content-Type': 'application/json',
        },
    },

    // 拦截器
    interceptor: {
        // 请求拦截器，返回false可以阻止请求执行
        request: (options, api) => {
            if (api.auth === 'required') {
                return false;
            }

            options.from = 'uniapp';
            return true;
        },

        // 响应拦截器
        response: response => {
            switch (response.statusCode) {
                case 404:
                    console.error('请求的资源不存在');
                    break;
                case 500:
                    console.error('服务器内部错误');
                    break;
                default:
                    break;
            }
            return response;
        }
    }
};
