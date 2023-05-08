import React from "react";
import { BaseLayout } from "../layout/baselayout";
import tw from "twin.macro";
import { SummaryCard } from "../components/Summarycard";
import PrivacyTerms from "../components/privacy";
import ProfileBanner from "../components/ProfileBannerOtherUser";
import ProfileInfo from "../components/ProfileInfoOtherUser";
import Contacts from "../components/Contacts";
import Post from "../components/Post";
import { getOtherUserPost } from "../services/post";
import { useEffect, useState } from "react";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { useParams } from "react-router-dom";
import { getOtherUserStats, getUser } from "../services/user";

const Profile = () => {
  const params = useParams();
  const [id, setId] = useState<any>(params.id || null);
  const [postList, setPostList] = useState<any[]>([]);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [banner, setBanner] = useState<any>(null);
  const { token, user } = useFluffyAuth();

  useEffect(() => {
    setId(params.id);
    (async function () {
      const posts = await getOtherUserPost(token as string, id);
      setPostList(posts.userposts);
      const userinfo = await getOtherUserStats(token as string, id);
      setUserDetail(userinfo.data);
      const banner = await getUser(token as string, id);
      setBanner(banner.user);
      setMounted(true);
    })();
  }, [params.id]);
  return (
    mounted && (
      <BaseLayout>
        <div tw="grid grid-cols-4 gap-3 h-full">
          <div tw="col-span-1 hidden md:flex flex-col gap-2 sticky h-[fit-content] top-8">
            <SummaryCard />
            <PrivacyTerms />
          </div>
          <div tw="col-span-2 flex flex-col md:col-span-2 gap-2">
            <ProfileBanner userDetail={banner} />
            <ProfileInfo info={userDetail} />
            {postList.map((post, index) => (
              <Post postData={post} key={index} />
            ))}
          </div>
          <div tw="col-span-1 md:flex flex-col sticky h-[fit-content] top-8">
            <Contacts title="Kişilerle Etkileşime Geç" />
            <Contacts title="Popüler Kişiler" />
          </div>
        </div>
      </BaseLayout>
    )
  );
};

export default Profile;
