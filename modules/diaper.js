/**
 * 换尿布模块
 * 管理换尿布相关功能
 */

const DiaperModule = {
    /**
     * 初始化模块
     */
    init() {
        console.log('DiaperModule initialized');
    },

    /**
     * 添加尿布记录
     * @param {Object} data 尿布数据
     * @returns {Object} 添加的记录
     */
    addRecord(data) {
        return DataManager.addRecord('diaper', {
            type: data.type || 'wet', // wet, poop, both
            notes: data.notes || '',
            ...data
        });
    },

    /**
     * 获取尿布记录
     * @param {Object} options 筛选选项
     * @returns {Array} 记录列表
     */
    getRecords(options = {}) {
        let records = DataManager.getRecords('diaper');
        const babyId = DataManager.getCurrentBaby()?.id;
        
        if (babyId) {
            records = records.filter(r => r.babyId === babyId);
        }

        if (options.date) {
            const dateStr = DateHelper.format(options.date, 'YYYY-MM-DD');
            records = records.filter(r => {
                const recordDate = DateHelper.format(r.time, 'YYYY-MM-DD');
                return recordDate === dateStr;
            });
        }

        records.sort((a, b) => new Date(b.time) - new Date(a.time));
        return records;
    },

    /**
     * 获取今日统计
     * @returns {Object} 统计数据
     */
    getTodayStats() {
        const records = this.getRecords({ date: new Date() });
        
        return {
            total: records.length,
            wet: records.filter(r => r.type === 'wet').length,
            poop: records.filter(r => r.type === 'poop').length,
            both: records.filter(r => r.type === 'both').length
        };
    }
};

// 如果在浏览器环境，挂载到window并初始化
if (typeof window !== 'undefined') {
    window.DiaperModule = DiaperModule;
    DiaperModule.init();
}

