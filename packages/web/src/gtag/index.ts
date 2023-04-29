const dataLayer = (window as unknown as { dataLayer: any[] }).dataLayer || []

export const addCheckoutEvent = (event: string, params: any) => {
  dataLayer.push({
    event,
    ...params
  })
}
