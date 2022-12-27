import { BaseLayout } from "../layout/baselayout";
import tw from "twin.macro";
import { SummaryCard } from "../components/Summarycard";
import PrivacyTerms from "../components/privacy";
import ShareStatus from "../components/Sharestatus";
import Post from "../components/Post";
import Contacts from "../components/Contacts";

function Chat() {
  return (
    <BaseLayout>
      <div tw="grid grid-cols-4 gap-3">
        <div tw="col-span-1 hidden md:flex flex-col gap-2 sticky top-8 h-[fit-content]">
          <SummaryCard />
          <PrivacyTerms />
        </div>
        <div tw="col-span-4 md:col-span-2 flex flex-col gap-4"></div>
        <div tw="hidden md:flex flex-col sticky h-[fit-content] top-8">
          <Contacts title="Kişilerle Etkileşime Geç" />
          <Contacts title="Popüler Kişiler" />
        </div>
      </div>
    </BaseLayout>
  );
}

export default Chat;
