import { Inject, Injectable } from "@nestjs/common";
import Datasets, { DatasetsService } from "@mapbox/mapbox-sdk/services/datasets";
import Directions, { DirectionsService } from "@mapbox/mapbox-sdk/services/directions";
import Geocoding, { GeocodeService } from "@mapbox/mapbox-sdk/services/geocoding";
import MapMatching, { MapMatchingService } from "@mapbox/mapbox-sdk/services/map-matching";
import Matrix, { MatrixService } from "@mapbox/mapbox-sdk/services/matrix";
import Optimization, { OptimizationService } from "@mapbox/mapbox-sdk/services/optimization";
import StaticMap, { StaticMapService } from "@mapbox/mapbox-sdk/services/static";
import Styles, { StylesService } from "@mapbox/mapbox-sdk/services/styles";
import TileQuery, { TileQueryService } from "@mapbox/mapbox-sdk/services/tilequery";
import Tilesets, { TilesetsService } from "@mapbox/mapbox-sdk/services/tilesets";
import Tokens, { TokensService } from "@mapbox/mapbox-sdk/services/tokens";
import Uploads, { UploadsService } from "@mapbox/mapbox-sdk/services/uploads";

import { MAPBOX_MODULE_OPTIONS } from "./constants";
import { MapBoxOptions } from "./options";

const MapiClient = require("@mapbox/mapbox-sdk");

export type MapBoxService =
  | DatasetsService
  | DirectionsService
  | GeocodeService
  | MapMatchingService
  | MatrixService
  | OptimizationService
  | StaticMapService
  | StylesService
  | TileQueryService
  | TilesetsService
  | TokensService
  | UploadsService;

@Injectable()
export class ServiceFactoryService {
  private readonly client: any;
  private readonly services = new Map<Function, MapBoxService>();

  constructor(@Inject(MAPBOX_MODULE_OPTIONS) private readonly options: MapBoxOptions) {
    this.client = new MapiClient(options);
  }

  get datasets() {
    return this.mapiService(Datasets) as DatasetsService;
  }

  get directions() {
    return this.mapiService(Directions) as DirectionsService;
  }

  get geocoding() {
    return this.mapiService(Geocoding) as GeocodeService;
  }

  get mapMatching() {
    return this.mapiService(MapMatching) as MapMatchingService;
  }

  get matrix() {
    return this.mapiService(Matrix) as MatrixService;
  }

  get optimization() {
    return this.mapiService(Optimization) as OptimizationService;
  }

  get staticMap() {
    return this.mapiService(StaticMap) as StaticMapService;
  }

  get styles() {
    return this.mapiService(Styles) as StylesService;
  }

  get tileQuery() {
    return this.mapiService(TileQuery) as TileQueryService;
  }

  get tilesets() {
    return this.mapiService(Tilesets) as TilesetsService;
  }

  get tokens() {
    return this.mapiService(Tokens) as TokensService;
  }

  get uploads() {
    return this.mapiService(Uploads) as UploadsService;
  }

  private mapiService(factory: Function) {
    let service = this.services.get(factory);
    if (!service) {
      this.services.set(factory, service = factory(this.client));
    }
    return service;
  }
}
