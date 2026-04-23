"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  UpdateShipmentSchema,
  type UpdateShipmentValues,
} from "@/lib/shipment-schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useShipmentToEdit } from "@/hooks/use-shipment-to-edit";
import { AdminHeader } from "@/app/(admin)/admin/_components/admin-header";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useUpdateShipment } from "@/hooks/use-update-shipment";

interface AdminUpdateShipmentFormProps {
  shipmentId: string;
}

export const AdminUpdateShipmentForm = ({
  shipmentId,
}: AdminUpdateShipmentFormProps) => {
  const router = useRouter();
  const updateMutation = useUpdateShipment(shipmentId);

  const {
    data: initialShipment,
    isPending,
    isError,
  } = useShipmentToEdit(shipmentId);

  const form = useForm({
    defaultValues: {
      senderName: "",
      senderAddress: "",
      senderPhone: "",
      receiverName: "",
      receiverAddress: "",
      receiverPhone: "",
      origin: "",
      destination: "",
      weight: 0,
      carrier: "FedEx",
      serviceType: "standard",
      cost: 0,
      status: "pending",
      currentLocation: "",
      estimatedDeliveryDate: "",
      actualDeliveryDate: "",
      description: "",
    } as UpdateShipmentValues,
    validators: {
      onSubmit: UpdateShipmentSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateMutation.mutateAsync(value);
        toast.success("Shipment updated successfully");
        router.push("/admin/shipments");
      } catch (error) {
        console.error("Update shipment error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred while updating the shipment",
        );
      }
    },
  });
  useEffect(() => {
    if (!initialShipment) return;

    form.reset({
      senderName: initialShipment.senderName,
      senderAddress: initialShipment.senderAddress,
      senderPhone: initialShipment.senderPhone,
      receiverName: initialShipment.receiverName,
      receiverAddress: initialShipment.receiverAddress,
      receiverPhone: initialShipment.receiverPhone,
      origin: initialShipment.origin,
      destination: initialShipment.destination,
      weight: initialShipment.weight,
      carrier: initialShipment.carrier,

      serviceType: initialShipment.serviceType,
      cost: initialShipment.cost,
      currentLocation: initialShipment.currentLocation,
      actualDeliveryDate: initialShipment.actualDeliveryDate
        ? new Date(initialShipment.actualDeliveryDate)
            .toISOString()
            .split("T")[0]
        : "",
      status: initialShipment.status,
      estimatedDeliveryDate: initialShipment.estimatedDeliveryDate
        ? new Date(initialShipment.estimatedDeliveryDate)
            .toISOString()
            .split("T")[0]
        : "",
      description: initialShipment.description ?? "",
    });
  }, [initialShipment, form]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading shipment</div>;

  if (!initialShipment) {
    return (
      <div className="flex flex-col h-full">
        <AdminHeader
          title="Shipment Not Found"
          description="The requested shipment for edit does not exist"
        />
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="p-12 text-center max-w-md">
            <h1 className="text-2xl font-bold text-foreground mb-4">Error</h1>
            <p className="text-muted-foreground mb-6">
              Shipment <span className="font-bold">{shipmentId}</span> not found
              in the system.
            </p>
            <Link href="/admin/shipments">
              <Button className="gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Shipments
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Edit Shipment"
        description="Here you can edit the details of the shipment."
      />
      <div className="flex-1 overflow-y-auto p-6">
        <Card>
          <form
            id="shipment-update-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="p-6 space-y-8"
          >
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <fieldset
                  disabled={isSubmitting}
                  className={`space-y-8 transition-opacity duration-200 ${
                    isSubmitting ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground">
                      Sender Information
                    </h3>
                    <FieldGroup>
                      <form.Field
                        name="senderName"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Sender Name
                              </FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                placeholder="Mike Johnson"
                                autoComplete="off"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />
                      <form.Field
                        name="senderAddress"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Address
                              </FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                placeholder="123 Main St, Los Angeles, CA"
                                autoComplete="off"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />
                      <form.Field
                        name="senderPhone"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Phone
                              </FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                placeholder="+1 (555) 123-4567"
                                autoComplete="off"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />
                    </FieldGroup>
                  </div>

                  <div className="border-t border-border" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground">
                      Receiver Information
                    </h3>
                    <FieldGroup>
                      <form.Field
                        name="receiverName"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Full Name
                              </FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                autoComplete="off"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />
                      <form.Field
                        name="receiverAddress"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Address
                              </FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                autoComplete="off"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />
                      <form.Field
                        name="receiverPhone"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Phone
                              </FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                autoComplete="off"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />
                    </FieldGroup>
                  </div>

                  <div className="border-t border-border" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground">
                      Shipment Details
                    </h3>

                    <FieldGroup>
                      <div className="grid md:grid-cols-2 gap-4">
                        <form.Field
                          name="origin"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Origin City
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  aria-invalid={isInvalid}
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                        <form.Field
                          name="destination"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Destination City
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  aria-invalid={isInvalid}
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                      </div>
                    </FieldGroup>

                    <FieldGroup>
                      <div className="grid md:grid-cols-2 gap-4">
                        <form.Field
                          name="weight"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Weight (kg)
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={
                                    Number.isNaN(field.state.value)
                                      ? ""
                                      : field.state.value
                                  }
                                  type="number"
                                  step={0.1}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    field.handleChange(
                                      value === "" ? 0 : parseFloat(value),
                                    );
                                  }}
                                  aria-invalid={isInvalid}
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                        <form.Field
                          name="carrier"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Carrier Type
                                </FieldLabel>
                                <Select
                                  value={field.state.value}
                                  onValueChange={(value) =>
                                    field.handleChange(
                                      value as "DHL" | "UPS" | "FedEx",
                                    )
                                  }
                                >
                                  <SelectTrigger id="carrier">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="DHL">DHL</SelectItem>
                                    <SelectItem value="UPS">UPS</SelectItem>
                                    <SelectItem value="FedEx">FedEx</SelectItem>
                                  </SelectContent>
                                </Select>
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                      </div>
                    </FieldGroup>

                    <FieldGroup>
                      <div className="grid md:grid-cols-2 gap-4">
                        <form.Field
                          name="cost"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Cost ($)
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={
                                    Number.isNaN(field.state.value)
                                      ? ""
                                      : field.state.value
                                  }
                                  type="number"
                                  step={1}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    field.handleChange(
                                      value === "" ? 0 : parseFloat(value),
                                    );
                                  }}
                                  aria-invalid={isInvalid}
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                        <form.Field
                          name="serviceType"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Service Type
                                </FieldLabel>
                                <Select
                                  key={field.state.value}
                                  value={field.state.value}
                                  onValueChange={(value) =>
                                    field.handleChange(
                                      value as
                                        | "economy"
                                        | "standard"
                                        | "express"
                                        | "premium",
                                    )
                                  }
                                >
                                  <SelectTrigger id="serviceType">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="economy">
                                      Economy
                                    </SelectItem>
                                    <SelectItem value="standard">
                                      Standard
                                    </SelectItem>
                                    <SelectItem value="express">
                                      Express
                                    </SelectItem>
                                    <SelectItem value="premium">
                                      Premium
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                      </div>
                    </FieldGroup>

                    <FieldGroup>
                      <div className="grid md:grid-cols-2 gap-4">
                        <form.Field
                          name="status"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Initial Status
                                </FieldLabel>
                                <Select
                                  key={field.state.value}
                                  value={field.state.value}
                                  onValueChange={(value) =>
                                    field.handleChange(
                                      value as
                                        | "pending"
                                        | "confirmed"
                                        | "picked_up"
                                        | "in_transit"
                                        | "arrived_at_hub"
                                        | "out_for_delivery"
                                        | "delivered"
                                        | "delayed"
                                        | "cancelled",
                                    )
                                  }
                                >
                                  <SelectTrigger id="status">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="in_transit">
                                      In Transit
                                    </SelectItem>
                                    <SelectItem value="out_for_delivery">
                                      Out for Delivery
                                    </SelectItem>
                                    <SelectItem value="delivered">
                                      Delivered
                                    </SelectItem>
                                    <SelectItem value="arrived_at_hub">
                                      Arrived at Hub
                                    </SelectItem>
                                    <SelectItem value="picked_up">
                                      Picked Up
                                    </SelectItem>
                                    <SelectItem value="delayed">
                                      Delayed
                                    </SelectItem>
                                    <SelectItem value="cancelled">
                                      Cancelled
                                    </SelectItem>
                                    <SelectItem value="confirmed">
                                      Confirmed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                        <form.Field
                          name="estimatedDeliveryDate"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Estimated Delivery Date
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  type="date"
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  aria-invalid={isInvalid}
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                      </div>
                    </FieldGroup>

                    <FieldGroup>
                      <div className="grid md:grid-cols-2 gap-4">
                        <form.Field
                          name="currentLocation"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Current Location
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  aria-invalid={isInvalid}
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                        <form.Field
                          name="actualDeliveryDate"
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Actual Delivery Date
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  type="date"
                                  value={field.state.value || ""}
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  aria-invalid={isInvalid}
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                      </div>
                    </FieldGroup>

                    <FieldGroup>
                      <form.Field
                        name="description"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Package Description
                              </FieldLabel>
                              <Textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                autoComplete="off"
                                rows={4}
                                placeholder="Package contents and special handling instructions..."
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />
                    </FieldGroup>
                  </div>
                </fieldset>
              )}
            </form.Subscribe>
          </form>
          <Field orientation="horizontal" className="justify-end p-6">
            <form.Subscribe
              selector={(state) => state.isSubmitting}
              children={(isSubmitting) => (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={isSubmitting}
                  >
                    Clear Form
                  </Button>

                  <Button
                    type="submit"
                    className="gap-2"
                    form="shipment-update-form"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {isSubmitting ? "Updating..." : "Update Shipment"}
                  </Button>
                </>
              )}
            />
          </Field>
        </Card>
      </div>
    </div>
  );
};
