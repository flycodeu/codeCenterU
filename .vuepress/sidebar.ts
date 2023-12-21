import {SidebarConfig4Multiple} from "vuepress/config";

import roadmapSideBar from "./sidebars/roadmapSideBar";
import codeLearnSideBar from "./sidebars/codeLearnSideBar";
// @ts-ignore
export default {
    "/学习路线/": roadmapSideBar,
    // 降级，默认根据文章标题渲染侧边栏
    "/编程学习/": codeLearnSideBar,
    "/": "auto",
} as SidebarConfig4Multiple;
