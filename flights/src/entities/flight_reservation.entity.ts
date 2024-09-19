import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Customer } from "../../../customers/src/entities/customer.entity";
import { Flight } from "./flight.entity";
import { Payment } from "../../../payments/src/entities/payment.entity";

@Entity({ schema: "public" })
export class FlightReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flight, (flight) => flight.reservations, {
    onDelete: "CASCADE",
  })
  flight: Flight;

  @ManyToOne(() => Customer, (customer) => customer.reservations, {
    onDelete: "CASCADE",
  })
  customer: Customer;

  @Column()
  seats_reserved: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total_price: number;

  @Column({ default: "CONFIRMED" })
  reservation_status: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(() => Payment, (payment) => payment.reservation)
  payments: Payment[];
}
