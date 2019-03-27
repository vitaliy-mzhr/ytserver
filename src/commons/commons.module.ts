import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MemStorageService } from './mem-storage.service';

const sharedProviders = [
  MemStorageService,
];

@Global()
@Module({
  providers: [
    MemStorageService,
  ],
  exports: [
    ...sharedProviders,
  ],
})
export class CommonsModule {}
