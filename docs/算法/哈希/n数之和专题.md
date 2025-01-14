# n数之和专题
> 本文作者：程序员飞云
>
> 本站地址：[https://www.flycode.icu](https://www.flycode.icu)

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



## 三数之和

给你一个整数数组 `nums` ，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k` ，同时还满足 `nums[i] + nums[j] + nums[k] == 0` 。请

你返回所有和为 `0` 且不重复的三元组。

**注意：**答案中不可以包含重复的三元组



> **示例 1：**
>
> ```
> 输入：nums = [-1,0,1,2,-1,-4]
> 输出：[[-1,-1,2],[-1,0,1]]
> 解释：
> nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
> nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
> nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
> 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
> 注意，输出的顺序和三元组的顺序并不重要。
> ```
>
> **示例 2：**
>
> ```
> 输入：nums = [0,1,1]
> 输出：[]
> 解释：唯一可能的三元组和不为 0 。
> ```
>
> **示例 3：**
>
> ```
> 输入：nums = [0,0,0]
> 输出：[[0,0,0]]
> 解释：唯一可能的三元组和为 0 
> ```



### 排序+双指针

推荐[Carl 三数之和视频讲解](https://www.bilibili.com/video/BV1GW4y127qo/?vd_source=55b76e8cedb662a6ef106a57375e7ac3)

这道题和两数之和优点类似，那么是否可以使用`Map`，我们仔细看一下题目，是三个元素`i`,`j`,`k`，我们需要先定位好`i`和`j`的位置，然后通过`map`找到`k`的位置，这就需要两次循环了。其次题目中还有一个限定的条件是不包含重复三元组，例如`[-1,-1,2]`和`[-1,2,-1]`这两个可以看作是同一个，当然这里也可以用`set`进行去重，但是这样做无疑是比较复杂的。

#### 元素移动

我们需要重新思考下这三个数有什么规律，`num[i]+num[j]+num[k] == 0`，最少是有一个元素小于0，最少是有一个元素大于0，如果能够确定这两个元素的位置，就相对简单。但是此时数组是无规律，所以我们先进行排序。

![image-20240131100550521](https://flycodeu-1314556962.cos.ap-nanjing.myqcloud.com//codeCenterImg/202401311005616.png)

首先我们需要先遍历这个数组，定位第一个元素位置，下标我们记为`i`，我们还需要使用两个指针来记录其余两个元素的位置`left`，`right`,最终就变成了`num[i]+num[left]+num[right]=0`，我们要如何定位`left`和`right`，因为下标是不可能重复的，所以`left`先定位到`i+1`位置，`right`先定位到最后一个元素的位置。

![image-20240131100911651](https://flycodeu-1314556962.cos.ap-nanjing.myqcloud.com//codeCenterImg/202401311009698.png)

接下来就是如何操控这两个指针移动。在一次遍历中，`left`会向右移动,`right`会向左移动，但是**一定不会出现`left==right`的情况**，如果一样的话，最终就是`[i,left,left]`，不符合题意。

移动的过程中会出现以下几种情况

- `nums[i]+nums[left]+nums[right]>0`，`nums[right]`太大了，需要左移
- `nums[i]+nums[left]+nums[right]<0`，`nums[left]`太小了，需要右移
- `nums[i]+nums[left]+nums[right]=0`，这就是我们预期的结果，添加返回



#### 临界值

例如`[1,1,1]`**第一个元素就已经大于0**，怎么可能会出现三数之和等于0的情况，直接排除。



#### 去重

如`[-1,-1,-1,2]`里面会有三种`[-1,-1,2]`的情况，我们只需要一个，如何排除?

![image-20240131102625660](https://flycodeu-1314556962.cos.ap-nanjing.myqcloud.com//codeCenterImg/202401311026710.png)

首先针对`i`，有两种判断情况`nums[i] == nums[i+1]`和`nums[i] == nums[i-1]`，如何选择?

![image-20240131102755918](https://flycodeu-1314556962.cos.ap-nanjing.myqcloud.com//codeCenterImg/202401311027965.png)

如上图所示，我们已经有了一个数据`[-1,-1,2]`，如果是`nums[i] == nums[i+1]`就意味着这个三元组里面的元素不能重复，里面不能包含例如`[-1,-1,xxx]`的情况，但是我们**需要的是不能有重复的三元组，而不是三元组里面重复的元素**，所以应该使用`i`和`i-1`。

如何确定`left`位置是否出现重复，我们可以使用`left`和`left+1`

`right`同理，是确定`right`和`right-1`是否重复



#### 详细代码

```java
public List<List<Integer>> threeSum(int[] nums) {
        // 排序
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for(int i=0;i<nums.length;i++){
            // 如果第一个元素大于0
            if(nums[i] > 0) return res;
            // i出现重复
            if(i> 0 && nums[i] == nums[i-1]){
                continue;
            }

            int left = i+1;
            int right = nums.length -1;
            while(left < right){
                int sum = nums[i] + nums[left] +nums[right] ;
                // nums[right]偏大
                if(sum >0) {
                    right--;}
                // nums[left]偏小
                else if(sum <0) {
                    left++;
                }else{
                    // 添加数据
                    res.add(Arrays.asList(nums[i],nums[left],nums[right]));
                    // left出现重复
                    while(left<right && nums[left] == nums[left+1]){
                        left++;
                    }
                    // right出现重复
                    while(right>left && nums[right] == nums[right-1]){
                        right--;
                    }
                    right--;
                    left++;
                }
            }
        }
        return res;
    }
```





## 四数之和

给你一个由 `n` 个整数组成的数组 `nums` ，和一个目标值 `target` 。请你找出并返回满足下述全部条件且**不重复**的四元组 `[nums[a], nums[b], nums[c], nums[d]]` （若两个四元组元素一一对应，则认为两个四元组重复）：

- `0 <= a, b, c, d < n`
- `a`、`b`、`c` 和 `d` **互不相同**
- `nums[a] + nums[b] + nums[c] + nums[d] == target`

你可以按 **任意顺序** 返回答案 。

> **示例 1：**
>
> ```
> 输入：nums = [1,0,-1,0,-2,2], target = 0
> 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
> ```
>
> **示例 2：**
>
> ```
> 输入：nums = [2,2,2,2,2], target = 8
> 输出：[[2,2,2,2]]
> ```



### 双指针+排序

[Carl 四数之和](https://www.bilibili.com/video/BV1DS4y147US/?vd_source=55b76e8cedb662a6ef106a57375e7ac3)

和上面的方法类似，只不过多了一个循环。

![image-20240131113640648](https://flycodeu-1314556962.cos.ap-nanjing.myqcloud.com//codeCenterImg/202401311136703.png)

```java
public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for(int i=0;i<nums.length;i++){
            // nums[i]去重
            if(i>0 && nums[i]==nums[i-1]){continue;}
            // 减枝
            if(nums[i]>0 && nums[i]>target){
                return res;
            }
            // 找到j的位置
            for(int j=i+1;j<nums.length;j++){
                // nums[j]去重
                if(j>i+1 && nums[j-1] == nums[j]){
                    continue;
                }
                // 确定left位置
                int left = j+1;
                // 确定right位置
                int right = nums.length-1;
                while(left<right){
                    int sum = nums[i]+nums[j]+nums[left]+nums[right];
                    if(sum>target){
                        right--;
                    }else if(sum<target){
                        left++;
                    }else{
                        res.add(Arrays.asList(nums[i],nums[j],nums[left],nums[right]));
                        while(left<right && nums[left] == nums[left+1]) left++;
                        while(left<right && nums[right] == nums[right-1]) right--;
                        left++;
                        right--;
                    }
                }
            }
     }
            return res;
}
```

里面需要注意第一步排除不可能的情况，如果**这个数组里面的每一个值都是比`target`大，那么就没必要进行下一步操作**，这一步一定要要处理，不然有一个案例一定会失败。

![image-20240131111434779](https://flycodeu-1314556962.cos.ap-nanjing.myqcloud.com//codeCenterImg/202401311114839.png)





## 四数之和Ⅱ

给你四个整数数组 `nums1`、`nums2`、`nums3` 和 `nums4` ，数组长度都是 `n` ，请你计算有多少个元组 `(i, j, k, l)` 能满足：

- `0 <= i, j, k, l < n`
- `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`

> ```
> 输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
> 输出：2
> 解释：
> 两个元组如下：
> 1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
> 2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
> ```

### Hash

这道题目就不需要和上面一样使用双指针和排序了，我们可以仔细思考下题目。

`num1[i]+nums2[j]+nums3[k]+nums4[l] = 0`稍微变换一下`num1[i]+nums2[j] = -(nums3[k]+nums4[l])`这样不就变成了`a+b=0`的形式，而`a+b=0`又正好对应了上面的两数之和。

```java
    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        int n = nums1.length;
        int count = 0;
        HashMap<Integer,Integer> map = new HashMap<>();
        // nums1和nums2
        for(int i = 0; i<n;i++){
            for(int j=0;j<n;j++){
                int sum = nums1[i]+nums2[j];
                map.put(sum,map.getOrDefault(sum,0)+1);
            }
        }

        // nums3[k]和nums4[l]
        for(int k=0;k<n;k++){
            for(int l=0;l<n;l++){
                int sum = nums3[k]+nums4[l];
                if(map.containsKey(-sum)){
                    count+=map.get(-sum);
                }
            }
        }
        return count;
    }
```







## 总结

三数之和和四数之和，只要元素都是在一个数组里面，那么就需要采用双指针和排序来进行处理，本质上就是将时间复杂度降低，例如`O(n^3)`降低为`O(n^2)`。

