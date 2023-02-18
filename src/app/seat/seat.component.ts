import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../service/reservation.service";
import {Seat} from "../model/seat";
import {PlaneService} from "../service/plane.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Reservation} from "../model/reservation";
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  colsOutbound: string[] = [];
  rowsOutbound: number[] = [];
  colsReturn: string[] = [];
  rowsReturn: number[] = [];
  outboundSeats: Seat[] = [];
  returnSeats: Seat[] = [];
  outboundSelectedSeats: Seat[] = [];
  returnSelectedSeats: Seat[] = [];
  outboundPassengerSelected: number = 0;
  returnPassengerSelected: number = 0;
  nbOfPassengersAdults: number = this.reservationService.outboundReservations.filter(s => s.passengerAgeGroup.code == "AD").length
  nbOfPassengersChildren: number = this.reservationService.outboundReservations.filter(s => s.passengerAgeGroup.code == "CHD").length
  checkker: boolean = (this.rowsReturn.length == 0);
  public clicked: boolean = false;
  public priceAddition: number = 1;
  constructor(public reservationService: ReservationService) {}

  ngOnInit(): void {
    let rowsOutboundStart: number = 0, rowsOutboundFinish: number = 0;
    let rowsReturnStart: number = 0, rowsReturnFinish: number = 0;

    if(this.reservationService.outboundReservations[0].flight.flightGeneric.plane.model == "Boeing 777") {
      if(this.reservationService.outboundReservations[0].seatClass.code == "FST") {
        this.colsOutbound = ['A', 'B', 'D', 'E', 'F', 'G', 'K', 'L']
        rowsOutboundStart = 1; rowsOutboundFinish = 4;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L']
        rowsOutboundStart = 17; rowsOutboundFinish = 26;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "ECO") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L']
        rowsOutboundStart = 27; rowsOutboundFinish = 49;
      }
    }
    else if(this.reservationService.outboundReservations[0].flight.flightGeneric.plane.model == "Boeing 737") {
      if(this.reservationService.outboundReservations[0].seatClass.code == "FST") {
        this.colsOutbound = ['A', 'B', 'E', 'F']
        rowsOutboundStart = 1; rowsOutboundFinish = 4;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F']
        rowsOutboundStart = 7; rowsOutboundFinish = 15;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "ECO") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F']
        rowsOutboundStart = 22; rowsOutboundFinish = 38;
      }
    }
    else if(this.reservationService.outboundReservations[0].flight.flightGeneric.plane.model == "Airbus A330") {
      if(this.reservationService.outboundReservations[0].seatClass.code == "FST") {
        this.colsOutbound = ['A', 'C', 'G', 'J']
        rowsOutboundStart = 1; rowsOutboundFinish = 7;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J']
        rowsOutboundStart = 10; rowsOutboundFinish = 14;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "ECO") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J']
        rowsOutboundStart = 15; rowsOutboundFinish = 39;
      }
    }
    else if(this.reservationService.outboundReservations[0].flight.flightGeneric.plane.model == "Airbus A380") {
      if(this.reservationService.outboundReservations[0].seatClass.code == "FST") {
        this.colsOutbound = ['A', 'E', 'F', 'K']
        rowsOutboundStart = 1; rowsOutboundFinish = 3;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI") {
        this.colsOutbound = ['A', 'E', 'F', 'K']
        rowsOutboundStart = 7; rowsOutboundFinish = 25;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "ECO") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']
        rowsOutboundStart = 41; rowsOutboundFinish = 82;
      }
    }

    for(let i = rowsOutboundStart; i <= rowsOutboundFinish; i++) {
      this.rowsOutbound.push(i);
      for(let j = 0; j < this.colsOutbound.length; j++) {
        this.outboundSeats.push(new Seat(true, i, this.colsOutbound[j]));
      }
    }

    this.reservationService.getReservationsByFlightAndClass(this.reservationService.outboundReservations[0].flight.id, this.reservationService.outboundReservations[0].seatClass.code).subscribe(
      (response: Reservation[]) => {
        for(let i = 0; i < response.length; i++) {
          const rowAndCol = response[i].seatNumber.split("-");
          this.outboundSeats[this.outboundSeats.findIndex(s => (s.row == parseInt(rowAndCol[0])) && (s.column == rowAndCol[1]) && s.available)].available = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    for(let i = 0; i < this.reservationService.outboundReservations.length; i++){
      this.outboundSelectedSeats[i] = {available: true, row: 0, column: ''}
    }

    if(this.reservationService.returnReservations.length > 0) {

      if(this.reservationService.returnReservations[0].flight.flightGeneric.plane.model == "Boeing 777") {
        if(this.reservationService.returnReservations[0].seatClass.code == "FST") {
          this.colsReturn = ['A', 'B', 'D', 'E', 'F', 'G', 'K', 'L']
          rowsReturnStart = 1; rowsReturnFinish = 4;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "BUSI") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L']
          rowsReturnStart = 17; rowsReturnFinish = 26;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "ECO") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L']
          rowsReturnStart = 27; rowsReturnFinish = 49;
        }
      }
      else if(this.reservationService.returnReservations[0].flight.flightGeneric.plane.model == "Boeing 737") {
        if(this.reservationService.returnReservations[0].seatClass.code == "FST") {
          this.colsReturn = ['A', 'B', 'E', 'F']
          rowsReturnStart = 1; rowsReturnFinish = 4;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "BUSI") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F']
          rowsReturnStart = 7; rowsReturnFinish = 15;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "ECO") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F']
          rowsReturnStart = 22; rowsReturnFinish = 38;
        }
      }
      else if(this.reservationService.returnReservations[0].flight.flightGeneric.plane.model == "Airbus A330") {
        if(this.reservationService.returnReservations[0].seatClass.code == "FST") {
          this.colsReturn = ['A', 'C', 'G', 'J']
          rowsReturnStart = 1; rowsReturnFinish = 7;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "BUSI") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J']
          rowsReturnStart = 10; rowsReturnFinish = 14;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "ECO") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J']
          rowsReturnStart = 15; rowsReturnFinish = 39;
        }
      }
      else if(this.reservationService.returnReservations[0].flight.flightGeneric.plane.model == "Airbus A380") {
        if(this.reservationService.returnReservations[0].seatClass.code == "FST") {
          this.colsReturn = ['A', 'E', 'F', 'K']
          rowsReturnStart = 1; rowsReturnFinish = 3;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "BUSI") {
          this.colsReturn = ['A', 'E', 'F', 'K']
          rowsReturnStart = 7; rowsReturnFinish = 25;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "ECO") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']
          rowsReturnStart = 41; rowsReturnFinish = 82;
        }
      }

      for(let i = rowsReturnStart; i <= rowsReturnFinish; i++) {
        this.rowsReturn.push(i);
        for(let j = 0; j < this.colsReturn.length; j++) {
          this.returnSeats.push(new Seat(true, i, this.colsReturn[j]));
        }
      }

      this.reservationService.getReservationsByFlightAndClass(this.reservationService.returnReservations[0].flight.id, this.reservationService.returnReservations[0].seatClass.code).subscribe(
        (response: Reservation[]) => {
          for(let i = 0; i < response.length; i++) {
            const rowAndCol = response[i].seatNumber.split("-");
            this.returnSeats[this.returnSeats.findIndex(s => (s.row == parseInt(rowAndCol[0])) && (s.column == rowAndCol[1]) && s.available)].available = false;
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

      for(let i = 0; i < this.reservationService.returnReservations.length; i++){
        this.returnSelectedSeats[i] = {available: true, row: 0, column: ''}
      }
    }

    if(this.reservationService.outboundReservations[0].seatClass.code == "FST")
      this.priceAddition = 7;
    else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI")
      this.priceAddition = 0.8;
    this.priceAddition = this.priceAddition * (this.nbOfPassengersAdults + (this.nbOfPassengersChildren * 0.75))

  }

  selectOutboundSeat(seat: Seat, indexOfPasseneger: number): void {
    if (this.outboundSelectedSeats[indexOfPasseneger] == seat) {
      this.outboundSelectedSeats[indexOfPasseneger] = {available: false, row: 0, column: ''};
    }
    else if (this.outboundSelectedSeats[indexOfPasseneger] != seat && !this.outboundSelectedSeats.includes(seat)) {
      if(seat.available)
        this.outboundSelectedSeats[indexOfPasseneger] = seat;
    }
  }

  selectReturnSeat(seat: Seat, indexOfPasseneger: number): void {
    if (this.returnSelectedSeats[indexOfPasseneger] == seat) {
      this.returnSelectedSeats[indexOfPasseneger] = {available: false, row: 0, column: ''};
    }
    else if (this.returnSelectedSeats[indexOfPasseneger] != seat && !this.returnSelectedSeats.includes(seat)) {
      if(seat.available)
        this.returnSelectedSeats[indexOfPasseneger] = seat;
    }
  }


  changeOutboundSelectedPassenger(e : any) {
    this.outboundPassengerSelected = e.target.value;
  }

  changeReturnSelectedPassenger(e : any) {
    this.returnPassengerSelected = e.target.value;
  }

  check(): boolean {
    this.clicked = true;

    for(let i = 0; i < this.outboundSelectedSeats.length; i++) {
      if(this.outboundSelectedSeats[i].row == 0){
        this.checkker = false;
        return false
      }
    }

    if(this.reservationService.returnReservations.length > 0) {
      for(let i = 0; i < this.returnSelectedSeats.length; i++) {
        if(this.returnSelectedSeats[i].row == 0){
          this.checkker = false;
          return false
        }
      }
    }

    this.checkker = true;
    return true
  }

  generateTicket() {
  }
}

