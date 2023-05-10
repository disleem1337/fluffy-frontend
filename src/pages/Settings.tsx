import React from "react";
import { BaseLayout } from "../layout/baselayout";
import tw from "twin.macro";
import { SummaryCard } from "../components/Summarycard";
import PrivacyTerms from "../components/privacy";
import ProfileBanner from "../components/ProfileBanner";
import ProfileInfo from "../components/ProfileInfo";
import Contacts from "../components/Contacts";
import Post from "../components/Post";
import { userPosts } from "../services/post";
import { useEffect, useState } from "react";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";

const Settings = () => {
  const [postList, setPostList] = useState<any[]>([]);
  const { token, user } = useFluffyAuth();

  useEffect(() => {
    (async function () {
      const posts = await userPosts(token as string);
      setPostList(posts.userposts);
    })();
  }, []);

  const onShareNewPost = (desc: string, content: any[]) => {
    setPostList((prev) => [
      {
        desc,
        content,
        user: [user],
      },
      ...prev,
    ]);
  };

  return (
    <BaseLayout>
      <div tw="grid grid-cols-4 gap-3 h-full">
        <div tw="col-span-1 hidden md:flex flex-col gap-2 sticky h-[fit-content] top-8">
          <SummaryCard />
          <PrivacyTerms />
        </div>
        <div tw="col-span-2 flex flex-col md:col-span-2 gap-2">
          <ProfileBanner />
          <ProfileInfo />
          {postList.map((post, index) => (
            <Post postData={post} key={index} redirectOnClick />
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

export default Settings;
