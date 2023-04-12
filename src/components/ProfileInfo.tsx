import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { getStats } from "../services/user";

const ProfileInfo = () => {
  const { token, user } = useFluffyAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    (async function () {
      const stats = await getStats(token as string);
      setStats(stats.data);
      const dateString = stats.data.userCreatedAt;
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      setStats((prev: any) => ({
        ...prev,
        userCreatedAtFormat: formattedDate,
      }));
    })();
  }, []);

  return (
    <div tw="w-full rounded-lg -translate-y-4 md:h-[300px] bg-white text-black border-[1px] px-4 py-8">
      <div tw="md:grid md:grid-cols-2 flex flex-col gap-6 md:gap-2">
        <div tw="grid-cols-1">
          <h1 tw="font-bold text-lg mb-3">
            Platform İçininde Kullanılan Uygulamalar
          </h1>
          <div tw="flex gap-4 flex-col">
            <p>Uygulama 1</p>
            <p>Uygulama 2</p>
            <p>Uygulama 3</p>
            <p>Uygulama 4</p>
          </div>
        </div>
        <div>
          <div tw="grid-cols-1 flex flex-col gap-3 pr-8">
            <div tw="w-full">
              <h1 tw="text-lg font-bold">İstatistikler</h1>
            </div>
            <div tw="w-full flex justify-between">
              <div>Toplam Platformdaki Üye Sayısı</div>
              <div tw="font-bold">{stats?.userCount}</div>
            </div>
            <div tw="w-full flex justify-between">
              <div>Kayıt Olma Tarihi</div>
              <div tw="font-bold">{stats?.userCreatedAtFormat}</div>
            </div>
            <div tw="w-full flex justify-between">
              <div>Toplam Gönderi Sayısı</div>
              <div tw="font-bold">{stats?.postCount}</div>
            </div>
            <div tw="w-full flex justify-between">
              <div>Toplam Beğeni Sayısı</div>
              <div tw="font-bold">{stats?.postLikeCount}</div>
            </div>
            <div tw="w-full flex justify-between">
              <div>Toplam Yorum Sayısı</div>
              <div tw="font-bold">{stats?.postCommentCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
