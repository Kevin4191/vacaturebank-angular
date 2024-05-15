import { Pipe, PipeTransform } from '@angular/core';
import { Vacancy } from './model/vacancy';

@Pipe({
  name: 'functieFilter',
  pure: false // Ensure the pipe re-runs on changes to the filter criteria
})
export class FilterPipe implements PipeTransform {
  transform(vacancies: Vacancy[], filteredVacancies: Vacancy[]): Vacancy[] {
    if (!filteredVacancies) {
      return [];
    }

    return filteredVacancies;
  }
}