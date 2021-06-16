/**
 * 示例配置文件，可根据实际项目修改
 */
export default {
    // 接口主机地址
    baseUrl: 'http://apis.juhe.cn',

    // 请求默认参数
    options: {
        header: {
            'Content-Type': 'application/json',
        },
    },

    // 拦截器
    interceptor: {
        // 请求拦截器，检测本地是否有token
        request: (options) => {
            try {
                const token = uni.getStorageSync('token');
                if (token) {
                    options.header['Authorization'] = `Bearer ${token}`;
                }
            } catch(e) {
                console.log(e);
            }

            options.from = 'uniapp';
            return options;
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
