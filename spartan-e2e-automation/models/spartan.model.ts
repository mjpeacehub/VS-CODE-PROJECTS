export type SpartanGender = 'MALE' | 'FEMALE';

export interface Spartan {
  id?: number;
  name: string;
  gender: SpartanGender;
  phone: string;
}

export interface SpartanSearchParams {
  nameContains?: string;
  gender?: 'Male' | 'Female' | 'Select Gender';
}

export interface SpartanTableRow {
  id: string;
  name: string;
  phone: string;
  gender: string;
}
