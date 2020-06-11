import { Test, TestingModule } from '@nestjs/testing';
import { CalenderService } from './calender.service';
import {Repository} from "typeorm";
import {Familycalender} from "./calender.entity";
import {getRepositoryToken} from "@nestjs/typeorm";


describe('Calender Service', () => {
  let service: CalenderService;
  let module: TestingModule;
  let calenderRepo: MockType<Repository<Familycalender>>
  let calenderTypeRepositoryMock: MockType<Repository<Familycalender>>;
  const mockNumberParameter = 0;


  beforeAll(async () => {
     module: await Test.createTestingModule({
      providers: [CalenderService, {provide: getRepositoryToken(Familycalender), useFactory: repositoryMockFactory}],
    }).compile();

    service = module.get<CalenderService>(CalenderService);
    calenderRepo = module.get(getRepositoryToken(Familycalender));
    calenderTypeRepositoryMock = module.get(getRepositoryToken(Familycalender))
  });


});



// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn()
}));
export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
