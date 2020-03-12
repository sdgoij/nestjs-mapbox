import { BadRequestException, Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { AppService } from "./app.service";

const pipes = [new ValidationPipe({ transform: true })];

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  async geocode(@Query("q") query: string, @Query("p", ...pipes) proximity?: number[]) {
    if (!query) {
      throw new BadRequestException("missing mandatory 'q' query parameter");
    }
    if (proximity) {
      proximity = proximity.map(p => Number(p));
    }
    const r = await this.service.geocode({
      mode: "mapbox.places",
      query,
      proximity,
    });
    return (r).body;
  }
}
