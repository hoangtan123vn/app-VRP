const ButtonLogin = document.getElementById("login")



const sendHttpRequest = (method,url,data) => {
    return fetch(url,{
        method : method,
        body : JSON.stringify(data),
        headers :data ? {'Content-Type':'application/json'} : {}
    })
    .then(response =>{
        if(response.status >= 400){
            alert('Đăng nhập thất bại')
        }
        else if(response.status == 200){
            return response.json()
        }
       // console.log(response.status)  
    })
   
        
}




// const getData = () =>{
//     sendHttpRequest('GET','http://localhost')
// }

const postData = () =>{
    var taikhoan = document.getElementById("username").value;
    var matkhau = document.getElementById("password").value;
    sendHttpRequest('POST','http://localhost:2711/api/auth/login',{
        username : taikhoan,
        password : matkhau,
    })
    .then(responseData=>{
        // if(responseData.status >= 400){
        //     alert("Đăng nhập thất bại")
        // }else if(responseData.status == 200){
            console.log(responseData.status)
            localStorage.setItem("accessToken",responseData.token)
            window.location.replace("/index.html");
        // }
    })

}


ButtonLogin.addEventListener('click',postData)

