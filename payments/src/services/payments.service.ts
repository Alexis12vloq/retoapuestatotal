import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "../entities/payment.entity";
import { CreatePaymentDto } from "../dto/create-payment.dto";
import { FlightReservation } from "../../../flights/src/entities/flight_reservation.entity";
import { Flight } from "../../../flights/src/entities/flight.entity"; // Importa la entidad Flight

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(FlightReservation)
    private readonly reservationRepository: Repository<FlightReservation>,
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { reservationId, amount, payment_status } = createPaymentDto;

    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ["flight"],
    });

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    const flight = reservation.flight;
    if (!flight) {
      throw new Error("Flight not found for this reservation");
    }

    if (flight.seats_available < reservation.seats_reserved) {
      throw new Error("Not enough available seats on this flight");
    }

    flight.seats_available =
      flight.seats_available - reservation.seats_reserved;

    console.log(reservation);
    await this.flightRepository.save(flight);

    const payment = this.paymentsRepository.create({
      reservation,
      amount,
      payment_status,
    });

    return this.paymentsRepository.save(payment);
  }

  findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  findOne(id: number): Promise<Payment | null> {
    return this.paymentsRepository.findOneBy({ id });
  }
}
