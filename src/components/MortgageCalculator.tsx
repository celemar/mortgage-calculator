"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NumberInput from "./ui/NumberInput";
import RadioInput from "./ui/RadioInput";
import ResultCard from "./ResultCard";
import Button from "./ui/Button";
import { mortgageSchema, TMortgageSchema } from "@/lib/types";

export default function MortgageCalculator() {
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const methods = useForm<TMortgageSchema>({
    resolver: zodResolver(mortgageSchema),
    mode: "onBlur",
  });

  const calculateMortgage = (data: TMortgageSchema) => {
    const principal = Number(data.mortgageAmount);
    const years = Number(data.mortgageTerm);
    const rate = Number(data.interestRate) / 100;
    // Use separate fields for years and months for accurate monthly calculations
    const months = Math.round(years * 12);

    let monthly = 0;
    let total = 0;

    if (data.repaymentType === "repayment") {
      if (rate >= 1) {
        // 100% or higher interest rate
        total = principal * (1 + rate);
        monthly = total / months;
      } else if (rate === 0) {
        monthly = principal / months;
        total = principal;
      } else {
        const monthlyRate = rate / 12;
        monthly =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
        total = monthly * months;
      }
    } else if (data.repaymentType === "interestOnly") {
      monthly = (principal * rate) / 12;
      total = monthly * months + principal;
    }

    setMonthlyPayment(Number(monthly.toFixed(2)));
    setTotalPayment(Number(total.toFixed(2)));
  };

  return (
    <section className="bg-[white] grid md:grid-cols-2 gap-6 md:gap-0 md:rounded-2xl md:shadow-lg max-w-[1000px]">
      <div className="grid gap-6 md:gap-9 md:pb-8">
        <header className="flex flex-col gap-2 md:flex-row md:justify-between px-6 pt-7 md:pt-10 md:px-9">
          <h1 className="font-bold text-2xl text-slate-900">
            Mortgage Calculator
          </h1>
          <button
            onClick={() => methods.reset()}
            className="underline w-fit text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
          >
            Clear All
          </button>
        </header>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(calculateMortgage)}
            className="flex flex-col gap-7 px-6 md:gap-5 md:px-9"
          >
            <NumberInput
              name="mortgageAmount"
              label="Mortgage Amount"
              unit="£"
              formatWithCommas={true}
            />

            <div className="grid gap-6 md:grid-cols-2 md:pt-1">
              <NumberInput
                name="mortgageTerm"
                label="Mortgage Term"
                unit="years"
              />
              <NumberInput name="interestRate" label="Interest Rate" unit="%" />
            </div>

            <RadioInput
              name="repaymentType"
              options={[
                { label: "Repayment", value: "repayment" },
                { label: "Interest Only", value: "interestOnly" },
              ]}
            />
            <div className="md:pt-5 pb-2">
              <Button />
            </div>
          </form>
        </FormProvider>
      </div>

      <div aria-live="polite">
        <ResultCard
          monthlyRepayment={monthlyPayment}
          totalRepayment={totalPayment}
          isSubmitSuccessful={methods.formState.isSubmitSuccessful}
        />
      </div>
    </section>
  );
}
