import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { Item } from '../../data';

interface ItemListProps {
  items: Item[];
  title: string;
}

export function ItemList({ items, title }: ItemListProps): ReactElement {
  const [ sortBy, setSortBy ] = useState('name');
  const [ sortAsc, setSortAsc ] = useState(true);

  const sortedItems = items.sort((a: Item, b: Item): number => {
    const p1 = (a as Record<string, any>)[sortBy];
    const p2 = (b as Record<string, any>)[sortBy];
    const sortOrder = sortAsc ? 1 : -1;

    return (p1 >= p2 ? 1 : -1) * sortOrder;
  });

  const onSortBy = (prop: string) => {
    if (prop === sortBy) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(prop);
    }
  };

  return (
    <div>

      <h2 className="font-medium text-xl uppercase tracking-wide mb-6 ">
        { title }
      </h2>

      <div className="flex font-medium mb-4 px-2">

        <div className="w-16"></div>
        <div
          className="cursor-pointer select-none flex-1"
          onClick={ () => onSortBy('name') }
        >
          Item
        </div>
        <div
          className="cursor-pointer select-none px-4 w-36 text-right"
          onClick={ () => onSortBy('craftingCost') }
        >
          Crafting Cost
        </div>
        <div
          className="cursor-pointer select-none px-4 w-36 text-right"
          onClick={ () => onSortBy('sellPrice') }
        >
          Sell Price
        </div>
        <div
          className="cursor-pointer select-none px-4 w-48 text-right"
          onClick={ () => onSortBy('profit') }
        >
          Profit Margin
        </div>

      </div>

      {
        sortedItems.map(item => (
          <div
            className="flex mb-6 px-2 py-6 shadow-md text-sm"
            key={ item.id }
            style={{ backgroundColor: '#252526' }}
          >

            <div className="w-16">

            </div>

            <div className="flex-1">
              <Link
                className="hover:underline"
                to={ `/items/${ item.id }` }
              >
                { item.name }
              </Link>
            </div>

            <div className="px-4 w-36 text-right">
              { item.craftingCost }g
            </div>

            <div className="px-4 w-36 text-right">
              { item.sellPrice }g
            </div>

            <div className="px-4 w-48 text-right">
              { item.profit }g ({ item.profitMargin }%)
            </div>

          </div>
        ))
      }

    </div>
  );
}
