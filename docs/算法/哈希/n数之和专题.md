# n数之和专题
> 本文作者：程序员飞云
>
> 本站地址：[https://flycode.icu](https://flycode.icu)

[两数之和](https://leetcode.cn/problems/two-sum/)

[三数之和](https://leetcode.cn/problems/3sum/description/)

[四数之和](https://leetcode.cn/problems/4sum/)

[四数相加 II](https://leetcode.cn/problems/4sum-ii/)



## 两数之和

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`* 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

> **示例 1：**
>
> ```
> 输入：nums = [2,7,11,15], target = 9
> 输出：[0,1]
> 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
> ```
>
> **示例 2：**
>
> ```
> 输入：nums = [3,2,4], target = 6
> 输出：[1,2]
> ```
>
> **示例 3：**
>
> ```
> 输入：nums = [3,3], target = 6
> 输出：[0,1]
> ```

### 双循环

最简单的做法就是遍历两次数组，然后将两次遍历的对应元素相加，找到符合结果的两个下标。

```java
public int[] twoSum(int[] nums, int target) {
        int n = nums.length;
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                if(nums[i] + nums[j] == target){
                    return new int []{i,j};
                }
            }
        }
        return new int []{};
    }
```

时间复杂度：O(n*2)

### Hash

我们之前使用两次遍历的原因是我们需要记录数组里面的值，然后进行比较，所以需要一次循环，但是这个操作`Map`就能够帮我们实现，既然采用了`Hash`，那么我们需要思考什么是`key`，什么是`value`。就这道题目而言，我们需要的是对应的下标，所以`value`是下标，`key`是元素。可能会有疑问，是否元素会有重复，但是题目规定了不会有重复的情况，所以不需要考虑这个问题。

我们只需要在遍历的时候来判断是否包含对应的元素也就是`key`，如果包含了，就一位置找到了第一个元素，我们需要通过`map.get`来获取对应的下标，而第二个元素的下标就是当前的遍历的下标。

```java
public int[] twoSum(int[] nums, int target) {
       HashMap<Integer,Integer> map = new HashMap<>();
       for(int i=0;i<nums.length;i++){
           int num = target - nums[i];
           if(map.containsKey(num){
               return new int []{map.get(num),i};
           }
           map.put(nums[i],i);
       }
           return new int[]{};
    }
```

时间复杂度：O(n)

空间复杂度：O(n)
