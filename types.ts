export interface CustomerData {
  'الاسم': string;
  'العنوان': string;
  'المنطقه': string;
  'تكلفه المنتج': number;
  'رقم الهاتف': string | number;
  'رقم أخر'?: string | number;
  'وصف المنتج': string;
}

export interface Policy {
  id: string;
  name: string;
  address: string;
  region: string;
  cost: number;
  phone1: string;
  phone2: string;
  productDescription: string;
}
