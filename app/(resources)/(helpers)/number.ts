import { Coupon } from "@/lib/generated";

export const FN_UTILS_NUMBER = {
  sum_all_coupons_avaliable: (coupons: Coupon[]) =>
    coupons.reduce((acc, coupon) => acc + (coupon.max_redemptions ?? 0), 0),
};
