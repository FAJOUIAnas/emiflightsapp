import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  constructor(private route: Router) {
  }

  onSearchFlight(origin: string, destination: string, depDate: string) {
    this.route.navigate([`searchflight/${origin}/${destination}/${depDate}`])
  }
}
