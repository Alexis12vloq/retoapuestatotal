import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../entities/customer.entity";
import { CreateCustomerDto } from "../dto/create-customer.dto";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) // Asegúrate de que la entidad esté correctamente referenciada
    private readonly customersRepository: Repository<Customer>
  ) {}

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }
  findOne(id: number): Promise<Customer | null> {
    console.log(id);
    return this.customersRepository.findOneBy({ id });
  }
}
