function initMap() {
  var uluru = {
    lat: 59.93877121663107,
    lng: 30.323274149999975
  };
  var image = (screen.width < 768) ? "img/map-pin-small.png" : "img/map-pin.png";
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: image
  });
}
