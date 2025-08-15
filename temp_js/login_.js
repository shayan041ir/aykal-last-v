const phone_number_regex = /^09\d{9}$/;	
function checker(event){
    event.preventDefault(); // Don't let the form reload the page

    let phone_number = document.getElementById('mobile-input').value;
    let code = document.getElementById('otp-input').value;
    if (phone_number) {
        if (phone_number_regex.test(phone_number) && ! code) {
            // Send request to your API
            fetch('/api/check_phone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phone_number
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Server says:', data);
                if (data.status=='1') {
                    if (data.user=='1'){
                        console.log('user is registerd to db')
                    }else{
                        console.log('user is  not found/registerd to db')
                    }
                    document.getElementById('otp-section').style.display = 'block';
                } else {
                    alert('خطا: ' );
                }
            })
            .catch(error => {
                console.error('Error contacting server:', error);
                alert('مشکلی پیش آمده است');
            });
        } 
        else if(phone_number && code){
            fetch('/api/check_code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phone_number,
                    vcode:code
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Server says:', data);
                if (data.redirect_url) {
                    window.location.href = data.redirect_url;  // Redirect user
                } else if (data.error) {
                    alert(data.error); // Show error message
                }
            })
            .catch(error => {
                console.error('Error contacting server:', error);
                alert('مشکلی پیش آمده است');
            });
        }
        else {
            console.log('Number is not ok');
            alert('شماره موبایل معتبر نیست');
        }
    }
}
const button = document.getElementById('submit-btn');
//main register
button.addEventListener('click',checker);
// Remove required from hidden inputs
document.addEventListener('DOMContentLoaded', function() {
    const hiddenInputs = document.querySelectorAll('#otp-section input, #new-user-section input');
    hiddenInputs.forEach(input => {
        input.removeAttribute('required');
    });
});