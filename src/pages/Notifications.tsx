import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { BaseLayout } from "../layout/baselayout";
import { SummaryCard } from "../components/Summarycard";
import PrivacyTerms from "../components/privacy";
import Contacts from "../components/Contacts";
import NoficationsButton from "../components/NoficationsButton";
import { getNotifications, seeNotification } from "../services/notification";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";

const Notifications = () => {
  const { token } = useFluffyAuth();

  const [notifications, setNotifications] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const notifications = (await getNotifications(token!)).data;

      const unseenNotifications = notifications.filter(
        (notification: any) => !notification.seen
      );

      unseenNotifications.forEach((unseenNotification: any) =>
        seeNotification(token!, unseenNotification._id)
      );
      setNotifications(notifications);
    })();
  }, []);
  return (
    <BaseLayout>
      <div tw="grid grid-cols-4 gap-3 h-full">
        <div tw="col-span-1 hidden md:flex flex-col gap-2 sticky h-[fit-content] top-8">
          <SummaryCard />
          <PrivacyTerms />
        </div>
        <div tw="col-span-2 flex flex-col md:col-span-2 gap-2 pt-4">
          {notifications.map((notification) => (
            <NoficationsButton
              active={true}
              seen={notification.seen}
              type={notification.action}
              message={notification.metadata.message}
            />
          ))}
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
