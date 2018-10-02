import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    const location = new google.maps.LatLng(-30.123190, -51.176157);

    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(document.getElementById('map'), options);
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

  const marker = new google.maps.Marker({
      position: location,
      map: this.map,

      //Titulo
      title: 'Sua Posição',

      //Animção
      animation: google.maps.Animation.DROP
    });
}
