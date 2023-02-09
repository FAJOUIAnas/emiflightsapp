import {FlightGeneric} from "./flightGeneric";
import {FlightStatus} from "./flightStatus";

export interface Flight {
  id: string;
  flightGeneric: FlightGeneric;
  departureDate: string;
  isFull: boolean;
  flightStatus: FlightStatus;
}
