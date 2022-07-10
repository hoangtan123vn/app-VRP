const token = localStorage.getItem('accessToken')
axios.get("http://localhost:2711/api/auth/GetListHistoryroutes1",{
  headers:{
    'Authorization' : `Bearer ${token}`
  }
}).then(responseData=>{
    var ListUsers = []
    var ListCountRoutes = []
    var backgroundColor = []
    console.log(responseData.data)
    for(var i=0;i<responseData.data.length;i++){
        if(responseData.data[i].name != "Admin"){
            ListUsers.push(responseData.data[i].name)
            ListCountRoutes.push(responseData.data[i].countRoutes)
        }
        var color = random_rgba();
        backgroundColor.push(color);
        
    }
    var earning = document.getElementById('earning').getContext('2d');
    var myChart = new Chart(earning, {
        type: 'bar',
        data: {
            labels: ListUsers,
            datasets: [{
                label: 'Biểu đồ tài xế có lộ trình nhiều nhất ',
                data: ListCountRoutes,
                backgroundColor: backgroundColor,
               
            }]
        },
        options: {
            responsive:true,
        }
    });    
})




axios.get("http://localhost:2711/api/auth/GetTotalDriver",{
  headers:{
    'Authorization' : `Bearer ${token}`
  }
}).then(responseData=>{
    var ListUsers = []
    var ListTotal = []
    for(var i=responseData.data.length-1;i> (responseData.data.length - 4);i--){
            //console.log(responseData.data[i].name)
            ListUsers.push(responseData.data[i].name)
            ListTotal.push(responseData.data[i].total)
           // console.log(i)
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var earning = document.getElementById('earning').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'polarArea',
    options:{
        plugins: {
            title: {
                display: true,
                text: 'Chart Title'
            }
        },
    },
    data: {
    labels: ListUsers,
    datasets: [{
        data: ListTotal,
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 01)',
            'rgba(255, 206, 86, 1)',
        ],
    }]
    },
options: {
   responsive:true,
}
});     


})

const tableRoutes = document.getElementById('table-history-routes')
axios.get("http://localhost:2711/api/auth/GetListHistoryroutes",{
  headers:{
    'Authorization' : `Bearer ${token}`
  }
}).then(responseData=>{
 console.log(responseData)
 tableRoutes.innerHTML = "";
 
 for(let i=0;i<7;i++){
    
    var trangthai = "Đã hoàn thành"
    var css = "status nobusy"
    if(responseData.data[i].status_route == 1){
            trangthai = "Đã hoàn thành"
            css = "status nobusy"
    }
    else if(responseData.data[i].status_route == 0){
            trangthai = "Đang có chuyến đi"
            css = "status busy"
    }
    console.log(responseData.data[i].status_route)
        // var a = GetUser(responseData.data[i].vehicle.id_vehicle);
        // console.log(a.fullname)
        const tr2 = document.createElement('tr');
        const contentDriver = `<td>${responseData.data[i].id_route}</td>
        <td>${responseData.data[i].vehicle.id_vehicle}</td>
        <td>${responseData.data[i].capacity_route}</td>
        <td>${responseData.data[i].loading_route}</td>
        <td>${responseData.data[i].cost_route}</td>
        <td><span class="${css}">${trangthai}</span></td>`
        tr2.innerHTML = contentDriver;
        tableRoutes.appendChild(tr2)
 }
})

const tableCustomer = document.getElementById('table-customer')
axios.get("http://localhost:2711/api/auth/GetListNodes",{
    headers:{
      'Authorization' : `Bearer ${token}`
    }
  }).then(responseData=>{
    tableCustomer.innerHTML = ""
    for(let i=0;i<4;i++){
        const tr2 = document.createElement('tr');
        const contentDriver = `<td>${responseData.data[i].idnode}</td>
        <td>${responseData.data[i].address}</td>
        <td>${responseData.data[i].demand}</td>`
        tr2.innerHTML = contentDriver;
        tableCustomer.appendChild(tr2)
    }
  })



// var myChart = new Chart(earning, {
//     type: 'bar',
//     data: {
//         labels: ['T1', 'T2', 'T3', 'T4','T5','T6','T7','T8','T9','T10','T11','T12',],
//         datasets: [{
//             label: 'Earning',
//             data: [1200, 1900, 3000, 5555, 2300, 3450,2000,5600,7800,2000,4000,9500],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
       
//         }]
//     },
//     options: {
//         responsive:true,
//     }
// });

function GetUser(id_vehicle){
    const token = localStorage.getItem('accessToken')
    var value = new Object({fullname: ""});;
    $.ajax({
        type: 'GET',
        url: "http://localhost:2711/api/auth/GetUserInfo/"+id_vehicle,
        headers : {
            'Authorization' : `Bearer ${token}`
        },
        dataType: 'json',
        contentType: false,
        processData:false,//this is a must
        success: function(response){ 
          //  console.log(response.fullname)
            value.fullname = response.fullname
        }
    });
    console.log(value)
    return value   
}


function random_rgba() {
var o = Math.round, r = Math.random, s = 255;
return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

