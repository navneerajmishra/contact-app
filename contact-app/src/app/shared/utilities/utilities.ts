import { SortOrder } from '@shared/models';

export const filterMap = <T, U>(
    array: T[],
    callback: (value: T, index: number) => U | undefined
): U[] => {
    const result: U[] = [];
    for (let i = 0; i < array.length; i++) {
        const mapped = callback(array[i], i);
        if (mapped !== undefined) {
            result.push(mapped);
        }
    }
    return result;
};

export const sortByStringField = <T>(
    array: T[],
    field: keyof T,
    order: SortOrder = 'asc'
): T[] =>
    array.slice().sort((a, b) => {
        const valA = String(a[field]).toLowerCase();
        const valB = String(b[field]).toLowerCase();

        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
