import React, { createContext, ReactElement, ReactNode, useEffect, useState } from 'react';
import { LoadingOverlay } from '../components/loading-overaly';

export interface Item {
  id: string;
  name: string;
  craftingCost: number;

  profit: number;
  profitMargin: number;
  reagents: {
    id: string;
    quantity: number;
  };
  sellPrice: number;
  vendorPrice: number;
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
      <LoadingOverlay isLoading={ isLoadingItems } />
      { children }
    </ItemsContext.Provider>
  );
}

async function loadItems(): Promise<Item[]> {
  const itemMap = await fetchItems();
  const itemPrices = await fetchItemPrices();

  const round = (val: number): number => {
    const rounded = Math.round(val * 100.0) / 100;

    return rounded;
  };

  const items = Object.values(itemMap).map((itemData: any): Item => {
    const priceData  = itemPrices.find(p => p.Id === itemData.Id);

    const item: Item = {
      id: `${ itemData.Id }`,
      name: itemData.Name,
      craftingCost: round(priceData?.CraftingCost || 0),
      profit: round(priceData?.Profit || 0),
      profitMargin: round(priceData?.ProfitMargin || 0),
      reagents: itemData.Reagents.map((r: any) => ({
        id: `${ r.Id }`,
        quantity: r.Amount
      })),
      sellPrice: round(priceData?.SellPrice || 0),
      vendorPrice: itemData.VendorBuyPrice
    };

    return item;
  }).filter(item => item.craftingCost > 0 || item.vendorPrice > 0 || item.sellPrice > 0);

  return items;
}

type ItemsResponse = Record<string, {
  Id: number,
  Name: string,
  Reagents: any[],
  VendorBuyPrice: number,
  Invalid: boolean
}>;

type ItemPriceResponse = Array<{
  CraftingCost: number;
  Id: number;
  Name: string;
  Profit: number;
  ProfitMargin: number;
  SellPrice: number;
}>;

async function fetchItems(): Promise<ItemsResponse> {
  const url = '/items.json';

  const response = await fetch(url);

  const data = await response.json();

  return (data as unknown) as Record<string, any>;
}

async function fetchItemPrices(): Promise<ItemPriceResponse> {
  const url = 'https://profit-margins.s3.eu-west-3.amazonaws.com/items.json';

  const response = await fetch(url);

  const data = await response.json();

  return data;
}
