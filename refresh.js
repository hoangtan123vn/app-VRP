setInterval(()=>{
    RefreshTable();
},2000)

function RefreshTable(){
    const token = localStorage.getItem('accessToken')
    const tableDriver = document.getElementById('table-driver')
    axios.get("http://localhost:2711/api/auth/users",{
      headers:{
        'Authorization' : `Bearer ${token}`
      }
    }).then(responseData=>{
      console.log(responseData.data)
      tableDriver.innerHTML = "";
      for(let i=0;i<responseData.data.length;i++){
        var color = "ffcdd2"
        var trangthai = "Khả dụng"
        if(responseData.data[i].role.name_role == "USER"){
           if(responseData.data[i].vehicle.status == 0){
             color = "c8e6c9"
             trangthai = "Khả dụng"
           }
           else if(responseData.data[i].vehicle.status == 1){
            color = "ffcdd2"
            trangthai = "Đang có chuyến đi"
           }
        const tr2 = document.createElement('tr');
        const ShowDriverRoutes = function(){
          showDriver(responseData.data[i].vehicle.id_vehicle)
          ShowUserDetails(responseData.data[i].username)
        }
        tr2.addEventListener('click',ShowDriverRoutes)
        const contentDriver = `<td>${responseData.data[i].vehicle.id_vehicle}</td>
        <td>${responseData.data[i].username}</td>
        <td>${responseData.data[i].fullname}</td>
        <td>${responseData.data[i].age}</td>
        <td>${responseData.data[i].phonenumber}</td>
        <td>${responseData.data[i].vehicle.vehicleType.capacity}</td>
        <td>${responseData.data[i].vehicle.cost}</td>
        <td>${responseData.data[i].vehicle.loading}</td>
        <td  style="background-color: #${color}">${trangthai}</td>`
        tr2.innerHTML = contentDriver;
        tableDriver.appendChild(tr2)
        }
      }
    })
   }


   function ShowUserDetails(username){
    var nameuser = document.getElementById("nameuser")
    const token = localStorage.getItem('accessToken')
      axios.get("http://localhost:2711/api/auth/getUserDetails/"+username,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
      }).then(responseData =>{
        nameuser.innerHTML = "Tài xế " + responseData.data.fullname;
      })
  }