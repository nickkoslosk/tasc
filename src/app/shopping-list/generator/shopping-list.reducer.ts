import { Action } from '@ngrx/store';
import { Item } from '../list-item.model';
import * as ItemActions from './shopping-list.actions';

const initialState = {
    items: [
        //new Item('16 lb bag of skittles', 16.00, 'candy'),
       // new Item('Walkman', 99.99, 'electronic'),
       // new Item('Bag of microwave Popcorn', 0.99, 'popcorn'),

    ]
};

export function basketReducer(state = initialState , action: ItemActions.AddItem){
    switch (action.type){
        case ItemActions.ADD_ITEM:
        return{
            ...state,
            items: [...state.items, action.payload]

        }
    }

}