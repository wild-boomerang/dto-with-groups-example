import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ValidationGroup } from '../products.constants';
import { DtoWithGroups } from '../../app.dto';
import { getValidationGroups } from '../products.helper';

export class CreateProductDto extends DtoWithGroups {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '56.65' })
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsBoolean()
  isOnSale: boolean;

  @ApiProperty({
    example: '2023-12-22T18:59:46.065+01:00',
    required: false,
  })
  @IsDateString(undefined, {
    groups: [ValidationGroup.IS_ON_SALE_AND_BOTH_NOT_DEFINED],
    message: '`startDate` or `endDate` should be a date string',
  })
  @IsDateString(undefined, {
    groups: [
      ValidationGroup.IS_ON_SALE_AND_BOTH_DEFINED,
      ValidationGroup.IS_ON_SALE_AND_START_DEFINED,
    ],
  })
  @IsIn([undefined, ''], {
    groups: [ValidationGroup.IS_ON_SALE_AND_END_DEFINED],
    message: '`startDate` should be undefined or an empty string',
  })
  startDate?: string;

  @ApiProperty({
    example: '2023-12-22T18:59:46.065+01:00',
    required: false,
  })
  @IsDateString(undefined, {
    groups: [ValidationGroup.IS_ON_SALE_AND_BOTH_NOT_DEFINED],
    message: '`startDate` or `endDate` should be a date string',
  })
  @IsDateString(undefined, {
    groups: [
      ValidationGroup.IS_ON_SALE_AND_BOTH_DEFINED,
      ValidationGroup.IS_ON_SALE_AND_END_DEFINED,
    ],
  })
  @IsIn([undefined, ''], {
    groups: [ValidationGroup.IS_ON_SALE_AND_START_DEFINED],
    message: '`endDate` should be undefined or an empty string',
  })
  endDate?: string;

  getGroups?(): ValidationGroup[] {
    return getValidationGroups(this);
  }
}
