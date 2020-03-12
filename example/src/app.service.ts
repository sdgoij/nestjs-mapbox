import { Injectable } from "@nestjs/common";
import { GeocodeRequest, GeocodeResponse } from "@mapbox/mapbox-sdk/services/geocoding";
import { MapiRequest } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";

import { ServiceFactoryService } from "../../src";

@Injectable()
export class AppService {
  constructor(private readonly mbox: ServiceFactoryService) {}

  async geocode(options?: GeocodeRequest, reverse: boolean = false) {
    let request: MapiRequest;

    if (reverse) {
      request = this.mbox.geocoding.reverseGeocode(options);
    } else {
      request = this.mbox.geocoding.forwardGeocode(options);
    }

    return await request.send();
  }
}
