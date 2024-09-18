import React from "react";
import { SvgCalculator } from "./ui/Svgs";
import { formatCurrency } from "@/lib/utils";

type ResultProps = {
  monthlyRepayment: number | null;
  totalRepayment: number | null;
  isSubmitSuccessful: boolean;
};

export default function ResultCard({
  monthlyRepayment,
  totalRepayment,
  isSubmitSuccessful,
}: ResultProps) {
  return (
    <div className="bg-[#133040] text-white h-full grid items-center md:rounded-bl-[5rem] md:rounded-tr-2xl md:rounded-br-2xl">
      {isSubmitSuccessful ? (
        <div className="mb-auto flex flex-col gap-4 p-6 md:py-8 md:px-10">
          <h3 className="text-2xl pt-2 font-bold">Your results</h3>
          <p className="text-slate-300 pb-2 md:pb-5">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click &ldquo;calculate repayments&rdquo;
            again.
          </p>{" "}
          <div className="bg-[#0e2431] px-4 py-5 md:px-7 md:py-8 border-t-4 border-lime rounded-lg">
            <p className="flex flex-col border-b border-slate-700 text-slate-500 pb-4 md:pb-6">
              Your monthly repayments
              <span className="text-lime text-[2.42rem] md:text-[3.5rem] font-bold ">
                {monthlyRepayment !== null
                  ? formatCurrency(monthlyRepayment)
                  : ""}
              </span>
            </p>
            <p className="flex flex-col gap-2 pt-4 text-slate-500 md:pt-8">
              Total you&#39;ll repay over the term
              <span className="text-white text-2xl font-bold">
                {totalRepayment !== null ? formatCurrency(totalRepayment) : ""}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 p-8">
          <SvgCalculator />
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl pt-3 font-bold">Results shown here</h2>
            <p className="text-slate-300 text-center">
              Complete the form and click &ldquo;calculate repayments&rdquo; to see what your
              monthly repayments would be.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
