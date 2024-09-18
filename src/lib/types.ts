import { z } from "zod";

export const mortgageSchema = z.object({
  mortgageAmount: z.coerce.number().min(1, { message: "This field is required" }),
  mortgageTerm: z.coerce.number().min(1, { message: "This field is required" }),
  interestRate: z.coerce.number().min(0.1, { message: "This field is required" }),
  repaymentType: z.enum(["repayment", "interestOnly"], {
    message: "This field is required",
  }),
});

export type TMortgageSchema = z.infer<typeof mortgageSchema>;

