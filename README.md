# SJTU Grade Viewer Extension

This browser extension captures and displays grade information from the SJTU student system, providing a clean and modern interface for viewing your academic records.

---

# SJTU 成绩查看器扩展

这个浏览器扩展可以捕获并显示上海交通大学学生系统中的成绩信息，为您提供查看学术记录的简洁现代界面。

## Features / 功能特性

- Automatically captures grade data when you visit the SJTU student system
- Modern, clean UI with responsive design
- Organizes courses by semester with semester-specific statistics
- Shows course name, teacher, credits, score, GPA, and grade level
- Displays both completed courses and pending courses without grades
- Calculates and displays overall summary statistics (total credits, average GPA, average score)
- Color-coded grade levels and score pills for easy visualization
- Notification badge when new grade data is captured
- Cache management with clear cache functionality

- 访问上海交通大学学生系统时自动捕获成绩数据
- 现代化、简洁的响应式设计界面
- 按学期组织课程，显示学期特定统计信息
- 显示课程名称、教师、学分、分数、绩点和等级
- 显示已完成课程和尚未出成绩的待处理课程
- 计算并显示总体统计摘要（总学分、平均绩点、平均分数）
- 颜色编码的成绩等级和分数标签，便于可视化
- 捕获新成绩数据时显示通知徽章
- 缓存管理，包含清除缓存功能

## Installation / 安装

### Chrome / Edge / Other Chromium-based browsers

1. Download or clone this repository
2. Open your browser and navigate to the extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the `web-request-extension` folder
5. The extension should now be installed and visible in your browser toolbar

### Chrome / Edge / 其他基于 Chromium 的浏览器

1. 下载或克隆此仓库
2. 打开浏览器并导航到扩展页面：
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. 使用右上角的开关启用"开发者模式"
4. 点击"加载已解压的扩展程序"并选择 `web-request-extension` 文件夹
5. 扩展程序现在应该已安装并显示在浏览器工具栏中

## Usage / 使用方法

1. Visit the SJTU student system and navigate to the grades page
2. The extension will automatically capture the grade data when the page loads
3. Click on the extension icon in the browser toolbar to view your grades
4. Use the "Refresh Data" button to update the data if needed
5. Use the "Clear Cache" button to remove stored data if you want to start fresh

1. 访问上海交通大学研究生学生系统(yjs.sjtu.edu.cn)并导航到"培养-我的成绩"页面
2. 页面加载时扩展程序将自动捕获成绩数据
3. 点击浏览器工具栏中的扩展程序图标查看您的成绩
4. 如需更新数据，请使用"刷新数据"按钮
5. 如需重新开始，请使用"清除缓存"按钮删除存储的数据

## Data Organization / 数据组织

- Grades are organized by semester, with the newest semesters shown first
- Each semester shows:
  - Semester name (e.g., "2023 Fall")
  - Total credits earned in that semester
  - Average GPA for that semester
  - Average score for that semester
  - Number of pending courses (if any)
- Courses without grades are marked as "Pending"
- Overall summary statistics are shown at the top of the page

- 成绩按学期组织，最新的学期显示在前面
- 每个学期显示：
  - 学期名称（例如："2023 秋季"）
  - 该学期获得的总学分
  - 该学期的平均绩点
  - 该学期的平均分数
  - 待处理课程数量（如有）
- 尚未出成绩的课程标记为"待处理"
- 总体统计摘要显示在页面顶部

## Technical Details / 技术细节

This extension works by:
1. Monitoring network requests using the `webRequest` API
2. Capturing JSON data from the `xscjcx.do` endpoint
3. Parsing and displaying the data in a user-friendly format
4. Storing the data locally in your browser for offline access

此扩展程序的工作原理：
1. 使用 `webRequest` API 监控网络请求
2. 从 `xscjcx.do` 端点捕获 JSON 数据
3. 解析并以用户友好的格式显示数据
4. 将数据本地存储在浏览器中以便离线访问

## Privacy / 隐私

This extension:
- Only captures grade data from the SJTU student system
- Stores data locally in your browser
- Does not send any data to external servers
- Only has permissions for SJTU domains

此扩展程序：
- 仅捕获上海交通大学学生系统中的成绩数据
- 将数据本地存储在您的浏览器中
- 不会向外部服务器发送任何数据
- 仅对上海交通大学域名有权限

## Development / 开发

To modify this extension:
1. Edit the source files as needed
2. Reload the extension in your browser to test changes

修改此扩展程序：
1. 根据需要编辑源文件
2. 在浏览器中重新加载扩展程序以测试更改

### Files / 文件
- `manifest.json`: Extension configuration / 扩展程序配置
- `background.js`: Background script for capturing network requests / 用于捕获网络请求的后台脚本
- `content.js`: Content script that runs on SJTU pages / 在上海交通大学页面上运行的内容脚本
- `popup.html` & `popup.js`: UI for displaying grade data / 用于显示成绩数据的用户界面 