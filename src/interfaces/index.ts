/** @format */

import { ImagePickerResult } from "react-native";


export const durationOptions =[
  {
    _id: '0 8 * * *',
    label: 'Every Morning',
    description: 'Every day at 8:00AM',
  },
  {
    _id: '0 18 * * *',
    label: 'Every Night',
    description: 'Every day at 6:00pm',
  },
  {
    _id: '0 8 * * 0',
    label: 'Every week',
    description: 'At 8:00AM every Sunday',
  },
  {
    _id: '30 8 1,15 * *',
    label: 'Every Two weeks',
    description: 'On 1st and 15th of every month at 8:00AM',
  },
  {
    _id: '0 8 1 * *',
    label: 'Every Month',
    description: 'At 8:00AM on first day of every month.',
  },
  {
    _id: 'random',
    label: 'Randomly',
    description: 'At my convenience.',
  },
]

export interface Reply {
  title: string;
  value: string;
  messageId?: any;
}
export type  StrictLevel= 'mild'|'fair'|'strict'|'none'
export interface NewSavings {
  savingScheme:'rainyDays'|'goals', 
  title?: string, 
  duration?: string, 
  yieldDate?: number,
  strictLevel?: StrictLevel,
  _id?: string,
  salesGoal?: number
  amount: number
  savings: Savings[]
}
export interface Savings {
  _id:  string,
  amount: number,
  savingsPlan: string,
  createdAt: string,
  updatedAt:  string,
  __v: number
}

export interface QuickReplies {
  type: "radio" | "checkbox";
  values: Reply[];
  keepIt?: boolean;
}
export interface MessageUser {
  _id: string;
  name: string;
  avatar?: string;  
}
export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: MessageUser;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}

export type SupportChat = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  user: User;
  admin?: User;
  readByUser: boolean;
  readByAdmin: boolean;
};
export type OrderStatus = {
  text: string;
  color: string;
};
type MyMapLikeType = Record<string, OrderStatus>;

export const orderStatus: MyMapLikeType = {
  started: { text: "New", color: "blue" },
  requestedForRider: { text: "Requested For Rider", color: "#FFCC00" },
  waitingForRider: { text: "Waiting For Rider", color: "#FFCC00" },
  sent: { text: "Sent", color: "#FFCC00" },
  received: { text: "Received", color: "green" },
  cancelled: { text: "Cancelled", color: "red" },
  rejected: { text: "Rejected", color: "red" },
  completed: { text: "Completed", color: "green" },
};

