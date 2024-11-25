
export interface FindOneDTO {
  [k:string]: string;
}

export interface CreateOneDTO {
  sessionId: string;
  userEmail: string;
  redirectUrl: string;
}

export interface RemoveOneDTO {
  [k:string]: string;
}

export interface CreateCheckoutUrlDTO {
  userEmail: string;
  redirectUrl: string;
  productName: string;
  productPriceInCents: number;
  productQuantity: number;
}
