/**
 * 喂养模块
 * 管理所有喂养相关的功能
 */

const FeedingModule = {
    // 当前正在进行的计时器
    currentTimer: null,
    timerInterval: null,

    /**
     * 初始化模块
     */
    init() {
        console.log('FeedingModule initialized');
    },

    /**
     * 添加喂养记录
     * @param {Object} data 喂养数据
     * @returns {Object} 添加的记录
     */
    addRecord(data) {
        return DataManager.addRecord('feeding', {
            type: data.type || 'bottle', // bottle, breast, food
            amount: data.amount || 0,
            side: data.side || 'both', // left, right, both
            duration: data.duration || 0,
            status: data.status || 'normal', // normal, sleep
            notes: data.notes || '',
            ...data
        });
    },

    /**
     * 获取喂养记录
     * @param {Object} options 筛选选项
     * @returns {Array} 记录列表
     */
    getRecords(options = {}) {
        let records = DataManager.getRecords('feeding');
        const babyId = DataManager.getCurrentBaby()?.id;
        
        // 过滤当前宝宝的记录
        if (babyId) {
            records = records.filter(r => r.babyId === babyId);
        }

        // 按日期筛选
        if (options.date) {
            const dateStr = DateHelper.format(options.date, 'YYYY-MM-DD');
            records = records.filter(r => {
                const recordDate = DateHelper.format(r.time, 'YYYY-MM-DD');
                return recordDate === dateStr;
            });
        }

        // 按时间范围筛选
        if (options.startDate && options.endDate) {
            const start = new Date(options.startDate).getTime();
            const end = new Date(options.endDate).getTime();
            records = records.filter(r => {
                const time = new Date(r.time).getTime();
                return time >= start && time <= end;
            });
        }

        // 排序（最新的在前）
        records.sort((a, b) => new Date(b.time) - new Date(a.time));

        return records;
    },

    /**
     * 获取今日喂养统计
     * @returns {Object} 统计数据
     */
    getTodayStats() {
        const records = this.getRecords({ date: new Date() });
        
        return {
            count: records.length,
            totalAmount: records.reduce((sum, r) => sum + (r.amount || 0), 0),
            avgAmount: records.length > 0 ? Math.round(records.reduce((sum, r) => sum + (r.amount || 0), 0) / records.length) : 0,
            leftCount: records.filter(r => r.side === 'left').length,
            rightCount: records.filter(r => r.side === 'right').length,
            lastTime: records[0]?.time || null
        };
    },

    /**
     * 获取最近一次喂养时间
     * @returns {string|null} 时间字符串
     */
    getLastFeedingTime() {
        const records = this.getRecords();
        return records[0]?.time || null;
    },

    /**
     * 计算距离上次喂养的时间（分钟）
     * @returns {number} 分钟数
     */
    getTimeSinceLastFeeding() {
        const lastTime = this.getLastFeedingTime();
        if (!lastTime) return 0;
        
        return DateHelper.getDiffMinutes(lastTime, new Date());
    },

    /**
     * 开始计时器
     * @param {string} side 左右乳房
     * @param {Function} onTick 每秒回调
     */
    startTimer(side = 'left', onTick) {
        this.currentTimer = {
            side: side,
            startTime: new Date(),
            duration: 0
        };

        this.timerInterval = setInterval(() => {
            this.currentTimer.duration++;
            if (onTick) {
                onTick(this.currentTimer);
            }
        }, 1000);
    },

    /**
     * 暂停计时器
     */
    pauseTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    /**
     * 恢复计时器
     * @param {Function} onTick 每秒回调
     */
    resumeTimer(onTick) {
        if (!this.currentTimer) return;

        this.timerInterval = setInterval(() => {
            this.currentTimer.duration++;
            if (onTick) {
                onTick(this.currentTimer);
            }
        }, 1000);
    },

    /**
     * 停止计时器并保存记录
     * @param {Object} additionalData 额外数据
     * @returns {Object} 添加的记录
     */
    stopTimer(additionalData = {}) {
        if (!this.currentTimer) return null;

        this.pauseTimer();

        const record = this.addRecord({
            type: 'breast',
            side: this.currentTimer.side,
            duration: this.currentTimer.duration,
            time: this.currentTimer.startTime.toISOString(),
            ...additionalData
        });

        this.currentTimer = null;
        return record;
    },

    /**
     * 切换乳房
     * @param {string} newSide 新的乳房
     */
    switchSide(newSide) {
        if (this.currentTimer) {
            this.currentTimer.side = newSide;
        }
    },

    /**
     * 获取统计数据（用于图表）
     * @param {string} period 周期：week, month
     * @returns {Object} 图表数据
     */
    getChartData(period = 'week') {
        const now = new Date();
        const days = period === 'week' ? 7 : 30;
        const labels = [];
        const counts = [];
        const amounts = [];

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = DateHelper.format(date, 'YYYY-MM-DD');
            
            labels.push(DateHelper.format(date, 'MM-DD'));
            
            const dayRecords = this.getRecords({ date: date });
            counts.push(dayRecords.length);
            amounts.push(dayRecords.reduce((sum, r) => sum + (r.amount || 0), 0));
        }

        return {
            labels,
            counts,
            amounts
        };
    }
};

// 如果在浏览器环境，挂载到window并初始化
if (typeof window !== 'undefined') {
    window.FeedingModule = FeedingModule;
    FeedingModule.init();
}

