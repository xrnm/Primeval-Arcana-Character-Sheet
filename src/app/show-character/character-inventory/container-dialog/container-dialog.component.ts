import {Component, Inject, OnInit} from '@angular/core';
import {Container} from '../../../container';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EquipmentLoadoutHelper, EquipmentItem} from '../../../equipment-loadout-helper';

@Component({
  selector: 'app-container-dialog',
  templateUrl: './container-dialog.component.html',
  styleUrls: ['./container-dialog.component.sass']
})
export class ContainerDialogComponent implements OnInit {
  container: Container;
  slung_items: Container[];
  equipmentCatalog: EquipmentItem[];
  filteredEquipment: EquipmentItem[];
  templateFilter: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.container = data.container;
    this.slung_items = data.slung_items;
    this.equipmentCatalog = EquipmentLoadoutHelper.getEquipmentCatalog()
      .filter(e => e.slingable);
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
      this.container.name = selected.name;
      this.container.weight = selected.weight;
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

  upsertContainer() {
    if (this.slung_items)
      this.slung_items.push(this.container);
  }
}
