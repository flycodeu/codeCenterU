import {SidebarConfig4Multiple} from "vuepress/config";

import codeLearnSideBar from "./sidebars/codeLearnSideBar";
import knowledgeShareSideBar from "./sidebars/knowledgeShareSideBar";
import javaDesignSideBar from "./sidebars/javaDesignSideBar";
import aiLearnSideBar from "./sidebars/aiLearnSideBar";
import frameworkSideBar from "./sidebars/frameworkSideBar";
import commonpluginSideBar from "./sidebars/commonpluginSideBar";
import dataStructuresBar from "./sidebars/dataStructuresBar";
import algorithmBar from "./sidebars/algorithmBar";
import projectBar from "./sidebars/projectBar";
// @ts-ignore
export default {
    // 降级，默认根据文章标题渲染侧边栏
    "/数据结构/": dataStructuresBar,
    "/算法/": algorithmBar,
    "/编程学习/": codeLearnSideBar,
    "/知识碎片/": knowledgeShareSideBar,
    "/设计模式/": javaDesignSideBar,
    "/常用框架/": frameworkSideBar,
    // "/Linux/": commonpluginSideBar,
    // "/AI使用/": aiLearnSideBar,
    "/个人项目/": projectBar,
    "/": "auto",
} as SidebarConfig4Multiple;
