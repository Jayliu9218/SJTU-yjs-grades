# SJTU 成绩查看器扩展

一个简洁现代的浏览器扩展，专门用于捕获和显示上海交通大学研究生系统（https://yjs.sjtu.edu.cn/）的成绩信息。

## 功能特性

- 🎯 **自动捕获**：访问研究生系统时自动获取成绩数据
- 📊 **数据统计**：按学期组织，显示学分、绩点、平均分等统计信息
- 🎨 **现代界面**：响应式设计，颜色编码的成绩等级
- 📱 **便捷操作**：一键刷新数据，清除缓存功能
- 🔒 **隐私保护**：数据仅本地存储，不上传至外部服务器

## 快速开始

### 安装

1. 下载或克隆此仓库
2. 打开浏览器扩展页面：
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"，选择 `web-request-extension` 文件夹

### 使用

1. 访问[上海交通大学研究生系统](https://yjs.sjtu.edu.cn)
2. 导航至"培养-我的成绩"页面
3. 点击浏览器工具栏中的扩展图标查看成绩
4. 使用"刷新数据"按钮更新信息

## 数据展示

- **学期组织**：按学期分组，最新学期优先显示
- **统计信息**：每学期显示总学分、平均绩点、平均分数
- **课程详情**：课程名称、教师、学分、分数、绩点、等级
- **状态标识**：已完成课程和待处理课程分别标记

## 技术原理

- 使用 `webRequest` API 监控网络请求
- 从 `xscjcx.do` 端点捕获 JSON 数据
- 本地解析和存储，支持离线访问

## 隐私说明

- 仅捕获上海交通大学研究生系统（yjs.sjtu.edu.cn）的成绩数据
- 数据完全本地存储，不上传至任何外部服务器
- 仅对研究生系统域名有访问权限

## 开发说明

### 文件结构
- `manifest.json`：扩展配置
- `background.js`：后台脚本，捕获网络请求
- `content.js`：内容脚本，在 SJTU 页面运行
- `popup.html` & `popup.js`：用户界面

### 修改扩展
1. 编辑源文件
2. 在浏览器中重新加载扩展以测试更改

---

# SJTU Grade Viewer Extension

A clean and modern browser extension specifically designed for capturing and displaying grade information from Shanghai Jiao Tong University's graduate student system (https://yjs.sjtu.edu.cn/).

## Features

- 🎯 **Auto Capture**: Automatically retrieves grade data when visiting the graduate system
- 📊 **Data Analytics**: Organizes by semester with credit, GPA, and average score statistics
- 🎨 **Modern UI**: Responsive design with color-coded grade levels
- 📱 **Easy Operation**: One-click data refresh and cache clearing
- 🔒 **Privacy First**: Data stored locally only, never uploaded to external servers

## Quick Start

### Installation

1. Download or clone this repository
2. Open browser extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `web-request-extension` folder

### Usage

1. Visit [SJTU Graduate System](https://yjs.sjtu.edu.cn)
2. Navigate to "Training - My Grades" page
3. Click the extension icon in browser toolbar to view grades
4. Use "Refresh Data" button to update information

## Data Display

- **Semester Organization**: Grouped by semester with newest first
- **Statistics**: Total credits, average GPA, and average score per semester
- **Course Details**: Course name, teacher, credits, score, GPA, and grade level
- **Status Indicators**: Completed courses and pending courses clearly marked

## Technical Details

- Uses `webRequest` API to monitor network requests
- Captures JSON data from `xscjcx.do` endpoint
- Local parsing and storage for offline access

## Privacy

- Only captures grade data from SJTU graduate system (yjs.sjtu.edu.cn)
- Data stored locally, never uploaded to external servers
- Permissions limited to graduate system domain only

## Development

### File Structure
- `manifest.json`: Extension configuration
- `background.js`: Background script for capturing network requests
- `content.js`: Content script running on SJTU pages
- `popup.html` & `popup.js`: User interface

### Modifying the Extension
1. Edit source files as needed
2. Reload extension in browser to test changes 