export interface PeriodicTransactions {
  amount: number;
  label: string;
}
export interface OrderGraphData {
  startDate: Date;
  endDate: Date;
  value: number;
  revenue: number;
  displayedLabel: string;
  label: string;
}
export interface GeoApiFyAddresFormat {
  datasource: {
    sourcename?: string;
    attribution?: string;
    license?: string;
    url?: string;
  };
  name?: string;
  street?: string;
  suburb?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  lon?: number;
  lat?: number;
  state_code?: string;
  distance?: number;
  result_type?: string;
  formatted?: string;
  address_line1?: string;
  address_line2?: string;
  rank: {
    importance?: number;
    popularity?: number;
  };
  place_id?: string;
  bbox: {
    lon1?: number;
    lat1?: number;
    lon2?: number;
    lat2?: number;
  };
}
export interface DeliveryMerchant {
  courier_id?: string;
  fee?: number;
  message?: string;
  name?: string;
  eta?: Date;
}
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  expoPushToken: string;
  store: string;
}
export interface ShippingAddress {
  _id?: string;
  user?: string;
  name?: string;
  address?: string;
  street?: string;
  city?: string;
  stateCode?: string;
  state?: string;
  countryCode?: string;
  country?: string;
  zip?: string;
  phoneNumber?: string;
  latitude?: string;
  longitude?: string;
}
export interface Bank {
  Code?: string;
  Id?: number;
  IsMicroFinanceBank?: boolean;
  IsMobileVerified?: boolean;
  Name: string;
  SwiftCode?: string;
  branches?: any;
}
export interface Transaction {
  bank: Bank;
  _id: string;
  accountNumber: string;
  bankName: string;
  accountName: string;
  read: boolean;

  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  destination: string;
  description: string;
  reference: string;
  currency: string;
  status: "success" | "failed" | "pending";
  type: "minus" | "plus";
  serviceFee: number;
  amount: number;
  store: string;
  data: {
    amount: number;
    account_number: string;
    account_bank: string;
    store: string;
  };
}
export interface BankRecord {
  bank: Bank;
  _id: string;
  accountNumber: string;
  bankName: string;
  accountName: string;

  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Image {
  image: string;
  _id: string;
}
export interface NewStore {
  _id?: string;
  name?: string;
  productCategory?: string[];
  description?: string;
  phone?: string;
  allowPickUp?: boolean;
  email?: string;
  address?: string;
  street?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  countryCode?: string;
  place_id?: string;
  logo?: ImagePickerResult;
  websiteUrl?: string;
}
export interface Store {
  _id: string;
  email: string;
  name: string;
  productCategory: string[];
  description: string;
  banner: string;
  logo: string;
  phone: string;
  id: string;
  slug: string;
  products?: Product[];
  allowPickUp?: boolean;
  address?: string;
  street?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  countryCode?: string;
  place_id?: string;
  websiteUrl?: string;
  availableBalance: number;
}
export interface Product {
  _id?: string;
  images?: Image[];
  title?: string;
  features?: string[];
  description?: string;
  shippingFee?: number;
  numberInStock?: number;
  isAssured?: boolean;
  returnable?: boolean;
  category?: string;
  cta?: string;
  user?: string;
  store?: Store;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  price?: number;
  weight?: number;
  pricePerItem?: number;
  comparePrice?: number;
}
export interface ProductUpdate {
  images?: Image[];
  title?: string;
  features?: string[];
  description?: string;
  shippingFee?: number;
  numberInStock?: number;
  isAssured?: boolean;
  returnable?: boolean;
  category?: string;
  cta?: string;
  pricePerItem?: number;
  comparePrice?: number;
  price?: number;
  weight?: number;
}
export type Cart = { product: Product; quantity: number };
export type OrderProps = { order: Order };
export interface Order {
  _id: string;
  orderNumber?: string;
  description?: string;
  status:
    | "started"
    | "requestedForRider"
    | "waitingForRider"
    | "sent"
    | "received"
    | "cancelled"
    | "rejected"
    | "completed";
  category: [string];
  products: [
    {
      product: Product;
      quantity: number;
      _id: string;
    }
  ];
  oid?: string;
  destinationEmail?: string;
  destinationName?: string;
  destinationPhone?: string;
  destinationStreet?: string;
  destinationCity?: string;
  destinationCountry?: string;
  destinationCountryCode?: string;
  destinationState?: string;
  destinationStateCode?: string;
  medium?: "online" | "offline";
  deliveryMethod?: "pickUp" | "toDoor";
  deliveryMerchant?: string;
  buyer?: User;
  amount: number;
  shippingFee?: number;
  store?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface NewOfflineSale {
  oid?: string;
  carts: Cart[] | [];
  destinationEmail?: string;
  destinationName?: string;
  destinationPhone?: string;
  buyer?: string;
  amount?: number;
  store?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface OfflineSale {
  oid: string;
  carts: Cart[] | [];
  destinationEmail?: string;
  destinationName: string;
  destinationPhone?: string;
  amount: number;
  store: string;
  createdAt: Date | string | undefined;
}
export interface OrderUpdate {
  status?:
    | "started"
    | "requestedForRider"
    | "waitingForRider"
    | "sent"
    | "received"
    | "cancelled"
    | "rejected"
    | "completed";
}
export interface Reciept {
  id: string;
  carts: Cart[] | [];
  email?: string;
  name?: string;
  phone?: string;
  amount: number;
  storeName: string;
  createdAt: Date | string | undefined;
}
export interface FinancialReport{
  endDate: Date;
  startDate: Date;
  displayedLabel: string;
  label: string;
  revenue:   number;
  orders: Order[];
  ordersCount: number;
  offlineOrdersCount: number;
  onlineOrdersCount: number;
}