# 日记应用项目结构

## 项目概述

项目采用前后端分离架构，使用React Native开发跨平台移动应用，Node.js + Express开发后端服务。

## 目录结构

```
diary/
├── mobile/                 # 移动应用（React Native）
│   ├── src/
│   │   ├── assets/        # 静态资源文件
│   │   │   ├── images/    # 图片资源
│   │   │   ├── fonts/     # 字体文件
│   │   │   └── styles/    # 全局样式
│   │   ├── components/    # 可复用组件
│   │   │   ├── common/    # 通用组件
│   │   │   ├── editor/    # 编辑器相关组件
│   │   │   └── diary/     # 日记相关组件
│   │   ├── screens/       # 页面组件
│   │   │   ├── auth/      # 认证相关页面
│   │   │   ├── diary/     # 日记相关页面
│   │   │   ├── profile/   # 个人中心页面
│   │   │   └── settings/  # 设置页面
│   │   ├── navigation/    # 导航配置
│   │   ├── store/         # 状态管理
│   │   │   ├── actions/   # Redux actions
│   │   │   ├── reducers/  # Redux reducers
│   │   │   └── types/     # 类型定义
│   │   ├── services/      # API服务
│   │   ├── utils/         # 工具函数
│   │   ├── hooks/         # 自定义Hooks
│   │   ├── constants/     # 常量定义
│   │   └── config/        # 配置文件
│   ├── tests/             # 测试文件
│   ├── android/           # Android原生代码
│   ├── ios/               # iOS原生代码
│   └── docs/              # 移动端文档
│
├── server/                 # 后端服务
│   ├── src/
│   │   ├── api/          # API路由
│   │   ├── controllers/   # 控制器
│   │   ├── models/        # 数据模型
│   │   ├── services/      # 业务逻辑
│   │   ├── middleware/    # 中间件
│   │   ├── utils/         # 工具函数
│   │   ├── config/        # 配置文件
│   │   └── types/         # 类型定义
│   ├── tests/             # 测试文件
│   └── docs/              # 后端文档
│
├── common/                 # 前后端共享代码
│   ├── types/             # 共享类型定义
│   ├── constants/         # 共享常量
│   └── utils/             # 共享工具函数
│
├── scripts/                # 构建和部署脚本
├── docs/                   # 项目文档
│   ├── api/               # API文档
│   ├── architecture/      # 架构文档
│   └── guides/            # 开发指南
│
└── config/                 # 项目配置文件
    ├── development/       # 开发环境配置
    ├── production/        # 生产环境配置
    └── test/              # 测试环境配置
```

## 关键目录说明

### mobile/src/
- `components/`: 可复用的UI组件
- `screens/`: 应用的各个页面
- `navigation/`: 路由导航配置
- `store/`: Redux状态管理
- `services/`: API调用和数据处理
- `utils/`: 工具函数和辅助方法

### server/src/
- `api/`: REST API路由定义
- `controllers/`: 请求处理逻辑
- `models/`: 数据库模型
- `services/`: 业务逻辑层
- `middleware/`: Express中间件

### common/
存放前后端共享的代码，包括类型定义、常量和通用工具函数

### config/
不同环境的配置文件，包括API端点、数据库连接等

## 开发规范

1. 文件命名
   - 组件文件：使用PascalCase
   - 其他文件：使用camelCase
   - 样式文件：与组件同名，添加.styles后缀

2. 目录组织
   - 按功能模块划分目录
   - 相关文件放在同一目录下
   - 共用组件放在common目录

3. 导入规则
   - 绝对路径导入（基于tsconfig配置）
   - 分组导入（第三方库、组件、样式等）

4. 测试文件
   - 与源文件同名，添加.test或.spec后缀
   - 放在相应的tests目录下