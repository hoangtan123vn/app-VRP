function Validator(options){

    var selectorRules={};

    function validate(inputElement, rule){

        
        var errorElement = inputElement.parentElement.querySelector('.form-message')
        // var errorMessage =rule.test(inputElement.value);
        var errorMessage;
        // lấy ra các rule của selector
        var rules = selectorRules[rule.selector];  
        for (var i = 0; i < rules.length; i++){
            
           //lặp qua từng rules và ktra nếu có lỗi thì dừng
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }

        if(errorMessage){
           errorElement.innerText = errorMessage;
           inputElement.parentElement.classList.add('invalid');
       } else{
           errorElement.innerText ='';
           inputElement.parentElement.classList.remove('invalid');
       }
    }
    // lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if(formElement){
        formElement.onsubmit = function (e){
            e.preventDefault();

            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector)
                validate(inputElement, rule);
            });
        }
        // lặp qua mỗi rule và xử lý
        options.rules.forEach(function(rule){
        
        // Lưu lại rule
        if(Array.isArray(selectorRules[rule.selector])){
            selectorRules[rule.selector].push(rule.test);
        }   else {
            selectorRules[rule.selector] = [rule.test];
        }
            var inputElement = formElement.querySelector(rule.selector)
           
        if(inputElement){
            //Xử lý trường hợp không điền
            inputElement.onblur = function(){
            validate(inputElement, rule);
            }
            // Xử lý nhập
            inputElement.oninput = function(){
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                errorElement.innerText='';
                inputElement.parentElement.classList
            }
        }
    });
}
}
//định nghĩa rules
// nguyeen tawcs cua cac rules
// 1. khi co loi tra ra message loi
// 2. khi hop le khong tra gi ca
Validator.isRequired = function(selector, message){
    return{
        selector: selector,
        test: function(value){
            return value.trim() ? undefined: message || 'Please fill in this form'
        }
    };
}
Validator.minLength = function(selector,min,message){
    return{
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined:  message || `Please enter a minimum of  ${min} characters`
        }
    };
}
Validator.isNumber = function (selector) {
    return {
        selector:selector,
        test: function(value){
            var reg = /^-?\d*\.?\d*$/
    return reg.test(value) ? undefined :'Only number please';
}
}
}
Validator.isPhone = function (selector) {
    return {
        selector:selector,
        test: function(value){
            var regExp= /^[0][1-9]\d{8}$|^[1-9]\d{9}$/;
    return regExp.test(value) ? undefined :'Please enter your correct number';
}
}
}

// Hình
// function show(input) {
//     debugger;
//     var validExtensions = ['jpg','png','jpeg']; //array of valid extensions
//     var fileName = input.files[0].name;
//     var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
//     if ($.inArray(fileNameExt, validExtensions) == -1) {
//         input.type = ''
//         input.type = 'file'
//         $('#user_img').attr('src',"");
//         alert("Only these file types are accepted : "+validExtensions.join(', '));
//     }
//     else
//     {
//     if (input.files && input.files[0]) {
//         var filerdr = new FileReader();
//         filerdr.onload = function (e) {
//             $('#user_img').attr('src', e.target.result);
//         }
//         filerdr.readAsDataURL(input.files[0]);
//     }
//     }
// }
// function isValidPhoto(fileName)
// {
//     var allowed_extensions = new Array("jpg","png");
//     var file_extension = fileName.split('.').pop().toLowerCase(); 

//     for(var i = 0; i <= allowed_extensions.length; i++)
//     {
//         if(allowed_extensions[i] == file_extension)
//         {
//             return true; // valid file extension
//         }
//     }

//     return false;
// }
let modalBtns = [...document.querySelectorAll(".button1")];
modalBtns.forEach(function (btn) {
  btn.onclick = function () {
    let modal = btn.getAttribute("data-modal");
    document.getElementById(modal).style.display = "block";
  };
});
let closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function (btn) {
  btn.onclick = function () {
    let modal = btn.closest(".modal");
    modal.style.display = "none";
  };
});
window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
};

Validator({
    form: '#form-1',
    errorSelector:'.form-message',
    rules:[
        Validator.isRequired('#fullname','Please fill in your full name'),
        Validator.isRequired('#username','Please enter your username'),
        Validator.isRequired('#address', 'Please enter your address'),
        Validator.isRequired('#phone','Please enter your phone number'),
        Validator.isRequired('#age','Please enter your age'),
        Validator.isRequired('#password','Please enter your password'),
        Validator.minLength('#password',6),
        Validator.isNumber('#phone'),
        Validator.isPhone('#phone'),'Please enter your correct number',
        Validator.isNumber('#age'),
    ]
});

function RegisterUser(){
    const token = localStorage.getItem('accessToken')
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(password)
    var select = document.getElementById("vehicle");
    var option = select.options[select.selectedIndex];
    var Capacity = option.id;
    const fullname = document.getElementById('fullname').value;
    const age = document.getElementById('age').value;
    const phonenumber = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const vehicle = {id_vehicle : Capacity}
    axios.post("http://localhost:2711/api/auth/register",{
    username,
    password,
    fullname,
    age,
    phonenumber,
    address,
    vehicle
    },
    {
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      }).then(responseData =>{
        console.log(responseData)
        swal({
            title:"Create Success",
            icon: "success",
          });
      })
    }


document.getElementById("create-user").addEventListener("click",RegisterUser) 