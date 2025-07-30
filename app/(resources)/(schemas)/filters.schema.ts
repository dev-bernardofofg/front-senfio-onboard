import { z } from "zod";

export const CouponFiltersSchema = z.object({
  search: z.string().optional(),
  ordering: z
    .enum(["created_at", "-created_at", "code", "-code"])
    .default("-created_at"),
});

export type CouponFiltersType = z.infer<typeof CouponFiltersSchema>;

export const CouponFiltersDefaultValues: CouponFiltersType = {
  search: "",
  ordering: "-created_at",
};

export const RedemptionFiltersSchema = z.object({
  search: z.string().optional(),
  ordering: z
    .enum(["redeemed_at", "-redeemed_at", "coupon__code", "-coupon__code"])
    .default("-redeemed_at"),
});

export type RedemptionFiltersType = z.infer<typeof RedemptionFiltersSchema>;

export const RedemptionFiltersDefaultValues: RedemptionFiltersType = {
  search: "",
  ordering: "-redeemed_at",
};
