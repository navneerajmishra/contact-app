import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    model,
    output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ClickableDirective } from '@shared/directives/clickable.directive';
import { Field, PaginationOption, SortOption } from '@shared/models';

export type ValueType<T> = T[];

@Component({
    selector: 'ca-table',
    imports: [
        CommonModule,
        FormsModule,
        PaginatorComponent,
        ClickableDirective,
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    host: {
        class: 'flex flex-col w-full',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
    readonly values = input.required<T[]>();
    readonly fields = input.required<Field<T>[]>();
    readonly key = input.required<keyof T>();
    readonly totalRecords = input.required<number>();
    readonly paginationOptions = input.required<PaginationOption>();
    readonly sortOption = input<SortOption<T>>();

    readonly pageChange = output<number | null>();
    readonly searchChange = output<string>();
    readonly sortChange = output<SortOption<T>>();

    readonly searchString = model<string>();

    readonly rowClick = output<{ data: T }>();
    readonly update = output<{ data: T }>();
    readonly delete = output<{ data: T }>();

    fieldsToDisplay = computed(() => this.fields().filter((f) => !f.isHidden));

    constructor() {
        toObservable(this.searchString)
            .pipe(
                debounceTime(500),
                tap((searchString) =>
                    this.searchChange.emit(searchString?.trim() ?? '')
                )
            )
            .subscribe();
    }

    onUpdate(value: T, event: Event) {
        event.stopPropagation();
        this.update.emit({ data: value });
    }

    onDelete(value: T, event: Event) {
        event.stopPropagation();
        this.delete.emit({ data: value });
    }

    sort(field: Field<T>) {
        const currentlyAppliedSortOption = this.sortOption();
        // If currently applied sort field and clicked field is same, toggle sort order
        if (currentlyAppliedSortOption?.field === field.id) {
            this.sortChange.emit({
                field: field.id,
                order:
                    currentlyAppliedSortOption.order === 'asc' ? 'desc' : 'asc',
            });
        } else {
            // For another field, first sort it in 'asc' order
            this.sortChange.emit({
                field: field.id,
                order: 'asc',
            });
        }
    }
}
