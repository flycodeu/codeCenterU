import {NavItem} from "vuepress/config";

export default [
    {
        text: "数据结构",
        link: '/数据结构/',
        items: [
            {
                text: "线性数据结构",
                link: '/线性数据结构/'
            },
            {
                text: '树数据结构',
                link: '/树数据结构/'
            }
        ]
    },
    {
        text: "编程学习",
        link: '/编程学习/',
        items: [
            {
                text: "Java学习",
                link: '/Java学习/'
            },
            // {
            //     text: "Linux学习",
            //     link: '/Linux学习/'
            // },
            // {
            //     text: "Git学习",
            //     link: '/Git学习/'
            // },
            //
            // {
            //     text: "Python学习",
            //     link: '/Python学习/'
            // },
            // {
            //     text: "数据库学习",
            //     link: '/数据库学习/'
            // },
            // {
            //     text: "前端学习",
            //     link: '/前端学习/'
            // }
        ]
    },
    // {
    //     text: "Spring",
    //     link: '/Spring/',
    // },
    // {
    //     text: "消息队列",
    //     link: '/消息队列/'
    // },
    // {
    //     text: "个人随笔",
    //     link: '/个人随笔/'
    // },
    // {
    //     text: "软件安装",
    //     link: '/软件安装/'
    // },

    {
        text: "知识碎片",
        link: '/知识碎片/'
    },
    {
        text: "设计模式",
        link: "/设计模式/"
    },
    {
        text: "算法",
        link: '/算法/',
        items: [
            {
                text: "链表",
                link: '/链表/'
            },
            {
                text: "数组",
                link: '/数组/'
            },
            {
                text: "栈",
                link: '/栈/'
            },
            {
                text: "哈希",
                link: '/哈希/'
            },
            {
                text: "队列",
                link: '/队列/'
            },
            {
                text: "树",
                link: '/树/'
            }
        ]
    },
    {
        text: "常用框架",
        link: '/常用框架/',
        items: [
            {
                text: 'Spring',
                link: '/Spring/'
            },
            {
                text: "SpringBoot",
                link: '/SpringBoot/'
            }
        ]
    },
    {
        text: "实用插件",
        link: '/实用插件/',
    },
    {
        text: "AI使用",
        link: '/AI使用/'
    },
    {
        text: "个人项目",
        link: '/个人项目/',
        items: [
            {
                text: "飞云API",
                link: '/飞云API/'
            }
        ]
    }

] as NavItem[];
