import {
  ArgumentMetadata,
  PipeTransform,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DtoWithGroups } from './app.dto';

export class AppValidationPipe implements PipeTransform {
  constructor(private readonly options?: ValidationPipeOptions) {}

  transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;

    const instance = plainToInstance(metatype, value);

    let groups: string[] = [];
    if (typeof (instance as DtoWithGroups)?.getGroups === 'function') {
      groups = instance.getGroups();
    }

    const validationPipe = new ValidationPipe({
      ...this.options,
      groups,
      always: true,
    });

    return validationPipe.transform(value, metadata);
  }
}
