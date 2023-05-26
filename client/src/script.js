// 1.data in json format
var URL = "http://localhost:8080/";

document.addEventListener("DOMContentLoaded", function () {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      initMap(data.data);
      updateTable(data.tableData);
    })
    .catch((error) => {
      console.log(error);
    });
});

var onRecordAdd = document.getElementById("recordAdd");
onRecordAdd.addEventListener("click", handleRecordAdd);

function handleRecordAdd() {
  displaydetails();
  updateTable();
  emptyForm();
}

function updateTable() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      var tableData = data.tableData;
      var tableBody = document.querySelector("#table-wrapper tbody");
  
      // Clear existing table rows
      tableBody.innerHTML = "";
  
      // Iterate over each object in tableData
      tableData.forEach((object) => {
        
        // Create a new row element
        var newRow = document.createElement("tr");
  
        // Extract object properties
        var { ID, dateString, Name, Trip, MarkerType, Distance, TotalFare } = object;
  
        // Create table cells and set their values
        var idCell = document.createElement("td");
        idCell.textContent = ID;
        newRow.appendChild(idCell);
  
        // Create the date cell and set its content to the local date string
        var dateCell = document.createElement("td");
        var dateObject = new Date(dateString);
        dateCell.textContent = dateObject.toLocaleDateString();
        newRow.appendChild(dateCell);
  
        var nameCell = document.createElement("td");
        nameCell.textContent = Name;
        newRow.appendChild(nameCell);
  
        var tripCell = document.createElement("td");
        tripCell.textContent = Trip;
        newRow.appendChild(tripCell);
  
        var markerTypeCell = document.createElement("td");
        markerTypeCell.textContent = MarkerType;
        newRow.appendChild(markerTypeCell);
  
        var distanceCell = document.createElement("td");
        distanceCell.textContent = Distance;
        newRow.appendChild(distanceCell);
  
        var fareCell = document.createElement("td");
        fareCell.textContent = TotalFare;
        newRow.appendChild(fareCell);
  
        // Append the new row to the table body
        tableBody.appendChild(newRow);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function displaydetails() {
  // Get all the checkbox inputs
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let allCheckbox = ""; // Declare the variable outside the loop

  // Iterate over the checkboxes and concatenate the labels of checked checkboxes
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const label = checkbox.name;
      allCheckbox += label + " "; // Concatenate the labels with a space
    }
  });

  // getting form values
  var name = document.getElementById("name").value;
  var dateString = document.getElementById("date").value;

  var displayRoute = document.getElementById("displayRoute").innerText;
  var distanceValue = document.getElementById("totalValueNew").innerText;
  var totalDistance = 5 * document.getElementById("totalValueNew").innerText;

  addToDb(name, dateString, displayRoute, allCheckbox, distanceValue, totalDistance);

  alert("Trip added successfully");
}

function emptyForm() {
  var nameInput = document.getElementById("name");
  var dateInput = document.getElementById("date");
  var displayRoute = document.getElementById("displayRoute");
  var distanceValue = document.getElementById("totalValueNew");
  var totalDistance = document.getElementById("totalValueNew");

  nameInput.value = "";
  dateInput.value = "";
  displayRoute.innerText = "";
  distanceValue.innerText = "";
  totalDistance.innerText = "";
}

function addToDb(Name, dateString, Trip, MarkerType, Distance, TotalFare) {
  distanceLoc.length = 0;
  fetch(URL, {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      Name: Name,
      dateString: dateString,
      Trip: Trip,
      MarkerType: MarkerType,
      Distance: Distance,
      TotalFare: TotalFare,
    }),
  }).then((response) => response.json());
  
  // .then((data) => insertRowtoTable(data["data"]));
}

//.....................+++++++................................

//check boxes to find markerType

// converting dms into degrees

function ParseDMS(input) {
  if (input !== null) {
    var parts = input.split(/[^\d\w.]+/);
    var dege = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    return dege;
  } else {
    return;
  }
}
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
  var deg = Number(degrees);
  var min = Number(minutes / 60);
  var sec = Number(seconds / 3600);
  var dd = deg + min + sec;

  if (direction === "S" || direction === "W") {
    dd = dd * -1;
  }
  return dd;
}
//.....................+++++++................................
//Constants
// 2.list of markers

var markers = [];
const distanceLoc = [];
var selectedMarkers = [];
var distaceMarkers = [];

// 3.colors for markers

var red = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var white = "http://maps.google.com/mapfiles/ms/icons/white-dot.png";
var green = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
var yellow = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
var pin = "http://maps.google.com/mapfiles/kml/pal2/icon13.png";

//.....................+++++++................................

// 4.Legends

let A = document.getElementById("show-marker-type-a");
A.addEventListener("change", () => removeMarkersOfType("A", A.checked));
let B = document.getElementById("show-marker-type-b");
B.addEventListener("change", () => removeMarkersOfType("B", B.checked));
let C = document.getElementById("show-marker-type-c");
C.addEventListener("change", () => removeMarkersOfType("C", C.checked));

//TODO Displaying markers according to legends

function setMapOnMarkerType(markerType, map) {
  markers.forEach((element) => {
    if (element.label === markerType) {
      element.setMap(map);
    }
  });
}
function removeMarkersOfType(markerType, isChecked) {
  if (isChecked) {
    setMapOnMarkerType(markerType, map);
  } else {
    setMapOnMarkerType(markerType, null);
  }
}

//TODO main function

