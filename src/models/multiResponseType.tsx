export interface MultiResponseType<T> {
    status: string,
    data: T[],
}