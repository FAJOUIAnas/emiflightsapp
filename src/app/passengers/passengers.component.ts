import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  public adultPassengers : Array<number> = [];
  public childPassengers : Array<number> = [];
  public nbOfPassengersAdults !: string;
  public nbOfPassengersChildren !: string;
  constructor(private  route : ActivatedRoute) {}

  ngOnInit(): void {
    const outboundFlightId : string = this.route.snapshot.params['outbound-flight-id'];
    const returnFlightId : string = this.route.snapshot.params['return-flight-id'];
    this.nbOfPassengersAdults = this.route.snapshot.params['nb-of-passengers-adults'];
    this.nbOfPassengersChildren = this.route.snapshot.params['nb-of-passengers-children'];
    const _class : number = this.route.snapshot.params['class'];
    this.adultPassengers = Array.from(Array(parseInt(this.nbOfPassengersAdults)),(x,i)=>i);
    this.childPassengers = Array.from(Array(parseInt(this.nbOfPassengersChildren)),(x,i)=>i);
  }

}
