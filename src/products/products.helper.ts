import { ValidationGroup } from './products.constants';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export const getValidationGroups = (
  dto: CreateProductDto | UpdateProductDto,
): ValidationGroup[] => {
  if (dto.isOnSale === undefined) {
    return [ValidationGroup.IS_ON_SALE_IS_NOT_DEFINED];
  }
  if (!dto.isOnSale) {
    return [ValidationGroup.IS_NOT_ON_SALE];
  }
  if (dto.startDate && dto.endDate) {
    return [ValidationGroup.IS_ON_SALE_AND_BOTH_DEFINED];
  }
  if (dto.startDate && !dto.endDate) {
    return [ValidationGroup.IS_ON_SALE_AND_START_DEFINED];
  }
  if (!dto.startDate && dto.endDate) {
    return [ValidationGroup.IS_ON_SALE_AND_END_DEFINED];
  }
  return [ValidationGroup.IS_ON_SALE_AND_BOTH_NOT_DEFINED];
};
