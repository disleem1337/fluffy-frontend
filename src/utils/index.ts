export function getImageWithFallback(imageURL: string) {
  return (
    imageURL ||
    "https://www.arweave.net/01H1V-i5ikyQvXof2vXsdOMbOpjWkaj7L1QXkWRa3Io?ext=png"
  );
}
