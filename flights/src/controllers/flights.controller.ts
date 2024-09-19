import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { FlightsService } from "../services/flights.service";
import { CreateFlightDto } from "../dto/create-flight.dto";

@Controller("flights")
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.flightsService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.flightsService.findAll();
  }

  @Get("/")
  healthCheck() {
    return "OK";
  }
}
