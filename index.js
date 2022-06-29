// Initialize and add the map
 // const uluru = { lat: 10.7797855, lng: 106.6990189 };
 let map;
//  const depot = { lat: 10.7797855, lng: 106.6990189 };

 function initMap() {
  
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  // const diemdi = "Nhà Thờ Đức Bà";
  // const diemden = "Dinh Độc Lập"
  
  
  //INITMAP
   map = new google.maps.Map(document.getElementById("map"), {
     zoom: 14,
     center: new google.maps.LatLng(10.7797855, 106.6990189),
    // mapTypeId: "terrain",
   });

   directionsRenderer.setMap(map);

   const Buttonclick = function () {
    var org = document.getElementById("shipments").value
    var destination = document.getElementById("depot").value
    calculateAndDisplayRoute(directionsService, directionsRenderer,org,destination);
  };
  



  document.getElementById("button-draw").addEventListener("click", Buttonclick);
   


  //  //MARKER
  //  const marker = new google.maps.Marker({
  //   position: depot,
  //   map: map,
  //   icon:{
  //     url : "depot.jpg",
  //     scaledSize: new google.maps.Size(50,50)
  //   }
  // });

  // const infodepot = new google.maps.InfoWindow({
  //   content: "<p>Depot Location: Nhà thờ Đức Bà" + marker.getPosition() + "</p>",
  // });


  // google.maps.event.addListener(marker, "click", () => {
  //   infodepot.open(map, marker);
  // });

  // //CREATE A SHIPMENTS
  // const shipments = [
  //   [
  //     "Customer1",
  //     10.802032225809022,
  //     106.66470714046268,
  //     "box.png",
  //     50,
  //     50,
  //   ],
  //   [
  //     "Customer2",
  //     10.786892962369834, 
  //     106.66518457361803,
  //     "box.png",
  //     50,
  //     50,
  //   ],
  //   [
  //     "Customer3",
  //     10.801740437056125, 
  //     106.71454058111348,
  //     "box.png",
  //     50,
  //     50,
  //   ], 
  //   [
  //     "Customer4",
  //     10.767454712148114, 
  //     106.69399452103617,
  //     "box.png",
  //     50,
  //     50,
  //   ],   
  //   [
  //     "Customer5",
  //     10.776280752100092, 
  //     106.72411778387564,
  //     "box.png",
  //     50,
  //     50,
  //   ], 
  // ]

  // console.log(shipments)

  // for(let i=0;i<shipments.length;i++){
  //   const currentMarker = shipments[i];
  //   const marker = new google.maps.Marker({
  //     position: {lat : currentMarker[1],lng : currentMarker[2]},
  //     map: map,
  //     title: currentMarker[0] ,
  //     icon:{
  //       url : "box.png",
  //       scaledSize: new google.maps.Size(50,50)
  //     }
  //   });

  //   const infocustomer = new google.maps.InfoWindow({ 
  //     content: "<p>"+currentMarker[0] +"  "+ currentMarker[1] + "," + currentMarker[2] + "</p>",
  //   })

  //   google.maps.event.addListener(marker, "click", () => {
  //     infocustomer.open(map, marker);
  // });

  // }

   //SEARCHBOX
   var input_customers = document.getElementById("shipments");
   var input_depot = document.getElementById("depot");
   var autocomplete = new google.maps.places.Autocomplete(input_customers);
   var autocomplete1 = new google.maps.places.Autocomplete(input_depot);
   const Depot = []
   const Node = []
   var i=1;

   //ADD MARKER CUSTOMER
   autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    
    // console.log(place)
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    const location_customer = {address : place.formatted_address,lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), demand : Math.floor(Math.random() * 50) + 1 };
    AddCustomer(location_customer,i);
    const customer = new google.maps.Marker({     
      position: location_customer,
      map: map,
      icon:{
        url : "box.png",
        scaledSize: new google.maps.Size(50,50)
      }
    });

    //UPDATE CUSTOMER 
    Node.push(location_customer);
  

    const infomarker = new google.maps.InfoWindow({ 
      content: "<p>"+place.formatted_address +"  "+ place.geometry.location.lat() + " "+place.geometry.location.lng() + "</p>",
    })

    google.maps.event.addListener(customer, "click", () => {
      infomarker.open(map, customer);
  });
  i++;    
});
               
  //ADD MARKER DEPOT
  
  autocomplete1.addListener('place_changed', function() {
    var place = autocomplete1.getPlace();
    console.log(place.LatLng);
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    const location_depot = { address : place.formatted_address,lat: place.geometry.location.lat(), lng: place.geometry.location.lng(),demand : 0 };
    const depot = new google.maps.Marker({
      position: location_depot,
      map: map,
      icon:{
        url : "depot.jpg",
        scaledSize: new google.maps.Size(50,50)
      }
    });
    disableFunction()

    Depot.push(location_depot)
    console.log(Depot)


    const infodepot = new google.maps.InfoWindow({ 
      content: "<p>"+place.formatted_address +"  "+ place.geometry.location.lat() + " "+place.geometry.location.lng() + "</p>",
    })

    google.maps.event.addListener(depot, "click", () => {
      infodepot.open(map, depot);

    });
  });


 // Loop through the results array and place a marker for each
 // set of coordinates.
 /*const eqfeed_callback = function (results) {
   for (let i = 0; i < results.features.length; i++) {
     const coords = results.features[i].geometry.coordinates;
     const latLng = new google.maps.LatLng(coords[1], coords[0]);
 
     new google.maps.Marker({
       position: latLng,
       map: map,
     });
   }
 };*/
   const tableDriver = document.getElementById('table-driver')
   const token = localStorage.getItem('accessToken')
   axios.get("http://localhost:2711/api/auth/userinfo",{
      headers:{
          'Authorization': `Bearer ${token}`
      }
    }).then(responseData =>{
      document.getElementById('hello').innerHTML = "Hello " + responseData.data.username
    }) 
    //GET DRIVER DETAILS
  function driverDetails(){
  axios.get("http://localhost:2711/api/auth/users",{
    headers:{
      'Authorization' : `Bearer ${token}`
    }
  }).then(responseData=>{
    console.log(responseData.data.length)
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
    driverDetails();

    
    const OptimizeClick = function () {
      var select = document.getElementById("cars");
      var option = select.options[select.selectedIndex];
      var Capacity = option.id;
     // console("truoc",updateNode)
      OptimizeRoute(Node,Depot,token,Capacity)
    };
    
    document.getElementById("button-optimize").addEventListener('click',OptimizeClick)



}

function calculateAndDisplayRoute(directionsService, directionsRenderer,org,destination) {
  directionsService
    .route({
      origin: {
        query: org,
      },
      destination: {
        query: destination,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert(e));
}

function dangxuat(){
  localStorage.removeItem("accessToken")
  alert("Logout Successful")
  window.location.replace("/login.html");
}





function OptimizeRoute(Node,Depot,token,Capacity){
  const posts = []
  var delayFactor = 0;
  var path = new google.maps.MVCArray();
  var service = new google.maps.DirectionsService();
  // var ListColor = {
  //   red,fuchsia,green,blue,yellow,violet,pink,orange
  // }
  //ROUTING
  
  
  //var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);
  axios.post("http://localhost:2711/api/localsearch/add/location",{
    Node,
    Depot,
    Capacity
  },
    {
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type' : 'application/json'
      }
    }).then(responseData =>{
      for(let key in responseData.data){
        posts.push({...responseData.data[key],id:key})
      }



    const tableBody = document.getElementById('table-body');
    const tableVehicle = document.getElementById('table-body-vehicle');
    tableBody.innerHTML = "";
    tableVehicle.innerHTML = "";
    for (var i = 0; i < posts.length; i++) {
    if(posts[i].cost > 0){
    var dem = 0;
    for(var j = 0;j<posts[i].nodes.length;j++){
        if(posts[i].nodes[j].id_customer != 0){
          dem++;
        }
    }
    console.log(dem)
    console.log(posts[i].nodes)
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    var polylineoptns = {
      strokeOpacity: 0.8,
      strokeWeight: 3,
      strokeColor: '#'+ randomColor, 
      map: map,
    };

    const tr1 = document.createElement('tr');
        const content1 = `<td>${posts[i].id_vehicle}</td>
        <td>${posts[i].loading}</td>
        <td>${posts[i].capacity}</td>
        <td>${posts[i].cost}</td>
        <td>${dem}</td>
        <td  style="background-color: #${randomColor}"></td>`;
        tr1.innerHTML = content1;
        tableVehicle.appendChild(tr1)
      for(let j= 0;j<posts[i].nodes.length;j++){
        const tr = document.createElement('tr');
        const content = `<td>${posts[i].nodes[j].id_customer}</td>
        <td>${posts[i].nodes[j].address}</td>
        <td>${posts[i].nodes[j].demand}</td>
        <td>${posts[i].id_vehicle}</td>
        <td  style="background-color: #${randomColor}"></td>`;
        tr.innerHTML = content;
        tableBody.appendChild(tr)
        if ((j + 1) < posts[i].nodes.length) {
          var src = posts[i].nodes[j]
          var des = posts[i].nodes[j+1];
  
          var request = {
              origin: src,
              destination: des,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
          };
          m_get_directions_route (request,polylineoptns,service,delayFactor);
      }
      }
      
  }

}
const tableDriver = document.getElementById('table-driver')
axios.get("http://localhost:2711/api/auth/users",{
  headers:{
    'Authorization' : `Bearer ${token}`
  }
}).then(responseData=>{
  tableDriver.innerHTML = "";
  // const tr3 = document.createElement('tr');
  // tr3.innerHTML = "";
  // tableDriver.appendChild(tr3)
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

     //console.log("hehe",posts)

     
      
    //   for (var i = 0; i < lat_lng.length; i++) {
    //     if ((i + 1) < lat_lng.length) {
    //         var src = lat_lng[i];
    //         var des = lat_lng[i + 1];
    //         // path.push(src); <============================================ here
    //         poly.setPath(path);
    //         service.route({
    //             origin: src,
    //             destination: des,
    //             travelMode: google.maps.DirectionsTravelMode.DRIVING
    //         },  function(result, status) {
    //           if (status == google.maps.DirectionsStatus.OK) {
          
    //             //Initialize the Path Array
    //             // var path = new google.maps.MVCArray();
    //             // //Set the Path Stroke Color
    //             // var poly = new google.maps.Polyline({
    //             //   map: map,
    //             //   strokeColor: '#' + randomColor
    //             // });
    //             // poly.setPath(path);
    //             for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
    //               path.push(result.routes[0].overview_path[i]);
    //             }
    //           }
    //         });
    //     }
    // }
    // for (var i = 0; i < lat_lng.length; i++) {
    //   if ((i + 1) < lat_lng.length) {
    //     var src = lat_lng[i];
    //     var des = lat_lng[i + 1];
    //     // path.push(src);
    //     service.route({
    //       origin: src,
    //       destination: des,
    //       travelMode: google.maps.DirectionsTravelMode.DRIVING
    //     }, function(result, status) {
    //       if (status == google.maps.DirectionsStatus.OK) {
    //         var poly = new google.maps.Polyline({
    //           map: map,
    //           strokeColor: '#4986E7'
    //         });
    //         //Initialize the Path Array
    //         var path = new google.maps.MVCArray();
    //         //Set the Path Stroke Color
    //         poly.setPath(path);
    //         for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
    //           path.push(result.routes[0].overview_path[i]);
    //         }
    //       }
    //     });
    //   }
    // }

    

    //  for(let element of iterrator){
    //   //const nodes(element.id_vehicle) = []
    //       nodes.push(element)
    //   // }
    //   // for(int i=0,i<nodes.length(),i++){

    //   }
      //console.log(nodes[0].nodes[2])
    }).catch(error =>{
      console.log(error)
    })
    // driverDetails();
  }
 

document.getElementById("logout").addEventListener('click', dangxuat);

function m_get_directions_route (request,polylineoptns,service,delayFactor) {
  service.route(request, function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
          var path = new google.maps.MVCArray();
          var poly = new google.maps.Polyline(polylineoptns);
          poly.setPath(path);

     for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
         path.push(result.routes[0].overview_path[i]);
        }
      }
  
          //Process you route here
      } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
          delayFactor++;
          setTimeout(function () {
              m_get_directions_route(request,polylineoptns,service,delayFactor);
          }, delayFactor * 1000);
      } else {
          console.log("Route: " + status);
      }
  });
}

 function refreshmap(){
    location.reload();
 }

 document.getElementById("refreshmap").addEventListener("click",refreshmap) 


 function AddCustomer(location_customer,i){
   const table_customer = document.getElementById('table-customer');
   var address = location_customer.address;
   var lat = location_customer.lat;
   var lng = location_customer.lng;
   var demand = location_customer.demand;

   const tr1 = document.createElement('tr');
   const content1 = `
   <td>${i}</td>
   <td>${address}</td>
   <td>${lat}</td>
   <td>${lng}</td>
   <td>${demand}</td>`;
   tr1.innerHTML = content1;
   table_customer.appendChild(tr1)
 }


 //REFRESH STATUS DRIVER
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
    // const tr3 = document.createElement('tr');
    // tr3.innerHTML = "";
    // tableDriver.appendChild(tr3)
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


  //var table = $('#list-driver').DataTable();
  // const token = localStorage.getItem('accessToken')
  // $.ajax({
  //   method:'POST',
  //   url:'http://localhost:2711/api/auth/refresh',
  //   headers :{
  //     'Authorization': `Bearer ${token}`
  //   },
  //   success:function(response){
  //     console.log(response)
  //   }
  // })
  // $( "#list-driver" ).load( "index.html #list-driver" );
 }

 function SearchDriver(){
    var table = $('#list-driver').DataTable();
 }
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


 document.getElementById("refresh-status").addEventListener("click",RefreshDriver)
 document.getElementById("search-driver").addEventListener("click",SearchDriver)  
 document.getElementById("refresh-driver").addEventListener("click",RefreshTable)  


    var beo = document.getElementById("depot");
    function disableFunction() {
    document.getElementById("depot").disabled = true;
    console.log("thanh cong")
    }
    function ableFunction() {
        document.getElementById("depot").disabled = false;
    }

    // document.getElementById("btn-select").addEventListener("click",disableFunction) 
    document.getElementById("btn-cancel").addEventListener("click",ableFunction) 






 window.initMap = initMap;
 //window.eqfeed_callback = eqfeed_callback;

