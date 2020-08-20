### 功能特性模块

routes做为子应用的功能特性模块，子应用的所有功能实现在此模块中。


#### 目录结构

目录结构概略图：

```

├── routes                                           # 功能特性模块
│   ├── feature1                                     # 功能1
│   │   ├── feature1-detail                          # 功能1详情页
│   │   │   ├── feature1-detail.component.html       # 功能1详情页.HTML
│   │   │   ├── feature1-detail.component.less       # 功能1详情页.LESS
│   │   │   ├── feature1-detail.component.ts         # 功能1详情页.TS   
│   │   ├── feature1.component.html                  # 功能1.HTML
│   │   ├── feature1.component.less                  # 功能1.LESS
│   │   ├── feature1.component.ts                    # 功能1.TS
│   ├── feature2                                     # 功能2
│   ├── ...                                          # 功能...
│   ├── featuren                                     # 功能n
│   └── routes.module.ts                             # 功能特性模块文件

```