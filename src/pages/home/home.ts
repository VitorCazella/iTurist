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
<<<<<<< HEAD
    const location = new google.maps.LatLng(-30.123190, -51.176157);

    const options = {
      center: location,
      zoom: 15
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, options).addMarker;

    this.addMarker(location);
=======
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 17,
      center: {lat: 41.85, lng: -87.65}
    });
>>>>>>> e1215a3a613a9e72e24e70b0f4be80f7217282f9

    //this.directionsDisplay.setMap(this.map);
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
  
  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    })
  }

<<<<<<< HEAD
  addMarker(position){
    return new google.maps.Marker({
      position: position,
      title: 'Você está aqui!'
    });
  }

}
=======
  }
}
>>>>>>> e1215a3a613a9e72e24e70b0f4be80f7217282f9
