/**
 * 日期时间选择器组件
 * 提供日期和时间选择功能
 */

const DateTimePicker = {
    /**
     * 显示日期选择器
     * @param {Function} callback 选择后的回调函数
     * @param {string} defaultValue 默认值
     */
    showDatePicker(callback, defaultValue = '') {
        const value = defaultValue || DateHelper.getToday();
        const input = document.createElement('input');
        input.type = 'date';
        input.value = value;
        input.style.display = 'none';
        document.body.appendChild(input);
        
        input.addEventListener('change', () => {
            callback(input.value);
            document.body.removeChild(input);
        });
        
        input.click();
    },

    /**
     * 显示时间选择器
     * @param {Function} callback 选择后的回调函数
     * @param {string} defaultValue 默认值
     */
    showTimePicker(callback, defaultValue = '') {
        const value = defaultValue || DateHelper.getCurrentTime();
        const input = document.createElement('input');
        input.type = 'time';
        input.value = value;
        input.style.display = 'none';
        document.body.appendChild(input);
        
        input.addEventListener('change', () => {
            callback(input.value);
            document.body.removeChild(input);
        });
        
        input.click();
    },

    /**
     * 显示日期时间选择器
     * @param {Function} callback 选择后的回调函数
     * @param {string} defaultValue 默认值
     */
    showDateTimePicker(callback, defaultValue = '') {
        const value = defaultValue || new Date().toISOString().slice(0, 16);
        const input = document.createElement('input');
        input.type = 'datetime-local';
        input.value = value;
        input.style.display = 'none';
        document.body.appendChild(input);
        
        input.addEventListener('change', () => {
            callback(input.value);
            document.body.removeChild(input);
        });
        
        input.click();
    },

    /**
     * 设置输入框的日期选择器
     * @param {string} inputId 输入框ID
     */
    bindDateInput(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.type = 'date';
        input.value = input.value || DateHelper.getToday();
    },

    /**
     * 设置输入框的时间选择器
     * @param {string} inputId 输入框ID
     */
    bindTimeInput(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.type = 'time';
        input.value = input.value || DateHelper.getCurrentTime();
    }
};

// 如果在浏览器环境，挂载到window
if (typeof window !== 'undefined') {
    window.DateTimePicker = DateTimePicker;
}

