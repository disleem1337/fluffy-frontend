import React from "react";
import tw, { TwStyle } from "twin.macro";

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  GHOST = "ghost",
}

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum BorderRadius {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

const buttonVariants: Record<ButtonVariant, TwStyle> = {
  [ButtonVariant.PRIMARY]: tw`bg-black text-white hover:bg-black/80 disabled:bg-black/50`,
  [ButtonVariant.SECONDARY]: tw`bg-transparent text-black border border-gray-300 border-solid hover:bg-black/20 disabled:border-black/50 disabled:text-black/50`,
  [ButtonVariant.GHOST]: tw`bg-transparent text-black hover:bg-black/20 disabled:text-black/50`,
};

const buttonSizeVariants: Record<ButtonSize, TwStyle> = {
  [ButtonSize.SMALL]: tw`h-8 leading-8 px-small py-xs`,
  [ButtonSize.MEDIUM]: tw`h-10 px-medium py-small`,
  [ButtonSize.LARGE]: tw`h-12 px-large py-small-medium`,
};

const borderRadiusVariants: Record<BorderRadius, TwStyle> = {
  [BorderRadius.SMALL]: tw`rounded-sm`,
  [BorderRadius.MEDIUM]: tw`rounded-md`,
  [BorderRadius.LARGE]: tw`rounded-lg`,
};

type ButtonProps = {
  /**
   * Buton Tipi
   */
  variant?: ButtonVariant;
  /**
   * Buton büyüklüğü
   */
  size?: ButtonSize;
  /**
   * Kenar yumuşaklığı
   */
  borderRadius?: BorderRadius;
  /**
   * Devre dışı bırakılma
   */
  disabled?: boolean;
  /**
   * Buton içeriği
   */
  children?: React.ReactNode;
  /**
   * Butonun sol kısmının düz olması
   */
  leftFlat?: boolean;
  /**
   * Butonun sol kısmının düz olması
   */
  rightFlat?: boolean;
  /**
   * İsteğe bağlı olay dinleyici
   */
  onClick?: () => void;
};

/**
 * Primary UI component for user interaction
 */
export function Button({
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.SMALL,
  borderRadius = BorderRadius.SMALL,
  disabled = false,
  children,
  leftFlat = false,
  rightFlat = false,
  ...props
}: ButtonProps) {
  const styles = [
    tw`cursor-pointer inline-flex items-center justify-center select-none border-none active:scale-95 transition disabled:cursor-not-allowed disabled:pointer-events-none`,
    buttonSizeVariants[size],
    buttonVariants[variant],
    borderRadiusVariants[borderRadius],
    leftFlat && tw`rounded-l-none border-l-0`,
    rightFlat && tw`rounded-r-none border-r-0`,
  ];
  return (
    <button css={styles} {...props} disabled={disabled}>
      {children}
    </button>
  );
}
