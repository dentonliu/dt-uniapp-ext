/**
 * http request widget
 *
 * request options:
 * {
 *   name: api id,
 *   url: request url,
 *   data: request data,
 *   method: request method,
 *   header: request header,
 *   params: params set for uri,
 *   dataType: request data type,
 *   responseType: response type,
 * }
 */
import config from "./config";

// 请求任务
let task = null;

function Http() {
    const { baseUrl, apis, interceptor, options } = config;

    this.baseUrl = baseUrl;
    this.apis = apis || [];
    this.interceptor = interceptor || { request: null, response: null };
    this.options = Object.assign(
        {},
        {
            data: {},
            header: {},
            method: "GET",
            dataType: "json",
            responseType: "text",
            success() {},
            fail() {},
            complete() {}
        },
        options
    );
}

// 中断请求
Http.prototype.abort = function() {
    if (task) {
        task.abort();
    }
}

Http.prototype.request = function(options) {
    let api = null;

    if (!isFullUrl(options.url)) {
        options.url = this.baseUrl + options.url;
    }

    const self = this;
    return new Promise((resolve, reject) => {
        options.complete = (response) => {
            const statusCode = response.statusCode;

            let newResponse = response;
            if (typeof self.interceptor.response === "function") {
                newResponse = self.interceptor.response(newResponse);
            }

            if (statusCode == 200) {
                resolve(newResponse);
            } else {
                reject(newResponse);
            }
        };

        let newOptions = Object.assign({}, self.options, options);

        if (typeof self.interceptor.request === "function") {
            newOptions = self.interceptor.request(newOptions);
        }

        task = uni.request(newOptions);
    });
};

['head', 'options', 'delete'].forEach((method) => {
    Http.prototype[method] = function(uri, params) {
        let options = {};

        if (typeof uri === "object") {
            options = uri;
            return this.request(
                Object.assign(options, {
                    method: method.toUpperCase(),
                })
            );
        }
    
        options.method = method.toUpperCase();
        options.url = uri;

        if (typeof params === 'object') {
            options = Object.assign({}, options, params);
        }

        return this.request(options);
    };
});

['get', 'post', 'put', 'patch'].forEach((method) => {
    Http.prototype[method] = function(uri, data, params) {
        let options = {};

        if (typeof uri === "object") {
            options = uri;
            return this.request(
                Object.assign(options, {
                    method: method.toUpperCase(),
                })
            );
        }

        options.method = method.toUpperCase();
        options.url = uri;
        options.data = data;

        if (typeof params === 'object') {
            options = Object.assign({}, options, params);
        }

        return this.request(options);
    };
});

/**
 * http widget class
 */
export class HttpWidget {
    install(Vue) {
        Vue.prototype.$http = new Http();
    }
}

export {
    Http,
};

function isFullUrl(url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
}