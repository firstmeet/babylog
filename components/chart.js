/**
 * 图表组件
 * 使用Canvas绘制各种图表
 */

const Chart = {
    /**
     * 绘制折线图
     * @param {HTMLCanvasElement} canvas Canvas元素
     * @param {Object} data 数据
     * @param {Object} options 选项
     */
    drawLineChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const {
            width = canvas.width,
            height = canvas.height,
            padding = 40,
            lineColor = '#80CBC4',
            pointColor = '#80CBC4',
            gridColor = '#E0E0E0',
            textColor = '#666666'
        } = options;

        // 清空画布
        ctx.clearRect(0, 0, width, height);

        const labels = data.labels || [];
        const values = data.values || [];
        
        if (labels.length === 0 || values.length === 0) return;

        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        // 找出最大值和最小值
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const valueRange = maxValue - minValue || 1;

        // 绘制网格线
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // 绘制折线
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        values.forEach((value, index) => {
            const x = padding + (chartWidth / (values.length - 1)) * index;
            const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // 绘制数据点
        ctx.fillStyle = pointColor;
        values.forEach((value, index) => {
            const x = padding + (chartWidth / (values.length - 1)) * index;
            const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // 绘制标签
        ctx.fillStyle = textColor;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        labels.forEach((label, index) => {
            const x = padding + (chartWidth / (labels.length - 1)) * index;
            ctx.fillText(label, x, height - padding + 20);
        });
    },

    /**
     * 绘制柱状图
     * @param {HTMLCanvasElement} canvas Canvas元素
     * @param {Object} data 数据
     * @param {Object} options 选项
     */
    drawBarChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const {
            width = canvas.width,
            height = canvas.height,
            padding = 40,
            barColor = '#80CBC4',
            gridColor = '#E0E0E0',
            textColor = '#666666'
        } = options;

        // 清空画布
        ctx.clearRect(0, 0, width, height);

        const labels = data.labels || [];
        const values = data.values || [];
        
        if (labels.length === 0 || values.length === 0) return;

        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const barWidth = chartWidth / labels.length * 0.6;
        const maxValue = Math.max(...values) || 1;

        // 绘制网格线
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // 绘制柱状图
        ctx.fillStyle = barColor;
        values.forEach((value, index) => {
            const x = padding + (chartWidth / labels.length) * index + (chartWidth / labels.length - barWidth) / 2;
            const barHeight = (value / maxValue) * chartHeight;
            const y = padding + chartHeight - barHeight;
            
            ctx.fillRect(x, y, barWidth, barHeight);
        });

        // 绘制标签
        ctx.fillStyle = textColor;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        labels.forEach((label, index) => {
            const x = padding + (chartWidth / labels.length) * index + chartWidth / labels.length / 2;
            ctx.fillText(label, x, height - padding + 20);
        });
    },

    /**
     * 绘制饼图
     * @param {HTMLCanvasElement} canvas Canvas元素
     * @param {Object} data 数据
     * @param {Object} options 选项
     */
    drawPieChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const {
            width = canvas.width,
            height = canvas.height,
            colors = ['#80CBC4', '#B5E7CA', '#C8C6E5', '#F5E6C8'],
            textColor = '#666666'
        } = options;

        // 清空画布
        ctx.clearRect(0, 0, width, height);

        const labels = data.labels || [];
        const values = data.values || [];
        
        if (labels.length === 0 || values.length === 0) return;

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;
        const total = values.reduce((sum, val) => sum + val, 0);

        let currentAngle = -Math.PI / 2;

        // 绘制扇形
        values.forEach((value, index) => {
            const sliceAngle = (value / total) * Math.PI * 2;
            
            ctx.beginPath();
            ctx.fillStyle = colors[index % colors.length];
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();

            // 绘制标签
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
            
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(Math.round((value / total) * 100) + '%', labelX, labelY);

            currentAngle += sliceAngle;
        });

        // 绘制图例
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        labels.forEach((label, index) => {
            const legendY = 20 + index * 20;
            
            ctx.fillStyle = colors[index % colors.length];
            ctx.fillRect(10, legendY - 8, 12, 12);
            
            ctx.fillStyle = textColor;
            ctx.fillText(label, 30, legendY);
        });
    }
};

// 如果在浏览器环境，挂载到window
if (typeof window !== 'undefined') {
    window.Chart = Chart;
}

