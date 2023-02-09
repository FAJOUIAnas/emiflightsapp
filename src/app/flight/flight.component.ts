import {Component, OnInit} from '@angular/core';
import {Flight} from "../model/flight";
import {FlightService} from "../service/flight.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AirportService} from "../service/airport.service";
import {Airport} from "../model/airport";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit{
  public outboundFlights: Flight[] = [];
  public returnFlights: Flight[] = [];
  public depAirport!: Airport;
  public arrAirport!: Airport;
  public chosenOutboundFlight!: Flight;
  public chosenReturnFlight!: Flight;


  constructor(private flightService: FlightService, private airportService: AirportService, private  route : ActivatedRoute, private router: Router) {}

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

  public getCities(depAirport: string, arrAirport: string): void {
    this.airportService.getAirportByCode(depAirport).subscribe(
      (response: Airport) => {
        this.depAirport = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.airportService.getAirportByCode(arrAirport).subscribe(
      (response: Airport) => {
        this.arrAirport = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public reDate : string | undefined;
  ngOnInit(): void {
    const depAirport : string = this.route.snapshot.params['dep-airport'];
    const arrAirport : string = this.route.snapshot.params['arr-airport'];
    const depDate : string = this.route.snapshot.params['dep-date'];
    const _class : string = this.route.snapshot.params['class'];
    const nbOfPassengersAdults : number = this.route.snapshot.params['nb-of-passengers-adults'];
    const nbOfPassengersChildren : number = this.route.snapshot.params['nb-of-passengers-children'];
    this.reDate = this.route.snapshot.params['re-date'];
    this.searchOutboundFlights(depAirport, arrAirport, depDate, _class, nbOfPassengersAdults + nbOfPassengersChildren);
    if (this.reDate != undefined)
      this.searchReturnFlights(arrAirport, depAirport, this.reDate, _class, nbOfPassengersAdults + nbOfPassengersChildren);

    this.getCities(depAirport, arrAirport);
  }

  public chooseOutboundFlight(outboundFlight: Flight) : void {
    this.chosenOutboundFlight = outboundFlight;
  }
  public chooseReturnFlight(returnFlight: Flight) : void {
    this.chosenReturnFlight = returnFlight;
  }

  onChooseFlight(outboundFlightId: string, returnFlightId: string) {
    const nbOfPassengersAdults : number = this.route.snapshot.params['nb-of-passengers-adults'];
    const nbOfPassengersChildren : number = this.route.snapshot.params['nb-of-passengers-children'];
    const _class : string = this.route.snapshot.params['class'];


    this.router.navigate([`passengers/${outboundFlightId}/${returnFlightId}/${nbOfPassengersAdults}/${nbOfPassengersChildren}/${_class}`])

    /*if (this.flightType == 'one-way')
      this.route.navigate([`searchflight/${origin}/${destination}/${depDate}/${_class}/${nbOfPassengers}`])
    else if (this.flightType == 'round-trip')
      this.route.navigate([`searchflight/${origin}/${destination}/${depDate}/${_class}/${nbOfPassengers}/${reDate}`])*/
  }
}
