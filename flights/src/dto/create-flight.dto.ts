export class CreateFlightDto {
  readonly destination: string;
  readonly departure_date: string;
  readonly arrival_date: string;
  readonly seats_available: number;
  readonly price: number;
}
