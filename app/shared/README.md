### 功能特性模块

shared做为子应用的公共模块，子应用用到的公共组件，指令，类型，工具类实现放在此模块中。


#### 目录结构

```

├── shared                                           # 共享模块
│   ├── components                                   # 组件目录
│   │   ├── comp-1                                   # 组件1
│   │   ├── ...                                      # 组件...
│   │   ├── comp-n                                   # 组件n
│   ├── directives                                   # 指令目录
│   │   ├── directive-1                              # 指令1
│   │   ├── ...                                      # 指令...
│   │   ├── directive-n                              # 指令n
│   ├── types                                        # 类型目录
│   │   ├── type-1                                   # 类型1
│   │   ├── ...                                      # 类型...
│   │   ├── type-n                                   # 类型n
│   ├── utils                                        # 工具类目录
│   ├── index.ts                                     # 入口
│   ├── shared-co.module.ts                          # 依赖co-libs相关模块配置
│   ├── shared-zorro.module.ts                       # 依赖ng-zorro相关模块配置
│   └── shared.module.ts                             # 共享模块配置

```
