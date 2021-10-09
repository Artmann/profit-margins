import React, { FormEvent, ReactElement, useContext } from 'react';
import { useParams } from 'react-router';
import { ItemsContext, useTrackedItems } from '../data';

interface ItemPageProps {}

type ItemPageParams = { id: string };

export function ItemPage({ }: ItemPageProps): ReactElement {
  const { id } = useParams<ItemPageParams>();
  const { items } = useContext(ItemsContext);
  const { trackedItemIds, trackItem, stopTrackingItem } = useTrackedItems();

  const item = items.find(i => i.id == id);

  // Todo: Add Loading State.

  if (!item) {
    return (
      <div>
        Item not found.
      </div>
    );
  }

  const isTrackingItem = trackedItemIds.includes(item.id);

  const trackHandler = (e: FormEvent) => {
    e.preventDefault();

    if (isTrackingItem) {
      stopTrackingItem(item.id);
    } else {
      trackItem(item.id);
    }
  };

  return (
    <div>
      <h1>
        { item.name }
      </h1>

      <button
        onClick={ trackHandler }
      >
        { isTrackingItem ? 'Stop Tracking Item' : 'Track Item' }
      </button>
    </div>
  );
}
