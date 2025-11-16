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

  editingIndex: number | null = null;
  
  operators = [
    { value: 'equals', label: 'Égal (=)', symbol: '=' },
    { value: 'contains', label: 'Contient (~)', symbol: '~' },
    { value: 'gt', label: 'Plus grand (>)', symbol: '>' },
    { value: 'gte', label: 'Plus grand ou égal (≥)', symbol: '≥' },
    { value: 'lt', label: 'Plus petit (<)', symbol: '<' },
    { value: 'lte', label: 'Plus petit ou égal (≤)', symbol: '≤' },
    { value: 'ne', label: 'Différent (≠)', symbol: '≠' }
  ];

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

  startEdit(index: number) {
    this.editingIndex = index;
  }

  stopEdit() {
    this.editingIndex = null;
  }

  updateOperator(index: number, operator: string) {
    this.filters[index].operator = operator as any;
    this.filtersChange.emit(this.filters);
    this.stopEdit();
  }

  updateValue(index: number, event: any) {
    this.filters[index].value = event.target.value;
  }

  applyValueChange(index: number) {
    this.filtersChange.emit(this.filters);
    this.stopEdit();
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

  getOperatorSymbol(operator: string): string {
    const symbols: { [key: string]: string } = {
      'equals': '=',
      'contains': '~',
      'gt': '>',
      'gte': '≥',
      'lt': '<',
      'lte': '≤',
      'ne': '≠'
    };
    return symbols[operator] || '=';
  }
}
