import { Item } from './list-item.model';
import { Subject } from 'rxjs';
import { TextAttribute } from '@angular/compiler/src/render3/r3_ast';

export class ShoppingListService {
  itemChanged = new Subject<Item[]>();
  startedEditing = new Subject<number>();
  private Item: Item[] = [
  ];

  getitems() {
    return this.Item.slice();
  }

  getitem(index: number) {
    return this.Item[index];
  }


  additem(Item: Item) {
    this.Item.push(Item);
    this.itemChanged.next(this.Item.slice());
  }

  additems(Item: Item[]) {

    this.Item.push(...Item);
    this.itemChanged.next(this.Item.slice());
  }

  updateitem(index: number, newitem: Item) {
    this.Item[index] = newitem;
    this.itemChanged.next(this.Item.slice());
  }

  deleteitem(index: number) {
    this.Item.splice(index, 1);
    this.itemChanged.next(this.Item.slice());
  }

  calculateTax(price: number, exempt: boolean){
    var tax = 0;
    if(!exempt){
      tax = price * .1;
      tax = parseFloat((Math.ceil(tax*20)/20).toFixed(2));
    }
    return tax;
  }

  calculateImport(price: number, imported: boolean){
    var iTax = 0;
    if(imported){
      iTax = price * 0.05;
      iTax = parseFloat((Math.ceil(iTax*20)/20).toFixed(2));

    }
    return iTax;
  }
   calculateTaxes(){
      var taxT = 0;
      var len = this.Item.length;
      if(len > 0){
        for(let i = 0; i < len; i++){
          taxT = taxT +  this.Item[i].tax + this.Item[i].iTax;
        }
      }
    
     return taxT;
   }
   calculateTotal(){
    var total = 0;
    var len = this.Item.length;
    if(len > 0){
      for(let i = 0; i < len; i++){
        total = total +  this.Item[i].tax + this.Item[i].iTax + this.Item[i].price;
      }
    }
  
   return total;
 }
}
