import { IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { DtoWithGroups } from '../../app.dto';
import { getValidationGroups } from '../products.helper';
import { ValidationGroup } from '../products.constants';

export class UpdateProductDto extends IntersectionType(
  OmitType(CreateProductDto, ['getGroups']),
  DtoWithGroups,
) {
  getGroups?(): ValidationGroup[] {
    return getValidationGroups(this);
  }
}
