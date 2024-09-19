import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { PaymentsService } from "../services/payments.service";
import { CreatePaymentDto } from "../dto/create-payment.dto";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get("/health")
  checkHealth() {
    return {
      status: "OK",
      timestamp: new Date(),
    };
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }
}
