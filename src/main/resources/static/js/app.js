// dragstore/src/main/resources/static/js/app.js

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化侧边栏切换
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    // 初始化数字时钟
    updateClock();
    setInterval(updateClock, 1000);

    // 初始加载全部药品
    loadDrugs();

    // 初始化添加药品表单提交
    const addDrugForm = document.getElementById('addDrugForm');
    if (addDrugForm) {
        addDrugForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addDrug();
        });
    }
});

// 侧边栏切换
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

// 数字时钟更新
function updateClock() {
    const clock = document.getElementById('digitalClock');
    if (clock) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        clock.textContent = time;
    }
}

// 加载所有药品
function loadDrugs() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const drugTable = document.getElementById('drugTable');
    const noDataMessage = document.getElementById('noDataMessage');

    // 显示加载状态
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');
    if (drugTable) drugTable.classList.add('hidden');
    if (noDataMessage) noDataMessage.classList.add('hidden');

    // 调用API
    fetch('/api/drugs')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderDrugTable(data);
        })
        .catch(error => {
            console.error('加载药品失败:', error);
            alert('加载药品数据失败，请稍后重试');
        })
        .finally(() => {
            if (loadingIndicator) loadingIndicator.classList.add('hidden');
        });
}

// 渲染药品表格
function renderDrugTable(drugs) {
    const tableBody = document.getElementById('drugTableBody');
    const drugTable = document.getElementById('drugTable');
    const noDataMessage = document.getElementById('noDataMessage');

    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (drugs && drugs.length > 0) {
        drugs.forEach(drug => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${drug.id}</td>
                <td class="px-6 py-4 whitespace-nowrap">${drug.name}</td>
                <td class="px-6 py-4 whitespace-nowrap">¥${drug.price.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap">${drug.stock}</td>
                <td class="px-6 py-4 whitespace-nowrap">${drug.manufacturer}</td>
                <td>
                    <button onclick="deleteDrug(${drug.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors">
                        删除
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        if (drugTable) drugTable.classList.remove('hidden');
        if (noDataMessage) noDataMessage.classList.add('hidden');
    } else {
        if (drugTable) drugTable.classList.add('hidden');
        if (noDataMessage) noDataMessage.classList.remove('hidden');
    }
}

// 添加药品
function addDrug() {
    const name = document.getElementById('name')?.value.trim();
    const price = parseFloat(document.getElementById('price')?.value);
    const stock = parseInt(document.getElementById('stock')?.value);
    const manufacturer = document.getElementById('manufacturer')?.value.trim();

    // 基本验证
    if (!name || isNaN(price) || isNaN(stock) || !manufacturer) {
        alert('请填写所有必填字段并确保价格和库存为数字');
        return;
    }

    const drug = {
        name,
        price,
        stock,
        manufacturer
    };

    // 显示加载状态
    const submitButton = document.querySelector('#addDrugForm button[type="submit"]');
    const originalText = submitButton?.innerHTML;
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i>添加中...';
    }

    // 发送请求
    fetch('/api/drugs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(drug)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`添加药品失败: ${response.statusText}`);
            }
            return response.json();
        })
        .then(() => {
            alert('药品添加成功!');
            // 重置表单
            document.getElementById('name').value = '';
            document.getElementById('price').value = '';
            document.getElementById('stock').value = '';
            document.getElementById('manufacturer').value = '';

            // 重新加载药品列表
            loadDrugs();
        })
        .catch(error => {
            console.error('添加药品失败:', error);
            alert('添加药品失败，请检查输入并稍后重试');
        })
        .finally(() => {
            // 恢复按钮状态
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
}

// 删除药品
// JavaScript 删除函数（独立逻辑，无需选择药品）
// 修正：使用函数参数 drugId 而非全局变量
// 打开确认模态框时传递 drugId
function openConfirmDeleteModal(drugId) {
    currentDrugId = drugId; // ✅ 正确设置全局变量
    document.getElementById('confirmDeleteModal').style.display = 'flex';
}

// 模态框确认按钮的点击事件
document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
    if (currentDrugId) {
        deleteDrug(currentDrugId); // 使用全局变量
        closeDeleteModal();
    }
});