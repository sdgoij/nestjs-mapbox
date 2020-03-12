import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { SdkConfig } from '@mapbox/mapbox-sdk/lib/classes/mapi-client';

export interface MapBoxOptions extends SdkConfig {}

export interface MapBoxOptionsFactory {
  createMapBoxOptions(): Promise<MapBoxOptions> | MapBoxOptions;
}

export interface MapBoxAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (...args: any[]) => Promise<MapBoxOptions> | MapBoxOptions;
  useExisting?: Type<MapBoxOptionsFactory>;
  useClass?: Type<MapBoxOptionsFactory>;
  inject?: any[];
}
