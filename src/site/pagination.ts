export type PaginationSearchParams = { next: string };
export type PaginationParamsParams = { locale: string };

export interface PaginationParams {
  searchParams?: Promise<PaginationSearchParams>;
  params: Promise<PaginationParamsParams>;
}

export const getPaginationForSearchParams = (query?: PaginationSearchParams, limitPerOffset = 24) => {
  const offsetInt = parseInt(query?.next ?? '0');
  const offset = Number.isNaN(offsetInt) ? 0 : offsetInt;
  return {
    offset,
    limit: limitPerOffset + offset * limitPerOffset,
  };
};
