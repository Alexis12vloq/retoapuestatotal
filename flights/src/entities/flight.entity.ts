import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FlightReservation } from "./flight_reservation.entity";

@Entity({ schema: "public" })
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination: string;

  @Column()
  departure_date: Date;

  @Column()
  arrival_date: Date;

  @Column()
  seats_available: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(() => FlightReservation, (reservation) => reservation.flight)
  reservations: FlightReservation[];
}
