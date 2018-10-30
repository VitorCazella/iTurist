import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: any;
  long: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    public navCtrl: NavController,
    private geo: Geolocation,
    private platform: Platform
  ) { }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
  this.platform.ready().then(() => {
    var styledMapType = new google.maps.StyledMapType(
            [
              {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{"visibility": "off"}]
              },
              {
                "featureType": "poi",
                "stylers": [{"visibility": "on"}]
              },
              {
                "featureType": "poi",
                "elementType": "labels.icon"
              },
              {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
              },
              {
                "featureType": "transit",
                "stylers": [{"visibility": "off"}]
              }
            ],
            {name: 'Padrão'});

    this.geo.getCurrentPosition().then(res => {
      this.lat = res.coords.latitude;
      this.long = res.coords.longitude;

      const location = new google.maps.LatLng(this.lat, this.long);

      const options = {
        center: location,
        zoom: 16,
        disableDefaultUI: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          mapTypeIds: ['roadmap', 'satellite', 'styled_map']
        }
      };

      this.map = new google.maps.Map(document.getElementById('map'), options);
      var image = 'assets/imgs/avatar.png';

      const marker = new google.maps.Marker({
          position: location,
          map: this.map,
          icon: image,

          //Titulo
          title: 'Você está aqui!',

          //Animção
          animation: google.maps.Animation.DROP
        });
        console.log(marker);

        this.map.setMapTypeId('styled_map');
        this.map.mapTypes.set('styled_map', styledMapType);
    }).catch(() => {
      alert("erro ao pegar geolocalizacao ");
    })
  })
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
