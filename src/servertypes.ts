import { AddressInfo } from "net";

export const isAddressInfo = (serverAddress: string | AddressInfo | null): serverAddress is AddressInfo => (
  (serverAddress as AddressInfo).port? true : false
);

