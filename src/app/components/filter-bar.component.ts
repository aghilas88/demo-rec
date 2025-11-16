import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilterCriteria } from '../models/balances.model';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Input() filters: FilterCriteria[] = [];
  @Output() filtersChange = new EventEmitter<FilterCriteria[]>();
  @Output() filterRemoved = new EventEmitter<number>();

  removeFilter(index: number) {
    this.filters.splice(index, 1);
    this.filtersChange.emit(this.filters);
    this.filterRemoved.emit(index);
  }

  toggleNegate(index: number) {
    this.filters[index].negate = !this.filters[index].negate;
    this.filtersChange.emit(this.filters);
  }

  clearAllFilters() {
    this.filters = [];
    this.filtersChange.emit(this.filters);
  }

  getFilterLabel(filter: FilterCriteria): string {
    const operator = filter.operator || 'equals';
    const negate = filter.negate ? 'NOT ' : '';
    
    const operatorSymbol: { [key: string]: string } = {
      'equals': '=',
      'contains': '~',
      'gt': '>',
      'gte': '≥',
      'lt': '<',
      'lte': '≤',
      'ne': '≠'
    };

    return `${negate}${filter.field} ${operatorSymbol[operator]} ${filter.value}`;
  }
}
