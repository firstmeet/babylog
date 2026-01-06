/**
 * 数据管理模块
 * 统一管理所有数据的增删改查
 */

const DataManager = {
    /**
     * 初始化数据
     */
    init() {
        // 初始化宝宝数据
        if (!Storage.get(Storage.KEYS.BABIES)) {
            Storage.set(Storage.KEYS.BABIES, []);
        }

        // 初始化当前宝宝ID
        if (!Storage.get(Storage.KEYS.CURRENT_BABY_ID)) {
            Storage.set(Storage.KEYS.CURRENT_BABY_ID, '');
        }

        // 初始化记录数据
        if (!Storage.get(Storage.KEYS.RECORDS)) {
            Storage.set(Storage.KEYS.RECORDS, {
                feeding: [],
                diaper: [],
                sleep: [],
                medicine: [],
                growth: []
            });
        }

        // 初始化设置
        if (!Storage.get(Storage.KEYS.SETTINGS)) {
            Storage.set(Storage.KEYS.SETTINGS, {
                reminders: {
                    feeding: true,
                    diaper: true,
                    sleep: true,
                    medicine: true
                },
                units: 'ml',
                theme: 'default'
            });
        }
    },

    /**
     * 获取所有宝宝
     * @returns {Array} 宝宝列表
     */
    getBabies() {
        return Storage.get(Storage.KEYS.BABIES, []);
    },

    /**
     * 获取当前宝宝
     * @returns {Object|null} 当前宝宝数据
     */
    getCurrentBaby() {
        const babyId = Storage.get(Storage.KEYS.CURRENT_BABY_ID);
        if (!babyId) return null;

        const babies = this.getBabies();
        return babies.find(b => b.id === babyId) || null;
    },

    /**
     * 添加宝宝
     * @param {Object} babyData 宝宝数据
     * @returns {Object} 添加后的宝宝数据
     */
    addBaby(babyData) {
        const babies = this.getBabies();
        const newBaby = {
            id: Date.now().toString(),
            name: babyData.name || '宝宝',
            gender: babyData.gender || 'unknown',
            birthday: babyData.birthday || new Date().toISOString(),
            avatar: babyData.avatar || '👶',
            ...babyData
        };

        babies.push(newBaby);
        Storage.set(Storage.KEYS.BABIES, babies);

        // 如果是第一个宝宝，设为当前宝宝
        if (babies.length === 1) {
            Storage.set(Storage.KEYS.CURRENT_BABY_ID, newBaby.id);
        }

        return newBaby;
    },

    /**
     * 更新宝宝信息
     * @param {string} babyId 宝宝ID
     * @param {Object} updateData 更新数据
     * @returns {boolean} 是否成功
     */
    updateBaby(babyId, updateData) {
        const babies = this.getBabies();
        const index = babies.findIndex(b => b.id === babyId);
        if (index === -1) return false;

        babies[index] = { ...babies[index], ...updateData };
        return Storage.set(Storage.KEYS.BABIES, babies);
    },

    /**
     * 删除宝宝
     * @param {string} babyId 宝宝ID
     * @returns {boolean} 是否成功
     */
    deleteBaby(babyId) {
        const babies = this.getBabies();
        const filtered = babies.filter(b => b.id !== babyId);
        return Storage.set(Storage.KEYS.BABIES, filtered);
    },

    /**
     * 切换当前宝宝
     * @param {string} babyId 宝宝ID
     * @returns {boolean} 是否成功
     */
    switchBaby(babyId) {
        return Storage.set(Storage.KEYS.CURRENT_BABY_ID, babyId);
    },

    /**
     * 获取所有记录
     * @param {string} type 记录类型
     * @returns {Array} 记录列表
     */
    getRecords(type) {
        const records = Storage.get(Storage.KEYS.RECORDS, {});
        return records[type] || [];
    },

    /**
     * 添加记录
     * @param {string} type 记录类型
     * @param {Object} recordData 记录数据
     * @returns {Object} 添加后的记录
     */
    addRecord(type, recordData) {
        const records = Storage.get(Storage.KEYS.RECORDS, {});
        if (!records[type]) {
            records[type] = [];
        }

        const newRecord = {
            id: Date.now().toString(),
            babyId: Storage.get(Storage.KEYS.CURRENT_BABY_ID),
            time: recordData.time || new Date().toISOString(),
            ...recordData
        };

        records[type].push(newRecord);
        Storage.set(Storage.KEYS.RECORDS, records);

        return newRecord;
    },

    /**
     * 更新记录
     * @param {string} type 记录类型
     * @param {string} recordId 记录ID
     * @param {Object} updateData 更新数据
     * @returns {boolean} 是否成功
     */
    updateRecord(type, recordId, updateData) {
        const records = Storage.get(Storage.KEYS.RECORDS, {});
        if (!records[type]) return false;

        const index = records[type].findIndex(r => r.id === recordId);
        if (index === -1) return false;

        records[type][index] = { ...records[type][index], ...updateData };
        return Storage.set(Storage.KEYS.RECORDS, records);
    },

    /**
     * 删除记录
     * @param {string} type 记录类型
     * @param {string} recordId 记录ID
     * @returns {boolean} 是否成功
     */
    deleteRecord(type, recordId) {
        const records = Storage.get(Storage.KEYS.RECORDS, {});
        if (!records[type]) return false;

        records[type] = records[type].filter(r => r.id !== recordId);
        return Storage.set(Storage.KEYS.RECORDS, records);
    },

    /**
     * 获取设置
     * @returns {Object} 设置数据
     */
    getSettings() {
        return Storage.get(Storage.KEYS.SETTINGS, {});
    },

    /**
     * 更新设置
     * @param {Object} updateData 更新数据
     * @returns {boolean} 是否成功
     */
    updateSettings(updateData) {
        const settings = this.getSettings();
        const newSettings = { ...settings, ...updateData };
        return Storage.set(Storage.KEYS.SETTINGS, newSettings);
    }
};

// 如果在浏览器环境，挂载到window并初始化
if (typeof window !== 'undefined') {
    window.DataManager = DataManager;
    DataManager.init();
}

