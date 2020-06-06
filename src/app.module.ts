import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalenderModule } from './calender/calender.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";




@Module({
  imports: [
      CalenderModule,
      TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {


}
