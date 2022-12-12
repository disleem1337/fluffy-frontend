import React from "react";
import { BaseLayout } from "../layout/baselayout";
import tw from "twin.macro";
import { SummaryCard } from "../components/Summarycard";
import PrivacyTerms from "../components/privacy";
import ProfileBanner from "../components/ProfileBanner";
import ProfileInfo from "../components/ProfileInfo";

const Settings = () => {
  return (
    <BaseLayout>
      <div tw="px-4 md:px-14 py-6 grid grid-cols-4 gap-3 min-h-screen h-full">
        <div tw="col-span-1 flex flex-col gap-2 sticky">
          <SummaryCard />
          <PrivacyTerms />
        </div>
        <div tw="col-span-4 md:col-span-3">
          <ProfileBanner />
          <ProfileInfo />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Settings;