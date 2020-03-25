import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Item } from './list-item.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  Item: Item[];
  taxTotal: number;
  total: number;
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.Item = this.slService.getitems();
    this.taxTotal = this.slService.calculateTaxes();
    this.total = this.slService.calculateTotal();
    this.subscription = this.slService.itemChanged
      .subscribe(
        (Item: Item[]) => {
          this.Item = Item;
        }

      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
    this.total = this.slService.calculateTotal();
  }
 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  Generate(){
    this.taxTotal = this.slService.calculateTaxes();
    this.total = this.slService.calculateTotal();
    
  }
  printpage(){
    window.print();
  }
}
