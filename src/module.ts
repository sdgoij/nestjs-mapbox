import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { MAPBOX_MODULE_OPTIONS } from "./constants";
import { MapBoxAsyncOptions, MapBoxOptions, MapBoxOptionsFactory } from "./options";
import { ServiceFactoryService } from "./service";

@Global()
@Module({})
export class MapBoxModule {
  static register(options: MapBoxOptions): DynamicModule {
    return {
      module: MapBoxModule,
      providers: [
        {
          name: MAPBOX_MODULE_OPTIONS,
          provide: MAPBOX_MODULE_OPTIONS,
          useValue: options,
        },
        ServiceFactoryService,
      ],
      exports: [
        ServiceFactoryService,
      ],
    };
  }

  static registerAsync(options: MapBoxAsyncOptions): DynamicModule {
    return {
      module: MapBoxModule,
      imports: options.imports || [],
      providers: [
        this.createModuleOptionsProvider(options),
        ServiceFactoryService,
      ],
      exports: [
        ServiceFactoryService,
      ],
    }
  }

  private static createModuleOptionsProvider(options: MapBoxAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MAPBOX_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }
    return {
      provide: MAPBOX_MODULE_OPTIONS,
      useFactory: async (factory: MapBoxOptionsFactory) => await factory.createMapBoxOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
