import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsController } from "./controllers/payments.controller";
import { PaymentsService } from "./services/payments.service";
import { Payment } from "./entities/payment.entity";
import { FlightReservation } from "../../flights/src/entities/flight_reservation.entity"; // Incluye aquí la entidad relacionada
import { Customer } from "../../customers/src/entities/customer.entity";
import { Flight } from "../../flights/src/entities/flight.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "aws-0-us-west-1.pooler.supabase.com",
      port: 6543,
      username: "postgres.lczaqetwtzktzbmseovq",
      password: "ZKTLj3EpI2rPO0bL",
      database: "postgres",
      entities: [Customer, Flight, FlightReservation, Payment],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([Customer, Flight, FlightReservation, Payment]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class AppModule {}
