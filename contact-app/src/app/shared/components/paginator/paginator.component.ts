import { Component, computed, effect, input, output } from '@angular/core';
import { PaginationOption } from '@shared/models';

@Component({
  selector: 'ca-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  readonly options = input.required<PaginationOption>();
  readonly total = input.required<number>();

  readonly pageChange = output<number | null>();

  protected readonly totalPages = computed(() => {
    const paginationOptions = this.options();
    return paginationOptions ? Math.ceil(this.total() / (paginationOptions.pageSize )) : null
  });

  constructor() {
    effect(() => {
      const totalPages = this.totalPages();
      this.pageChanged(totalPages && totalPages > 0 ? 1 : null);
    });
  }

  protected pageChanged(pageNumber: number | null) {
    this.pageChange.emit(pageNumber);
  }
}
