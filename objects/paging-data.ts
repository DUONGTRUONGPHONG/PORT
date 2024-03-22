export class PagingData<T> {
  public items: T[]
  public fetch: number
  public offset: number
  public totals: number
  public next: number

  constructor({items, fetch, offset, totals, next}: Partial<PagingData<T>>) {
    this.items = items || []
    this.fetch = fetch || Number(useRuntimeConfig().public.pagingLimit)
    this.offset = offset || Number(useRuntimeConfig().public.pagingDefault)
    this.totals = totals  || 0
    this.next = next || 1
  }

  public set({items, fetch, offset, totals, next}: Partial<PagingData<T>>){
    this.items = items || this.items
    this.fetch = fetch || this.fetch
    this.offset = offset || this.offset
    this.totals = totals || this.totals
    this.next = next || this.next    
  }
}
