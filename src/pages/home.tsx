import MiniSearch from 'minisearch'
import moment from 'moment'
import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import { ItemList } from '../components/item-list'
import { Item, ItemsContext, useTrackedItems } from '../data'

interface HomePageProps {}

export function HomePage({ }: HomePageProps): ReactElement {
  const { items, updatedAt } = useContext(ItemsContext)

  return (
    <div>

      <div className="my-8">
        <SearchBar />
      </div>

      <div className="my-8 text-sm" title={ updatedAt }>
        The data is { humanDate(updatedAt) } old.
      </div>

      <TrackedItemsList />

      <div className="mb-16" />

      <ItemList
        items={ items.filter(i => i.craftingCost > 0) }
        title="Craftable Items"
      />

    </div>
  )
}

function SearchBar(): ReactElement {
  const history = useHistory()

  const [ searchQuery, setSearchQuery ] = useState('')
  const [ showResults, setShowResults ] = useState(false)
  const [ miniSearch, setMinisearch ] = useState<MiniSearch>()

  const { items } = useContext(ItemsContext)

  useEffect(() => {
    const ms = new MiniSearch<Item>({
      fields: [ 'name' ],
      storeFields: [ 'id', 'name' ]
    })

    ms.addAll(items)

    setMinisearch(ms)
  }, [ items ])

  const matchingItems = miniSearch?.search(searchQuery) || []

  const onQueryChanged = (e: FormEvent<HTMLInputElement>): void => {
    setSearchQuery(e.currentTarget.value)

    setShowResults(true)
  }
  const onSubmit = (e: FormEvent): void => {
    e.preventDefault()

    if (matchingItems.length > 0) {
      const [ firstMatchingItem ] = matchingItems

      history.push(`/items/${ firstMatchingItem.id }`)
    }

    setShowResults(false)
  }

  const onSelectedItem = (itemId: string) => {
    history.push(`/items/${ itemId }`)
  }

  return (
    <div className="w-full">
      <form
        className="w-full"
        onSubmit={ onSubmit }
      >
        <label
          className="block"
          htmlFor="search"
        >
          Search for items
        </label>

        <div
          className="relative w-96"
        >
          <input
            autoFocus={ true }
            autoComplete="off"
            className="w-full"
            id="search"
            onChange={ onQueryChanged }
            type="search"
            value={ searchQuery }
          />

          {
            showResults &&
            <div
              className="absolute bg-white p-2 z-50 w-full"
            >
              {
                matchingItems.slice(0, 6).map(result => (
                  <div
                    className="w-full"
                    key={ result.id }
                    onClick={ () => onSelectedItem(result.id) }
                  >
                    { result.name }
                  </div>
                ))
              }
            </div>
          }
        </div>
      </form>
    </div>
  )
}

function TrackedItemsList(): ReactElement | null {
  const { items } = useContext(ItemsContext)

  const { trackedItemIds } = useTrackedItems()

  const trackedItems = items.filter(item => trackedItemIds.includes(item.id))

  if (trackedItems.length === 0) {
    return null
  }

  return (
    <div>
      <ItemList
        items={ trackedItems }
        title="Your Favorite Items"
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
