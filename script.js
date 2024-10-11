// header nav bar

const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.nav-bar');

hamburger.addEventListener('click', function(){
    navBar.classList.toggle('active');
    hamburger.classList.toggle('active');
});

const navLink = document.querySelectorAll('.nav-link');

navLink.forEach(function(e){
    e.addEventListener('click', function(e){
        navBar.classList.remove('active');
        hamburger.classList.remove('active');
        if (e.target.className == 'nav-link') {
            navLink.forEach(function(link){
                link.className = 'nav-link';
            });
            e.target.classList.add('active');
        }
    });
});

// scrooling effect

document.querySelectorAll('.nav-bar .nav-item a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);  
        
        targetSection.scrollIntoView({
            behavior: 'smooth', 
            block: 'start'
        });
    });
});

document.querySelector('.content-about-me a').addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// socialMedia
const iconItem = document.querySelectorAll('.icon-item');

iconItem.forEach(function(e){
    e.addEventListener('mouseenter', function(e){
        e.target.classList.add('active-social');
    });
    e.addEventListener('mouseleave', function(e){
        e.target.classList.remove('active-social');
    });
});


// clear untuk line-resume-box

const contentResumeBox = document.querySelectorAll('.content-resume-box');

setInterval(function(){
    contentResumeBox.forEach(function(e){
        e.parentElement.style.height = e.offsetHeight + 'px';
    });
}, 100);



// contact-me send email to gmeil
const form = document.querySelector('form');
const fullName = document.getElementById('full-name');
const emailUser = document.getElementById('email-user');
const messageUser = document.getElementById('message-user');

function sendEmail(){
    const bodyMessage = 'Nama: ' + fullName.value + '<br> E-mail: ' + emailUser.value + '<br> Pesan: <br> ' + messageUser.value;

    Email.send({
        SecureToken : "ea426748-7ccc-4746-a1c7-50d1437334c1",
        To : 'mrpradana2@gmail.com',
        From : "mrpradana2@gmail.com",
        Subject : "Pesan dari Blog",
        Body : bodyMessage
    }).then(
      message => {
        if (message == 'OK'){
            Swal.fire({
                title: "Berhasil terkirim",
                text: "Terima kasih atas pesannya yaa",
                icon: "success"
            });
        }
      }
    );
}

function checkInputs(){
    const items = document.querySelectorAll('.item');
    for (const item of items){
        
        if (item.value == '') {
            item.classList.add('error');
            item.parentElement.classList.add('error');
        }

        if (items[1].value != ''){
            checkEmail();
        }

        items[1].addEventListener('keyup', function(){
            checkEmail();
        });

        item.addEventListener('keyup', () => {
            if (item.value != '') {
                item.classList.remove('error');
                item.parentElement.classList.remove('error');
                item.parentElement.classList.add('valid');
            } else {
                item.classList.add('error');
                item.parentElement.classList.remove('valid');
                item.parentElement.classList.add('error');
            }
        });
        
    }
}

function checkEmail(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTextEmail = document.querySelector('.error-txt.email');

    if (!emailUser.value.match(emailRegex)) {
        emailUser.classList.add('error');
        emailUser.parentElement.classList.add('error');
        emailUser.parentElement.classList.remove('valid');

        if (emailUser.value != ''){
            errorTextEmail.innerHTML = 'E-mail tidak valid!';
        } else {
            errorTextEmail.innerHTML = 'E-mail tidak boleh kosong! diisi dulu ya..';
        }

    } else {
        emailUser.classList.remove('error');
        emailUser.parentElement.classList.remove('error');
        emailUser.parentElement.classList.add('valid')
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains('error') && !emailUser.classList.contains('error') && !messageUser.classList.contains('error')){

        sendEmail();

        form.reset();
        return false;
    }
});
