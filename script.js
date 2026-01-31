// ==================== 响应式导航菜单 ====================

// 获取DOM元素
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-menu a');

// 移动端菜单切换
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // 阻止页面滚动（当菜单打开时）
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// 点击导航链接后关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // 关闭移动端菜单
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // 更新活动状态
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// 滚动时导航栏效果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 添加滚动阴影效果
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 更新导航链接活动状态（基于滚动位置）
    updateActiveNavLink();
    
    lastScroll = currentScroll;
});

// 更新导航链接活动状态
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==================== 主题切换功能 ====================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// 检查本地存储中的主题设置
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// 切换主题
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // 应用新主题
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // 保存到本地存储
    localStorage.setItem('theme', newTheme);
    
    // 更新图标
    updateThemeIcon(newTheme);
    
    // 添加过渡动画
    document.body.style.transition = 'background-color 0.3s, color 0.3s';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
});

// 更新主题图标
function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// 检测系统主题偏好（如果用户未手动设置）
if (!savedTheme) {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
}

// ==================== Supabase 配置 ====================

// Supabase 配置
const SUPABASE_URL = 'https://oylnjffrjdjaooeaqtvl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bG5qZmZyamRqYW9vZWFxdHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NTAwMDMsImV4cCI6MjA4NTMyNjAwM30.1V70qcXvATKaBCVtK9sdLGK7-l2cxa4muLonpVGmiM8';

// 动态加载 Supabase 库并初始化
let supabaseClient = null;

async function initSupabase() {
    try {
        // 创建一个脚本来加载 Supabase 库
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
        script.onload = () => {
            try {
                // 使用全局的 supabase 对象
                supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                console.log('✅ Supabase 客户端初始化成功');
            } catch (error) {
                console.error('❌ Supabase 客户端初始化失败:', error);
            }
        };
        script.onerror = () => {
            console.error('❌ Supabase 库加载失败');
        };
        document.head.appendChild(script);
    } catch (error) {
        console.error('❌ Supabase 初始化失败:', error);
    }
}

// 初始化 Supabase
initSupabase();

// ==================== 联系表单验证和提交 ====================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// 表单验证规则
const validators = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        validate: (value) => {
            if (value.trim().length < 2) {
                return '姓名至少需要2个字符';
            }
            if (value.trim().length > 50) {
                return '姓名不能超过50个字符';
            }
            return '';
        }
    },
    email: {
        required: true,
        validate: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return '请输入有效的邮箱地址';
            }
            return '';
        }
    },
    phone: {
        required: false,
        validate: (value) => {
            if (value.trim() && !/^[\d\s\-+()]+$/.test(value)) {
                return '请输入有效的电话号码';
            }
            return '';
        }
    },
    subject: {
        required: true,
        minLength: 2,
        maxLength: 100,
        validate: (value) => {
            if (value.trim().length < 2) {
                return '主题至少需要2个字符';
            }
            if (value.trim().length > 100) {
                return '主题不能超过100个字符';
            }
            return '';
        }
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 500,
        validate: (value) => {
            if (value.trim().length < 10) {
                return '消息内容至少需要10个字符';
            }
            if (value.trim().length > 500) {
                return '消息内容不能超过500个字符';
            }
            return '';
        }
    }
};

// 实时验证（当用户输入时）
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
    field.addEventListener('blur', () => {
        validateField(field);
    });

    field.addEventListener('input', () => {
        // 清除错误状态（当用户开始输入时）
        const errorElement = document.getElementById(`${field.id}Error`);
        if (errorElement && errorElement.textContent) {
            field.classList.remove('error');
            errorElement.textContent = '';
        }
    });
});

// 验证单个字段
function validateField(field) {
    const fieldName = field.name;
    const validator = validators[fieldName];
    const errorElement = document.getElementById(`${field.id}Error`);

    // 如果没有对应的错误元素，跳过验证（可选字段可能没有错误提示）
    if (!errorElement) {
        return true;
    }

    // 清除之前的错误状态
    field.classList.remove('error');
    errorElement.textContent = '';

    // 检查必填字段
    if (validator.required && !field.value.trim()) {
        showError(field, errorElement, '此字段为必填项');
        return false;
    }

    // 如果字段有值，运行自定义验证
    if (field.value.trim() && validator.validate) {
        const error = validator.validate(field.value);
        if (error) {
            showError(field, errorElement, error);
            return false;
        }
    }

    return true;
}

// 显示错误信息
function showError(field, errorElement, message) {
    field.classList.add('error');
    errorElement.textContent = message;
}

// 表单提交处理
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 验证所有字段
    const fields = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // 如果验证通过，提交表单
    if (isValid) {
        submitForm();
    }
});

// 提交表单（直接提交到 Supabase）
async function submitForm() {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // 显示加载状态
    submitButton.disabled = true;
    submitButton.textContent = '发送中...';

    try {
        // 检查 Supabase 是否已初始化
        if (!supabaseClient) {
            throw new Error('Supabase 客户端未初始化，请刷新页面重试');
        }

        // 收集表单数据
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim() || null,
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // 插入数据到 Supabase
        const { data, error } = await supabaseClient
            .from('contact_messages')
            .insert([formData])
            .select();

        if (error) {
            throw error;
        }

        console.log('✅ 数据提交成功:', data);

        // 隐藏表单，显示成功消息
        contactForm.style.display = 'none';
        successMessage.classList.remove('hidden');

    } catch (error) {
        console.error('❌ 表单提交失败:', error);

        // 显示错误提示
        alert(`提交失败：${error.message || '未知错误'}\n请稍后重试或联系管理员`);

        // 重置按钮状态
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    } finally {
        // 无论成功或失败，都重置按钮（如果成功，表单已被隐藏）
        if (contactForm.style.display !== 'none') {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
}

// 重置表单
function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'block';
    successMessage.classList.add('hidden');
    
    // 清除所有错误状态
    document.querySelectorAll('#contactForm .error').forEach(el => {
        el.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

// ==================== 页面加载完成后的初始化 ====================

document.addEventListener('DOMContentLoaded', () => {
    // 设置初始的导航链接活动状态
    updateActiveNavLink();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 平滑滚动到锚点（兼容性处理）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==================== 实用功能 ====================

// 防抖函数（用于优化性能）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数（用于优化滚动事件性能）
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 将节流应用到滚动事件监听
const throttledScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', throttledScroll);

// 检测设备类型（用于响应式优化）
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// 监听窗口大小变化
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // 关闭移动端菜单（如果窗口变大）
        if (!isMobile()) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// ==================== 性能优化 ====================

// 懒加载图片（当添加图片时可以使用）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 添加淡入动画（当元素进入视口时）
function observeElements() {
    const elements = document.querySelectorAll('.about-card, .service-card');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        elementObserver.observe(el);
    });
}

// 初始化动画观察器
document.addEventListener('DOMContentLoaded', observeElements);

console.log('✅ 网站加载完成！');
console.log('🎨 当前主题:', document.documentElement.getAttribute('data-theme') || 'light');
console.log('📱 设备类型:', isMobile() ? '手机' : isTablet() ? '平板' : '桌面');
console.log('🗄️ Supabase 状态:', supabaseClient ? '已连接' : '正在加载...');
