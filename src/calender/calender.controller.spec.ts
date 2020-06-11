import { Test, TestingModule } from '@nestjs/testing';
import { CalenderController } from './calender.controller';
import { CalenderService} from "./calender.service";
import {Familycalender} from "./calender.entity";

fdescribe('Calennder Controller', () => {
  let controller: CalenderController;
  let service: CalenderService;
  let module: TestingModule;


  beforeAll(async () => {

    module = await Test.createTestingModule({
      controllers: [CalenderController],
      providers: [
          CalenderService
      ]
    }).compile();

    service = module.get<CalenderService>(CalenderService);
    controller = module.get<CalenderController>(CalenderController)
    });


  describe('findAll', ()=> {
    it('should return an appointment if successful', async () => {
      const result = Familycalender[0]
      jest.spyOn(service, 'findAll').mockImplementation(() => result);
      expect(await controller.findAll()).toBe(result)
    });


    afterEach(() => {
      jest.resetAllMocks();

    });
  })});