function initMap(data) {
  // console.log(data);
  // displaying map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lng: 79.06697222, lat: 21.09784722 },
  });
  if (data) {
    Object.values(data).map((loc) => {
      var longitude = ParseDMS(loc.survey_long_degree);
      var latitude = ParseDMS(loc.survey_lat_degree);
      var MarkerType = loc.markerType;
      var id = loc.hid;
      // adding markers on the map
      addMarker(latitude, longitude, MarkerType, id);
    });
  }

  //TODO add marker function
  function addMarker(latitude, longitude, MarkerType, id) {
    let marker = new google.maps.Marker({
      position: { lng: longitude, lat: latitude },
      label: MarkerType,
      id: id,
      map: map,
      //title: "ID = " + id + "  " + MarkerType + "  zone 1",
      title: `ID = ${MarkerType}${id}\nZone1\n\nDimensions:\nWidth = xxxx Mtr.\nLength = xxxx Mtr.\nHeight = xxxx Mtr.\n\nCategory\nxxxxxxxxxxxx`,
      icon: {
        path: google.maps.SymbolPath.Marker,
        url: MarkerType == "A" ? red : MarkerType == "B" ? green : yellow,
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: 10,
        scale: 30,
      },
    });
    markers.push(marker);
    // calculate distace between two markers
    google.maps.event.removeListener(marker.listener);
    // listning to the click event on the map
    google.maps.event.addListener(marker, "click", listenClick(marker));
  }

  //TODO   listens for clicks on map for markers

  var totalDistanceArr = []; // this is to store the values of table or dist betn selected markers.
  function listenClick(marker) {
    return function (evt) {
      var selpts = "";
      var dist = 0;
      var totalDistance = 0;
      var index = selectedMarkers.findIndex((m) => m.id === marker.id);
      var loca = {
        lng: marker.getPosition().lng(),
        lat: marker.getPosition().lat(),
        label: marker.label,
        id: marker.id,
      };
      var displayRoute = document.getElementById("displayRoute");

      if (index === -1) {
        marker.setIcon(pin);
        selectedMarkers.push(loca);

        displayRoute.innerHTML = selectedMarkers
          .map((marker) => `${marker.id}${marker.label}`)
          .join(" => ");

        showpolyline();
        for (let i = 0; i < selectedMarkers.length - 1; i++) {
          for (let j = i + 1; j < selectedMarkers.length; j++) {
            selpts =
              selectedMarkers[i].markerType +
              selectedMarkers[i].id +
              "+" +
              selectedMarkers[j].markerType +
              selectedMarkers[j].id;
            dist =
              100 * calculateDistance(selectedMarkers[i], selectedMarkers[j]);
          }
        }
        totalDistanceArr.push(dist);
        for (let i = 0; i < totalDistanceArr.length; i++) {
          totalDistance += totalDistanceArr[i];
        }
        if (totalDistanceArr.length > 0) {
          distance = 100 * calculateTotalDistance();
          distanceFixed = distance.toFixed(2);

          document.getElementById("totalValueNew").innerHTML = distanceFixed;

          // insertRowinT2(selpts, dist);
        } //
      } else {
        var result = confirm("Are you sure you want to delete this item?");

        if (result) {
          // user clicked OK  // delete the item
          marker.setIcon({
            path: google.maps.SymbolPath.Marker,
            url: loca.label == "A" ? red : loca.label == "B" ? green : yellow,
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 10,
            scale: 30,
          });
          selectedMarkers.splice(index, 1);
          totalDistanceArr.splice(index, 1);

          displayRoute.innerHTML = selectedMarkers
            .map((marker) => `${marker.id}${marker.label}`)
            .join(" => ");
          if (totalDistanceArr > 1) {
            document.getElementById("totalValueNew").innerHTML =
              100 * calculateTotalDistance();
            // insertRowinT2(selpts, dist);
          }
          showpolyline();
        } else {
          // user clicked Cancel do nothing
        }
      }
    };
  }

  //TODO  Polyline

  let flightPath = null;

  function showpolyline() {
    if (selectedMarkers.length > 1) {
      if (flightPath === null) {
        flightPath = new google.maps.Polyline({
          path: [],
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
      }

      const size = selectedMarkers.length - 1;
      const path = [];
      for (let i = 0; i < size; i++) {
        const { lat: y1, lng: x1 } = selectedMarkers[i];
        const { lat: y2, lng: x2 } = selectedMarkers[i + 1];
        path.push({ lat: y1, lng: x1 }, { lat: y2, lng: x2 });
      }

      flightPath.setPath(path);
      flightPath.setMap(map);
    } else {
      if (flightPath !== null) {
        flightPath.setMap(null);
        flightPath = null;
      }
    }
  }
}

//* calculating distance

function calculateDistance(source, destination) {
  var x1 = source.lng;
  var y1 = source.lat;
  var x2 = destination.lng;
  var y2 = destination.lat;

  var distance = Number(getDistance(x1, y1, x2, y2).toFixed(4));
  return distance;
}

function getDistance(x1, y1, x2, y2) {
  var xDiff = x1 - x2;
  var yDiff = y1 - y2;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function calculateTotalDistance() {
  var length = selectedMarkers.length;
  let total = 0;
  if (length > 2) {
    for (let i = 0; i < length - 1; i++) {
      total =
        total + calculateDistance(selectedMarkers[i], selectedMarkers[i + 1]);
    }
    return total.toFixed(4);
  } else if (length === 2) {
    total += calculateDistance(selectedMarkers[0], selectedMarkers[1]);
    return total.toFixed(4);
  } else {
    // alert("Select more markers");
    return 0;
  }
}
