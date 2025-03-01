import { EmojiData } from '@/models/emoji-data';
import { accessKey, apiBaseURL } from './constants';
import { Categories } from '@/models/categories';

export async function fetchEmojiData(
  categoryName: string
): Promise<EmojiData[]> {
  const baseURL = `${apiBaseURL}categories/${categoryName}?${accessKey}`;
  const response = await fetch(baseURL);
  console.log(response);
  if (!response.ok) {
    throw new Error('Could not fetch data from API');
  }
  return await response.json();
}

export async function fetchEmojiCategories(): Promise<Categories[]> {
  const baseURL = `${apiBaseURL}categories?${accessKey}`;
  const response = await fetch(baseURL);
  console.log(response);
  if (!response.ok) {
    throw new Error('Could not fetch data from API');
  }
  return await response.json();
}
