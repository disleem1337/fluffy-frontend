import React, { useEffect, useState } from "react";
import { produce } from "immer";
import tw from "twin.macro";
import { Profiletab } from "./Profiletab";
import { BsLightning } from "react-icons/bs";
import { Button, BorderRadius, ButtonVariant } from "./Button/Button";
import { followUser, getAllUser, unfollowUser } from "../services/user";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { Link } from "react-router-dom";
import { getImageWithFallback } from "../utils";
import { useFollowCache } from "../stores/followCache";

type ProfiletabProps = {
  title: string;
};

const Contacts = ({ title }: ProfiletabProps) => {
  const { token, refreshUser } = useFluffyAuth();
  const [userList, setuserList] = useState<any[]>([]);

  const cacheMap = useFollowCache((store) => store.followsById);
  const isCached = useFollowCache((store) => store.isCached);
  const getCacheValue = useFollowCache((store) => store.getCacheValue);
  const setCacheValue = useFollowCache((store) => store.setCacheValue);

  const getUserFollow = (user: {
    _id: string;
    following: boolean;
  }): boolean => {
    const cached = isCached(user._id);

    return cached ? (getCacheValue(user._id) as boolean) : user.following;
  };

  useEffect(() => {
    (async function () {
      const userlists = await getAllUser(token!);
      setuserList(userlists.data);
    })();
  }, []);

  const onClickFollowButton = async (user: any) => {
    const followValue = getUserFollow(user);
    try {
      if (followValue) {
        setCacheValue(user._id, false);

        await unfollowUser(token!, user._id);
        setuserList(
          produce((draft) => {
            const followUpdateUser = draft.find(
              (draftUser) => draftUser._id == user._id
            );

            if (followUpdateUser) followUpdateUser.following = false;
          })
        );
        refreshUser();
      } else {
        setCacheValue(user._id, true);
        await followUser(token!, user._id);
        setuserList(
          produce((draft) => {
            const followUpdateUser = draft.find(
              (draftUser) => draftUser._id == user._id
            );

            if (followUpdateUser) followUpdateUser.following = true;
          })
        );
        refreshUser();
      }
    } catch (err) {
      setCacheValue(user._id, followValue);
    }
  };

  console.log(title, cacheMap);
  return (
    <div tw="px-5 py-3 bg-white rounded-lg flex flex-col gap-2 mb-4 border-[1px]">
      <div>{title}</div>
      <hr tw="h-0.5 w-full bg-gray-200 border-0"></hr>
      {userList.map((user, index) => (
        <div tw="w-full flex flex-col gap-2 h-full rounded-md p-2">
          <Link key={index} to={`/profile/${user._id}`}>
            <div tw="flex w-full gap-4 items-center">
              <img
                src={getImageWithFallback(user.profileImage)}
                tw="w-16 h-16 rounded-full border border-gray-600"
              />
              <div tw="flex flex-col ">
                <h1 tw="font-semibold">
                  {user.walletAddress.slice(0, 7)}...
                  {user.walletAddress.slice(-4)}
                </h1>
                <p tw="text-xs">Bu kişiyi takip et</p>
              </div>
            </div>
          </Link>
          <div tw="w-full">
            <Button
              borderRadius={BorderRadius.LARGE}
              onClick={() => onClickFollowButton(user)}
              variant={
                getUserFollow(user)
                  ? ButtonVariant.SECONDARY
                  : ButtonVariant.PRIMARY
              }
              tw="w-full py-4"
            >
              {getUserFollow(user) ? "Takipten çık" : "Takip et"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
