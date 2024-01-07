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

这里就以上面三个方法的异常信息为例。

上面这些信息报错后，肯定是要使用统一的异常处理来拦截异常，然后变成我们所需要返回的报错提示。这边可以采用SpringBoot里面的`@RestControllerAdvice`+`@ExceptionHandler`组合来实现

```java
@RestControllerAdvice
public class GlobalControllerExceptionHandler {

    /**
     * 拦截@RequstBody注解的参数校验异常
     *
     * @param e
     * @return
     */
    @ExceptionHandler( MethodArgumentNotValidException.class )
    public String handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        // 处理验证错误
        return bindingResult.getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(","));
    }


    /**
     * 拦截不加@RequstBody注解的参数校验异常
     *
     * @param e
     * @return
     */
    @ExceptionHandler( BindException.class )
    public String handleBindException(BindException e) {
        BindingResult bindingResult = e.getBindingResult();
        // 处理验证错误
        return bindingResult.getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(","));
    }


    /**
     * 拦截@RequstParam注解的参数校验异常
     *
     * @param e
     * @return
     */
    @ExceptionHandler( {ConstraintViolationException.class} )
    public String handleMethodArgumentNotValidException(ConstraintViolationException e) {
        // 处理验证错误
        return e.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining(","));
    }

}
```



#### 1. 使用@RequsteBody参数异常

![image-20240107171758680](http://cdn.flycode.icu/codeCenterImg/202401071718793.png)



#### 2. 使用表单方式提交异常

![image-20240107171855194](http://cdn.flycode.icu/codeCenterImg/202401071718264.png)

#### 3. 使用@RequsetParam参数异常

![image-20240107172356917](http://cdn.flycode.icu/codeCenterImg/202401071723994.png)





### 3. 自定义校验规则

虽然说里面的大部分注解能够解决我们的问题，但是我们有的时候依然是想自己定义校验规则，我们可以仿照源码的设计方案来处理这个问题。

首先我们先看一下如何自定义注解，仿照源码来进行设计。

![image-20240107172820802](http://cdn.flycode.icu/codeCenterImg/202401071728887.png)

里面几个比较重要的设计如下

1. `Target`: 定义这个注解的使用位置

   ​	取值如下

   - TYPE：类，接口或者枚举
   - FIELD：域，包含枚举常量
   - METHOD：方法
   - PARAMETER：参数
   - CONSTRUCTOR：构造方法
   - LOCAL_VARIABLE：局部变量
   - ANNOTATION_TYPE：注解类型
   - PACKAGE：包
   - TYPE_PARAMETER： 用来标注类型参数  (1.8)
   - TYPE_USE：能标注任何类型名称 (1.8)

2. `Retention`: 注解的生存周期

   取值如下：

   - SOURCE：注解只保留在源文件，当Java文件编译成class文件的时候，注解被遗弃；被编译器忽略(.java文件)
   - CLASS：注解被保留到class文件，但jvm加载class文件时候被遗弃，这是默认的生命周期(.class)
   - RUNTIME：注解不仅被保存到class文件中，jvm加载class文件之后，仍然存在(内存中的字节码)

3. `Documented`: 指明修饰的注解，可以被例如javadoc此类的工具文档化，只负责标记，没有成员取值。
4. `Repeatable(List.class)`: 指示注解可以在相同的位置重复多次，通常具有不同的配置。List 包含注解类型。

4. `Constraint`: 可以指定校验器
5. `message`: 错误信息
6. `groups`: 允许指定此约束所属的验证分组
7. `payload`:  能被 Bean Validation API 客户端使用，以自定义一个注解的 payload 对象。





#### 编写Phone的自定义注解

```java
/**
 * 自定义手机注解
 */
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = { PhoneValidator.class })
public @interface Phone {
    String message() default "手机号码格式异常";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
```

除了注解是肯定不够的，还需要一个注解约束验证器来验证注解元素 PhoneValidator

#### 注解约束校验器

需要实现ConstraintValidator接口，重写里面的isValid方法

```java
/**
 * 手机验证注解
 */
public class PhoneValidator implements ConstraintValidator<Phone, String> {

    private static final String REGEX = "^1[3456789]\\d{9}$";

    /**
     * @param value
     * @param context
     * @return：返回 true 表示效验通过
     */
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // 不为null才进行校验
        if (value != null) {
            return value.matches(REGEX);
        }
        return true;
    }
}
```

里面有两个泛型

- 第一个：要验证的注解类型
- 第二个：要验证的数据类型

`isValid`: 注意：Bean Validation 规范建议将 null 值视为有效值。如果一个元素 null 不是一个有效值，则应该显示的用 @NotNull 标注。



### 4. Java Bean约束







### 5. 分组校验





### 6. 嵌套校验





### 7. 集合校验

