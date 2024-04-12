
const center = { lat: 28.39109030017273, lng: 0.58097911833917};
var all_markers = [];
var selected_parks = [];
var rides = [];
var map = null;
var infoWindow = null;
var data_global = null;

function drawMarkers(phoneme) { 

  var data = data_global;

  // Clear all markers
  all_markers.forEach(function (marker) {
    marker.setMap(null);
  });

  // // Get container div
  // const container = document.getElementById("container");
  // container.innerHTML = "";

  data.forEach(function (d) {

    // if (d.LanguageName == language && d.Phoneme == phoneme){
    if (d.Phoneme == phoneme | phoneme == "") {

      console.log('test '+phoneme);

      // if ((selected_parks.length == 0) || (selected_parks.includes(d.PARK))) {

        const marker = new google.maps.Marker({
          className: "marker_"+d.LanguageName,
          position: { lat: +d.latitude, lng: +d.longitude },
          map,
          title: d.LanguageName+ ": " + d.Phoneme,
        });

        //Add language name to the container div
        // var lang = d.LanguageName.toLowerCase();
        // d.LanguageName = lang.charAt(0).toUpperCase() + lang.slice(1);
        // container.innerHTML = container.innerHTML + "" + d.LanguageName + "<br/>";

        all_markers.push(marker);

  
        marker.addListener("click", function() {
          const languageName = marker.getTitle().split(":")[0];
          const phoneme = marker.getTitle().split(":")[1];
          const level  = d.level;
          const content = ` <h3>Language Name:${languageName}</h3><br/><h3>Level:${level}</h3>`;
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
          //get month by finding the selected month in index.html
          // var month = document.getElementById("month").value;
          // rides.push(d.RIDE);
          // console.log(month);

          // if (month == "overall"){
          //   makeBoxPlot(d.RIDE);
          // }
          // else{
          //   makeLinePlot(d.RIDE, month)
          // }

          
        });
      // }
    }
    

  });
}

function initMap() {
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2.7,
    center: center,
    disableDefaultUI: true, // Disable default UI controls
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off" // Hide points of interest labels
          }
        ]
      }
    ]
  });
  infoWindow = new google.maps.InfoWindow();


  d3.csv("merged.csv", function (data) {
      // populateLanguages(data);
      // populatePhonemes(data);

      data_global = data;
      
      drawMarkers("d");

      // // Add event listener to the language dropdown
      // var select = document.getElementById("language");
      // select.addEventListener("change", function() {
      //   drawMarkers();
      // });

      // // Add event listener to the phoneme dropdown
      // select = document.getElementById("phoneme");
      // select.addEventListener("change", function() {
      //   drawMarkers(map, infoWindow, data);
      // });

      // Get all links that have href attribute
      var links = document.querySelectorAll("button");
      
      //Click event listener for each link
      links.forEach(function(link) {
        link.addEventListener("click", function() {

          // Set phoneme dropdown value
          var phoneme = link.textContent;
          
          // Set phoneme dropdown value
          // document.getElementById("phoneme").value = phoneme;
          drawMarkers(phoneme);

        });
      });

  });

}

window.initMap = initMap;














