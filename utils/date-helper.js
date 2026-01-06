/**
 * 日期处理工具
 * 提供日期格式化、计算等功能
 */

const DateHelper = {
    /**
     * 格式化日期
     * @param {Date|string|number} date 日期
     * @param {string} format 格式字符串
     * @returns {string} 格式化后的日期字符串
     */
    format(date, format = 'YYYY-MM-DD HH:mm:ss') {
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    },

    /**
     * 获取今天的日期（YYYY-MM-DD格式）
     * @returns {string} 今天的日期
     */
    getToday() {
        return this.format(new Date(), 'YYYY-MM-DD');
    },

    /**
     * 获取当前时间（HH:mm格式）
     * @returns {string} 当前时间
     */
    getCurrentTime() {
        return this.format(new Date(), 'HH:mm');
    },

    /**
     * 计算时间差（分钟）
     * @param {Date|string|number} start 开始时间
     * @param {Date|string|number} end 结束时间
     * @returns {number} 时间差（分钟）
     */
    getDiffMinutes(start, end) {
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        return Math.floor((endTime - startTime) / 1000 / 60);
    },

    /**
     * 格式化时长
     * @param {number} minutes 分钟数
     * @returns {string} 格式化后的时长字符串
     */
    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}小时${mins}分钟`;
        }
        return `${mins}分钟`;
    },

    /**
     * 判断是否是今天
     * @param {Date|string|number} date 日期
     * @returns {boolean} 是否是今天
     */
    isToday(date) {
        const d = this.format(date, 'YYYY-MM-DD');
        return d === this.getToday();
    },

    /**
     * 判断是否是昨天
     * @param {Date|string|number} date 日期
     * @returns {boolean} 是否是昨天
     */
    isYesterday(date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const d = this.format(date, 'YYYY-MM-DD');
        return d === this.format(yesterday, 'YYYY-MM-DD');
    },

    /**
     * 获取友好的时间显示
     * @param {Date|string|number} date 日期
     * @returns {string} 友好的时间字符串
     */
    getFriendlyTime(date) {
        if (this.isToday(date)) {
            return '今天 ' + this.format(date, 'HH:mm');
        }
        if (this.isYesterday(date)) {
            return '昨天 ' + this.format(date, 'HH:mm');
        }
        return this.format(date, 'MM-DD HH:mm');
    },

    /**
     * 获取月份的天数
     * @param {number} year 年份
     * @param {number} month 月份（1-12）
     * @returns {number} 天数
     */
    getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    },

    /**
     * 获取某天是星期几
     * @param {Date|string|number} date 日期
     * @returns {number} 星期几（0-6，0是星期日）
     */
    getWeekDay(date) {
        return new Date(date).getDay();
    }
};

// 如果在浏览器环境，挂载到window
if (typeof window !== 'undefined') {
    window.DateHelper = DateHelper;
}

