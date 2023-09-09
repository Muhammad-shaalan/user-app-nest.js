import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('UserController', () => {
let usersController: UsersController;
let usersService: UsersService;

beforeEach(async () => {
usersController = new UsersController(usersService);
usersService = new UsersService();

// const module: TestingModule = await Test.createTestingModule({
//   controllers: [UserController],
// }).compile();
// controller = module.get<UserController>(UserController);
});

it('should be defined', () => {
expect(controller).toBeDefined();
});
});
