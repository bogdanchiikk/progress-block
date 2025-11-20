class ProgressBlock {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.CIRCLE_LENGTH = 283;
        
        this.settings = {
            value: options.value || 0,
            animated: options.animated || false,
            hidden: options.hidden || false,
            color: options.color || '#0066ff',
            size: options.size || 180
        };
        
        this.init();
    }
    
    init() {
        this.createHTML();
        this.render();
    }
    
    createHTML() {
        this.container.innerHTML = `
            <div class="progress-block">
                <svg class="progress-svg" viewBox="0 0 100 100">
                    <circle class="bg" cx="50" cy="50" r="45"></circle>
                    <circle class="progress" cx="50" cy="50" r="45"></circle>
                </svg>
            </div>
        `;
        
        this.blockElement = this.container.querySelector('.progress-block');
        this.arcElement = this.container.querySelector('.progress');
        
        this.blockElement.style.width = `${this.settings.size}px`;
        this.blockElement.style.height = `${this.settings.size}px`;
        this.arcElement.style.stroke = this.settings.color;
    }
    
    setValue(val) {
        this.settings.value = Math.max(0, Math.min(100, val));
        this.render();
        return this;
    }
    
    setAnimated(animated) {
        this.settings.animated = animated;
        this.render();
        return this;
    }
    
    setHidden(hidden) {
        this.settings.hidden = hidden;
        this.render();
        return this;
    }
    
    getValue() {
        return this.settings.value;
    }
    
    render() {
        const offset = this.CIRCLE_LENGTH - (this.CIRCLE_LENGTH * this.settings.value / 100);
        this.arcElement.style.strokeDashoffset = offset;
        
        this.blockElement.style.opacity = this.settings.hidden ? "0" : "1";
        
        if (this.settings.animated) {
            this.blockElement.classList.add("animated");
        } else {
            this.blockElement.classList.remove("animated");
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const progress = new ProgressBlock('progressContainer', {
        value: 50,
        animated: false,
        hidden: false
    });
    
    const input = document.getElementById("valueInput");
    const animateToggle = document.getElementById("animateToggle");
    const hideToggle = document.getElementById("hideToggle");
    const errorMessage = document.getElementById("errorMessage");
    
    function showError() {
        input.classList.add('input-error');
        errorMessage.style.display = 'block';
    }
    
    function hideError() {
        input.classList.remove('input-error');
        errorMessage.style.display = 'none';
    }
    
    function validateInput(value) {
        const numValue = parseInt(value);
        
        if (isNaN(numValue) || numValue < 0 || numValue > 100) {
            showError();
            return false;
        } else {
            hideError();
            return true;
        }
    }
    
    input.addEventListener("input", function() {
        let value = this.value;
        
        if (!validateInput(value)) {
            // Если значение невалидное, но пользователь ещё вводит - не блокируем ввод
            return;
        }
        
        const numValue = parseInt(value);
        progress.setValue(numValue);
    });
    
    input.addEventListener("change", function() {
        let value = parseInt(this.value);
        
        if (isNaN(value)) {
            value = 0;
        } else if (value < 0) {
            value = 0;
        } else if (value > 100) {
            value = 100;
        }
        
        this.value = value;
        validateInput(value);
        progress.setValue(value);
    });
    
    input.addEventListener("blur", function() {
        let value = parseInt(this.value);
        
        if (isNaN(value)) {
            value = 0;
            this.value = 0;
        } else if (value < 0) {
            value = 0;
            this.value = 0;
        } else if (value > 100) {
            value = 100;
            this.value = 100;
        }
        
        validateInput(value);
        progress.setValue(value);
    });
    
    // Предотвращаем ввод нечисловых символов
    input.addEventListener("keypress", function(e) {
        const charCode = e.which ? e.which : e.keyCode;
        // Разрешаем: цифры, backspace, delete, tab
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    });
    
    animateToggle.addEventListener("change", function() {
        progress.setAnimated(this.checked);
    });
    
    hideToggle.addEventListener("change", function() {
        progress.setHidden(this.checked);
    });
    
    // Инициализация
    input.value = progress.getValue();
    validateInput(input.value);
});