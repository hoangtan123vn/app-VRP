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
      console.log(responseData.data.length)
      tableDriver.innerHTML = "";
      for(let i=0;i<responseData.data.length;i++){
        var color = "red"
        var trangthai = "Available"
        if(responseData.data[i].role.name_role == "USER"){
           if(responseData.data[i].vehicle.status == 0){
             color = "green"
             trangthai = "Available"
           }
           else if(responseData.data[i].vehicle.status == 1){
            color = "red"
            trangthai = "Have a routes"
           }
        const tr2 = document.createElement('tr');
        tr2.addEventListener('click',showDriver)
        const contentDriver = `<td>${responseData.data[i].vehicle.id_vehicle}</td>
        <td>${responseData.data[i].username}</td>
        <td>${responseData.data[i].fullname}</td>
        <td>${responseData.data[i].age}</td>
        <td>${responseData.data[i].phonenumber}</td>
        <td>${responseData.data[i].vehicle.capacity}</td>
        <td>${responseData.data[i].vehicle.cost}</td>
        <td>${responseData.data[i].vehicle.loading}</td>
        <td  style="background-color: ${color}">${trangthai}</td>`
        tr2.innerHTML = contentDriver;
        tableDriver.appendChild(tr2)
        }
      }
    })
   }

