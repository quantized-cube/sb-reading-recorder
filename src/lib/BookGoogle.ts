export type BookGoogle = {
  id: string,
  volumeInfo: {
    title: string,
    authors: string[],
    publisher: string,
    publishedDate: string,
    imageLinks: { smallThumbnail: string },
  },
  saleInfo: {
    listPrice: { amount: number },
  }
};
