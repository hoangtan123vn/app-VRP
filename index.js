
let map;
//  const depot = { lat: 10.7797855, lng: 106.6990189 };

 function initMap() {
  
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  const token = localStorage.getItem('accessToken')
  // const diemdi = "Nhà Thờ Đức Bà";
  // const diemden = "Dinh Độc Lập"
  
  
  //INITMAP
   map = new google.maps.Map(document.getElementById("map"), {
     zoom: 14,
     center: new google.maps.LatLng(10.7797855, 106.6990189),
    // mapTypeId: "terrain",
   });

   directionsRenderer.setMap(map);




   //SEARCHBOX
   var input_customers = document.getElementById("shipments");
   var input_depot = document.getElementById("depot");
   var autocomplete = new google.maps.places.Autocomplete(input_customers);
   var autocomplete1 = new google.maps.places.Autocomplete(input_depot);
   const Depot = []
   const Node = []
   var i=1;


   //ADDMARKER
   //ADD MARKER CUSTOMER
   autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    
    // console.log(place)
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    const location_customer = {address : place.formatted_address,lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), demand : Math.floor(Math.random() * 500) + 1 };
    AddCustomer(location_customer,i);
    const customer = new google.maps.Marker({     
      position: location_customer,
      map: map,
      icon:{
        url : "/image/box.png",
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
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    const location_depot = { address : place.formatted_address,lat: place.geometry.location.lat(), lng: place.geometry.location.lng(),demand : 0 };
    const depot = new google.maps.Marker({
      position: location_depot,
      map: map,
      icon:{
        url : "/image/depot.jpg",
        scaledSize: new google.maps.Size(50,50)
      }
    });
    Depot.push(location_depot)


    const infodepot = new google.maps.InfoWindow({ 
      content: "<p>"+place.formatted_address +"  "+ place.geometry.location.lat() + " "+place.geometry.location.lng() + "</p>",
    })

    google.maps.event.addListener(depot, "click", () => {
      infodepot.open(map, depot);

    });
  });


  //OPTIMIZE CLICK 
  const OptimizeClick = function () {
    var select = document.getElementById("cars");
    var option = select.options[select.selectedIndex];
    var Capacity = option.value;
    console.log(Capacity)

   // console("truoc",updateNode)
    OptimizeRoute(Node,Depot,token,Capacity)
  };

  FetchDropDown();

  document.getElementById("button-optimize").addEventListener('click',OptimizeClick)

} 


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


  //FUNCTION OPTIMIZE
  function OptimizeRoute(Node,Depot,token,Capacity){
    const posts = []
    var delayFactor = 0;
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
      console.log(responseData.data)
  
  
      const tableBody = document.getElementById('body-table-route');
      const tableVehicle = document.getElementById('table-body-vehicle');
      tableBody.innerHTML = "";
      tableVehicle.innerHTML = "";
      var route = []
      // var poly = new google.maps.Polyline()
      // var path = new google.maps.MVCArray();
      for (var i = 0; i < posts.length; i++) {
      if(posts[i].cost > 0){
      var dem = 0;
      for(var j = 0;j<posts[i].nodes.length;j++){
          if(posts[i].nodes[j].idnode != 0){
            dem++;
          }
      }
      const randomColor = Math.floor(Math.random()*16777215).toString(16);
      
      const lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#'+ randomColor,
      };
    
      
      var polylineoptns = {
        strokeOpacity: 0.8,
        strokeWeight: 3,
        strokeColor: '#'+ randomColor, 
        icons: [
          {
            icon: lineSymbol,
            offset: "100%",
          },
        ],
        map: map,
      };
  
      var RoutesPath = new google.maps.MVCArray();
  
      route[i] = posts[i].nodes;
      console.log(route[i])
      const tr1 = document.createElement('tr');
          const content1 = `<td>${posts[i].id_vehicle}</td>
          <td>${posts[i].loading}</td>
          <td>${posts[i].vehicleType.capacity}</td>
          <td>${posts[i].cost}</td>
          <td>${dem}</td>
          <td  style="background-color: #${randomColor}"></td>`;
          tr1.innerHTML = content1;
          tableVehicle.appendChild(tr1)
        for(let j= 0;j<posts[i].nodes.length;j++){
          const tr = document.createElement('tr');
          const content = `<td>${posts[i].nodes[j].idnode}</td>
          <td>${posts[i].nodes[j].address}</td>
          <td>${posts[i].nodes[j].demand}</td>
          <td>${posts[i].id_vehicle}</td>
          <td  style="background-color: #${randomColor}"></td>`;
          tr.innerHTML = content;
          tableBody.appendChild(tr)
          if ((j + 1) < posts[i].nodes.length) {
            var src = posts[i].nodes[j];
            var des = posts[i].nodes[j+1];
            console.log(src)
            console.log(des)
            var request = {
                origin: src,
                destination: des,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
          m_get_directions_route (request,polylineoptns,service,delayFactor);
          }
  
            
        }
  
        
        // const line = new google.maps.Polyline()
        // line.setOptions(polylineoptns)
        // line.setPath(route[i])
        // animateCircle(line)
  
  
        // for(j = 0 ; j < route[i].nodes.length ; j ++) {
        //   if((j+1)<route[i].nodes.length){
        //     // var src = route[i]
        //     // var des = route[j+1]
        //     console.log(route[i])
        //     console.log(des)
        //     var request = {
        //       origin: src,
        //       destination: des,
        //       travelMode: google.maps.DirectionsTravelMode.DRIVING
        //     };
        //   // m_get_directions_route (request,polylineoptns,service,delayFactor);
        //   }
        // }
        
    }
    
  }
      }).catch(error =>{
        console.log(error)
      })
      // driverDetails();
}

function m_get_directions_route (request,polylineoptns,service,delayFactor) {
  service.route(request, function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
          var path = new google.maps.MVCArray();
          var poly = new google.maps.Polyline()
          poly.setOptions(polylineoptns);
          poly.setPath(path); 
          animateCircle(poly)
          
        //  console.log(result)
          
     for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
         path.push(result.routes[0].overview_path[i]);
        }
      }
         // console.log(animateCircle(poly))
  
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

function animateCircle(line) {
  let count = 0;

  var listener = window.setInterval(() => {
    count = (count + 1) % 200;

    const icons = line.get("icons");

    icons[0].offset = count / 2 + "%";
    line.set("icons", icons);
    if (count == 199) clearInterval(listener);
  }, 500);
}


function FetchDropDown(){
  var List = []
  const token = localStorage.getItem('accessToken')
  var selector = document.getElementById('cars')
  axios.get("http://localhost:2711/api/auth/GetVehiclesType",{
      headers:{
          'Authorization': `Bearer ${token}`
      }
    }).then(responseData =>{
      for(let i=0;i<responseData.data.length;i++){
        var id_type = responseData.data[i].id_type;
        var name_type = responseData.data[i].name_type;
        var capacity = responseData.data[i].capacity;
        List.push(responseData.data[i])
      }
      List.forEach(function(item){
        // selector.appendChild('')
        var option = document.createElement('option');
        option.id = item.id_type
        option.value = item.capacity;
        option.innerHTML = item.name_type;
        selector.appendChild(option)
     })
    })
    
}

function UpdateRoutes(id_route){
  const token = localStorage.getItem('accessToken')
  axios.post("http://localhost:2711/api/auth/updateHistoryRoutes/"+id_route,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      }).then(responseData =>{
          console.log(responseData.data)
      })
}




window.initMap = initMap;

