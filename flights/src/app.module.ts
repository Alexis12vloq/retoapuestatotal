import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FlightsController } from "./controllers/flights.controller";
import { FlightsService } from "./services/flights.service";
import { Flight } from "./entities/flight.entity";
import { FlightReservation } from "./entities/flight_reservation.entity";
import { Payment } from "../../payments/src/entities/payment.entity";
import { Customer } from "../../customers/src/entities/customer.entity";
import { ReservationsController } from "./controllers/reservations.controller";
import { FlightReservationsService } from "./services/flight-reservations.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "aws-0-us-west-1.pooler.supabase.com",
      port: 6543,
      username: "postgres.lczaqetwtzktzbmseovq",
      password: "ZKTLj3EpI2rPO0bL",
      database: "postgres",
      entities: [Customer, Payment, Flight, FlightReservation],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([Customer, Payment, Flight, FlightReservation]),
  ],
  controllers: [FlightsController, ReservationsController],
  providers: [FlightsService, FlightReservationsService],
})
export class AppModule {}
