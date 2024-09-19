export class CreatePaymentDto {
  readonly reservationId: number;
  readonly amount: number;
  readonly payment_status: string;
}
