/**
 * 通知工具
 * 处理浏览器通知功能
 */

const NotificationHelper = {
    // 通知权限状态
    permission: 'default',

    /**
     * 初始化通知
     */
    async init() {
        if ('Notification' in window) {
            this.permission = window.Notification.permission;
        }
    },

    /**
     * 请求通知权限
     * @returns {Promise<string>} 权限状态
     */
    async requestPermission() {
        if (!('Notification' in window)) {
            console.warn('浏览器不支持通知功能');
            return 'denied';
        }

        if (this.permission === 'granted') {
            return 'granted';
        }

        try {
            this.permission = await window.Notification.requestPermission();
            return this.permission;
        } catch (error) {
            console.error('请求通知权限失败:', error);
            return 'denied';
        }
    },

    /**
     * 显示通知
     * @param {string} title 标题
     * @param {Object} options 选项
     * @returns {Notification|null} 通知对象
     */
    async show(title, options = {}) {
        // 检查权限
        if (this.permission !== 'granted') {
            const permission = await this.requestPermission();
            if (permission !== 'granted') {
                console.warn('没有通知权限');
                return null;
            }
        }

        try {
            const notification = new window.Notification(title, {
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                ...options
            });

            // 点击通知时聚焦窗口
            notification.onclick = () => {
                window.focus();
                if (options.onClick) {
                    options.onClick();
                }
            };

            return notification;
        } catch (error) {
            console.error('显示通知失败:', error);
            return null;
        }
    },

    /**
     * 显示喂养提醒
     * @param {string} message 提醒消息
     */
    showFeedingReminder(message = '该给宝宝喂奶了') {
        return this.show('喂养提醒', {
            body: message,
            icon: '🍼',
            tag: 'feeding-reminder'
        });
    },

    /**
     * 显示睡眠提醒
     * @param {string} message 提醒消息
     */
    showSleepReminder(message = '该让宝宝睡觉了') {
        return this.show('睡眠提醒', {
            body: message,
            icon: '🌙',
            tag: 'sleep-reminder'
        });
    },

    /**
     * 显示喂药提醒
     * @param {string} message 提醒消息
     */
    showMedicineReminder(message = '该给宝宝吃药了') {
        return this.show('用药提醒', {
            body: message,
            icon: '💊',
            tag: 'medicine-reminder'
        });
    }
};

// 如果在浏览器环境，挂载到window并初始化
if (typeof window !== 'undefined') {
    window.NotificationHelper = NotificationHelper;
    NotificationHelper.init();
}

