/**
 * 成长模块
 * 管理身高体重等成长数据
 */

const GrowthModule = {
    /**
     * 初始化模块
     */
    init() {
        console.log('GrowthModule initialized');
    },

    /**
     * 添加成长记录
     * @param {Object} data 成长数据
     * @returns {Object} 添加的记录
     */
    addRecord(data) {
        return DataManager.addRecord('growth', {
            height: data.height || 0, // cm
            weight: data.weight || 0, // kg
            headCircumference: data.headCircumference || 0, // cm
            milestone: data.milestone || '', // 里程碑事件
            notes: data.notes || '',
            ...data
        });
    },

    /**
     * 获取成长记录
     * @param {Object} options 筛选选项
     * @returns {Array} 记录列表
     */
    getRecords(options = {}) {
        let records = DataManager.getRecords('growth');
        const babyId = DataManager.getCurrentBaby()?.id;
        
        if (babyId) {
            records = records.filter(r => r.babyId === babyId);
        }

        records.sort((a, b) => new Date(b.time) - new Date(a.time));
        return records;
    },

    /**
     * 获取最新成长数据
     * @returns {Object|null} 最新记录
     */
    getLatestRecord() {
        const records = this.getRecords();
        return records[0] || null;
    },

    /**
     * 获取成长曲线数据
     * @returns {Object} 图表数据
     */
    getGrowthCurveData() {
        const records = this.getRecords();
        
        const labels = [];
        const heights = [];
        const weights = [];
        const headCircumferences = [];

        records.reverse().forEach(record => {
            labels.push(DateHelper.format(record.time, 'MM-DD'));
            heights.push(record.height || 0);
            weights.push(record.weight || 0);
            headCircumferences.push(record.headCircumference || 0);
        });

        return {
            labels,
            heights,
            weights,
            headCircumferences
        };
    }
};

// 如果在浏览器环境，挂载到window并初始化
if (typeof window !== 'undefined') {
    window.GrowthModule = GrowthModule;
    GrowthModule.init();
}

