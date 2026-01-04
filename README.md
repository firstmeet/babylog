# BabyLog - 婴儿喂养记录原型

完整的婴儿照护记录HTML原型系统，采用统一的设计语言和颜色标准。

## 📁 文件结构

```
/workspace/
├── index.html          # 首页 - 记录概览
├── feeding.html        # 喂奶记录页面
├── diaper.html         # 换尿布记录页面
├── supplement.html     # 喂药/补剂记录页面
├── sleep.html          # 睡眠记录页面
├── calendar.html       # 日历视图页面
├── add.html           # 添加记录页面
├── profile.html       # 个人中心页面
└── README.md          # 说明文档
```

## 🎨 设计系统

### Color Tokens（颜色标准）

#### Brand / Primary
- `--color-primary: #6FCFC3` - 主操作、进行中
- `--color-primary-light: #E6F6F4` - 浅色背景

#### Category（分类颜色）
- `--color-breast: #E6F6F4` - 母乳/喂奶
- `--color-bottle: #E9F3FF` - 奶瓶/配方奶
- `--color-diaper: #F2F4F6` - 尿布
- `--color-supplement: #FFF1C9` - 药品/补剂
- `--color-event: #E9E6FF` - 事件/睡眠

#### Text（文本层级）
- `--text-primary: #2F3A3F` - 主要文本
- `--text-secondary: #8A9AA5` - 次要文本
- `--text-disabled: #BFC9D1` - 禁用状态

#### Feedback（反馈）
- `--feedback-success: #7BC8A4` - 成功提示
- `--feedback-warning: #FFD59A` - 警告提示

#### Surface（表面）
- `--bg-page: #FAFBFC` - 页面背景
- `--bg-card: #FFFFFF` - 卡片背景
- `--divider: #EDF1F4` - 分割线

### Typography（字体）

- `--font-title: 22px` - 标题
- `--font-card-title: 16px` - 卡片标题
- `--font-body: 14px` - 正文
- `--font-caption: 12px` - 说明文字

### Radius / Spacing（圆角/间距）

- `--radius-card: 16px` - 卡片圆角
- `--radius-button: 14px` - 按钮圆角
- `--radius-pill: 12px` - 药丸圆角
- `--space-page: 16px` - 页面边距
- `--space-card: 16px` - 卡片内边距
- `--space-gap: 12px` - 元素间距

## 🚀 功能页面

### 1. 首页 (index.html)
- 宝宝信息展示
- 各类记录快速入口
- 今日统计概览
- 底部导航栏

### 2. 喂奶记录 (feeding.html)
- 今日喂奶统计（总量、次数、间隔）
- 母乳/配方奶记录列表
- 时间轴展示
- 徽章标识不同类型

### 3. 换尿布记录 (diaper.html)
- 今日换尿布统计
- 尿湿/便便分类
- 记录详情（颜色、状态）
- 便捷筛选

### 4. 喂药/补剂记录 (supplement.html)
- 今日待服用提醒卡片
- 打卡功能
- 历史服药记录
- 药品/维生素分类

### 5. 睡眠记录 (sleep.html)
- 今日睡眠统计
- 当前睡眠状态（实时计时）
- 睡眠质量标记
- 小睡/夜间睡眠区分

### 6. 日历视图 (calendar.html)
- 月历展示
- 有记录日期标记
- 选中日期时间轴
- 全类型记录展示

### 7. 添加记录 (add.html)
- 分类卡片网格
- 快速操作入口
- 支持8种记录类型
- 一键跳转对应页面

### 8. 个人中心 (profile.html)
- 用户信息展示
- 宝宝管理
- 数据统计入口
- 提醒设置
- 家庭成员管理

## 💡 设计特点

### 统一性
- 所有页面使用相同的设计token
- 禁止新增颜色（严格遵循色彩规范）
- 新状态只能用透明度/明度变化

### 易用性
- 手机尺寸适配（375x812px）
- 点击态反馈
- 清晰的视觉层级
- 一致的导航体验

### 可扩展性
- 模块化CSS变量
- 语义化类名
- 易于维护和扩展

## 🎯 使用方法

1. 直接在浏览器中打开 `index.html`
2. 点击各个卡片可跳转到对应功能页面
3. 底部导航栏可在主要页面间切换
4. 点击浮动"+"按钮可添加新记录

## 📱 最佳查看方式

建议使用以下方式查看原型：

1. **桌面浏览器**：直接打开HTML文件
2. **开发者工具**：F12 → 切换到移动设备模式 → 选择 iPhone X/11/12
3. **手机浏览器**：将文件传输到手机后打开

## ⚠️ 注意事项

- 这是一个静态原型，交互功能需要后端支持
- 部分按钮点击会显示"功能开发中"提示
- 头像使用DiceBear API生成（需要网络连接）
- 建议在现代浏览器中查看以获得最佳效果

## 🎨 设计规范执行情况

✅ 严格遵循提供的Color Tokens  
✅ 使用统一的Typography规范  
✅ 应用一致的Radius和Spacing  
✅ 禁止新增颜色  
✅ 保持视觉一致性  

---

**BabyLog** - 用心记录，陪伴成长 👶💕
