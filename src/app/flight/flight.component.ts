import {Component, OnInit} from '@angular/core';
import {Flight} from "../model/flight";
import {FlightService} from "../service/flight.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit{
  public outboundFlights!: Flight[];
  public returnFlights!: Flight[];

  constructor(private flightService: FlightService, private  route : ActivatedRoute) { }

  public searchOutboundFlights(depAirport: string, arrAirport: string, depDate: string, _class: string, nbOfPassengers: number): void {
    this.flightService.searchFlight(depAirport, arrAirport, depDate, _class, nbOfPassengers).subscribe(
      (response: Flight[]) => {
        this.outboundFlights = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchReturnFlights(depAirport: string, arrAirport: string, depDate: string, _class: string, nbOfPassengers: number): void {
    this.flightService.searchFlight(depAirport, arrAirport, depDate, _class, nbOfPassengers).subscribe(
      (response: Flight[]) => {
        this.returnFlights = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {
    const depAirport : string = this.route.snapshot.params['dep-airport'];
    const arrAirport : string = this.route.snapshot.params['arr-airport'];
    const depDate : string = this.route.snapshot.params['dep-date'];
    const _class : string = this.route.snapshot.params['class'];
    const nbOfPassengers : number = this.route.snapshot.params['nb-of-passengers'];
    const reDate : string = this.route.snapshot.params['re-date'];
    this.searchOutboundFlights(depAirport, arrAirport, depDate, _class, nbOfPassengers);
    if (reDate != undefined)
      this.searchReturnFlights(depAirport, arrAirport, reDate, _class, nbOfPassengers);
  }
}
