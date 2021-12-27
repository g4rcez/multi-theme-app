export type OmitKeys<E, K extends keyof E> = Omit<E, K>;

export type Nullable<T> = T | null;
