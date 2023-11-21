import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'listkeys' })
export class ListKeysPipe implements PipeTransform {
  transform(value, optionFields: Map<string, string>): any {
    if (!value) {
      return [];
    }
    let retOut = Object.keys(value);
    retOut = retOut.filter(x => x && x.length > 0 && x.toLowerCase().indexOf('antiinjection') < 0);
    if (optionFields && optionFields.size > 0) {
      retOut = retOut.filter(x => x && x.length > 0 && optionFields.has(x));
    }
    return retOut;
  }
}
// <table>
//   <thead>
//     <tr>
//       <th *ngFor="let head of items[0] | listkeys">{{head}}</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr *ngFor="let item of items">
//       <td *ngFor="let list of item | listkeys">{{item[list]}}</td>
//     </tr>
//   </tbody>
// </table>

// <table>
// <thead>
//   <tr>
//     <th *ngFor="let head of dataModel | listkeys">{{head}}</th>
//   </tr>
// </thead>
// <tbody>
//   <tr>
//     <td *ngFor="let list of dataModel | listkeys">{{dataModel[list]}}</td>
//   </tr>
// </tbody>
// </table>
//
// <table>
// <thead>
//   <tr>
//     <th>
//       پارامتر
//     </th>
//     <th>
//       مقادیر
//     </th>
//   </tr>
// </thead>
// <tbody>
//   <tr *ngFor="let head of dataModel | listkeys">
//     <td>{{head}}</td>
//     <td>{{dataModel[head]}}</td>
//   </tr>
// </tbody>
// </table>
