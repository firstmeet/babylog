/**
 * 喂药模块
 * 管理用药记录和提醒
 */

const MedicineModule = {
    /**
     * 初始化模块
     */
    init() {
        console.log('MedicineModule initialized');
    },

    /**
     * 添加用药记录
     * @param {Object} data 用药数据
     * @returns {Object} 添加的记录
     */
    addRecord(data) {
        return DataManager.addRecord('medicine', {
            name: data.name || '',
            dosage: data.dosage || '',
            frequency: data.frequency || 1, // 每天几次
            duration: data.duration || 1, // 疗程天数
            notes: data.notes || '',
            ...data
        });
    },

    /**
     * 获取用药记录
     * @param {Object} options 筛选选项
     * @returns {Array} 记录列表
     */
    getRecords(options = {}) {
        let records = DataManager.getRecords('medicine');
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
     * 获取今日用药统计
     * @returns {Object} 统计数据
     */
    getTodayStats() {
        const records = this.getRecords({ date: new Date() });
        
        return {
            count: records.length,
            medicines: [...new Set(records.map(r => r.name))]
        };
    }
};

// 如果在浏览器环境，挂载到window并初始化
if (typeof window !== 'undefined') {
    window.MedicineModule = MedicineModule;
    MedicineModule.init();
}

