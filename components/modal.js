/**
 * 弹窗组件
 * 提供通用的弹窗功能
 */

const Modal = {
    /**
     * 显示弹窗
     * @param {string} modalId 弹窗ID
     */
    show(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * 隐藏弹窗
     * @param {string} modalId 弹窗ID
     */
    hide(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    /**
     * 切换弹窗显示状态
     * @param {string} modalId 弹窗ID
     */
    toggle(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            if (modal.classList.contains('active')) {
                this.hide(modalId);
            } else {
                this.show(modalId);
            }
        }
    },

    /**
     * 初始化所有弹窗
     */
    init() {
        // 监听所有关闭按钮
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.hide(modal.id);
                }
            });
        });

        // 监听背景点击关闭
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hide(modal.id);
                }
            });
        });

        // 监听ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    this.hide(activeModal.id);
                }
            }
        });
    }
};

// 如果在浏览器环境，挂载到window
if (typeof window !== 'undefined') {
    window.Modal = Modal;
}

