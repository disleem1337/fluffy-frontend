import { BaseLayout } from "../layout/baselayout";
import tw from "twin.macro";
import { SummaryCard } from "../components/Summarycard";

function Fluffy() {
  return (
    <BaseLayout>
      <div tw="px-14 py-6 grid grid-cols-4 gap-3">
        <div tw="col-span-1">
          <SummaryCard />
        </div>
        <div>1</div>
        <div>1</div>
      </div>
    </BaseLayout>
  );
}

export default Fluffy;
