import { SortOrder } from ".";

export type FieldType = 'string' | 'date';

export type SortOption<T> = {
  field: keyof T;
  order: SortOrder;
}

export type Field<T> = {
    id: keyof T;
    name: string;
    type: FieldType;
    isSortable: boolean;
    isHidden: boolean;
    displayOrder?: number;
};
