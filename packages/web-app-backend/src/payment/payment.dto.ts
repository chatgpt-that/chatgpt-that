
export interface CreateCheckoutUrlDTO {
  userEmail: string;
  redirectUrl: string;
}

export interface CompleteCheckoutSessionDTO {
  userEmail: string;
}

export interface CancelCheckoutSessionDTO {
  userEmail: string;
}
