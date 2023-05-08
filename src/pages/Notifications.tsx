import React from "react";
import tw from "twin.macro";
import { BaseLayout } from "../layout/baselayout";
import { SummaryCard } from "../components/Summarycard";
import PrivacyTerms from "../components/privacy";
import Contacts from "../components/Contacts";
import NoficationsButton from "../components/NoficationsButton";

const Notifications = () => {
  return (
    <BaseLayout>
      <div tw="grid grid-cols-4 gap-3 h-full">
        <div tw="col-span-1 hidden md:flex flex-col gap-2 sticky h-[fit-content] top-8">
          <SummaryCard />
          <PrivacyTerms />
        </div>
        <div tw="col-span-2 flex flex-col md:col-span-2 gap-2 pt-4">
          <NoficationsButton
            active={true}
            seen={false}
            type={"like"}
            action={"0xa92391...3d10b1fc"}
          />
          <NoficationsButton
            active={true}
            seen={false}
            type={"follow"}
            action={"0xa92391...3d10b1fc"}
          />
          <NoficationsButton
            active={false}
            seen={true}
            type={"share"}
            action={"0xa92391...3d10b1fc"}
          />
        </div>
        <div tw="col-span-1 md:flex flex-col sticky h-[fit-content] top-8">
          <Contacts title="Kişilerle Etkileşime Geç" />
          <Contacts title="Popüler Kişiler" />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Notifications;
