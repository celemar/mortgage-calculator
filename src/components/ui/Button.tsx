import { SvgCalcBtn } from "./Svgs";

export default function Button() {
  return (
    <button
      className="flex items-center text-lg py-3 md:py-[0.8rem] px-10 rounded-[2rem] gap-2 font-bold bg-lime text-slate-900 justify-center w-full md:w-fit  outline-slate-900  hover:bg-[#ebee97]"
      type="submit"
    >
      <SvgCalcBtn/>
      Calculate Repayments
    </button>
  );
}
