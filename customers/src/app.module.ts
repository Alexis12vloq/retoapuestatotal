import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomersController } from "./controllers/customers.controller";
import { CustomersService } from "./services/customers.service";
import { Customer } from "./entities/customer.entity";
import { FlightReservation } from "../../flights/src/entities/flight_reservation.entity";
import { Payment } from "../../payments/src/entities/payment.entity";
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
      entities: [Customer, Payment, Flight, FlightReservation],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([Customer, Payment, Flight, FlightReservation]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class AppModule {}
