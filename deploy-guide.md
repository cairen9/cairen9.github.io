# 网站部署指南

## 方法一：Netlify（推荐，免费）

### 步骤：

1. **访问 Netlify**
   - 打开浏览器访问：https://app.netlify.com/drop
   - 注册或登录账户（免费）

2. **上传网站**
   - 将整个 `my_web` 文件夹拖拽到页面中间的虚线框内
   - 等待上传和部署完成（约 30 秒）

3. **获取网址**
   - 部署完成后会自动生成一个网址，例如：
     `https://my-website-12345.netlify.app`
   - 你可以在浏览器中访问这个网址

4. **分享给朋友**
   - 直接复制网址发给朋友
   - 他们可以在任何设备上访问

### 自定义域名（可选）
- 在 Netlify Dashboard 中点击 "Domain settings"
- 可以绑定你自己的域名

---

## 方法二：Vercel（免费，快速）

### 步骤：

1. **访问 Vercel**
   - 打开浏览器访问：https://vercel.com/new
   - 注册或登录账户（使用 GitHub、GitLab 或邮箱）

2. **上传项目**
   - 如果使用 Git：连接代码仓库
   - 如果不使用 Git：拖拽文件夹上传

3. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成

4. **获取网址**
   - 部署完成后会获得类似：
     `https://my-website.vercel.app`

---

## 方法三：GitHub Pages（完全免费）

### 步骤：

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 创建一个新仓库，例如 `my-web`

2. **上传文件**
   - 上传 `index.html`, `styles.css`, `script.js`
   - 提交更改

3. **启用 GitHub Pages**
   - 进入仓库的 "Settings" → "Pages"
   - 在 "Source" 下选择 "main" 分支
   - 点击 "Save"

4. **访问网站**
   - 等待约 1-2 分钟
   - 网址为：`https://你的用户名.github.io/my-web`

---

## 方法四：使用临时分享（快速测试）

### 如果只是临时让朋友查看：

1. **使用 ngrok（需要安装）**
   ```bash
   # 下载 ngrok: https://ngrok.com/download
   # 解压后运行
   ngrok http 8000
   ```
   - 会生成一个临时网址
   - 有效期约 2 小时

2. **使用 Surge（需要安装）**
   ```bash
   # 安装 surge
   npm install -g surge

   # 部署
   cd c:/Users/lk/Desktop/my_web
   surge
   ```

---

## 推荐方案对比

| 平台 | 价格 | 速度 | 自定义域名 | 难度 | 推荐度 |
|------|------|------|-----------|------|--------|
| Netlify Drop | 免费 | 快 | 支持 | ⭐ | ⭐⭐⭐⭐⭐ |
| Vercel | 免费 | 快 | 支持 | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| GitHub Pages | 免费 | 中 | 支持 | ⭐⭐ | ⭐⭐⭐⭐ |
| ngrok | 免费 | 快 | 不支持 | ⭐⭐⭐ | ⭐⭐ |

---

## ⚠️ 重要提示

### 部署前请注意：

1. **不要上传敏感文件**
   - `.env` 文件包含密钥，不要公开
   - 建议使用环境变量或在 Supabase 中配置安全策略

2. **测试功能**
   - 部署后测试表单提交是否正常
   - 检查 Supabase 连接是否正常

3. **更新内容**
   - 修改文件后重新部署即可
   - 大多数平台支持自动更新

---

## 🚀 快速开始（推荐 Netlify）

1. 打开 https://app.netlify.com/drop
2. 拖拽 `my_web` 文件夹
3. 等待 30 秒
4. 复制网址发给朋友！

就这么简单！🎉
