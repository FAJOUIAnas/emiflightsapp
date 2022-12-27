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
  public flights!: Flight[];

  constructor(private flightService: FlightService, private  route : ActivatedRoute) { }

  public searchFlight(depAirport: string, arrAirport: string, depDate: string): void {
    this.flightService.searchFlight(depAirport, arrAirport, depDate).subscribe(
      (response: Flight[]) => {
        this.flights = response;
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
    this.searchFlight(depAirport, arrAirport, depDate);
  }
}
