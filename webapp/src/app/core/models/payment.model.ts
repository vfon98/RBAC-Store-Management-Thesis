export interface IPaymentInfo {
  name: string;
  address?: string;
  shipAddress: string;
  email: string;
  stripeToken?: string;
  phone: string;
  totalPrice: number;
  paymentMethod?: string;
}
