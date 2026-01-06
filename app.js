// ==========================================
// 宝宝记录App - JavaScript
// ==========================================

// 全局状态
const appState = {
    currentPage: 'home',
    currentDate: new Date(),
    babyInfo: {
        name: '小宝',
        birthday: new Date('2024-06-25'),
        gender: 'male',
        birthWeight: 3.2,
        birthHeight: 50
    },
    records: {
        feeding: [],
        sleep: [],
        diaper: [],
        health: []
    }
};

// ==========================================
// 工具函数
// ==========================================

// 计算宝宝年龄
function calculateAge(birthday) {
    const today = new Date();
    const birth = new Date(birthday);
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    const days = Math.floor((today - birth) / (1000 * 60 * 60 * 24)) - (months * 30);
    return `${months}个月${days}天`;
}

// 格式化日期
function formatDate(date) {
    const today = new Date();
    const targetDate = new Date(date);
    
    // 判断是否是今天
    if (targetDate.toDateString() === today.toDateString()) {
        return '今天';
    }
    
    // 判断是否是昨天
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (targetDate.toDateString() === yesterday.toDateString()) {
        return '昨天';
    }
    
    // 判断是否是明天
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (targetDate.toDateString() === tomorrow.toDateString()) {
        return '明天';
    }
    
    // 其他日期
    return `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
}

// 格式化时间
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
}

// 计算时间差
function getTimeDiff(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // 秒
    
    if (diff < 60) {
        return '刚刚';
    } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `${minutes}分钟前`;
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `${hours}小时前`;
    } else {
        const days = Math.floor(diff / 86400);
        return `${days}天前`;
    }
}

// ==========================================
// 模拟数据初始化
// ==========================================

function initMockData() {
    const now = new Date();
    
    // 喂奶记录
    appState.records.feeding = [
        {
            type: 'feeding',
            feedType: 'breast',
            side: 'both',
            leftDuration: 15,
            rightDuration: 12,
            time: new Date(now.getTime() - 2 * 60 * 60 * 1000) // 2小时前
        },
        {
            type: 'feeding',
            feedType: 'breast',
            side: 'left',
            leftDuration: 18,
            time: new Date(now.getTime() - 5 * 60 * 60 * 1000) // 5小时前
        },
        {
            type: 'feeding',
            feedType: 'formula',
            amount: 120,
            time: new Date(now.getTime() - 8 * 60 * 60 * 1000) // 8小时前
        }
    ];
    
    // 睡眠记录
    appState.records.sleep = [
        {
            type: 'sleep',
            startTime: new Date(now.getTime() - 4.5 * 60 * 60 * 1000),
            endTime: new Date(now.getTime() - 2 * 60 * 60 * 1000),
            duration: 150,
            quality: 'good'
        },
        {
            type: 'sleep',
            startTime: new Date(now.getTime() - 12 * 60 * 60 * 1000),
            endTime: new Date(now.getTime() - 9 * 60 * 60 * 1000),
            duration: 180,
            quality: 'normal'
        }
    ];
    
    // 尿布记录
    appState.records.diaper = [
        {
            type: 'diaper',
            diaperType: 'wet',
            rash: false,
            time: new Date(now.getTime() - 45 * 60 * 1000) // 45分钟前
        },
        {
            type: 'diaper',
            diaperType: 'dirty',
            rash: false,
            time: new Date(now.getTime() - 3 * 60 * 60 * 1000) // 3小时前
        }
    ];
    
    // 健康记录
    appState.records.health = [
        {
            type: 'health',
            temperature: 36.5,
            height: 68,
            weight: 8.2,
            time: new Date()
        }
    ];
}

// ==========================================
// 页面切换
// ==========================================

function switchPage(pageName) {
    // 移除所有页面的active类
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 激活目标页面
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = pageName;
    }
    
    // 更新导航栏状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });

    // 页面切换时的额外处理
    if (pageName === 'feeding-history') {
        renderFeedingHistory();
    }

    // 如果切换到分析页，绘制图表
    if (pageName === 'analysis') {
        setTimeout(() => {
            drawCharts();
        }, 100);
    }
}

// ==========================================
// 日期切换
// ==========================================

function changeDate(direction) {
    const currentDate = appState.currentDate;
    if (direction === 'prev') {
        currentDate.setDate(currentDate.getDate() - 1);
    } else if (direction === 'next') {
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    updateDateDisplay();
}

function updateDateDisplay() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = formatDate(appState.currentDate);
    }
}

// ==========================================
// 添加记录面板
// ==========================================

function showAddPanel() {
    const panel = document.getElementById('addPanel');
    if (panel) {
        panel.classList.add('active');
    }
}

function hideAddPanel() {
    const panel = document.getElementById('addPanel');
    if (panel) {
        panel.classList.remove('active');
    }
}

// ==========================================
// 图表绘制
// ==========================================

function drawCharts() {
    drawFeedingChart();
    drawSleepChart();
}

function drawFeedingChart() {
    const canvas = document.getElementById('feedingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 模拟数据：本周每天的喂奶次数
    const data = [8, 9, 7, 8, 9, 8, 8];
    const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const maxValue = Math.max(...data);
    
    // 绘制参数
    const padding = 40;
    const barWidth = (width - padding * 2) / data.length;
    const maxHeight = height - padding * 2;
    
    // 绘制柱状图
    ctx.fillStyle = '#B8E6E0';
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * maxHeight;
        const x = padding + index * barWidth + barWidth * 0.15;
        const y = height - padding - barHeight;
        const w = barWidth * 0.7;
        
        // 绘制柱子
        ctx.beginPath();
        ctx.roundRect(x, y, w, barHeight, 8);
        ctx.fill();
        
        // 绘制数值
        ctx.fillStyle = '#333333';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value + '次', x + w / 2, y - 8);
        
        // 绘制标签
        ctx.fillStyle = '#999999';
        ctx.fillText(labels[index], x + w / 2, height - 10);
        
        ctx.fillStyle = '#B8E6E0';
    });
}

function drawSleepChart() {
    const canvas = document.getElementById('sleepChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 模拟数据：本周每天的睡眠时长（小时）
    const data = [14.5, 13.8, 14.2, 15.0, 14.1, 14.8, 14.2];
    const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const maxValue = 16;
    const minValue = 12;
    
    // 绘制参数
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const pointSpacing = chartWidth / (data.length - 1);
    
    // 绘制网格线
    ctx.strokeStyle = '#E5E5E5';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // 绘制折线
    ctx.strokeStyle = '#C8C6E5';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = height - padding - ((value - minValue) / (maxValue - minValue)) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // 绘制数据点
    data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = height - padding - ((value - minValue) / (maxValue - minValue)) * chartHeight;
        
        // 外圈
        ctx.fillStyle = '#C8C6E5';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // 内圈
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制数值
        ctx.fillStyle = '#333333';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value + 'h', x, y - 12);
        
        // 绘制标签
        ctx.fillStyle = '#999999';
        ctx.fillText(labels[index], x, height - 10);
    });
}

// Canvas roundRect polyfill for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
    };
}

// ==========================================
// 事件监听
// ==========================================

function initEventListeners() {
    // 底部导航
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            switchPage(page);
        });
    });
    
    // 添加按钮
    document.getElementById('addBtn').addEventListener('click', () => {
        showAddPanel();
    });
    
    // 关闭添加面板
    document.querySelector('.close-panel-btn').addEventListener('click', () => {
        hideAddPanel();
    });
    
    document.querySelector('.add-panel-overlay').addEventListener('click', () => {
        hideAddPanel();
    });
    
    // 添加记录选项
    document.querySelectorAll('.add-option').forEach(option => {
        option.addEventListener('click', () => {
            const type = option.classList[1].replace('-option', '');
            console.log(`添加${type}记录`);
            // 这里可以添加具体的表单逻辑
            hideAddPanel();
            
            // 显示提示（简单演示）
            alert(`功能演示：点击添加${type}记录`);
        });
    });
    
    // 记录卡片点击
    document.querySelectorAll('.record-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // 如果点击的是操作按钮，不触发卡片点击
            if (e.target.closest('.card-action-btn')) {
                console.log('快速添加相同类型记录');
                alert('功能演示：快速添加相同类型记录');
                return;
            }
            console.log('查看记录详情');
            alert('功能演示：查看记录详情');
        });
    });
    
    // 提醒开关
    document.querySelectorAll('.switch input').forEach(switchInput => {
        switchInput.addEventListener('change', (e) => {
            const reminderItem = e.target.closest('.reminder-item');
            const reminderTitle = reminderItem.querySelector('h4').textContent;
            const isChecked = e.target.checked;
            console.log(`${reminderTitle}: ${isChecked ? '开启' : '关闭'}`);
        });
    });
    
    // 周期选择器
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // 重新绘制图表
            setTimeout(() => drawCharts(), 100);
        });
    });
    
    // 设置项点击
    document.querySelectorAll('.setting-item').forEach(item => {
        item.addEventListener('click', () => {
            const settingName = item.querySelector('span').textContent;
            console.log(`点击设置：${settingName}`);
            alert(`功能演示：${settingName}`);
        });
    });
    
    // 编辑头像
    document.querySelector('.edit-avatar-btn').addEventListener('click', () => {
        console.log('编辑头像');
        alert('功能演示：上传宝宝照片');
    });
    
    // 添加提醒按钮
    document.querySelector('.add-reminder-btn').addEventListener('click', () => {
        console.log('添加提醒');
        alert('功能演示：添加新提醒');
    });
}

// ==========================================
// 页面更新
// ==========================================

function updateBabyAge() {
    const ageElement = document.querySelector('.baby-age');
    if (ageElement) {
        ageElement.textContent = calculateAge(appState.babyInfo.birthday);
    }
    
    const profileAgeElement = document.querySelector('.profile-age');
    if (profileAgeElement) {
        profileAgeElement.textContent = calculateAge(appState.babyInfo.birthday);
    }
}

// ==========================================
// 初始化应用
// ==========================================

function initApp() {
    console.log('宝宝记录App初始化...');
    
    // 初始化模拟数据
    initMockData();
    
    // 初始化事件监听
    initEventListeners();
    
    // 更新日期显示
    updateDateDisplay();
    
    // 更新宝宝年龄
    updateBabyAge();
    
    // 设置默认页面
    switchPage('home');
    
    console.log('应用初始化完成！');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// 导出函数供调试使用
window.appState = appState;
window.switchPage = switchPage;
window.drawCharts = drawCharts;

// ==========================================
// 喂养记录表单功能
// ==========================================

/**
 * 显示喂养表单
 */
function showFeedingForm() {
    // 关闭添加面板
    const addPanel = document.getElementById('addPanel');
    if (addPanel) {
        addPanel.classList.remove('active');
    }

    // 初始化表单
    const form = document.getElementById('feedingForm');
    if (form) {
        form.reset();
        
        // 设置默认时间为当前时间
        const now = new Date();
        document.getElementById('feedingDate').value = DateHelper.format(now, 'YYYY-MM-DD');
        document.getElementById('feedingTime').value = DateHelper.format(now, 'HH:mm');
    }

    // 跳转到表单页面
    switchPage('feeding-add');

    // 监听喂养类型变化
    const typeRadios = document.getElementsByName('feedingType');
    typeRadios.forEach(radio => {
        radio.addEventListener('change', updateFeedingFormFields);
    });

    // 初始化显示/隐藏字段
    updateFeedingFormFields();
}

/**
 * 根据喂养类型更新表单字段显示
 */
function updateFeedingFormFields() {
    const feedingType = document.querySelector('input[name="feedingType"]:checked').value;
    const sideGroup = document.getElementById('sideGroup');
    
    // 只有母乳喂养时显示乳房选择
    if (sideGroup) {
        sideGroup.style.display = feedingType === 'breast' ? 'block' : 'none';
    }
}

/**
 * 提交喂养表单
 */
function submitFeedingForm(e) {
    e.preventDefault();

    // 获取表单数据
    const feedingType = document.querySelector('input[name="feedingType"]:checked').value;
    const feedingDate = document.getElementById('feedingDate').value;
    const feedingTime = document.getElementById('feedingTime').value;
    const side = feedingType === 'breast' ? document.querySelector('input[name="side"]:checked').value : 'none';
    const amount = parseInt(document.getElementById('feedingAmount').value) || 0;
    const duration = parseInt(document.getElementById('feedingDuration').value) || 0;
    const status = document.querySelector('input[name="status"]:checked').value;
    const notes = document.getElementById('feedingNotes').value;

    // 组合日期和时间
    const datetime = new Date(`${feedingDate}T${feedingTime}`);

    // 添加记录
    const record = FeedingModule.addRecord({
        type: feedingType,
        side: side,
        amount: amount,
        duration: duration,
        status: status,
        notes: notes,
        time: datetime.toISOString()
    });

    console.log('添加喂养记录:', record);

    // 刷新首页数据
    updateHomeFeedingCard();

    // 刷新历史列表
    renderFeedingHistory();

    // 显示成功提示并返回首页
    showToast('喂养记录已保存');
    
    // 返回首页
    setTimeout(() => {
        switchPage('home');
    }, 500);
}

/**
 * 更新首页喂养卡片数据
 */
function updateHomeFeedingCard() {
    const stats = FeedingModule.getTodayStats();
    
    // 更新今日统计
    const badge = document.querySelector('.feeding-card .badge');
    if (badge) {
        badge.textContent = `${stats.count}次 / ${stats.totalAmount}ml`;
    }

    // 更新最近一次记录
    const simpleInfo = document.querySelector('.feeding-card .simple-info');
    if (simpleInfo && stats.lastTime) {
        const lastRecord = FeedingModule.getRecords()[0];
        simpleInfo.textContent = `最近：${DateHelper.format(stats.lastTime, 'HH:mm')} - ${lastRecord.amount}ml`;
    }
}

/**
 * 显示提示消息
 */
function showToast(message, duration = 2000) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 24px;
        font-size: 14px;
        z-index: 10000;
        animation: toastSlideDown 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    // 自动移除
    setTimeout(() => {
        toast.style.animation = 'toastSlideUp 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// 在页面加载时绑定表单提交事件
document.addEventListener('DOMContentLoaded', function() {
    const feedingForm = document.getElementById('feedingForm');
    if (feedingForm) {
        feedingForm.addEventListener('submit', submitFeedingForm);
    }

    // 初始化模态窗口
    Modal.init();
});

// ==========================================
// 喂养历史列表功能
// ==========================================

/**
 * 渲染喂养历史列表
 */
function renderFeedingHistory() {
    const container = document.getElementById('feedingHistoryList');
    if (!container) return;

    const records = FeedingModule.getRecords();
    
    if (records.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>暂无记录</p></div>';
        return;
    }

    // 按日期分组
    const groupedRecords = {};
    records.forEach(record => {
        const dateStr = DateHelper.format(record.time, 'YYYY-MM-DD');
        if (!groupedRecords[dateStr]) {
            groupedRecords[dateStr] = [];
        }
        groupedRecords[dateStr].push(record);
    });

    // 渲染
    let html = '';
    Object.keys(groupedRecords).sort().reverse().forEach(dateStr => {
        const friendlyDate = DateHelper.isToday(dateStr) ? '今天' : 
                            DateHelper.isYesterday(dateStr) ? '昨天' : 
                            DateHelper.format(dateStr, 'MM月DD日');
        
        html += `<div class="timeline-date">${friendlyDate}</div>`;
        
        groupedRecords[dateStr].forEach(record => {
            const typeText = record.type === 'breast' ? '母乳' : 
                           record.type === 'bottle' ? '奶瓶' : '辅食';
            const sideText = record.side === 'left' ? '左侧' :
                            record.side === 'right' ? '右侧' :
                            record.side === 'both' ? '两侧' : '';
            
            html += `
                <div class="timeline-item">
                    <div class="timeline-icon">🍼</div>
                    <div class="timeline-content">
                        <div class="timeline-time">${DateHelper.format(record.time, 'HH:mm')}</div>
                        <div class="timeline-details">
                            <span class="timeline-tag">${typeText}</span>
                            ${record.amount ? `<span class="timeline-tag">${record.amount}ml</span>` : ''}
                            ${sideText ? `<span class="timeline-tag">${sideText}</span>` : ''}
                            ${record.duration ? `<span class="timeline-tag">${record.duration}分钟</span>` : ''}
                        </div>
                        ${record.notes ? `<p style="margin-top: 8px; font-size: 13px; color: #666666;">${record.notes}</p>` : ''}
                    </div>
                </div>
            `;
        });
    });

    container.innerHTML = html;
}

/**
 * 切换喂养标签页
 */
function switchFeedingTab(tab) {
    // 更新标签按钮状态
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 切换内容
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tab === 'history') {
        document.getElementById('feedingHistoryTab').classList.add('active');
        renderFeedingHistory();
    } else if (tab === 'stats') {
        document.getElementById('feedingStatsTab').classList.add('active');
        renderFeedingStats();
    }
}

/**
 * 渲染喂养统计数据
 */
function renderFeedingStats() {
    // 获取本周数据
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    
    const weekRecords = FeedingModule.getRecords({
        startDate: weekStart,
        endDate: now
    });

    // 计算统计数据
    const totalCount = weekRecords.length;
    const totalAmount = weekRecords.reduce((sum, r) => sum + (r.amount || 0), 0);
    const avgAmount = totalCount > 0 ? Math.round(totalAmount / totalCount) : 0;

    // 更新统计卡片
    document.getElementById('weeklyCount').textContent = totalCount;
    document.getElementById('weeklyAmount').textContent = totalAmount + 'ml';
    document.getElementById('weeklyAvg').textContent = avgAmount + 'ml';

    // 获取图表数据
    const chartData = FeedingModule.getChartData('week');

    // 绘制频次图表
    const countCanvas = document.getElementById('feedingCountChart');
    if (countCanvas) {
        Chart.drawLineChart(countCanvas, {
            labels: chartData.labels,
            values: chartData.counts
        }, {
            width: countCanvas.width,
            height: countCanvas.height,
            lineColor: '#80CBC4',
            pointColor: '#80CBC4'
        });
    }

    // 绘制奶量图表
    const amountCanvas = document.getElementById('feedingAmountChart');
    if (amountCanvas) {
        Chart.drawBarChart(amountCanvas, {
            labels: chartData.labels,
            values: chartData.amounts
        }, {
            width: amountCanvas.width,
            height: amountCanvas.height,
            barColor: '#80CBC4'
        });
    }
}

// ==========================================
// 喂养计时器UI功能
// ==========================================

let timerState = {
    isRunning: false,
    isPaused: false,
    isExpanded: false
};

/**
 * 从表单启动计时器
 */
function startFeedingTimerFromForm() {
    // 返回首页
    switchPage('home');
    
    // 启动计时器
    startFeedingTimer();
    
    showToast('计时器已启动');
}

/**
 * 启动喂养计时器
 */
function startFeedingTimer() {
    if (timerState.isRunning) {
        showToast('计时器已在运行中');
        return;
    }

    // 启动计时器
    FeedingModule.startTimer('left', updateTimerDisplay);
    
    timerState.isRunning = true;
    timerState.isPaused = false;
    timerState.isExpanded = true;
    
    // 显示计时器UI
    const timer = document.getElementById('feedingTimer');
    if (timer) {
        timer.style.display = 'block';
        timer.classList.add('expanded');
        
        const compact = timer.querySelector('.timer-compact');
        if (compact) {
            compact.classList.add('running');
        }
    }
    
    // 更新按钮状态
    updateTimerButtons();
}

/**
 * 切换计时器展开/收起
 */
function toggleTimer() {
    if (!timerState.isRunning) return;
    
    const timer = document.getElementById('feedingTimer');
    if (!timer) return;
    
    timerState.isExpanded = !timerState.isExpanded;
    
    if (timerState.isExpanded) {
        timer.classList.add('expanded');
    } else {
        timer.classList.remove('expanded');
    }
}

/**
 * 切换计时器暂停/继续
 */
function toggleTimerPause() {
    if (!timerState.isRunning) return;
    
    if (timerState.isPaused) {
        // 继续计时
        FeedingModule.resumeTimer(updateTimerDisplay);
        timerState.isPaused = false;
        showToast('继续计时');
    } else {
        // 暂停计时
        FeedingModule.pauseTimer();
        timerState.isPaused = true;
        showToast('已暂停');
    }
    
    updateTimerButtons();
}

/**
 * 切换计时器乳房侧
 */
function switchTimerSide(side) {
    if (!timerState.isRunning) return;
    
    FeedingModule.switchSide(side);
    
    // 更新按钮状态
    document.querySelectorAll('.side-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.side === side) {
            btn.classList.add('active');
        }
    });
    
    showToast(`切换到${side === 'left' ? '左侧' : '右侧'}`);
}

/**
 * 停止计时器并保存记录
 */
function stopFeedingTimer() {
    if (!timerState.isRunning) return;
    
    // 确认停止
    if (!confirm('确定要停止计时并保存记录吗？')) {
        return;
    }
    
    // 停止计时器并保存
    const record = FeedingModule.stopTimer();
    
    if (record) {
        // 隐藏计时器UI
        const timer = document.getElementById('feedingTimer');
        if (timer) {
            timer.style.display = 'none';
            timer.classList.remove('expanded');
        }
        
        // 重置状态
        timerState.isRunning = false;
        timerState.isPaused = false;
        timerState.isExpanded = false;
        
        // 刷新首页和历史列表
        updateHomeFeedingCard();
        renderFeedingHistory();
        
        showToast('记录已保存');
    }
}

/**
 * 更新计时器显示
 */
function updateTimerDisplay(timer) {
    if (!timer) return;
    
    const hours = Math.floor(timer.duration / 3600);
    const minutes = Math.floor((timer.duration % 3600) / 60);
    const seconds = timer.duration % 60;
    
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const shortTimeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // 更新展开视图
    const display = document.getElementById('timerDisplay');
    if (display) {
        display.textContent = timeStr;
    }
    
    // 更新紧凑视图
    const compactTime = document.querySelector('.timer-time');
    if (compactTime) {
        compactTime.textContent = shortTimeStr;
    }
}

/**
 * 更新计时器按钮状态
 */
function updateTimerButtons() {
    const pauseBtn = document.getElementById('timerPauseBtn');
    if (!pauseBtn) return;
    
    if (timerState.isPaused) {
        pauseBtn.classList.add('paused');
        pauseBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="currentColor"/>
            </svg>
            <span>继续</span>
        `;
    } else {
        pauseBtn.classList.remove('paused');
        pauseBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
            </svg>
            <span>暂停</span>
        `;
    }
}

// ==========================================
// 喂养提醒功能
// ==========================================

let reminderInterval = null;
const FEEDING_REMINDER_MINUTES = 180; // 3小时提醒一次

/**
 * 初始化提醒功能
 */
function initFeedingReminder() {
    // 请求通知权限
    NotificationHelper.requestPermission();
    
    // 检查当前是否需要提醒
    checkFeedingReminder();
    
    // 每分钟检查一次
    reminderInterval = setInterval(checkFeedingReminder, 60000);
}

/**
 * 检查是否需要喂养提醒
 */
function checkFeedingReminder() {
    const minutesSinceLastFeeding = FeedingModule.getTimeSinceLastFeeding();
    
    // 如果没有记录或计时器正在运行，不提醒
    if (minutesSinceLastFeeding === 0 || timerState.isRunning) {
        return;
    }
    
    // 如果超过设定时间，显示提醒
    if (minutesSinceLastFeeding >= FEEDING_REMINDER_MINUTES) {
        const hours = Math.floor(minutesSinceLastFeeding / 60);
        const minutes = minutesSinceLastFeeding % 60;
        
        let message = `距离上次喂养已经过去${hours}小时`;
        if (minutes > 0) {
            message += `${minutes}分钟`;
        }
        message += '，该喂奶了！';
        
        NotificationHelper.showFeedingReminder(message);
    }
}

/**
 * 停止提醒
 */
function stopFeedingReminder() {
    if (reminderInterval) {
        clearInterval(reminderInterval);
        reminderInterval = null;
    }
}

// ==========================================
// 初始化测试数据
// ==========================================

function initTestData() {
    // 检查是否已有数据
    const existingBabies = DataManager.getBabies();
    if (existingBabies.length > 0) {
        return; // 已有数据，不添加测试数据
    }

    // 添加测试宝宝
    DataManager.addBaby({
        name: '小宝',
        gender: 'male',
        birthday: '2024-06-25',
        avatar: '👶'
    });

    // 添加一些测试喂养记录
    const now = new Date();
    
    FeedingModule.addRecord({
        type: 'bottle',
        amount: 120,
        duration: 15,
        time: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() // 2小时前
    });

    FeedingModule.addRecord({
        type: 'breast',
        side: 'left',
        duration: 20,
        time: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() // 5小时前
    });

    FeedingModule.addRecord({
        type: 'bottle',
        amount: 100,
        duration: 12,
        time: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() // 8小时前
    });

    console.log('测试数据已添加');
}

// 在页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化测试数据
    initTestData();
    
    // 更新首页数据
    updateHomeFeedingCard();
    
    // 延迟启动提醒功能
    setTimeout(() => {
        initFeedingReminder();
    }, 2000);
});

// ==========================================
// 其他模块表单功能
// ==========================================

/**
 * 显示睡眠表单
 */
function showSleepForm() {
    const addPanel = document.getElementById('addPanel');
    if (addPanel) addPanel.classList.remove('active');
    
    const form = document.getElementById('sleepForm');
    if (form) {
        form.reset();
        const now = new Date();
        document.getElementById('sleepStartDate').value = DateHelper.format(now, 'YYYY-MM-DD');
        document.getElementById('sleepStartTime').value = DateHelper.format(now, 'HH:mm');
        document.getElementById('sleepEndDate').value = DateHelper.format(now, 'YYYY-MM-DD');
        document.getElementById('sleepEndTime').value = DateHelper.format(now, 'HH:mm');
    }
    
    switchPage('sleep-add');
}

/**
 * 提交睡眠表单
 */
function submitSleepForm(e) {
    e.preventDefault();
    
    const startDate = document.getElementById('sleepStartDate').value;
    const startTime = document.getElementById('sleepStartTime').value;
    const endDate = document.getElementById('sleepEndDate').value;
    const endTime = document.getElementById('sleepEndTime').value;
    const quality = document.querySelector('input[name="sleepQuality"]:checked').value;
    const notes = document.getElementById('sleepNotes').value;
    
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    const duration = Math.floor((endDateTime - startDateTime) / 1000 / 60);
    
    SleepModule.addRecord({
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        duration: duration,
        quality: quality,
        notes: notes
    });
    
    showToast('睡眠记录已保存');
    setTimeout(() => {
        switchPage('home');
    }, 500);
}

/**
 * 显示换尿布表单
 */
function showDiaperForm() {
    const addPanel = document.getElementById('addPanel');
    if (addPanel) addPanel.classList.remove('active');
    
    const form = document.getElementById('diaperForm');
    if (form) {
        form.reset();
        const now = new Date();
        document.getElementById('diaperDate').value = DateHelper.format(now, 'YYYY-MM-DD');
        document.getElementById('diaperTime').value = DateHelper.format(now, 'HH:mm');
    }
    
    switchPage('diaper-add');
}

/**
 * 提交换尿布表单
 */
function submitDiaperForm(e) {
    e.preventDefault();
    
    const date = document.getElementById('diaperDate').value;
    const time = document.getElementById('diaperTime').value;
    const type = document.querySelector('input[name="diaperType"]:checked').value;
    const notes = document.getElementById('diaperNotes').value;
    
    const datetime = new Date(`${date}T${time}`);
    
    DiaperModule.addRecord({
        type: type,
        notes: notes,
        time: datetime.toISOString()
    });
    
    showToast('换尿布记录已保存');
    setTimeout(() => {
        switchPage('home');
    }, 500);
}

/**
 * 显示喂药表单
 */
function showMedicineForm() {
    const addPanel = document.getElementById('addPanel');
    if (addPanel) addPanel.classList.remove('active');
    
    const form = document.getElementById('medicineForm');
    if (form) {
        form.reset();
        const now = new Date();
        document.getElementById('medicineDate').value = DateHelper.format(now, 'YYYY-MM-DD');
        document.getElementById('medicineTime').value = DateHelper.format(now, 'HH:mm');
    }
    
    switchPage('medicine-add');
}

/**
 * 提交喂药表单
 */
function submitMedicineForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('medicineName').value;
    const date = document.getElementById('medicineDate').value;
    const time = document.getElementById('medicineTime').value;
    const dosage = document.getElementById('medicineDosage').value;
    const notes = document.getElementById('medicineNotes').value;
    
    const datetime = new Date(`${date}T${time}`);
    
    MedicineModule.addRecord({
        name: name,
        dosage: dosage,
        notes: notes,
        time: datetime.toISOString()
    });
    
    showToast('用药记录已保存');
    setTimeout(() => {
        switchPage('home');
    }, 500);
}

/**
 * 显示成长表单
 */
function showGrowthForm() {
    const addPanel = document.getElementById('addPanel');
    if (addPanel) addPanel.classList.remove('active');
    
    const form = document.getElementById('growthForm');
    if (form) {
        form.reset();
        const now = new Date();
        document.getElementById('growthDate').value = DateHelper.format(now, 'YYYY-MM-DD');
    }
    
    switchPage('growth-add');
}

/**
 * 提交成长表单
 */
function submitGrowthForm(e) {
    e.preventDefault();
    
    const date = document.getElementById('growthDate').value;
    const height = parseFloat(document.getElementById('growthHeight').value) || 0;
    const weight = parseFloat(document.getElementById('growthWeight').value) || 0;
    const headCircumference = parseFloat(document.getElementById('growthHead').value) || 0;
    const notes = document.getElementById('growthNotes').value;
    
    const datetime = new Date(date);
    
    GrowthModule.addRecord({
        height: height,
        weight: weight,
        headCircumference: headCircumference,
        notes: notes,
        time: datetime.toISOString()
    });
    
    showToast('成长记录已保存');
    setTimeout(() => {
        switchPage('home');
    }, 500);
}

// 导出新函数
window.showFeedingForm = showFeedingForm;
window.submitFeedingForm = submitFeedingForm;
window.renderFeedingHistory = renderFeedingHistory;
window.switchFeedingTab = switchFeedingTab;
window.renderFeedingStats = renderFeedingStats;
window.startFeedingTimerFromForm = startFeedingTimerFromForm;
window.startFeedingTimer = startFeedingTimer;
window.toggleTimer = toggleTimer;
window.toggleTimerPause = toggleTimerPause;
window.switchTimerSide = switchTimerSide;
window.stopFeedingTimer = stopFeedingTimer;
window.initFeedingReminder = initFeedingReminder;
window.stopFeedingReminder = stopFeedingReminder;
window.showSleepForm = showSleepForm;
window.submitSleepForm = submitSleepForm;
window.showDiaperForm = showDiaperForm;
window.submitDiaperForm = submitDiaperForm;
window.showMedicineForm = showMedicineForm;
window.submitMedicineForm = submitMedicineForm;
window.showGrowthForm = showGrowthForm;
window.submitGrowthForm = submitGrowthForm;

