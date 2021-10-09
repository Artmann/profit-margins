import React, { ReactElement } from 'react';
import { ItemList } from '../components/item-list';

interface HomePageProps {

}

export function HomePage({ }: HomePageProps): ReactElement {
  const items = [
    {
      id: '25867',
      name: 'Earthstorm Diamond',
      craftingCost: 51.47,
      sellPrice: 75.9,
      profitMargin: 24.43,
      profitMarginPercentage: 32.19
    },
    {
      id: '23530',
      name: 'Feelsteel Shield Spike',
      craftingCost: 115.76,
      sellPrice: 179.98,
      profitMargin: 24.22,
      profitMarginPercentage: 13.46
    },
    {
      id: '13511',
      name: 'Flask of Distilled Wisdom',
      craftingCost: 55.56,
      sellPrice: 71.6,
      profitMargin: 16.04,
      profitMarginPercentage: 22.41
    }
  ];

  return (
    <div>

      <ItemList items={ items } />

    </div>
  );
}
