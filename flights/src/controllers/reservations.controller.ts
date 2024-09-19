// flights/controllers/reservations.controller.ts
import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { CreateReservationDto } from "../dto/create-reservation.dto";
import { FlightReservationsService } from "../services/flight-reservations.service";

@Controller("reservations")
export class ReservationsController {
  constructor(
    private readonly flightReservationsService: FlightReservationsService
  ) {}

  @Post()
  createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.flightReservationsService.createReservation(
      createReservationDto
    );
  }

  @Get(":id")
  findReservation(@Param("id") id: string) {
    return this.flightReservationsService.findOne(+id);
  }

  @Get()
  findAllReservations() {
    return this.flightReservationsService.findAll();
  }

  @Get("/health")
  healthCheck() {
    return "OK";
  }
}
