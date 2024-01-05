# Spring Validation注解实现校验

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

这个直接看jar文档即可，寻找对应的maven依赖就可以

![image-20240104180912673](http://cdn.flycode.icu/codeCenterImg/202401041809774.png)

![image-20231229175720316](http://cdn.flycode.icu/codeCenterImg/202312291757361.png)

|        注解        | 解释                                                         | null是否有效 |
| :----------------: | ------------------------------------------------------------ | ------------ |
|   `@AssertFalse`   | 注解元素必须是false                                          |              |
|   `@AssertTrue`    | 注解元素必须是true                                           |              |
|   `@DecimalMax`    | 注解元素必须是数字，并且值小于等于指定的值                   |              |
|   `@DecimalMin`    | 注解元素必须是数字，并且值大于等于指定的值                   |              |
|     `@Digits`      | 被注释的元素可以接收指定范围内的数字，`integer`表示整数，`fraction`表示小数 |              |
|      `@Email`      | 邮箱必须要符合对应的格式，`regexp`可以使用正则表达式         |              |
|     `@Future`      | 元素必须是未来的日期                                         |              |
| `@FutureOrPresent` | 元素必须是过去或者现在                                       |              |
|       `@Max`       | 元素必须是数字，并且小于等于指定的值                         |              |
|       `@Min`       | 元素必须是数字，并且大于等于指定的值                         |              |
|    `@Negative`     | 元素必须是负数                                               |              |
| `@NegativeOrZero`  | 元素必须是负数或者是0                                        |              |
|    `@NotBlank`     | 元素不能为空，至少包含一个非空白字符                         | 无效         |
|    `@NotEmpty`     | 元素不能为空，并且不能为null                                 | 无效         |
|     `@NotNull`     | 元素不能为null                                               | 无效         |
|      `@Null`       | 元素必须是null                                               |              |
|      `@Past`       | 元素必须是过去的日期                                         |              |
|  `@PastOrPresent`  | 元素必须是过去或者现在的日期                                 |              |
|     `@Pattern`     | 元素必须要符合指定的正则匹配                                 |              |
|    `@Positive`     | 元素必须是正数                                               |              |
| `@PositiveOrZero`  | 元素必须是正数或者是0                                        |              |
|      `@Size`       | 元素大小在一定的范围内                                       |              |

里面有几个比较常用，但是容易出错的注解

- @NotNull: 适用于任何类型，不能为null，但是可以是“”
- @NotBlank：只能用于String类型，不能为null，要有实际字符，长度必须大于0
- @NotEmpty：用于 String、Collection、Map、Array，不能为null，长度必须大于0。

### 2. 异常处理


