import React, { ReactElement } from 'react';

import { Item } from '../../data';

interface ItemListProps {
  items: Item[];
}

export function ItemList({ items }: ItemListProps): ReactElement {
  return (
    <div>

      <div className="flex font-medium mb-8 p-2">

        <div className="w-16"></div>
        <div className="flex-1">Item</div>
        <div className="px-4 w-32">Crafting Cost</div>
        <div className="px-4 w-32">Sell Price</div>
        <div className="px-4 w-32">Profit Margin</div>

      </div>

      {
        items.map(item => (
          <div
            className="flex mb-4 p-2"
            key={ item.id }
          >

            <div className="w-16">

            </div>

            <div className="flex-1">
              { item.name }
            </div>

            <div className="px-4 w-32 text-right">
              { item.craftingCost }g
            </div>

            <div className="px-4 w-32 text-right">
              { item.sellPrice }g
            </div>

            <div className="px-4 w-32 text-right">
              { item.profit }g ({ item.profitMargin }%)
            </div>

          </div>
        ))
      }

    </div>
  );
}
