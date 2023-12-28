import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDTO } from '../dto/response.dto';

export const SwaggerSearchResponse = <T extends Type<any>>(model: T) => {
  return applyDecorators(
    ApiExtraModels(ResponseDTO, model),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDTO) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              count: {
                type: 'number',
                example: 5,
              },
            },
          },
        ],
      },
    }),
  );
};

export const SwaggerResponse = <T extends Type<any>>(model: T) => {
  return applyDecorators(
    ApiExtraModels(ResponseDTO, model),
    ApiResponse({
      schema: {
        oneOf: [
          {
            $ref: getSchemaPath(ResponseDTO),
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};
