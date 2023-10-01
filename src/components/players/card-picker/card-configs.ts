import { GameType } from '@/types/game';

export interface CardConfig {
  value: number;
  displayValue: string;
  color: string;
}

export const fibonacciCards: CardConfig[] = [
  { value: 0, displayValue: '0', color: 'white' },
  { value: 1, displayValue: '1', color: '#60a5fa' },
  { value: 2, displayValue: '2', color: '#60a5fa' },
  { value: 3, displayValue: '3', color: '#93c5fd' },
  { value: 5, displayValue: '5', color: '#93c5fd' },
  { value: 8, displayValue: '8', color: '#4ade80' },
  { value: 13, displayValue: '13', color: '#4ade80' },
  { value: 21, displayValue: '21', color: '#fed7aa' },
  { value: 34, displayValue: '34', color: '#fed7aa' },
  { value: 55, displayValue: '55', color: '#f87171' },
  { value: 89, displayValue: '89', color: '#f87171' },
  { value: -2, displayValue: '❓', color: 'white' },
  { value: -1, displayValue: '-1', color: 'white' },
];

export const shortFibonacciCards: CardConfig[] = [
  { value: 0, displayValue: '0', color: 'white' },
  { value: 0.5, displayValue: '½', color: '#60a5fa' },
  { value: 1, displayValue: '1', color: '#60a5fa' },
  { value: 2, displayValue: '2', color: '#60a5fa' },
  { value: 3, displayValue: '3', color: '#93c5fd' },
  { value: 5, displayValue: '5', color: '#93c5fd' },
  { value: 8, displayValue: '8', color: '#4ade80' },
  { value: 13, displayValue: '13', color: '#4ade80' },
  { value: 21, displayValue: '20', color: '#fed7aa' },
  { value: 34, displayValue: '40', color: '#fed7aa' },
  { value: 55, displayValue: '100', color: '#f87171' },
  { value: -2, displayValue: '❓', color: 'white' },
  { value: -1, displayValue: '-1', color: 'white' },
];

export const tShirtCards: CardConfig[] = [
  { value: 10, displayValue: 'XXS', color: 'white' },
  { value: 20, displayValue: 'XS', color: '#60a5fa' },
  { value: 30, displayValue: 'S', color: '#60a5fa' },
  { value: 40, displayValue: 'M', color: '#93c5fd' },
  { value: 50, displayValue: 'L', color: '#93c5fd' },
  { value: 60, displayValue: 'XL', color: '#4ade80' },
  { value: 70, displayValue: 'XXL', color: '#4ade80' },
  { value: -2, displayValue: '❓', color: 'white' },
  { value: -1, displayValue: '-1', color: 'white' },
];

export const getCards = (gameType: GameType | undefined): CardConfig[] => {
  switch (gameType) {
    case GameType.Fibonacci:
      return fibonacciCards;
    case GameType.ShortFibonacci:
      return shortFibonacciCards;
    case GameType.TShirt:
      return tShirtCards;
    default:
      return fibonacciCards;
  }
};

export const getRandomEmoji = () => {
  const emojis = ['☕', '🥤', '🍹', '🍸', '🍧', '🍨', '🍩', '🍎', '🧁', '🍪', '🍿', '🌮', '🍦', '🍉', '🍐', '🍰', '🍫'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};
