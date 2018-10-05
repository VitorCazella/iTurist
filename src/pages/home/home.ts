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
  ) {
      this.platform.ready().then(() => {

      this.geo.getCurrentPosition().then(res => {
      this.lat = res.coords.latitude;
      this.long = res.coords.longitude;

      alert("latitude: " + this.lat);
      alert("longitude: " + this.long);
      }).catch(() => {
      alert("erro ao pegar geolocalizacao ");
      })
    })
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    var styledMapType = new google.maps.StyledMapType(
            [
              {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{"visibility": "off"}]
              },
              {
                "featureType": "poi",
                "stylers": [{"visibility": "off"}]
              },
              {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [{"color": "#5745f5"}]
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
            {name: 'Personalizado'});

    const location = new google.maps.LatLng(-30.0245121, -51.195155299999996);

    const options = {
      center: location,
      zoom: 16,
      disableDefaultUI: false,
      zoomControl: false,
      mapTypeControl: true,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false,
      mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'styled_map']
          }
    };

    this.map = new google.maps.Map(document.getElementById('map'), options);

     var image = 'assets/imgs/avatar.png';

    const marker = new google.maps.Marker({
        position: location,
        map: this.map,
        icon: image,

        //Titulo
        title: 'Sua Posição',

        //Animção
        animation: google.maps.Animation.DROP
      });

      this.map.mapTypes.set('styled_map', styledMapType);
      this.map.setMapTypeId('styled_map');

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
