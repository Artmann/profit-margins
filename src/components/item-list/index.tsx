import React, { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

import { Item } from '../../data'

interface ItemListProps {
  items: Item[]
  trackedItems: Item[]

  startTrackingItem?: (itemId: string) => void
  stopTrackingItem?: (itemId: string) => void
}

export function ItemList({
  items,
  trackedItems,
  startTrackingItem,
  stopTrackingItem
}: ItemListProps): ReactElement {
  const [ sortBy, setSortBy ] = useState('tracked')
  const [ sortAsc, setSortAsc ] = useState(true)

  const trackedItemIds = trackedItems.map(i => i.id)

  const sortedItems = items.map((i: any) => {
    i.tracked = trackedItemIds.includes(i.id)

    return i
  }).sort((a: any, b: any): number => {
    const p1 = (a as Record<string, any>)[sortBy]
    const p2 = (b as Record<string, any>)[sortBy]
    const sortOrder = sortAsc ? 1 : -1

    if (p1 === p2) {
      const n1 = a.name
      const n2 = b.name

      return (n1 >= n2 ? 1 : -1) * sortOrder
    }

    if (sortBy === 'tracked') {
      return (p1 >= p2 ? 1 : -1) * sortOrder * -1
    }

    return (p1 >= p2 ? 1 : -1) * sortOrder
  })

  const onSortBy = (prop: string) => {
    if (prop === sortBy) {
      setSortAsc(!sortAsc)
    } else {
      setSortBy(prop)
    }
  }

  const columnClasses = {
    crafting: 'px-4 w-36 text-right',
    icon: 'w-16 flex items-center justify-center',
    name: 'cursor-pointer select-none w-72',
    price: 'cursor-pointer select-none px-4 w-36 text-right',
    profit: 'cursor-pointer select-none px-4 w-52 text-right',
    tracked: 'cursor-pointer select-none px-6 w-24 flex items-center justify-center'
  }

  const Row = ({ index, style }: any): ReactElement => {
    const item = sortedItems[index]

    const clickStarHandler = (): void => {
      if (item.tracked) {
        console.log('stopTrackingItem')
        stopTrackingItem && stopTrackingItem(item.id)
      } else {
        console.log('startTrackingItem')
        startTrackingItem && startTrackingItem(item.id)
      }
    }

    return (
      <div
        className={`
          border-b
          flex items-center
          px-2 py-4
          text-sm
        `}
        key={ index }
        style={{
          ...style,
          backgroundColor: '#252526',
          borderColor: 'hsl(240, 5%, 22%, 1)',
          height: 60
        }}
      >

        <div className={ columnClasses.icon }>
          <a
            href={ `https://tbc.wowhead.com/item=${ item.id }` }
            rel="noreferrer"
            target="_blank"
          >
            <img
              className="h-8 w-8 shadow-sm"
              src={ `https://ironforge.pro/media/${ item.id }.jpg` }
            />
          </a>
        </div>

        <div className={ columnClasses.name }>
          <Link
            className="hover:underline"
            to={ `/items/${ item.id }` }
          >
            { item.name }
          </Link>
        </div>

        <div className={ columnClasses.crafting }>
          { item.craftingCost }g
        </div>

        <div className={ columnClasses.price }>
          { item.sellPrice }g
        </div>

        <div className={ columnClasses.profit }>
          { item.profit }g ({ item.profitMargin }%)
        </div>

        <div className={ columnClasses.tracked }>
          <svg
            className="h-5 w-5"
            style={{
              fill: item.tracked ? 'hsl(240, 5%, 62%, 1)' : 'none',
              stroke: 'hsl(240, 5%, 52%, 1)'
            }}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            onClick={ clickStarHandler }
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        </div>

      </div>
    )
  }
  return (
    <div className="flex flex-col h-full w-full">

      <div className="flex font-medium px-2 py-4 text-xs uppercase">

        <div className={ columnClasses.icon } />

        <div
          className={ columnClasses.name }
          onClick={ () => onSortBy('name') }
        >
          Item
        </div>
        <div
          className={ columnClasses.crafting }
          onClick={ () => onSortBy('craftingCost') }
        >
          Crafting Cost
        </div>
        <div
          className={ columnClasses.price }
          onClick={ () => onSortBy('sellPrice') }
        >
          Sell Price
        </div>
        <div
          className={ columnClasses.profit }
          onClick={ () => onSortBy('profit') }
        >
          Profit Margin
        </div>
        <div
          className={ columnClasses.tracked }
          onClick={ () => onSortBy('tracked') }
        />

      </div>

      <AutoSizer>
        {
          ({ height, width }: any) => (
            <List
              height={ height }
              itemCount={ sortedItems.length }
              itemSize={ 60 }
              style={{ display: 'block' }}
              width={ width }
            >
              { Row }
            </List>
          )
        }
      </AutoSizer>

    </div>
  )
}
