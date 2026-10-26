import { createContext, useContext } from 'react';
import type { VYORAProfile } from '@/lib/profile';

export const VYORAProfileContext = createContext<VYORAProfile | null>(null);

export function useVYORAProfile(): VYORAProfile | null {
  return useContext(VYORAProfileContext);
}
