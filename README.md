# 宝宝记录App - 设计系统文档

## 项目概述

这是一个专为新手父母设计的宝宝日常记录应用，采用温馨柔和的视觉风格，帮助父母轻松记录和追踪宝宝的各项日常活动。

## 一、UX/UI设计分析

### 1.1 整体设计风格

**视觉语言**
- **主题定位**：温馨、柔和、专业的婴儿护理应用
- **设计风格**：现代简约，莫兰迪配色系统
- **情感传达**：安全、可靠、温暖、关怀

**布局特点**
- 卡片式设计，信息层次清晰
- 充足的留白空间，降低视觉疲劳
- 圆角元素，营造柔和亲切感
- 移动端优先的响应式设计

**交互模式**
- 底部导航栏固定，方便单手操作
- 中心浮动按钮，快速添加记录
- 卡片点击展开详情
- 左右滑动切换日期

### 1.2 设计系统规范

#### 颜色规范 (Color System)

**主色调 - Primary Colors**
```css
--color-primary: #7ECEC5;          /* 薄荷绿 - 主色 */
--color-primary-light: #A8DED8;    /* 浅薄荷绿 */
--color-primary-dark: #5AB8AD;     /* 深薄荷绿 */
```

**辅助色 - Secondary Colors**
```css
--color-feeding: #B8E6E0;          /* 喂奶 - 浅蓝 */
--color-sleep: #C8C6E5;            /* 睡眠 - 浅紫 */
--color-diaper: #B5E7CA;           /* 尿布 - 薄荷绿 */
--color-health: #F5E6C8;           /* 健康 - 米黄 */
--color-growth: #FFD4D4;           /* 成长 - 浅粉 */
```

**中性色 - Neutral Colors**
```css
--color-bg: #F5F7F9;               /* 背景色 */
--color-card-bg: #FFFFFF;          /* 卡片背景 */
--color-text-primary: #333333;     /* 主文字 */
--color-text-secondary: #666666;   /* 次要文字 */
--color-text-tertiary: #999999;    /* 辅助文字 */
--color-border: #E5E5E5;           /* 边框色 */
```

#### 字体规范 (Typography)

**字体家族**
```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
```

**字体大小**
```css
--font-size-xs: 12px;              /* 辅助文字 */
--font-size-sm: 14px;              /* 正文 */
--font-size-md: 16px;              /* 小标题 */
--font-size-lg: 18px;              /* 标题 */
--font-size-xl: 20px;              /* 大标题 */
--font-size-xxl: 24px;             /* 特大标题 */
```

**字重**
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 600;
```

#### 圆角规范 (Border Radius)

```css
--radius-sm: 8px;                  /* 小圆角 - 标签、按钮 */
--radius-md: 12px;                 /* 中圆角 - 小卡片 */
--radius-lg: 16px;                 /* 大圆角 - 主卡片 */
--radius-xl: 20px;                 /* 超大圆角 - 特殊按钮 */
--radius-full: 50%;                /* 圆形 - 头像、图标 */
```

#### 间距规范 (Spacing)

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-xxl: 24px;
--spacing-xxxl: 32px;
```

