import {SidebarConfig4Multiple} from "vuepress/config";

import roadmapSideBar from "./sidebars/roadmapSideBar";
import codeLearnSideBar from "./sidebars/codeLearnSideBar";
import knowledgeShareSideBar from "./sidebars/knowledgeShareSideBar";
import javaDesignSideBar from "./sidebars/javaDesignSideBar";
import aiLearnSideBar from "./sidebars/aiLearnSideBar";
import frameworkSideBar from "./sidebars/frameworkSideBar";
import commonpluginSideBar from "./sidebars/commonpluginSideBar";
// @ts-ignore
export default {
    "/学习路线/": roadmapSideBar,
    // 降级，默认根据文章标题渲染侧边栏
    "/编程学习/": codeLearnSideBar,
    "/知识碎片/": knowledgeShareSideBar,
    "/设计模式": javaDesignSideBar,
    "/常用框架/": frameworkSideBar,
    "/常用插件/": commonpluginSideBar,
    "/AI使用/": aiLearnSideBar,
    "/": "auto",
} as SidebarConfig4Multiple;
