import { NgModule } from '@angular/core';
import { FilterPipe } from '../filter.pipe';

@NgModule({
  declarations: [
    /* declare it once, here */
    FilterPipe
  ],
  exports: [
    /* then export it */
    FilterPipe
  ]
})
export class SharedModule { }