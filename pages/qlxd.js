function init(){
   const tableDriver = document.getElementById('table-driver')
   const token = localStorage.getItem('accessToken')
   
    //GET DRIVER DETAILS
  function driverDetails(){
  axios.get("http://localhost:2711/api/auth/users",{
    headers:{
      'Authorization' : `Bearer ${token}`
    }
  }).then(responseData=>{
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

driverDetails()
//FetchDropDown();
}

function RefreshDriver(){
    const tableDriver = document.getElementById('table-driver')
    const token = localStorage.getItem('accessToken')
    axios.post("http://localhost:2711/api/auth/refresh",{
    }
    ,{
      headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json'
      }
    }).then(responseData =>{
      console.log(responseData)
      tableDriver.innerHTML = "";
      for(let i=0;i<responseData.data.length;i++){
        var color = "ffcdd2"
        var trangthai = "Khả dụng"
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
    })
   }

document.getElementById("refresh-status").addEventListener("click",RefreshDriver)
document.getElementById("add-vehicle").addEventListener("click",AddVehicleForm)
document.getElementById("add-driver-type").addEventListener("click",AddVehicle)

const AddVehiclesForm = document.getElementById("modalListNodes2")
function AddVehicleForm(){
  AddVehiclesForm.style.display= "block";
  const token = localStorage.getItem('accessToken')
  const TableListVehicles = document.getElementById("table-list-vehicles")
  axios.get("http://localhost:2711/api/auth/GetVehiclesType",{
      headers:{
          'Authorization': `Bearer ${token}`
      }
    }).then(responseData =>{
      TableListVehicles.innerHTML = ""
      for(let i=0;i<responseData.data.length;i++){
        const tr2 = document.createElement('tr');
        const contentDriver = `<td>${responseData.data[i].id_type}</td>
        <td>${responseData.data[i].name_type}</td>
        <td>${responseData.data[i].capacity}</td>`
        tr2.innerHTML = contentDriver;
        TableListVehicles.appendChild(tr2)
      }
      
    })
}

function AddVehicle(){
  const btnAddDriver = document.getElementById('add-driver-type')
  const token = localStorage.getItem('accessToken')
  var name_type = document.getElementById('name_vehicle').value
  var capacity = document.getElementById('capacity').value
  const TableListVehicles = document.getElementById("table-list-vehicles")
  axios.post("http://localhost:2711/api/auth/addVehicleType",{
      name_type,
      capacity
    },
      {
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      }).then(responseData =>{
        const tr2 = document.createElement('tr');
        const contentDriver = `<td>${responseData.data.id_type}</td>
        <td>${responseData.data.name_type}</td>
        <td>${responseData.data.capacity}</td>`
        tr2.innerHTML = contentDriver;
        TableListVehicles.appendChild(tr2)
        swal({
          title: "Thêm loại xe thành công!",
          text: "Success!",
          icon: "success",
        })
      })
}

// function FetchDropDown(){
//   var List = []
//   const token = localStorage.getItem('accessToken')
//   var selector = document.getElementById('vehicle')
//   axios.get("http://localhost:2711/api/auth/GetVehiclesType",{
//       headers:{
//           'Authorization': `Bearer ${token}`
//       }
//     }).then(responseData =>{
//       for(let i=0;i<responseData.data.length;i++){
//         var id_type = responseData.data[i].id_type;
//         var name_type = responseData.data[i].name_type;
//         var capacity = responseData.data[i].capacity;
//         List.push(responseData.data[i])
//       }
//       List.forEach(function(item){
//         // selector.appendChild('')
//         var option = document.createElement('option');
//         option.id = item.id_type
//         option.value = item.capacity;
//         option.innerHTML = item.name_type;
//         selector.appendChild(option)
//      })
//     })
    
// }

function SearchDriver(){
  var table = $('#list-driver').DataTable();
}
document.getElementById("search-driver").addEventListener("click",SearchDriver)  


var span = document.getElementsByClassName("closeModal2")[0]

span.onclick = function() {
  AddVehiclesForm.style.display = "none";
}




window.init = init;