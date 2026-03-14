# BIO-TESSERA：菌丝体建筑管理系统

[English README](./README.md) | **简体中文说明**

![BIO-TESSERA Banner](https://github.com/QingMXL/Bio-Tessera/blob/main/assets/Bio-Tessera%20Community%20Scene.jpg)

**BIO-TESSERA** 是一个面向菌丝体建筑的 AI 辅助管理平台，用于对基于菌丝体的建筑结构进行监测、维护以及长期演化管理。  
系统通过一个共享的数字界面，将居民、设施管理者与建筑师连接在一起，支持对“活体建筑材料”的观察、分析与修复决策。

与传统把建筑视为静态外壳不同，BIO-TESSERA 将菌丝体材料看作一个动态的生态系统，关注其在时间维度上的生长、老化与修复过程。

## 🌿 项目概览

随着建筑领域越来越多地采用生物基材料，传统的建筑运维方法已难以满足需求。  
菌丝体复合材料在成型之后仍会持续响应环境条件，例如湿度、光照和微生物活动等，其性能会随时间不断变化。

**BIO-TESSERA** 提供了一个数字化平台，用于：

- 持续跟踪菌丝体外立面的表面状态与结构健康；
- 发现潜在结构风险与表面衰退；
- 通过 AI 分析生成维修与再设计方案；
- 在居民、维护团队与设计团队之间建立协作工作流。

它既是一个实时监控仪表盘，也是面向“活体建筑”长期养护的协作基础设施。

## ✨ 核心功能

- **实时监测（Real-time Monitoring）**
  - 使用实时（或 AI 模拟）的摄像头视图，展示菌丝体结构关键区域的状态。
  - 支持对外立面不同网格/分区进行持续观察。

- **AI 表面分析（AI Surface Analysis）**
  - 用户可以上传菌丝体表面的照片。
  - 系统利用 AI 对图像进行分析，识别包括但不限于：
    - 裂纹（cracking）  
    - 侵蚀（erosion）  
    - 变褐 / 变色（browning）  
    - 生物穿孔（biological perforation）  
    - 表面形变（surface deformation）

- **交互式场地地图（Interactive Mapping）**
  - 使用 AI 生成或自定义的场地底图，将监测点、风险区域进行空间化可视化展示。
  - 支持在建筑或社区尺度上管理不同外立面网格与监测点。

- **角色化工作台（Role-based Workspace）**
  - 三类主要用户角色：
    - 居民（Resident）
    - 管理者 / 研究人员（Manager / Researcher）
    - 建筑师（Architect）
  - 侧边栏导航会根据当前角色动态显示不同的功能页，例如：
    - 管理者可使用“维护”“材料实验室”等工具；
    - 建筑师可访问“设计方案”“对话”等功能；
    - 居民可以查看整体健康状况、报警信息并参与对话。

- **协作对话界面（Collaborative Dialogue）**
  - 提供一个统一的沟通界面，居民、维护团队与建筑师可以在此：
    - 报告问题；
    - 共享观察结果；
    - 讨论潜在的修复与设计响应策略。

- **自动化设计方案（Automated Design Proposals）**
  - 结合结构健康评估与表面分析结果，自动生成：
    - “修复（Restore）”方案；
    - “再设计（Redesign）”方案；
  - 帮助建筑师快速探索多种设计路径。

- **材料实验室（Material Lab）**
  - 对为维修或替换准备的新菌丝体批次进行跟踪：
    - 生长周期；
    - 当前健康状态；
    - 是否已达到可用条件等。

- **告警中心（Alert Center）**
  - 集中管理所有结构与表面告警事件：
    - 告警严重程度分级（低 / 中 / 高）；
    - 告警历史追踪与状态变更（激活 / 已解决）；
    - 与监测点和维护任务联动。

- **维护管理（Maintenance）**
  - 管理各类维护任务与工单：
    - 待处理 / 进行中 / 已完成任务数量；
    - 任务与具体监测点、告警的关联；
    - 支持管理者协调线下检修与材料替换。

## 🛠️ 技术栈

- **前端**：React 18、TypeScript、Tailwind CSS  
- **构建工具**：Vite  
- **动画**：Framer Motion（`motion`）  
- **图标**：Lucide React  
- **AI 引擎**：Google Gemini API（`@google/genai`）  
- **后端（示例/扩展）**：Node.js、Express

## 🚀 快速开始

### 前置条件

- 已安装 Node.js（建议版本 **18 或以上**）
- 拥有一个可用的 **Google Gemini API Key**

### 安装步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/your-username/bio-tessera.git
   cd bio-tessera
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **配置环境变量**

   在项目根目录创建 `.env` 文件，并加入你的 Gemini API Key：

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **启动开发服务器**

   ```bash
   npm run dev
   ```

5. **在浏览器中访问**

   默认地址：

   ```text
   http://localhost:3000
   ```

## 📂 目录结构

- `src/pages`：各个页面视图（如 Dashboard、Mapping、Dialogue 等）
- `src/components`：可复用 UI 组件
- `src/services`：与 Gemini 以及其他后端 API 的集成逻辑
- `src/stores`：前端状态管理（摄像头源、场地图像等）
- `public/assets`：对外提供的静态资源目录（建筑照片、场地底图等）

## 🎨 自定义你的场地与图片

如果你想用自己的建筑 / 社区真实照片替换默认图像：

1. 将图片放入 `assets/` 目录；
2. 按约定的命名规则命名，例如：

   ```text
   camera_p1_north_facade.jpg
   ```

3. 应用会优先使用这些本地资源：  
   - 在 Mapping 页面中，可以通过将 `site_map_aerial.jpg` 放入 `public/assets/` 目录，并在地图状态中引用 `/assets/site_map_aerial.jpg` 来作为底图。

## 📄 许可证

本项目基于 MIT 许可证开源。  
详情请查阅仓库中的 `LICENSE` 文件。

---

*为“活体建筑”的未来而开发。*

