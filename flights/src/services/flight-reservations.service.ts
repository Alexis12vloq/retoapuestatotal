import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlightReservation } from "../entities/flight_reservation.entity";
import { CreateReservationDto } from "../dto/create-reservation.dto";
import { Flight } from "../entities/flight.entity";
import { Customer } from "../../../customers/src/entities/customer.entity";

@Injectable()
export class FlightReservationsService {
  constructor(
    @InjectRepository(FlightReservation)
    private readonly reservationRepository: Repository<FlightReservation>,
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async createReservation(createReservationDto: CreateReservationDto) {
    const { flightId, seats_reserved, total_price, email, name } =
      createReservationDto;

    const flight = await this.flightRepository.findOne({
      where: { id: flightId },
    });

    if (!flight) {
      throw new Error("Flight not found");
    }

    let customer = await this.customerRepository.findOne({
      where: { email },
    });

    if (!customer) {
      customer = this.customerRepository.create({
        email,
        name,
      });
      customer = await this.customerRepository.save(customer);
    }

    const reservation = this.reservationRepository.create({
      flight,
      customer,
      seats_reserved,
      total_price,
    });

    return this.reservationRepository.save(reservation);
  }

  findOne(id: number) {
    return this.reservationRepository.findOne({
      where: { id },
      relations: ["flight"],
    });
  }

  findAll() {
    return this.reservationRepository.find();
  }
}
