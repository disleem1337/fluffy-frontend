import React from "react";
import tw from "twin.macro";

const ProfileInfo = () => {
  return (
    <div tw="w-full h-[300px] bg-[#808080] px-4 py-8">
      <div tw="grid grid-cols-2 gap-2 text-white">
        <div tw="grid-cols-1">
          <h1 tw="font-bold text-lg mb-3">
            Platform İçininde Kullanılan Uygulamalar
          </h1>
          <ul>
            <li>Uygulama 1</li>
            <li>Uygulama 2</li>
            <li>Uygulama 3</li>
            <li>Uygulama 4</li>
          </ul>
        </div>
        <div>
          <div tw="grid-cols-1 flex flex-col gap-3 pr-8">
            <div tw="w-full flex justify-between">
              <div>Toplam Etkileşime Geçilen Kullanıcı</div>
              <div>2</div>
            </div>
            <div tw="w-full flex justify-between">
              <div>Kayıt Olma Tarihi</div>
              <div>2</div>
            </div>
            <div tw="w-full flex justify-between">
              <div>Kullanılan Wallet Türü</div>
              <div>2</div>
            </div>
            <div tw="w-full flex justify-between">
              <div>Toplam Sahip Olunan FluffyCoin</div>
              <div>2</div>
            </div>
            <div tw="w-full flex justify-between">
              <div>Toplam Etkileşime Geçilen Kullanıcı</div>
              <div>2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
