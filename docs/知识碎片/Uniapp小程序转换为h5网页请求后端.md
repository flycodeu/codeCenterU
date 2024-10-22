# Uniapp小程序转换为h5网页请求后端
> 本文作者：程序员飞云
>
> 本站地址：[https://www.flycode.icu](https://www.flycode.icu)


## 1. 找到对应的mainfest.json的源码视图

![image-20241022104129829](http://cdn.flycode.icu/codeCenterImg/image-20241022104129829.png)



## 2. 配置h5

```javascript
"h5" : {
        "title" : "sky-take-out-user-mp",
        "devServer" : {
            "disableHostCheck" : true,
            "proxy" : {
                "/api" : {
                    "target" : "http://localhost:9000",
                    "changeOrigin" : true,
                    "pathRewrite" : {
                        "^/api" : ""
                    }
                }
            },
            "https" : false
        },
        "router" : {
            "mode" : "history"
        }
    }
```

target代理到目标地址，pathRewrite会将/api去除



## 3. 修改baseurl

```javascript
export const baseUrl = '/api'
```



## 4. 最终请求地址

```javascript
http://localhost:8080/api/xxxx
```

