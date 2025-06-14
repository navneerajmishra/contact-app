import { ChangeDetectionStrategy, Component, Signal, computed, input, model, output } from '@angular/core';
import { Contact } from '../../../store/model/contact';
import { CommonModule } from '@angular/common';
import { PaginationOption, PaginatorComponent } from "../paginator/paginator.component";
import { toObservable } from '@angular/core/rxjs-interop';
import { debounce, debounceTime, map, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';

export type Field = {
  id: string;
  name: string;
  isHidden: boolean;
};

export type ValueType<T> = T[];

@Component({
  selector: 'ca-table',
  imports: [CommonModule, FormsModule, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  host: {
    class: 'flex flex-col w-full'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly values = input.required<any[]>();
  readonly fields = input.required<Field[]>();
  readonly paginationOptions = input<PaginationOption>();
  readonly allowSearch = input<boolean>(true);

  readonly pageChange = output<number>();
  readonly searchChange = output<string>();

  readonly searchString = model<string>();

  readonly rowClick = output<{data: any; sourceEvent: Event }>();

  fieldsToDisplay = computed(() => this.fields().filter(f => !f.isHidden));

  constructor() {
    toObservable(this.searchString).pipe(
      debounceTime(300),
      tap(searchString => this.searchChange.emit(searchString ?? ''))
    ).subscribe();
  }

  onClick(value: any, event: Event) {
    this.rowClick.emit({data: value, sourceEvent: event})
  }
}
