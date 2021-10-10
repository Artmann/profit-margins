import React, { createContext, ReactElement, ReactNode, useEffect, useState } from 'react';

export interface Item {
  id: string;
  name: string;
  craftingCost: number;
  sellPrice: number;
  profit: number;
  profitMargin: number;
}

type ItemContextProps = {
  isLoadingItems: boolean;
  items: Item[];
};

export const ItemsContext = createContext<ItemContextProps>({
  isLoadingItems: false,
  items: []
});

type ItemsProviderProps = {
  children: ReactNode | ReactNode[];
}

export function ItemsProvider({ children }: ItemsProviderProps): ReactElement {
  const [ isLoadingItems, setIsLoadingItems ] = useState(false);
  const [ items, setItems ] = useState<Item[]>([]);

  useEffect(() => {

    setIsLoadingItems(true);

    loadItems().then(newitems => {
      setItems(newitems);
      setIsLoadingItems(false);
    })

  }, []);

  const value = {
    items,
    isLoadingItems
  };

  return (
    <ItemsContext.Provider value={ value }>
      { children }
    </ItemsContext.Provider>
  );
}

async function loadItems(): Promise<Item[]> {
  const itemMap = await fetchItems();

  const items = Object.values(itemMap).map((item: any): Item => ({
    id: item.Id,
    name: item.Name,
    craftingCost: item.CraftingCost || 0,
    sellPrice: item.SellPrice || 0,
    profit: item.Profit || 0,
    profitMargin: item.ProfitMargin || 0
  }));

  return items;
}

async function fetchItems(): Promise<Record<string, any>> {
  const url = 'https://profit-margins.s3.eu-west-3.amazonaws.com/items.json';

  const response = await fetch(url);

  const data = await response.json();

  return (data as unknown) as Record<string, any>;
}
