export const everywhere = <T extends any, Data extends T | Array<T>, Match extends unknown>({
  data,
  matcher,
  transformer,
}: {
  data: Data
  matcher: (data: unknown) => data is Match
  transformer: <T extends Match>(data: T) => T
}): Data => {
  if (matcher(data)) {
    return transformer(data)
  }
  if (Array.isArray(data)) {
    return data.map((data) => everywhere({ data, matcher, transformer })) as Data
  }
  if (typeof data === 'object' && !!data) {
    return Object.fromEntries(
      Object.entries(data as any).map(([key, data]) => [
        key,
        everywhere({ data, matcher, transformer }),
      ]),
    ) as Data
  }

  return data
}

export const everything = <
  T extends any,
  R extends any,
  Data extends T | Array<T>,
  Match extends unknown,
>({
  data,
  matcher,
  query,
  reducer,
  zeroValue,
}: {
  data: Data
  matcher: (data: unknown) => data is Match
  query: <T extends Match>(data: T) => R
  reducer: (a: R, b: R) => R
  zeroValue: R
}): R => {
  if (matcher(data)) {
    return query(data)
  }
  if (Array.isArray(data)) {
    return data
      .map((data) => everything({ data, matcher, query, reducer, zeroValue }))
      .reduce(reducer, zeroValue)
  }
  if (typeof data === 'object' && !!data) {
    return Object.values(data as {})
      .map((data) => everything({ data, matcher, query, reducer, zeroValue }))
      .reduce(reducer, zeroValue)
  }

  return zeroValue
}
