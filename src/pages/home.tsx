import moment from 'moment'
import React, { FormEvent, ReactElement, useContext, useState } from 'react'

import { ItemList } from '../components/item-list'
import { Item, ItemsContext, useTrackedItems } from '../data'

interface HomePageProps {}

export function HomePage({ }: HomePageProps): ReactElement {
  const { items, updatedAt } = useContext(ItemsContext)

  const [ query, setQuery ] = useState('')

  const queryHandler = (newQuery: string): void => {
    setQuery(newQuery)
  }

  const filteredItems = items
    .filter(i => i.craftingCost > 0 )
    .filter(i => i.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col py-3 text-xs">

      <div className="flex items-center justify-center py-2 mb-8">
        <div title={ updatedAt }>
          The data is { humanDate(updatedAt) } old.
        </div>
      </div>

      <div className="py-8">
        <SearchBar
          onChange={ queryHandler }
          query={ query }
        />
      </div>

      <div className="flex-1 w-full">
        <TrackedItemsList items={ filteredItems } />
      </div>

      <div className="h-24" />

    </div>
  )
}

type SearchBarProps = {
  query: string
  onChange: (query: string) => void
}

function SearchBar({ onChange, query }: SearchBarProps): ReactElement {
  const onQueryChanged = (e: FormEvent<HTMLInputElement>): void => {
    onChange(e.currentTarget.value)
  }

  return (
    <div className="w-full">
      <form
        className="w-full"
      >
        <div
          className="relative w-full max-w-lg"
        >
          <input
            autoFocus={ true }
            autoComplete="off"
            className={`
              bg-transparent
              border border-slate-600
              block
              px-4 py-2
              text-sm
              outline-none
              w-full
            `}
            id="search"
            onChange={ onQueryChanged }
            placeholder="Search for items..."
            type="search"
            value={ query }
          />
        </div>
      </form>
    </div>
  )
}

type TrackedItemsListProps = {
  items: Item[]
}

function TrackedItemsList({ items }: TrackedItemsListProps): ReactElement | null {
  const { trackedItemIds, trackItem, stopTrackingItem } = useTrackedItems()

  const trackedItems = items.filter(item => trackedItemIds.includes(item.id))

  console.log(trackedItemIds)

  return (
    <div className="h-full w-full">
      <ItemList
        items={ items }
        trackedItems={ trackedItems }
        startTrackingItem={ trackItem }
        stopTrackingItem={ stopTrackingItem }
      />
    </div>
  )
}

function humanDate(isoDate: string): string {
  const startTime = moment(isoDate)
  const diff = moment().diff(startTime)
  const duration = moment.duration(diff)

  return duration.humanize()
}
