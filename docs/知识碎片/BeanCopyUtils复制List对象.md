设计工具类可以帮我们快速实现list对象复制
```java
package com.hmifo.common.utils;

import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BeanCopyUtils {

    private BeanCopyUtils() {
    }

    public static <V> V copyBean(Object source, Class<V> clazz) {
        //创建目标对象
        V result = null;
        try {
            result = clazz.newInstance();
            //实现属性copy
            BeanUtils.copyProperties(source, result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //返回结果
        return result;
    }

    public static <O, V> List<V> copyBeanList(List<O> list, Class<V> clazz) {
        return list.stream()
        .map(o -> copyBean(o, clazz))
        .collect(Collectors.toList());
    }
}
```