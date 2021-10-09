import React, { ReactElement, useContext } from 'react';

import { ItemList } from '../components/item-list';
import { ItemsContext, useTrackedItems } from '../data';

interface HomePageProps {

}

export function HomePage({ }: HomePageProps): ReactElement {
  const { items } = useContext(ItemsContext);

  const { trackedItemIds } = useTrackedItems();

  const trackedItems = items.filter(item => trackedItemIds.includes(item.id));

  if (trackedItems.length === 0) {
    return (
      <div>
        You are not tracking any items.
      </div>
    );
  }

  console.log(trackedItems)

  return (
    <div>

      <ItemList items={ trackedItems } />

    </div>
  );
}
