import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type ShopifyDate = string;

export interface _Error {
  [T: string]: unknown;
}

export type SocketClient = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export interface ActiveClient {
  uuid: string;
  socketId: string;
  client: SocketClient;
}

export interface _ClientDetail {
  accept_language?: string;
  browser_height?: number;
  browser_ip?: string;
  browser_width?: number;
  session_hash?: string;
  user_agent?: string;
}

export interface _Price {
  amount?: string;
  currency_code?: string;
}

export interface _PriceSet {
  shop_money?: _Price;
  presentment_money?: _Price;
}
export interface _DiscountCode {
  code?: string;
  amount?: string;
  type?: string;
  id?: number;
  price_rule_id?: number;
  usage_count?: number;
  created_at?: ShopifyDate;
  updated_at?: ShopifyDate;
  errors?: _Error;
}

export interface _NoteAttribute {
  name?: string;
  value?: string;
  custom_engraving?: string;
  colour?: string;
}

export interface _TaxLine {
  price?: string;
  rate?: number;
  title?: string;
  price_set?: _PriceSet;
  channel_liable?: boolean;
  compare_at?: number;
}

export interface _Address {
  id?: number;
  customer_id?: number;
  first_name?: string;
  last_name?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
  name?: string;
  province_code?: string;
  country_code?: string;
  country_name?: string;
  default?: boolean;
  latitude?: number;
  longitude?: number;
}

export interface _Order {
  id?: number;
  admin_graphql_api_id?: string;
  app_id?: number;
  browser_ip?: string;
  buyer_accepts_marketing?: boolean;
  cancel_reason?: string;
  cancelled_at?: null;
  cart_token?: string;
  checkout_id?: number;
  checkout_token?: string;
  client_details?: _ClientDetail;
  closed_at?: ShopifyDate;
  confirmed?: boolean;
  contact_email?: string;
  created_at?: ShopifyDate;
  currency?: string;
  current_subtotal_price?: string;
  current_subtotal_price_set?: _PriceSet;
  current_total_discounts?: string;
  current_total_discounts_set?: _PriceSet;
  current_total_duties_set?: object;
  current_total_price?: string;
  current_total_price_set?: _PriceSet;
  current_total_tax?: string;
  current_total_tax_set?: _PriceSet;
  customer_locale?: string;
  device_id?: number;
  discount_codes?: _DiscountCode[];
  email?: string;
  estimated_taxes?: boolean;
  financial_status?: string;
  fulfillment_status?: string;
  gateway?: string;
  landing_site?: string;
  landing_site_ref?: string;
  location_id?: number;
  name?: string;
  note?: string;
  note_attributes?: _NoteAttribute[];
  number?: number;
  order_number?: number;
  order_status_url?: string;
  original_total_duties_set?: object;
  payment_gateway_names?: string[];
  phone?: string;
  presentment_currency?: string;
  processed_at?: ShopifyDate;
  processing_method?: string;
  reference?: string;
  referring_site?: string;
  source_identifier?: string;
  source_name?: string;
  source_url?: string;
  subtotal_price?: string;
  subtotal_price_set?: _PriceSet;
  tags?: string;
  tax_lines?: _TaxLine[];
  taxes_included?: boolean;
  test?: boolean;
  token?: string;
  total_discounts?: string;
  total_discounts_set?: _PriceSet;
  total_line_items_price?: string;
  total_line_items_price_set?: _PriceSet;
  total_outstanding?: string;
  total_price?: string;
  total_price_set?: _PriceSet;
  total_price_usd?: string;
  total_shipping_price_set?: _PriceSet;
  total_tax?: string;
  total_tax_set?: _PriceSet;
  total_tip_received?: string;
  total_weight?: number;
  updated_at?: ShopifyDate;
  user_id?: number;
  billing_address?: _Address;
  customer?: _Customer;
  discount_applications?: _DiscountApplication[];
  fulfillments?: _Fulfillment[];
  line_items?: _LineItem[];
  payment_details?: _PaymentDetail;
  refunds?: _Refund[];
  shipping_address?: _ShippingAddress;
  shipping_lines?: _ShippingLine[];
  status_url?: string;
  payment_terms?: object;
}

export interface _DiscountAllocation {
  amount?: string;
  amount_set?: _PriceSet;
  discount_application_index?: number;
  id?: number;
  description?: string;
  created_at?: ShopifyDate;
  application_type?: string;
}

