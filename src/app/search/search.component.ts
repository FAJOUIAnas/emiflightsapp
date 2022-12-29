import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Airport} from "../model/airport";
import {HttpErrorResponse} from "@angular/common/http";
import {AirportService} from "../service/airport.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  public airports : Airport[] = [];
  constructor(private route: Router, private airportService : AirportService) {
  }

  onSearchFlight(origin: string, destination: string, depDate: string) {
    this.route.navigate([`searchflight/${origin}/${destination}/${depDate}`])
  }

  control = new FormControl<string | Airport>('');
  filteredOptions!: Observable<Airport[]>;
  public getAirports(): void {
    this.airportService.getAirports().subscribe(
      (response: Airport[]) => {
        this.airports = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit() {
    this.getAirports();

    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        const city = typeof value === 'string' ? value : value?.city;
        return city ? this._filter(city as string) : this.airports.slice();
      }),
    );
  }

  displayFn(airport: Airport): string {
    return airport && airport.code ? airport.code : '';
  }

  private _filter(city: string): Airport[] {
    const filterValue = city.toLowerCase();

    return this.airports.filter(airport => airport.city.toLowerCase().includes(filterValue));
  }
}
