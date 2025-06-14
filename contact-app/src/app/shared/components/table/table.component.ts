import { ChangeDetectionStrategy, Component, Signal, computed, input, output } from '@angular/core';
import { Contact } from '../../../store/model/contact';
import { CommonModule } from '@angular/common';
import { PaginationOption, PaginatorComponent } from "../paginator/paginator.component";

export type Field = {
  id: string;
  name: string;
  isHidden: boolean;
};

export type ValueType<T> = T[];

@Component({
  selector: 'ca-table',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly values = input.required<any[]>();
  readonly fields = input.required<Field[]>();
  readonly paginationOptions = input<PaginationOption>();
  readonly pageChange = output<number>();

  readonly rowClick = output<{data: any; sourceEvent: Event }>();

  fieldsToDisplay = computed(() => this.fields().filter(f => !f.isHidden));

  constructor() {

  }

  onClick(value: any, event: Event) {
    this.rowClick.emit({data: value, sourceEvent: event})
  }
}
