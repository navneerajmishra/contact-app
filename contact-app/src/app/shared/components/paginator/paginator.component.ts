import { Component, WritableSignal, computed, input, linkedSignal, output } from '@angular/core';

export interface PaginationOption {
  total: number;
  pageNumber: number;
  pageSize?: number;
}

@Component({
  selector: 'ca-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  readonly options = input<PaginationOption>();

  readonly pageChange = output<number>();

  readonly #defaultPageSize = 10;
  protected readonly totalPages = computed(() => {
    const paginationOptions = this.options();
    return paginationOptions ? 
      Math.ceil(paginationOptions.total / (paginationOptions.pageSize ?? this.#defaultPageSize)) : null
  });

  protected pageChanged(pageNumber: number) {
    //this.currentPage.update(() => pageNumber);
    this.pageChange.emit(pageNumber);
  }
}
