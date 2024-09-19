import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FlightReservation } from "../../../flights/src/entities/flight_reservation.entity";

@Entity({ schema: "public" })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(() => FlightReservation, (reservation) => reservation.customer)
  reservations: FlightReservation[];
}
