export namespace RestApi {
  export interface FareCap {
    id: number
    from: string
    to: string
    dailyCap: string
    weeklyCap: string
  }
}

export interface ApiFare {
  id: number
  from: string
  to: string
  peakFare: string
  offPeakFare: string
}
