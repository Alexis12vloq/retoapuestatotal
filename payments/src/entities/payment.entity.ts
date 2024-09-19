import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { FlightReservation } from "../../../flights/src/entities/flight_reservation.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FlightReservation, (reservation) => reservation.payments, {
    onDelete: "CASCADE",
  })
  reservation: FlightReservation;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  payment_date: Date;

  @Column({ default: "PENDING" })
  payment_status: string;
}
