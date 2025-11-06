import { useQuery } from '@tanstack/react-query';
import type { PokemonDetails, PokemonListResponse } from '../../types/api';
import API_BASE from './base_url';



// fetcher 
async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fetch failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json() as Promise<T>;
}



// fetch paginated Pokémon list
export function usePokemonPage(page: number, limit = 10) {
  const offset = (page - 1) * limit;
  const url = `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`;

  return useQuery<PokemonListResponse>({
    queryKey: ['pokemonList', { page, limit }],
    queryFn: () => fetcher<PokemonListResponse>(url),
    staleTime: 60_000,           
    retry: 2,                    
    refetchOnWindowFocus: false, 
  });
}

 
//  fetch Pokémon details by ID 
export function usePokemonDetails(id: number | string) {
  const isValid = Boolean(id);

  return useQuery<PokemonDetails>({
    queryKey: ['pokemonDetails', id],
    queryFn: () => fetcher<PokemonDetails>(`${API_BASE}/pokemon/${id}`),
    enabled: isValid,            
    staleTime: 300_000,          
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
