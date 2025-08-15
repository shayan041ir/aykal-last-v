
// Image Preview
document.getElementById('mainImageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('mainImagePreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert('لطفاً یک فایل تصویری معتبر انتخاب کنید.');
    }
});

// Dynamic List Management (Example for Features)
const featuresList = document.getElementById('features-list');
const addFeatureBtn = document.getElementById('add-feature-btn');

addFeatureBtn.addEventListener('click', function() {
    const featureItem = document.createElement('div');
    featureItem.className = 'd-flex mb-2';
    featureItem.innerHTML = `
        <input type="text" class="form-control me-2" placeholder="عنوان ویژگی">
        <button type="button" class="btn btn-outline-danger btn-sm">حذف</button>
    `;
    featureItem.querySelector('.btn-danger').addEventListener('click', () => featureItem.remove());
    featuresList.appendChild(featureItem);
});

// Save Features (Example)
document.getElementById('save-features-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const features = Array.from(featuresList.querySelectorAll('input')).map(input => input.value);
    console.log('ویژگی‌ها ذخیره شدند:', features);
    alert('ویژگی‌ها با موفقیت ذخیره شدند!');
});

// Initialize Quill Editor for Caption
const quill = new Quill('#mainImageCaptionEditor', {
    theme: 'snow',
    modules: {
        toolbar: [['bold', 'italic'], ['link'], [{ list: 'ordered' }, { list: 'bullet' }]]
    }
});
