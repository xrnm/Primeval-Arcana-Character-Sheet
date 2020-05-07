import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: [], ...args: unknown[]): unknown {
    return value.slice().reverse();
  }

}
