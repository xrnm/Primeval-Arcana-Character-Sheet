import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import {Item} from '../../../item';
import {EquipmentLoadoutHelper, EquipmentItem} from '../../../equipment-loadout-helper';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';

import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-item-dialog',
    templateUrl: './item-dialog.component.html',
    styleUrls: ['./item-dialog.component.sass'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, FormsModule, MatAutocompleteTrigger, MatAutocomplete, MatOption, MatDialogActions, MatButton, MatDialogClose]
})
export class ItemDialogComponent implements OnInit {
  list: Item[];
  item: Item;
  equipmentCatalog: EquipmentItem[];
  filteredEquipment: EquipmentItem[];
  templateFilter: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.list = data.list;
    if (!data.item)
      this.item = new Item();
    else
      this.item = data.item;
    this.equipmentCatalog = EquipmentLoadoutHelper.getEquipmentCatalog()
      .filter(e => e.price !== null && e.weight !== null);
    this.filteredEquipment = this.equipmentCatalog;
  }

  ngOnInit(): void {
  }

  filterTemplates(): void {
    if (!this.templateFilter) {
      this.filteredEquipment = this.equipmentCatalog;
      return;
    }
    const filter = this.templateFilter.toLowerCase();
    this.filteredEquipment = this.equipmentCatalog.filter(e =>
      e.name.toLowerCase().includes(filter)
    );
  }

  onTemplateSelect(event): void {
    const name = event.option.value;
    const selected = this.equipmentCatalog.find(e => e.name === name);
    if (selected) {
      this.item.name = selected.name;
      this.item.weight = selected.weight;
      this.item.quantity = selected.sold_in;
      this.item.description = selected.description;
    }
  }

  formatGp(copper: number): string {
    const gp = Math.floor(copper / 100);
    const sp = Math.floor((copper % 100) / 10);
    const cp = copper % 10;
    let result = gp + 'gp';
    if (sp > 0) result += ' ' + sp + 'sp';
    if (cp > 0) result += ' ' + cp + 'cp';
    return result;
  }

  upsertItem() {
    if (this.list)
      this.list.push(this.item);
  }
}
