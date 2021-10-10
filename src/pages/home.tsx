import MiniSearch from 'minisearch';
import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { ItemList } from '../components/item-list';
import { Item, ItemsContext, useTrackedItems } from '../data';

interface HomePageProps {

}

export function HomePage({ }: HomePageProps): ReactElement {


  return (
    <div>
      <SearchBar />
      <TrackedItemsList />
    </div>
  );
}

function SearchBar(): ReactElement {
  const history = useHistory();

  const [ searchQuery, setSearchQuery ] = useState('');
  const [ showResults, setShowResults ] = useState(false);
  const [ miniSearch, setMinisearch ] = useState<MiniSearch>();

  const { items } = useContext(ItemsContext);

  useEffect(() => {
    const ms = new MiniSearch<Item>({
      fields: [ 'name' ],
      storeFields: [ 'id', 'name' ]
    });

    ms.addAll(items);

    setMinisearch(ms);
  }, [ items ]);

  const matchingItems = miniSearch?.search(searchQuery) || [];

  const onQueryChanged = (e: FormEvent<HTMLInputElement>): void => {
    setSearchQuery(e.currentTarget.value);

    setShowResults(true);
  };
  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (matchingItems.length > 0) {
      const [ firstMatchingItem ] = matchingItems;
      console.log(matchingItems[0])

      history.push(`/items/${ firstMatchingItem.id }`);
    }

    setShowResults(false);
  };

  const onSelectedItem = (itemId: string) => {
    history.push(`/items/${ itemId }`);
  };

  console.log(matchingItems.slice(0, 6));
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
  );
}

function TrackedItemsList(): ReactElement {
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

  return (
    <div>
      <ItemList items={ trackedItems } />
    </div>
  );
}
