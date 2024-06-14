import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from './item.service';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular_Python_API'
  items: Item[] = [];
  itemForm: FormGroup;
  itemId: any;
  itemData: any;
  user: Item | undefined;
  updateForm: FormGroup;
  selectedItem: Item | null = null;

  constructor(private itemService: ItemService, private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      grade: ['', Validators.required]
    });

    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      grade: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const newItem: Item = this.itemForm.value;
      console.log(newItem);
      
      this.itemService.createItem(newItem).subscribe(createdItem => {
        this.items.push(createdItem);
        this.itemForm.reset();
      });
    }
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.itemService.deleteItem(id).subscribe(() => {
        this.items = this.items.filter(item => item.id !== id);
        console.log('Item deleted successfully');
      }, error => {
        console.error('Error deleting item', error);
      });
    }
  }

  updateItem(): void {
    if (this.updateForm.valid && this.selectedItem) {
      const updatedItem: Item = { ...this.selectedItem, ...this.updateForm.value };
      this.itemService.updateItem(this.selectedItem.id, updatedItem).subscribe(updatedItem => {
        console.log('Item updated successfully:', updatedItem);

        // Mettre à jour l'item dans la liste locale
        const index = this.items.findIndex(item => item.id === this.selectedItem?.id);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }

        // Réinitialiser le formulaire et l'état de sélection
        this.selectedItem = null;
        this.updateForm.reset();
      }, error => {
        console.error('Error updating item:', error);
      });
    } else {
      console.error('Update form is invalid or no item selected');
    }
  }
  
  update(item: Item) {
    this.selectedItem = item;
    this.updateForm.patchValue(item);
  }
}
