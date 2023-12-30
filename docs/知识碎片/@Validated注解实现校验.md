# @Validated注解实现校验

> 本文作者：程序员飞云
>
> 本站地址：[https://flycode.icu](https://flycode.icu)

## 背景
先让我们看以下代码，如果要进行处理，应该如何处理
```java
@Data
public class User {
    /**
     * 用户名，长度为4-10位
     */
    private String username;
    /**
     * 手机号，长度为11位，正则表达判断
     */
    private String phone;
}
```
如果是就上面几个字段，完全可以自己手动判断条件，通过if判断。
但是如果字段多了，那么这个if就得写很多判断，可读性差，而且不利于之后的维护，比如现在用户名长度需要修改，那么可能牵扯的地方就比较多，所以validation框架诞生了，
大大减少了相关的代码量，参数的校验不必写入到业务里面。

## 快速使用

### 1. 引入依赖
```xml
<!--校验-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
### 2. 实体类配置
```java
@Data
public class User {
    /**
     * 用户名，长度为4-10位
     */
    @NotBlank( message = "用户名不能为空" )
    @Length( min = 4, max = 10, message = "用户名长度为4-10位" )
    private String username;
    /**
     * 手机号，长度为11位，正则表达判断
     */
    @NotBlank( message = "手机号不能为空" )
    @Pattern( regexp = "^1[3456789]\\d{9}$", message = "手机号格式不正确" )
    private String phone;
}
```
以上代码就替代了之前众多繁琐的if else判断，而且整体上也便于浏览。
### 3. controller使用

只需要在对应的请求加上@Validated即可，但是对于直接传输基本类型，还需要在controller上面加上@Validated注解，也就是下面第三种情况

```java
@RequestMapping( "/user" )
@RestController
@Validated
public class UserController {

    @PostMapping( "/addUser1" )
    public void addUser1(@Validated @RequestBody User user) throws Exception {

    }

    @PostMapping( "/addUser2" )
    public void addUser2(@Validated User user) throws Exception {

    }
    
   @PostMapping( "/addUser3" )
    public void addUser3(
            @NotBlank( message = "名称不能为空" )
            @Length( min = 4, max = 10, message = "用户名长度为4-10位" ) String username,
            @NotBlank( message = "手机号不能为空" )
            @Pattern( regexp = "^1[3456789]\\d{9}$", message = "手机号格式不正确" ) String phone) {
        
    }
}
```
创建了三个个请求，一个是以Json形式发送对象，另一个是form-data发送对象，还有一个是直接传递数据

但是如果是

### 4. 测试发送Json的Post请求
输入正确情况

![](http://cdn.flycode.icu/codeCenterImg/202312291734858.png)

输入错误情况

![image-20231229173507587](http://cdn.flycode.icu/codeCenterImg/202312291735660.png)

报错信息

```log
2023-12-29 17:35:01.459  WARN 22168 --- [nio-8080-exec-8] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public void org.example.controller.UserController.addUser1(org.example.model.User) throws java.lang.Exception: [Field error in object 'user' on field 'username': rejected value [fly]; codes [Length.user.username,Length.username,Length.java.lang.String,Length]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [user.username,username]; arguments []; default message [username],10,4]; default message [用户名长度为4-10位]] ]
```

很明显这里长度不足，已经生效了

### 5.测试发送表单请求

请求成功

![image-20231229173846806](http://cdn.flycode.icu/codeCenterImg/202312291738881.png)

请求失败,手机号不正确

![image-20231229173914102](http://cdn.flycode.icu/codeCenterImg/202312291739182.png)

报错信息

```log
2023-12-29 17:38:58.284  WARN 22168 --- [nio-8080-exec-8] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.validation.BindException: org.springframework.validation.BeanPropertyBindingResult: 1 errors<EOL>Field error in object 'user' on field 'phone': rejected value [1322]; codes [Pattern.user.phone,Pattern.phone,Pattern.java.lang.String,Pattern]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [user.phone,phone]; arguments []; default message [phone],[Ljavax.validation.constraints.Pattern$Flag;@52a65b2a,^1[3456789]\d{9}$]; default message [手机号格式不正确]]
```

### 6. 基本类型数据发送

发送失败

![image-20231229174822640](http://cdn.flycode.icu/codeCenterImg/202312291748720.png)

但是这个报错就和之前的不一样,抛出的错误不一样

![image-20231229174919913](http://cdn.flycode.icu/codeCenterImg/202312291749980.png)

基本使用就按照上面进行就可以。



## 正式入门

### 1. 所有注解

这个直接看jar文档即可，下面我也会整理出来

![image-20231229175720316](http://cdn.flycode.icu/codeCenterImg/202312291757361.png)



