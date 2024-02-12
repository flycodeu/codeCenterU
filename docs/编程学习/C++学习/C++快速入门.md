# C++ 学习 -1
> 本文作者：程序员飞云
>
> 本站地址：[https://www.flycode.icu](https://flycode.icu)



## 简单上手

编译输入HelloWorld

```c++
#include<iostream>
using namespace std;

int main() {
	cout << "hello world" << endl;
}
```

`std`:命名空间，为了和其他的类里面的`cout`和`endl`输入输出区分开

`cout`: 输入流

`endl`: 输出流

`return 0`可以省略不写



![image-20240209174001674](http://cdn.flycode.icu/codeCenterImg/image-20240209174001674.png)

但是可以看出目前输出了很多无用的东西，我们可以调整输出格式，工具->调式->调式停止时自动关闭控制台

![image-20240209174151019](http://cdn.flycode.icu/codeCenterImg/image-20240209174151019.png)

但是这样运行后一闪而过，我们看不到对应的输出

1. 使用系统底层命令,`system("pause")`，不推荐

![image-20240209174508774](http://cdn.flycode.icu/codeCenterImg/image-20240209174508774.png)

2. 使用`cin.get()`等待键盘输入

![image-20240209174621912](http://cdn.flycode.icu/codeCenterImg/image-20240209174621912.png)



##  C++编译运行

![image-20240209174711265](http://cdn.flycode.icu/codeCenterImg/image-20240209174711265.png)



1. 编译.cpp文件

![image-20240209175018364](http://cdn.flycode.icu/codeCenterImg/image-20240209175018364.png)

2. 点击项目生成exe文件

![image-20240209175105117](http://cdn.flycode.icu/codeCenterImg/image-20240209175105117.png)

3. 文件地址，在对应的文件夹里面可以看见exe运行程序

![image-20240209175220969](http://cdn.flycode.icu/codeCenterImg/image-20240209175220969.png)



## 函数

编写一个简单的用户交互程序

```c++
/*
*	主函数运行
*/
int main() {
	cout << "hello world" << endl;

	// 提示用户输入信息
	cout << "输入姓名：" << endl;
	// 用户姓名
	string name;
	// 输入姓名
	cin >> name;
	// 输出信息
	cout << "姓名：" << name  << endl;
	// 等待键盘输入
	cin.get();
	cin.get();
}
```

但是此时我们会发现，代码比较混乱，所以我们需要抽离出一个方法，但是这个方法一定要在main方法的上面，因为C++是逐行执行的，如皋放在下面，就会读取不到这个函数.

```C++
// 定义函数
void welcome() {

	// 提示用户输入信息
	cout << "输入姓名：" << endl;
	// 用户姓名
	string name;
	// 输入姓名
	cin >> name;
	// 输出信息
	cout << "姓名：" << name << endl;
}
```

我们定义了一个函数，可以直接调用

```c++
/*
*	主函数运行
*/
int main() {
	cout << "hello world" << endl;
	// 调用函数
	welcome();
	// 等待键盘输入
	cin.get();
	cin.get();
}
```

## 导入函数

我们可以在其他的文件里面定义好这个`welcome`,然后引入当前文件。

![image-20240209180436236](http://cdn.flycode.icu/codeCenterImg/image-20240209180436236.png)



```C++
#include<iostream>
using namespace std;

// 调用其他文件函数
void welcome();

/*
*	主函数运行
*/
int main() {
	cout << "hello world" << endl;
	// 调用函数
	welcome();
	// 等待键盘输入
	cin.get();
	cin.get();
}

```





## 变量

### 定义变量

局部变量必须要赋值

需要区分局部变量和全局变量

```c++
#include<iostream>
using namespace std;

int number;

int main() {
	int number = 1;
	cout << "局部变量number" << number << endl;
	cout << "全局变量number" << ::number << endl;
	cin.get();
}
```

通过`::`就是获取全局变量

![image-20240209202006113](http://cdn.flycode.icu/codeCenterImg/image-20240209202006113.png)





## 常量

### 1. 使用标识符,预处理（不推荐）

```C++
#define PI = 3.14;
```

### 2. 使用const限定符

```C++
const float pi = 3.14;
```





## 基本数据类型

### 整型

char、short、int，long，long long（11里面新增）、bool



| 类型      | 字节 | 范围             |
| --------- | ---- | ---------------- |
| char      | 1    |                  |
| short     | 2    | -32768-----32767 |
| int       | 4    | -2^31-----2^31-1 |
| long      | 4或8 |                  |
| long long | 8    |                  |

```C++
int main() {
	short a = 20;
	cout << "short size=" << sizeof a << endl;

	int a2 = 20;
	cout << "int size=" << sizeof a2 << endl;

	long a3 = 20;
	cout << "long size=" << sizeof a3 << endl;

	long long a4 = 20;
	cout << "long long  size=" << sizeoasf a4 << endl;

}

}
```

![image-20240210162400367](http://cdn.flycode.icu/codeCenterImg/image-20240210162400367.png)





### 无符号整型

只会表示0和正数，使用`unsigned`

```C++
int main() {
	short a = 40000;
	cout << "short=" <<  a << endl;

	unsigned short a2 = 4000;
	cout << "unsigned short" <<  a2 << endl;
}
```

![image-20240210163246414](http://cdn.flycode.icu/codeCenterImg/image-20240210163246414.png)

如果超出了固定的最大范围，值就会从最小值开始，但是使用`unsigned`表示后，范围就扩大了，第一位就不是表示正负了，而是表示值



**一般推荐int，超出了int使用long long，确定值不能小于0使用`unsigned`**



### 字符类型

`char`

一般会将数字转换成对应的ASCII

```C++
	char s1 = 65;
	cout << "s1 = " << s1 << endl;
```

输出`s1 = A`



### bool类型

1表示真，0表示假

```C++
bool b1 = true;
cout << "b1=" << b1 << endl;
```



### 浮点类型

单精度float: 4字节

双精度double： 8字节，可以使用科学计数法

```C++
float f = 2.1;
double pi = 3.14e-23;
```



### 字面值常量

1. 整型

2. 浮点型

![image-20240210170711916](http://cdn.flycode.icu/codeCenterImg/image-20240210170711916.png)

```C++
// 整型
30;
036L;
0x1ELL;

// 浮点类型
3.14f;
1.25L;
```

3. 字符类型

```C++
'A'
'11'
"AS"
```

4. 转义类型

![image-20240210171001805](http://cdn.flycode.icu/codeCenterImg/image-20240210171001805.png)

4. 布尔类型



## 类型转换

![image-20240210171438303](http://cdn.flycode.icu/codeCenterImg/image-20240210171438303.png)

![image-20240210174640385](http://cdn.flycode.icu/codeCenterImg/image-20240210174640385.png)



## 案例

### 1. 输出九九乘法表

```c++
bool isPrime(unsigned int num) {
	bool res = true;

	if (num <=2) {
		res = true;
	}

	for (int i = 2; i < num; i++) {
		if (num % i == 0) {
			res = false;
		}
	}

	return res;
}

int main() {
	int num;
	cout << "输入数字" << endl;
	cin >> num;
	cout << num << (isPrime(num) ? "是质数" : "不是质数") << endl;
	return 0;

}
```

### 2. 猜数字

随机生成0-100的数字，用户输入数字来猜是否正确，一共5次机会。

```c++
int main() {
	cout << "0-100整数数，有5次机会" << endl;
	// 当前时间的随机种子,伪随机
	srand(time(0));
	// 生成0-100整数
	int target = rand() % 100;
	// 循环次数
	int n = 0;
	while (n < 5) {
		int num;
		cout << "请输入数字：" << endl;

		cin >> num;
		if (num > target) {
			cout << "猜大了" << endl;
		}
		else if (num < target) {
			cout << "猜小了" << endl;
		}
		else {
			cout << "猜对了，幸运数字是："<<num<< endl;
			break;
		}

		n++;
	}
	if (n == 5) {
		cout << "没有猜中" << endl;
	}
	cin.get();
	cin.get();
}
```