#### 阴影规范 (Shadow)

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.12);
--shadow-float: 0 4px 12px rgba(126, 206, 197, 0.3);
```

## 二、组件拆分

### 2.1 全局组件

#### 顶部导航栏 (Top Navigation)
- **左侧**：日期切换按钮（< 今天 >）
- **中心**：应用标题 / 页面标题
- **右侧**：设置/通知图标

#### 底部导航栏 (Bottom Navigation)
- **记录**：首页，显示今日所有记录
- **提醒**：定时提醒管理
- **添加**：中心浮动按钮，快速添加
- **分析**：数据统计和趋势
- **会档**：宝宝档案和设置

### 2.2 首页组件

#### 宝宝信息卡片 (Baby Info Card)
- 宝宝头像（圆形，支持上传照片）
- 宝宝姓名
- 宝宝年龄（自动计算）
- 今日统计摘要（环形进度）

#### 喂奶记录卡片 (Feeding Card)
- 图标：奶瓶
- 类型标签：母乳/配方奶/混合
- 时间：最后一次喂奶时间
- 数量：毫升数或时长
- 侧边：左侧/右侧/双侧
- 快速操作：重复记录按钮

#### 睡眠记录卡片 (Sleep Card)
- 图标：月亮
- 状态：睡眠中/已醒来
- 时间：开始时间 - 结束时间
- 时长：自动计算
- 今日总计：累计睡眠时长

#### 尿布记录卡片 (Diaper Card)
- 图标：尿布
- 类型：小便/大便/混合
- 今日次数统计
- 最后更换时间
- 尿布疹提示

#### 健康记录卡片 (Health Card)
- 体温：36.5°C
- 喂药记录
- 症状记录
- 就医记录

### 2.3 提醒页组件

- 提醒列表项
- 添加提醒按钮
- 提醒开关
- 重复设置（每天/每周）

### 2.4 分析页组件

- 统计卡片（本周数据）
- 趋势图表（简易柱状图/折线图）
- 对比数据（与上周对比）
- 里程碑提示

### 2.5 会档页组件

- 宝宝基本信息
- 出生信息
- 成长曲线
- 里程碑记录
- 照片墙
- 设置选项

## 三、交互规范

### 3.1 页面切换
- 底部导航点击切换页面
- 页面切换使用淡入淡出动画
- 保持顶部导航和底部导航固定

### 3.2 卡片交互
- 点击卡片展开详情
- 长按卡片显示操作菜单（编辑/删除）
- 卡片内快速操作按钮

### 3.3 添加记录
- 点击中心浮动按钮
- 弹出记录类型选择面板
- 选择类型后进入对应表单

### 3.4 反馈动效
- 按钮点击：缩放效果
- 页面切换：淡入淡出
- 数据加载：骨架屏/加载动画
- 操作成功：轻微震动+提示

## 四、数据结构

### 4.1 宝宝信息
```javascript
{
  name: "小宝",
  birthday: "2024-01-15",
  gender: "male", // male / female
  avatar: "avatar.jpg"
}
```

### 4.2 喂奶记录
```javascript
{
  type: "feeding",
  feedType: "breast", // breast / formula / mixed
  side: "both", // left / right / both
  amount: 120, // ml
  duration: 15, // minutes
  time: "2026-01-06T10:30:00"
}
```

### 4.3 睡眠记录
```javascript
{
  type: "sleep",
  startTime: "2026-01-06T14:00:00",
  endTime: "2026-01-06T16:30:00",
  duration: 150, // minutes
  quality: "good" // good / normal / poor
}
```

### 4.4 尿布记录
```javascript
{
  type: "diaper",
  diaperType: "wet", // wet / dirty / both
  rash: false,
  time: "2026-01-06T11:00:00"
}
```

## 五、技术实现

### 5.1 技术栈
- HTML5
- CSS3 (使用CSS变量)
- 原生JavaScript (ES6+)
- 无框架依赖

### 5.2 浏览器支持
- Chrome/Edge (最新版)
- Safari (iOS 12+)
- Firefox (最新版)

### 5.3 性能优化
- CSS变量集中管理样式
- 使用transform进行动画
- 图片懒加载
- 最小化重排重绘

## 六、使用说明

1. 直接在浏览器中打开 `index.html`
2. 使用底部导航切换不同页面
3. 点击中心浮动按钮添加记录
4. 点击卡片查看详情
5. 适配移动端浏览器访问

## 七、未来扩展

- 数据导出功能（CSV/PDF）
- 多宝宝支持
- 云端同步
- 成长曲线对比（WHO标准）
- 照片管理
- 分享到社交媒体
- 黑暗模式

