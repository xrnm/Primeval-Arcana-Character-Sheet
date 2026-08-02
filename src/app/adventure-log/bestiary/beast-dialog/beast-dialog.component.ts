import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {Beast} from '../../../beast';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import {BestiaryImageRepository} from '../../../persistence/bestiary-image.repository';
import {CampaignService} from '../../../campaign.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-beast-dialog',
    templateUrl: './beast-dialog.component.html',
    styleUrls: ['./beast-dialog.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, FormsModule,
      MatDialogActions, MatButton, MatIcon]
})
export class BeastDialogComponent {
  beast: Beast;
  bestiary: Beast[];
  isNew: boolean;
  uploading: boolean = false;
  uploadError: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<BeastDialogComponent>,
    private images: BestiaryImageRepository,
    private campaignService: CampaignService
  ) {
    this.bestiary = data.bestiary;
    this.isNew = !data.beast;
    this.beast = data.beast || new Beast({name: '', description: ''});
  }

  canUpload(): boolean {
    return this.images.canUpload();
  }

  imageUrl(): string {
    return this.images.publicUrl(this.beast.image_path);
  }

  async selectImage(event: Event){
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if(!file)
      return;

    this.uploadError = '';
    this.uploading = true;
    try {
      const previous = this.beast.image_path;
      this.beast.image_path = await this.images.upload(file, this.campaignService.activeCampaign?.id);
      await this.images.remove(previous);
    } catch (error) {
      this.uploadError = error?.message || 'Could not upload that image';
    } finally {
      this.uploading = false;
    }
  }

  async removeImage(){
    const path = this.beast.image_path;
    this.beast.image_path = null;
    await this.images.remove(path);
  }

  // A new creature is only added on save, so cancelling out leaves nothing behind — but an image
  // uploaded during that abandoned edit would linger in the bucket, so drop it too.
  async cancel(){
    if (this.isNew)
      await this.images.remove(this.beast.image_path);
    this.dialogRef.close();
  }

  save(){
    if (this.isNew)
      this.bestiary.unshift(this.beast);
    this.dialogRef.close();
  }

  async deleteBeast(){
    if (!confirm('Are you sure you want to delete ' + (this.beast.name || 'this creature') + '?'))
      return;
    const index = this.bestiary.indexOf(this.beast);
    if (index >= 0)
      this.bestiary.splice(index, 1);
    await this.images.remove(this.beast.image_path);
    this.dialogRef.close();
  }
}
