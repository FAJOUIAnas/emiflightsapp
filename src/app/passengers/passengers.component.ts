import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Reservation} from "../model/reservation";
import {Flight} from "../model/flight";
import {FlightService} from "../service/flight.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Civility} from "../model/civility";
import {AgeGroup} from "../model/ageGroup";
import {SeatClass} from "../model/seatClass";
import {ReservationStatus} from "../model/reservationStatus";

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  public adultPassengers : Reservation[] = [];
  public childPassengers : Reservation[] = [];
  public nbOfPassengersAdults !: string;
  public nbOfPassengersChildren !: string;
  public outboundFlight!: Flight;
  public checkker: boolean = false;
  public clicked: boolean = false;

  constructor(private  route : ActivatedRoute, private flightService: FlightService) {}

  ngOnInit(): void {
    const outboundFlightId : string = this.route.snapshot.params['outbound-flight-id'];
    const returnFlightId : string = this.route.snapshot.params['return-flight-id'];
    this.nbOfPassengersAdults = this.route.snapshot.params['nb-of-passengers-adults'];
    this.nbOfPassengersChildren = this.route.snapshot.params['nb-of-passengers-children'];
    const _class : string = this.route.snapshot.params['class'];

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const todayDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    this.flightService.getFlightById(outboundFlightId).subscribe(
      (response: Flight) => {
        this.outboundFlight = response;

        for(let i = 0; i < parseInt(this.nbOfPassengersAdults); i++) {
          this.adultPassengers.push(new Reservation(this.outboundFlight, todayDate, todayDate, new Civility(), new AgeGroup("AD"), new SeatClass(_class), new ReservationStatus("SCHD"), this.outboundFlight.flightGeneric.basePrice));
        }

        for(let i = 0; i < parseInt(this.nbOfPassengersChildren); i++) {
          this.childPassengers.push(new Reservation(this.outboundFlight, todayDate, todayDate, new Civility(), new AgeGroup("AD"), new SeatClass(_class), new ReservationStatus("SCHD"), this.outboundFlight.flightGeneric.basePrice));
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    // this.childPassengers = Array.from(Array(parseInt(this.nbOfPassengersChildren)),(x,i)=>i);
  }

  public check(reservations: Reservation[]): boolean {
    this.clicked = true;
    for(let i = 0; i < reservations.length; i++) {
      if((reservations[i].passengerCivility.code == undefined || reservations[i].passengerFirstName == undefined || reservations[i].passengerLastName == undefined) || (reservations[i].passengerCivility.code == '' || reservations[i].passengerFirstName == '' || reservations[i].passengerLastName == '')) {
        this.checkker = false;
        return false;
      }
    }
    this.checkker = true;
    return true
  }

}