export interface _AppliedDiscount {
  title?: string;
  value?: string;
  amount?: string;
  applicable?: boolean;
  value_type?: string;
  description?: string;
  application_type?: string;
  non_applicable_reason?: string;
}

export interface _ShippingLine {
  id?: number;
  carrier_identifier?: string;
  code?: string;
  delivery_category?: string;
  discounted_price?: string;
  discounted_price_set?: _PriceSet;
  phone?: string;
  price?: string;
  price_set?: _PriceSet;
  requested_fulfillment_service_id?: number;
  source?: string;
  title?: string;
  tax_lines?: _TaxLine[];
  discount_allocations?: _DiscountAllocation[];
  applied_discounts?: _AppliedDiscount[];
  custom?: boolean;
  handle?: string;
}

export interface _ShippingAddress {
  first_name?: string;
  address1?: string;
  phone?: string;
  city?: string;
  zip?: string;
  province?: string;
  country?: string;
  last_name?: string;
  address2?: string;
  company?: string;
  latitude?: number;
  longitude?: number;
  name?: string;
  country_code?: string;
  province_code?: string;
  id?: number;
  customer_id?: number;
  country_name?: string;
  default?: boolean;
}

export interface _Receipt {
  testcase?: boolean;
  authorization?: string;
  gift_card_id?: number;
  gift_card_last_characters?: string;
}

export interface _ExtendedAuthorizationAttribute {
  [T: string]: unknown;
}

export interface _Transaction {
  id?: number;
  admin_graphql_api_id?: string;
  amount?: string;
  authorization?: string;
  created_at?: ShopifyDate;
  currency?: string;
  device_id?: number;
  error_code?: string;
  gateway?: string;
  kind?: string;
  location_id?: object;
  message?: string;
  order_id?: number;
  parent_id?: number;
  processed_at?: ShopifyDate;
  receipt?: _Receipt;
  source_name?: string;
  status?: string;
  test?: boolean;
  user_id?: number;
  currency_exchange_adjustment?: object;
  maximum_refundable?: string;
  payment_details?: _PaymentDetail;
  authorization_expires_at?: ShopifyDate;
  extended_authorization_attributes?: _ExtendedAuthorizationAttribute;
  amount_in?: string;
  amount_out?: string;
  amount_rounding?: string;
  transaction_group_id?: number;
  type?: string;
  payout_id?: number;
  payout_status?: string;
  fee?: string;
  net?: string;
  source_id?: number;
  source_type?: string;
  source_order_id?: number;
  source_order_transaction_id?: number;
  payments_refund_attributes?: object;
}

export interface _Duty {
  duties?: _Duty[];
  id?: string;
  tax_lines?: _TaxLine[];
  shop_money?: _Price;
  presentment_money?: _Price;
  admin_graphql_api_id?: string;
  country_code_of_origin?: string;
  harmonized_system_code?: string;
}

export interface _RefundLineItem {
  id?: number;
  line_item_id?: number;
  location_id?: number;
  quantity?: number;
  restock_type?: string;
  subtotal?: number;
  subtotal_set?: _PriceSet;
  total_tax?: number;
  total_tax_set?: _PriceSet;
  line_item?: _LineItem;
  price?: string;
  discounted_price?: string;
  discounted_total_price?: string;
  total_cart_discount_amount?: string;
}

export interface _Refund {
  id?: number;
  admin_graphql_api_id?: string;
  created_at?: ShopifyDate;
  note?: string;
  order_id?: number;
  processed_at?: ShopifyDate;
  restock?: boolean;
  total_additional_fees_set?: _PriceSet;
  total_duties_set?: _PriceSet;
  user_id?: number;
  order_adjustments?: _OrderAdjustment[];
  transactions?: _Transaction[];
  refund_line_items?: _RefundLineItem[];
  duties?: _Duty;
  additional_fees?: unknown[];
  shipping?: _Shipping;
  currency?: string;
  refund_duties?: _RefundDuty[];
}

export interface _RefundDuty {
  duty_id?: number;
  refund_type?: string;
}

export interface _Shipping {
  amount?: string;
  tax?: string;
  maximum_refundable?: string;
}

export interface _OrderAdjustment {
  id?: number;
  amount?: string;
  amount_set?: _PriceSet;
  kind?: string;
  order_id?: number;
  reason?: string;
  refund_id?: number;
  tax_amount?: string;
  tax_amount_set?: _PriceSet;
}

