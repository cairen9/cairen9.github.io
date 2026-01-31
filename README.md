# 我的个人网站

一个现代化、响应式、可定制的网页界面，使用云函数安全地连接 Supabase 数据库。

## ✨ 功能特性

### 核心功能
- ✅ **响应式布局** - 完美适配 PC、平板、手机
- ✅ **简洁导航** - 固定顶部导航 + 移动端汉堡菜单
- ✅ **主题切换** - 支持深色/浅色模式切换
- ✅ **联系表单** - 通过云函数安全提交数据
- ✅ **平滑滚动** - 优雅的页面导航体验
- ✅ **动画效果** - 元素淡入动画和过渡效果
- 🔒 **安全架构** - 密钥存储在服务端，前端无敏感信息

### 技术特点
- 🎨 CSS 变量支持主题颜色定制
- 📱 移动优先的响应式设计
- ⚡ 性能优化（节流、防抖）
- 🔒 云函数后端代理（安全）
- 🗄️ Supabase 数据库集成
- ✨ 现代化 UI 设计

## 📁 项目结构

```
my_web/
├── index.html                # 主页面
├── styles.css                # 样式表
├── script.js                 # JavaScript 逻辑
├── functions/                # 云函数目录
│   ├── contact-form.js       # 联系表单处理函数
│   └── _middleware.js      # 中间件（CORS 配置）
├── _redirects              # URL 重定向配置
├── .env                    # 环境变量
└── README.md               # 项目说明
```

## 🔒 安全架构

### 前端安全
- ❌ **不存储 Supabase 密钥**
- ✅ 通过云函数 API 提交数据
- ✅ 所有敏感操作在服务端执行

### 后端安全
- 🔒 密钥存储在云函数环境变量中
- ✅ API 请求验证和清理
- ✅ CORS 配置防止跨域攻击
- ✅ 错误处理和日志记录

### 数据库安全
- 🔐 RLS 行级安全策略已启用
- ✅ 匿名用户只能插入数据
- ✅ 认证用户才能读取数据
- ❌ 任何人无法批量删除

## 🚀 快速开始

### 1. 本地预览

直接在浏览器中打开 `index.html` 即可查看效果。

### 2. 配置环境变量

在部署平台（EdgeOne Pages）设置以下环境变量：

- `SUPABASE_URL`: https://oylnjffrjdjaooeaqtvl.supabase.co
- `SUPABASE_ANON_KEY`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

### 3. 部署到 EdgeOne Pages

1. 打开 EdgeOne Pages 控制台
2. 上传整个项目文件夹
3. 配置环境变量
4. 部署完成

## 🎨 自定义主题

在 `styles.css` 文件的 `:root` 变量中修改颜色：

```css
:root {
    --primary-color: #4a90e2;      /* 主色调 */
    --secondary-color: #50c878;    /* 辅助色 */
    --text-primary: #333333;       /* 主文本色 */
    --bg-primary: #ffffff;          /* 主背景色 */
}
```

## 📱 响应式断点

- **桌面**: > 1024px
- **平板**: 769px - 1024px
- **手机**: ≤ 768px
- **小屏手机**: ≤ 480px

## 📝 表单验证规则

### 前端验证
- **姓名**: 2-50 个字符（必填）
- **邮箱**: 有效的邮箱格式（必填）
- **电话**: 可选，数字、空格、-、+、()
- **主题**: 2-100 个字符（必填）
- **消息**: 10-500 个字符（必填）

### 后端验证
- 云函数会再次验证所有字段
- 防止绕过前端验证的恶意提交
- 数据清理和格式化

## 🔧 技术栈

### 前端
- **HTML5** - 语义化标签
- **CSS3** - Flexbox、Grid、CSS 变量
- **Vanilla JavaScript** - 原生 JS（无框架依赖）

### 后端
- **EdgeOne Pages 云函数** - Serverless 函数
- **Supabase** - PostgreSQL 数据库

## 📄 浏览器兼容性

- ✅ Chrome (最新版)
- ✅ Firefox (最新版)
- ✅ Safari (最新版)
- ✅ Edge (最新版)

## 🎯 使用说明

### 填写联系表单

1. 滚动到页面底部的"联系我们"区域
2. 填写表单信息（带 * 的为必填项）
3. 点击"发送消息"按钮
4. 数据通过云函数安全提交到 Supabase
5. 提交成功后会显示确认消息

### 主题切换

点击右上角的 🌙/☀️ 图标可以切换深色/浅色主题，设置会自动保存。

## 🌐 部署

### EdgeOne Pages

1. 访问 EdgeOne Pages 控制台
2. 上传项目文件夹
3. 配置环境变量
4. 部署

### 其他平台

- **Netlify**: 直接拖放文件夹
- **Vercel**: 通过 Git 或 CLI 部署
- **GitHub Pages**: 推送到仓库并启用 Pages

## 📊 数据管理

### 查询最近的消息

```sql
SELECT * FROM contact_messages 
ORDER BY created_at DESC 
LIMIT 10;
```

### 按邮箱查询

```sql
SELECT * FROM contact_messages 
WHERE email = 'user@example.com';
```

### 统计消息数量

```sql
SELECT COUNT(*) as total_messages FROM contact_messages;
```

## 🔒 安全最佳实践

### 当前实现

1. ✅ 密钥不暴露在前端
2. ✅ 云函数作为后端代理
3. ✅ RLS 策略保护数据库
4. ✅ CORS 配置
5. ✅ 输入验证和清理

### 进一步增强

- 添加速率限制（防刷）
- 实现验证码
- 添加用户认证
- 启用 IP 白名单

## 📞 联系方式

如果需要修改联系信息，请编辑 `index.html` 中的联系信息部分。

## 📝 许可证

保留所有权利 © 2026

---

**注意**: 
- 确保在部署前配置云函数环境变量
- Supabase 密钥仅存储在服务端，前端不包含敏感信息
- 定期更新依赖和安全配置
