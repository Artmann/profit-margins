import { useState } from 'react'

type UseTrackedItems = {
  trackedItemIds: string[];
  trackItem: (itemId: string) => void;
  stopTrackingItem: (itemId: string) => void;
}

export function useTrackedItems(): UseTrackedItems {
  const [ itemIds, setItemIds ] = useState<string[]>(loadTrackedItems)

  const trackItem = (itemId: string): void => {
    const newIds = [ ...loadTrackedItems(), itemId ]

    setItemIds(newIds)

    saveItemIds(newIds)
  }

  const stopTrackingItem = (itemId: string): void => {
    const trackedItems = loadTrackedItems()

    const newIds = trackedItems.filter(id => id !== itemId)

    setItemIds(newIds)

    saveItemIds(newIds)
  }

  return {
    trackedItemIds: itemIds,
    trackItem,
    stopTrackingItem
  }
}

function loadTrackedItems(): string[] {
  const json = localStorage.getItem('tracked-item-ids')

  if (!json) {
    return []
  }

  const ids = JSON.parse(json) as string[]

  return ids
}

function saveItemIds(ids: string[]): void {
  const json = JSON.stringify(ids)

  localStorage.setItem('tracked-item-ids', json)
}
