/**
 * TypeScript data models and interfaces for the Spartan REST API.
 * Corresponds to OpenAPI 3.0.1 specification at /v3/api-docs
 */

export type ApiGender = 'Male' | 'Female';

export interface SpartanDTO {
  id?: number;
  name: string;
  gender: ApiGender;
  phone: string;
}

export type SpartanPartialUpdateDTO = Partial<Omit<SpartanDTO, 'id'>>;

export interface SpartanListContainer {
  spartanList: SpartanDTO[];
}

export interface ResponseWrapper<T> {
  message: string;
  totalElement?: number;
  data?: T;
}

export interface ValidationException {
  errorField: string;
  rejectedValue?: any;
  reason: string;
}

export interface ExceptionWrapper {
  message: string;
  httpStatus: string;
  localDateTime: string;
  errorCount?: number;
  validationExceptions?: ValidationException[];
}

export interface SpartanSearchQueryParams {
  nameContains?: string;
  gender?: ApiGender;
}
