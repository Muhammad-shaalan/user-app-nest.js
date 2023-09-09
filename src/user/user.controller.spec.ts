import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });
  
  describe('findAll', () => {
    it('should return an object contain array of users and status of request', async () => {
      const result = {
        "data": [],
        "status": 1,
      };
      expect(await controller.getAllUsers()).toStrictEqual(result);
    });
  });
});
