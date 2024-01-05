import prisma from './prisma';
import type { Book } from '@/lib/Book';
import type { BookGoogle } from '@/lib/BookGoogle';
import type { Review } from '@/lib/Review';

export function createBook(book: BookGoogle): Book {
  const authors = book.volumeInfo.authors;
  const price = book.saleInfo.listPrice;
  const img = book.volumeInfo.imageLinks;
  return {
    id: book.id,
    title: book.volumeInfo.title,
    author: authors ? authors.join(',') : '',
    price: price ? price.amount : 0,
    publisher: book.volumeInfo.publisher,
    published: book.volumeInfo.publishedDate,
    image: img ? img.smallThumbnail : '/vercel.svg',
  };
}

export async function getBooksByKeyword(keyword: string): Promise<Book[]> {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=20&printType=books`);
  const result = await res.json();
  const books = [];
  for (const b of result.items) {
    books.push(createBook(b as BookGoogle));
  }
  return books;
}

export async function getBookById(id: string): Promise<Book> {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  const result = await res.json();
  return createBook(result);
}

export async function getReviewById(id: string): Promise<Review | null> {
  return await prisma.reviews.findUnique({
    where: {
      id: id
    }
  });
}

export async function getAllReviews(): Promise<Review[]> {
  return await prisma.reviews.findMany({
    orderBy: {
      read: 'desc'
    }
  });
}
