// Message
$("#but1").click(function(){
    $('body').removeClass('timer-alert');
    var message = $("#message").val();
    if(message == ""){
        message  = "Your message";
    }
    swal(message);
});

// With message and title
$("#but2").click(function(){
    $('body').removeClass('timer-alert');
    var message = $("#message").val();
    var title = $("#title").val();
    if(message == ""){
        message  = "Your message";
    }
    if(title == ""){
        title = "Your message";
    }
    swal(title,message);
});

// Show image
$("#but3").click(function(){
    $('body').removeClass('timer-alert');
    var message = $("#message").val();
    var title = $("#title").val();
    if(message == ""){
        message  = "Your message";
    }
    if(title == ""){
        title = "Your message";
    }
    swal({
        title: title,
        text: message,
        imageUrl: 'assets/img/brand/logo.png'
    });
});

// Timer
$("#but4").click(function(){
    $('body').addClass('timer-alert');
    var message = $("#message").val();
    var title = $("#title").val();
    if(message == ""){
        message  = "Your message";
    }
    if(title == ""){
        title = "Your message";
    }
    message += "(close after 2 seconds)";
    swal({
        title: title,
        text: message,
        timer: 2000,
        showConfirmButton: false
    });
});