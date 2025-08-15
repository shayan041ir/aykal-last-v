// Function to update the user count slider and input
function updateUserCount() {
    const slider = document.querySelector('input[type="range"]');
    const numberInput = document.querySelector('input[type="number"]');

    if (slider && numberInput) {
        slider.addEventListener('input', (e) => {
            numberInput.value = e.target.value;
        });

        numberInput.addEventListener('input', (e) => {
            if (e.target.value > 1000) e.target.value = 1000;
            if (e.target.value < 1) e.target.value = 1;
            slider.value = e.target.value;
        });
    }
}

// Function to show users in modal
function showUsersModal(group) {
    const modal = new bootstrap.Modal(document.getElementById('viewUsersModal'));
    const usersList = document.getElementById('usersList');
    const usersCount = document.getElementById('usersCount');
    const copyAllButton = document.getElementById('copyAllUsers');

    document.getElementById('viewUsersModalLabel').textContent = `لیست کاربران - ${group.name}`;
    usersCount.textContent = group.memberCount;

    usersList.innerHTML = '';
    group.users.forEach((userId, index) => {
        const userItem = document.createElement('div');
        userItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        userItem.innerHTML = `
            <span class="text-muted">${index + 1}.</span>
            <span class="flex-grow-1 text-center">${userId}</span>
            <button class="btn btn-sm btn-outline-primary copy-user" data-user="${userId}">
                <i class="fe fe-copy"></i>
            </button>
        `;
        usersList.appendChild(userItem);
    });

    copyAllButton.onclick = () => {
        const allUsers = group.users.join('\n');
        navigator.clipboard.writeText(allUsers).then(() => {
            const originalText = copyAllButton.innerHTML;
            copyAllButton.innerHTML = '<i class="fe fe-check me-1"></i>کپی شد';
            setTimeout(() => {
                copyAllButton.innerHTML = originalText;
            }, 2000);
        });
    };

    // Delegate individual copy
    usersList.querySelectorAll('.copy-user').forEach(button => {
        button.addEventListener('click', (e) => {
            const userId = e.currentTarget.dataset.user;
            navigator.clipboard.writeText(userId).then(() => {
                const original = e.currentTarget.innerHTML;
                e.currentTarget.innerHTML = '<i class="fe fe-check"></i>';
                setTimeout(() => {
                    e.currentTarget.innerHTML = original;
                }, 2000);
            });
        });
    });

    modal.show();
}

// Function to add event listeners to group buttons
function addGroupEventListeners() {
    // View group
    document.querySelectorAll('.view-group').forEach(button => {
        button.addEventListener('click', (e) => {
            const groupId = e.currentTarget.dataset.id;
            const group = sampleGroups.find(g => g.id == groupId);
            if (group) showUsersModal(group);
        });
    });

    // Copy group
    document.querySelectorAll('.copy-group').forEach(button => {
        button.addEventListener('click', (e) => {
            const groupId = e.currentTarget.dataset.id;
            const group = sampleGroups.find(g => g.id == groupId);
            if (!group) return;

            const allUsers = group.users.join('\n');
            navigator.clipboard.writeText(allUsers).then(() => {
                const original = e.currentTarget.innerHTML;
                e.currentTarget.innerHTML = '<i class="fe fe-check me-1"></i>کپی شد!';
                setTimeout(() => {
                    e.currentTarget.innerHTML = original;
                }, 2000);
            });
        });
    });

    // Delete group
    document.querySelectorAll('.delete-group').forEach(button => {
        button.addEventListener('click', (e) => {
            const groupId = e.currentTarget.dataset.id;

            if (confirm('آیا از حذف این گروه اطمینان دارید؟')) {
                fetch('/api/del_src_g', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ g_id: groupId })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        alert('گروه با موفقیت حذف شد');
                        const row = e.currentTarget.closest('tr');
                        if (row) row.remove();
                    } else {
                        alert(`خطا: ${data.message}`);
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('خطایی در حذف گروه رخ داد');
                });
            }
        });
    });
}

// Function to handle search form submission
function handleSearchForm() {
    const form = document.getElementById('searchForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchMethod = document.querySelector('input[name="searchMethod"]:checked')?.value || '';
        const target = form.querySelector('input[type="text"]').value.trim();
        const groupName = form.querySelector('input[placeholder="نام گروه جدید را وارد کنید"]').value;
        const userCount = form.querySelector('input[type="number"]').value;

        if (!target || !groupName) {
            alert("فیلدهای ورودی نباید خالی باشند.");
            return;
        }

        fetch('/api/src', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: searchMethod, target, groupName, userCount })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Server response:', data);
            alert('جستجو با موفقیت ثبت شد!');
        })
        .catch(err => {
            console.error('Error:', err);
            alert('خطا در ارسال درخواست!');
        });
    });
}

// Handle search method toggle
function handleSearchMethodChanges() {
    document.querySelectorAll('input[name="searchMethod"]').forEach(method => {
        method.addEventListener('change', (e) => {
            const targetInput = document.querySelector('input[type="text"]');
            if (!targetInput) return;

            switch (e.target.value) {
                case 'hashtag':
                    targetInput.placeholder = 'هشتگ مورد نظر را وارد کنید (مثال: طراحی_وب)';
                    break;
                case 'location':
                    targetInput.placeholder = 'لوکیشن مورد نظر را وارد کنید (مثال: تهران)';
                    break;
                case 'post':
                    targetInput.placeholder = 'لینک پست یا ریلز را وارد کنید';
                    break;
                case 'page':
                    targetInput.placeholder = 'نام کاربری پیج را وارد کنید';
                    break;
            }
        });
    });
}

// Export to text file
function handleExport() {
    const exportButton = document.querySelector('.btn-outline-primary i.fe-download')?.closest('button');
    if (!exportButton) return;

    exportButton.addEventListener('click', () => {
        let exportData = 'بانک کاربران - آیکال\n\n';
        exportData += 'تاریخ خروجی: ' + new Date().toLocaleDateString('fa-IR') + '\n\n';

        sampleGroups.forEach(group => {
            exportData += `\n=== ${group.name} ===\n`;
            exportData += `تعداد اعضا: ${group.memberCount}\n`;
            exportData += `نوع: ${group.type}\n`;
            exportData += `هدف: ${group.target}\n`;
            exportData += `تاریخ ایجاد: ${group.createdAt}\n`;
            exportData += `آخرین بروزرسانی: ${group.lastUpdate}\n\n`;
            exportData += 'آیدی کاربران:\n';
            group.users.forEach((userId, i) => {
                exportData += `${i + 1}. ${userId}\n`;
            });
            exportData += '\n----------------------------------------\n';
        });

        const blob = new Blob([exportData], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_export_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    updateUserCount();
    addGroupEventListeners();
    handleSearchForm();
    handleSearchMethodChanges();
    handleExport();
});
