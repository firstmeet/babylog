/**
 * 本地存储工具
 * 处理localStorage的读写操作
 */

const Storage = {
    // 存储键名
    KEYS: {
        BABIES: 'babylog_babies',
        CURRENT_BABY_ID: 'babylog_current_baby_id',
        RECORDS: 'babylog_records',
        SETTINGS: 'babylog_settings'
    },

    /**
     * 获取数据
     * @param {string} key 键名
     * @param {*} defaultValue 默认值
     * @returns {*} 存储的数据
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    },

    /**
     * 设置数据
     * @param {string} key 键名
     * @param {*} value 值
     * @returns {boolean} 是否成功
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    },

    /**
     * 删除数据
     * @param {string} key 键名
     * @returns {boolean} 是否成功
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    },

    /**
     * 清空所有数据
     * @returns {boolean} 是否成功
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }
};

// 如果在浏览器环境，挂载到window
if (typeof window !== 'undefined') {
    window.Storage = Storage;
}

