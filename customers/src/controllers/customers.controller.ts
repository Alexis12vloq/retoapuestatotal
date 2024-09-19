import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { CustomersService } from "../services/customers.service";
import { CreateCustomerDto } from "../dto/create-customer.dto";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    console.log(id);
    return this.customersService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get("/health")
  healthCheck() {
    return "OK";
  }
}
