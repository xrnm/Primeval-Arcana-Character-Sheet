import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Item} from '../../../item';
import {EquipmentLoadoutHelper, EquipmentItem} from '../../../equipment-loadout-helper';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.sass']
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
