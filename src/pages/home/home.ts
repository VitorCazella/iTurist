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

  locationMarkerMarinha: any;
  locationMarkerLacador: any;
  locationMarkerBeiraRio: any;
  locationMarkerArena: any;



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
                "stylers": [{"visibility": "off"}]
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
          mapTypeIds: ['styled_map']
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

        this.map.setMapTypeId('styled_map');
        this.map.mapTypes.set('styled_map', styledMapType);

        this.directionsDisplay.setMap(this.map);
        this.markerCreate();
      }).catch(() => {
        alert("erro ao pegar geolocalizacao ");
      });
    });
  }

  tapEvent(e){
    this.calculateAndDisplayRoute(this.locationMarkerMarinha);
  }

  tap2Event(e){
    this.calculateAndDisplayRoute(this.locationMarkerLacador);
  }

  tap3Event(e){
    this.calculateAndDisplayRoute(this.locationMarkerBeiraRio);
  }

  tap4Event(e){
    this.calculateAndDisplayRoute(this.locationMarkerArena);
  }

  markerCreate(){
    var path = 'assets/pointersIcon/';

    this.locationMarkerMarinha = new google.maps.LatLng(-30.049268, -51.229990);

    var markerMarinha = new google.maps.Marker({
      position: this.locationMarkerMarinha,
      icon: path + 'park_marinha.png',
      map: this.map,
      title: 'Parque Marinha do Brasil'
    });
    markerMarinha.addListener('click', function() {
      this.calculateAndDisplayRoute(this.locationMarkerMarinha);
    });

    this.locationMarkerLacador = new google.maps.LatLng(-29.991299, -51.184487);

    var markerLacador = new google.maps.Marker({

      position: this.locationMarkerLacador,
      icon: path + 'lacador.png',
      map: this.map,
      title: 'Monumento ao Laçador'
    });

    this.locationMarkerBeiraRio = new google.maps.LatLng(-30.065439, -51.235889);

    var markerBeiraRio = new google.maps.Marker({
      position: this.locationMarkerBeiraRio,
      icon: path + 'beirario.png',
      map: this.map,
      title: 'Estádio Beira Rio'
    });

    this.locationMarkerArena = new google.maps.LatLng(-29.974095, -51.194981);

    var markerArena = new google.maps.Marker({
      position: this.locationMarkerArena,
      icon: path + 'arena.png',
      map: this.map,
      title: 'Arena do Grêmio'
    });
  }

  calculateAndDisplayRoute(dest) {
    this.geo.getCurrentPosition().then(res => {
      this.lat = res.coords.latitude;
      this.long = res.coords.longitude;

      const location = new google.maps.LatLng(this.lat, this.long);

      this.directionsService.route({
        origin: location,
        destination: dest,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setOptions({suppressMarkers: true});
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
  }

}
