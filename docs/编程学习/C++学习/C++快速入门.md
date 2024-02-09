# C++ 学习 -1
> 本文作者：程序员飞云
>
> 本站地址：[https://flycode.icu](https://flycode.icu)



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





## 定义变量和数据

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