export interface _PaymentDetail {
  credit_card_bin?: string;
  avs_result_code?: string;
  cvv_result_code?: string;
  credit_card_number?: string;
  credit_card_company?: string;
  credit_card_name?: string;
  credit_card_wallet?: string;
  credit_card_expiration_month?: string;
  credit_card_expiration_year?: string;
}

export interface _Property {
  name?: string;
  value?: string;
}

export interface _LineItem {
  id?: number;
  admin_graphql_api_id?: string;
  fulfillable_quantity?: number;
  fulfillment_service?: string;
  fulfillment_status?: string;
  gift_card?: boolean;
  grams?: number;
  name?: string;
  price?: string;
  price_set?: _PriceSet;
  product_exists?: boolean;
  product_id?: number;
  properties?: _Property[];
  quantity?: number;
  requires_shipping?: boolean;
  sku?: string;
  taxable?: boolean;
  title?: string;
  total_discount?: string;
  total_discount_set?: _PriceSet;
  variant_id?: number;
  variant_inventory_management?: string;
  variant_title?: string;
  vendor?: string;
  tax_lines?: _TaxLine[];
  duties?: _Duty[];
  discount_allocations?: _DiscountAllocation[];
  applied_discounts?: _AppliedDiscount[];
  key?: string;
  destination_location_id?: number;
  origin_location_id?: number;
  presentment_title?: string;
  presentment_variant_title?: string;
  variant_price?: string;
  user_id?: number;
  unit_price_measurement?: unknown;
  rank?: unknown;
  compare_at_price?: string;
  line_price?: string;
  applied_discount?: _AppliedDiscount;
  custom?: boolean;
  image_url?: string;
  shop_id?: number;
  fulfillment_order_id?: number;
  line_item_id?: number;
  inventory_item_id?: number;
  fulfillment_line_item_id?: number;
}

export interface _OriginAddress {
  zip?: string;
  city?: string;
  address1?: string;
  address2?: string;
  country_code?: string;
  province_code?: string;
}

export interface _Fulfillment {
  id?: number;
  admin_graphql_api_id?: string;
  created_at?: ShopifyDate;
  location_id?: number;
  name?: string;
  order_id?: number;
  origin_address?: _OriginAddress;
  receipt?: _Receipt;
  service?: string;
  shipment_status?: string;
  status?: string;
  tracking_company?: string;
  tracking_number?: string;
  tracking_numbers?: string[];
  tracking_url?: string;
  tracking_urls?: string[];
  updated_at?: ShopifyDate;
  line_items?: _LineItem[];
  notify_customer?: boolean;
  variant_inventory_management?: string;
}

export interface _DiscountApplication {
  target_type?: string;
  type?: string;
  value?: string;
  value_type?: string;
  allocation_method?: string;
  target_selection?: string;
  code?: string;
  title?: string;
  description?: string;
}

export interface _SmsMarketingConsent {
  state?: string;
  opt_in_level?: string;
  consent_updated_at?: ShopifyDate;
  consent_collected_from?: string;
}

export interface _Customer {
  id?: number;
  email?: string;
  accepts_marketing?: boolean;
  created_at?: ShopifyDate;
  updated_at?: ShopifyDate;
  first_name?: string;
  last_name?: string;
  orders_count?: number;
  state?: string;
  total_spent?: string;
  last_order_id?: number;
  note?: string;
  verified_email?: boolean;
  multipass_identifier?: null;
  tax_exempt?: boolean;
  phone?: string;
  tags?: string;
  last_order_name?: string;
  currency?: string;
  addresses?: _Address[];
  accepts_marketing_updated_at?: ShopifyDate;
  marketing_opt_in_level?: string;
  tax_exemptions?: string[];
  sms_marketing_consent?: _SmsMarketingConsent;
  admin_graphql_api_id?: string;
  default_address?: _Address;
  metafield?: _Metafield;
}

export interface _Metafield {
  key?: string;
  type?: string;
  value?: any;
  namespace?: string;
  id?: number;
  value_type?: string;
  description?: string;
  owner_id?: number;
  created_at?: ShopifyDate;
  updated_at?: ShopifyDate;
  owner_resource?: string;
  admin_graphql_api_id?: string;
}
