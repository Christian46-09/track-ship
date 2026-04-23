import * as z from "zod";

const shipmentStatusEnum = z.enum([
  "pending",
  "confirmed",
  "picked_up",
  "in_transit",
  "arrived_at_hub",
  "out_for_delivery",
  "delivered",
  "delayed",
  "cancelled",
]);

const carrierTypeEnum = z.enum(["DHL", "UPS", "FedEx"]);

const serviceTypeEnum = z.enum(["economy", "standard", "express", "premium"]);

const dateString = z.string().refine((date) => {
  const parsedDate = Date.parse(date);
  return !isNaN(parsedDate);
}, "Invalid date format. Please use a valid date string.");

const optionalDateString = z
  .union([z.string(), z.literal("")])
  .optional()
  .refine((date) => {
    if (!date) return true;
    return !isNaN(Date.parse(date));
  }, "Invalid date format. Please use a valid date string.");

const phoneSchema = z
  .string()
  .trim()
  .min(10, "Phone number must be at least 10 characters.")
  .max(15, "Phone number must be at most 15 characters.")
  .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format.");

export const CreateShipmentSchema = z.object({
  senderName: z
    .string()
    .trim()
    .min(5, "Sender name must be at least 5 characters.")
    .max(32, "Sender name must be at most 32 characters."),

  senderAddress: z
    .string()
    .trim()
    .min(10, "Sender address must be at least 10 characters.")
    .max(100, "Sender address must be at most 100 characters."),

  senderPhone: phoneSchema,

  receiverName: z
    .string()
    .trim()
    .min(5, "Receiver name must be at least 5 characters.")
    .max(32, "Receiver name must be at most 32 characters."),

  receiverAddress: z
    .string()
    .trim()
    .min(10, "Receiver address must be at least 10 characters.")
    .max(100, "Receiver address must be at most 100 characters."),

  receiverPhone: phoneSchema,

  origin: z
    .string()
    .trim()
    .min(2, "Origin must be at least 2 characters.")
    .max(64, "Origin must be at most 64 characters."),

  destination: z
    .string()
    .trim()
    .min(2, "Destination must be at least 2 characters.")
    .max(64, "Destination must be at most 64 characters."),

  currentLocation: z
    .string()
    .trim()
    .max(64, "Current location must be at most 64 characters.")
    .optional()
    .or(z.literal("")),

  weight: z
    .number()
    .min(0.1, "Weight must be at least 0.1 kg.")
    .max(10000, "Weight must be at most 10000 kg."),

  carrier: carrierTypeEnum,

  serviceType: serviceTypeEnum,

  cost: z
    .number()
    .min(0, "Cost must be at least 0.")
    .max(100000000, "Cost is too large."),

  description: z
    .string()
    .trim()
    .max(200, "Description must be at most 200 characters.")
    .optional()
    .or(z.literal("")),

  status: shipmentStatusEnum,

  estimatedDeliveryDate: dateString,
});

export type CreateShipmentValues = z.infer<typeof CreateShipmentSchema>;

export const UpdateShipmentSchema = z.object({
  senderName: z
    .string()
    .trim()
    .min(5, "Sender name must be at least 5 characters.")
    .max(32, "Sender name must be at most 32 characters."),

  senderAddress: z
    .string()
    .trim()
    .min(10, "Sender address must be at least 10 characters.")
    .max(100, "Sender address must be at most 100 characters."),

  senderPhone: phoneSchema,

  receiverName: z
    .string()
    .trim()
    .min(5, "Receiver name must be at least 5 characters.")
    .max(32, "Receiver name must be at most 32 characters."),

  receiverAddress: z
    .string()
    .trim()
    .min(10, "Receiver address must be at least 10 characters.")
    .max(100, "Receiver address must be at most 100 characters."),

  receiverPhone: phoneSchema,

  origin: z
    .string()
    .trim()
    .min(2, "Origin must be at least 2 characters.")
    .max(64, "Origin must be at most 64 characters."),

  destination: z
    .string()
    .trim()
    .min(2, "Destination must be at least 2 characters.")
    .max(64, "Destination must be at most 64 characters."),

  currentLocation: z
    .string()
    .trim()
    .max(64, "Current location must be at most 64 characters.")
    .optional()
    .or(z.literal("")),

  weight: z
    .number()
    .min(0.1, "Weight must be at least 0.1 kg.")
    .max(10000, "Weight must be at most 10000 kg."),

  carrier: carrierTypeEnum,

  serviceType: serviceTypeEnum,

  cost: z
    .number()
    .min(0, "Cost must be at least 0.")
    .max(100000000, "Cost is too large."),

  description: z
    .string()
    .trim()
    .max(200, "Description must be at most 200 characters.")
    .optional()
    .or(z.literal("")),

  status: shipmentStatusEnum,

  estimatedDeliveryDate: dateString,

  actualDeliveryDate: optionalDateString,
});

export type UpdateShipmentValues = z.infer<typeof UpdateShipmentSchema>;
