### 子应用模块

目录结构概略图：

```
 app
 ├── core                                               # 核心模块
 │   ├── i18n               
 │   │   └── i18n.service.ts                            # 多语言服务
 │   ├── startup                
 │   │   └── startup.service.ts                         # 初始化项目配置
 │   └── core.module.ts                                 # 核心模块文件
 ├── layout                                             # 布局模块
 │   ├── default                                        # 子应用默认布局
 │   └── layout.module.ts                               # 核心模块文件
 ├── routes                                             # 功能特性模块
 │   ├── feature1                                       # 功能1
 │   │   ├── feature1-detail                            # 功能1详情页
 │   │   │   ├── feature1-detail.component.html         # 功能1详情页.HTML
 │   │   │   ├── feature1-detail.component.less         # 功能1详情页.LESS
 │   │   │   ├── feature1-detail.component.ts           # 功能1详情页.TS   
 │   │   ├── feature1.component.html                    # 功能1.HTML
 │   │   ├── feature1.component.less                    # 功能1.LESS
 │   │   ├── feature1.component.ts                      # 功能1.TS
 │   ├── feature2                                       # 功能2
 │   ├── ...                                            # 功能...
 │   ├── featuren                                       # 功能n
 │   └── routes.module.ts                               # 功能特性模块文件
 ├── services                                           # 外部服务模块
 │   ├── feature-1                                      # 服务1
 │   ├── feature-2                                      # 服务2
 │   ├── ...                                            # 服务...
 │   ├── feature-n                                      # 服务n
 │   └── public_api.module.ts                           # 公共api
 ├── shared                                             # 共享模块
 │   ├── components                                     # 组件目录
 │   │   ├── comp-1                                     # 组件1
 │   │   ├── ...                                        # 组件...
 │   │   ├── comp-n                                     # 组件n
 │   ├── directives                                     # 指令目录
 │   │   ├── directive-1                                # 指令1
 │   │   ├── ...                                        # 指令...
 │   │   ├── directive-n                                # 指令n
 │   ├── types                                          # 类型目录
 │   │   ├── type-1                                     # 类型1
 │   │   ├── ...                                        # 类型...
 │   │   ├── type-n                                     # 类型n
 │   ├── utils                                          # 工具类目录
 │   ├── index.ts                                       # 入口
 │   ├── shared-co.module.ts                            # 依赖co-libs相关模块配置
 │   ├── shared-zorro.module.ts                         # 依赖ng-zorro相关模块配置
 │   └── shared.module.ts                               # 共享模块配置
 ├── app.component.ts                                   # 子应用根组件
 └── app.module.ts                                      # 子应用根模块
 └── global-config.module.ts                            # 全局配置项
 assets                                                 # 本地静态资源
 environments                                           # 环境变量配置
 styles                                                 # 样式目录
 style.less                                             # 样式引导入口
```