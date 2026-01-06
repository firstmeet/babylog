/**
 * 睡眠模块
 * 管理睡眠记录和计时
 */

const SleepModule = {
    currentTimer: null,
    timerInterval: null,

    /**
     * 初始化模块
     */
    init() {
        console.log('SleepModule initialized');
    },

    /**
     * 添加睡眠记录
     * @param {Object} data 睡眠数据
     * @returns {Object} 添加的记录
     */
    addRecord(data) {
        return DataManager.addRecord('sleep', {
            startTime: data.startTime || new Date().toISOString(),
            endTime: data.endTime || null,
            duration: data.duration || 0,
            quality: data.quality || 'normal', // good, normal, poor
            position: data.position || 'back', // back, side, stomach
            notes: data.notes || '',
            ...data
        });
    },

    /**
     * 获取睡眠记录
     * @param {Object} options 筛选选项
     * @returns {Array} 记录列表
     */
    getRecords(options = {}) {
        let records = DataManager.getRecords('sleep');
        const babyId = DataManager.getCurrentBaby()?.id;
        
        if (babyId) {
            records = records.filter(r => r.babyId === babyId);
        }

        if (options.date) {
            const dateStr = DateHelper.format(options.date, 'YYYY-MM-DD');
            records = records.filter(r => {
                const recordDate = DateHelper.format(r.startTime, 'YYYY-MM-DD');
                return recordDate === dateStr;
            });
        }

        records.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        return records;
    },

    /**
     * 开始睡眠计时
     */
    startSleep() {
        this.currentTimer = {
            startTime: new Date(),
            duration: 0
        };

        this.timerInterval = setInterval(() => {
            this.currentTimer.duration++;
        }, 1000);
    },

    /**
     * 结束睡眠计时并保存
     * @param {Object} additionalData 额外数据
     * @returns {Object} 添加的记录
     */
    endSleep(additionalData = {}) {
        if (!this.currentTimer) return null;

        clearInterval(this.timerInterval);
        this.timerInterval = null;

        const record = this.addRecord({
            startTime: this.currentTimer.startTime.toISOString(),
            endTime: new Date().toISOString(),
            duration: this.currentTimer.duration,
            ...additionalData
        });

        this.currentTimer = null;
        return record;
    },

    /**
     * 获取今日睡眠统计
     * @returns {Object} 统计数据
     */
    getTodayStats() {
        const records = this.getRecords({ date: new Date() });
        
        return {
            count: records.length,
            totalDuration: records.reduce((sum, r) => sum + (r.duration || 0), 0),
            avgDuration: records.length > 0 ? Math.round(records.reduce((sum, r) => sum + (r.duration || 0), 0) / records.length) : 0
        };
    }
};

// 如果在浏览器环境，挂载到window并初始化
if (typeof window !== 'undefined') {
    window.SleepModule = SleepModule;
    SleepModule.init();
}

