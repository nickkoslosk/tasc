import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Item } from '../list-item.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Item;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getitem(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            price: this.editedItem.price,
            exempt: this.editedItem.exempt,
            imported: this.editedItem.imported,
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    var tax = this.slService.calculateTax(value.price, value.exempt);
    var iTax = this.slService.calculateImport(value.price, value.imported);
    const newitem = new Item(value.name, value.price, value.exempt, value.imported, tax, iTax);
    if (this.editMode) {
      this.slService.updateitem(this.editedItemIndex, newitem);
    } else {
      this.slService.additem(newitem);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteitem(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
