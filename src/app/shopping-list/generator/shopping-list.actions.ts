import { Action } from '@ngrx/store';
import { Item } from '../list-item.model';


export const ADD_ITEM = 'ADD_ITEM';

export class AddItem implements Action {
    readonly type = ADD_ITEM;
    payload: Item;
}