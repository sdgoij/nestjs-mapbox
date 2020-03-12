import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MapBoxModule } from "../../src";

@Module({
  imports: [
    // MapBoxModule.register({
    //   accessToken: process.env.MAPBOX_ACCESS_TOKEN,
    // }),

    MapBoxModule.registerAsync({
      useFactory: () => {
        return {
          accessToken: process.env.MAPBOX_ACCESS_TOKEN,
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
