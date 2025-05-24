function loadDrugs() {
    fetch('/api/drugs')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#drugTable tbody');
            tbody.innerHTML = '';
            data.forEach(drug => {
                const row = `
                    <tr>
                        <td>${drug.id}</td>
                        <td>${drug.name}</td>
                        <td>¥${drug.price.toFixed(2)}</td>
                        <td>${drug.stock}</td>
                        <td>${drug.manufacturer}</td>
                        <td>
                            <button onclick="deleteDrug(${drug.id})">删除</button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        });
}

function addDrug() {
    const drug = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        manufacturer: document.getElementById('manufacturer').value
    };

    fetch('/api/drugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drug)
    }).then(() => {
        loadDrugs();
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('manufacturer').value = '';
    });
}

function deleteDrug(id) {
    fetch(`/api/drugs/${id}`, { method: 'DELETE' })
        .then(() => loadDrugs());
}

window.onload = loadDrugs;