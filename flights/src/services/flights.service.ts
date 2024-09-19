import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Flight } from "../entities/flight.entity";
import { CreateFlightDto } from "../dto/create-flight.dto";

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightsRepository: Repository<Flight>
  ) {}

  create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const flight = this.flightsRepository.create(createFlightDto);
    return this.flightsRepository.save(flight);
  }

  findAll(): Promise<Flight[]> {
    return this.flightsRepository.find();
  }

  findOne(id: number): Promise<Flight | null> {
    return this.flightsRepository.findOneBy({ id });
  }
}
