import {FlightGeneric} from "./flightGeneric";
import {FlightStatus} from "./flightStatus";

export interface Flight {
  flightGeneric: FlightGeneric;
  departureDate: string;
  isFull: boolean;
  flightStatus: FlightStatus;
}
