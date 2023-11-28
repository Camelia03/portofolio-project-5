from django.core.management import BaseCommand
import csv
from books.models import Author, Book, Genre
import ast
from datetime import datetime


class Command(BaseCommand):
    help = "Import books csv"

    def handle(self, *args, **options):
        # Open the csv file
        with open('./books_enrichedv2.csv') as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=',')
            line_count = 0
            for row in csv_reader:

                # Stop when reaching 5000 books to preserve space
                if line_count > 5000:
                    break

                # Display columns in csv
                if line_count == 0:
                    self.stdout.write(f'Column names are {", ".join(row)}')
                    line_count += 1
                    continue

                # Skip already imported books
                if Book.objects.filter(title=row['title']).exists():
                    line_count += 1
                    self.stdout.write(f'Skip {line_count}')

                    continue

                # Attempt to parse the publish date
                row_publish_date = row['publishDate'].strip()

                try:
                    publish_date = datetime.strptime(
                        row_publish_date, "%m/%d/%y")
                except:
                    try:
                        publish_date = datetime.strptime(row_publish_date.replace('th', '').replace(
                            '2nd', '2').replace('1st', '1').replace('3rd', '3'), "%B %d %Y")
                    except:
                        try:
                            publish_date = datetime.strptime(
                                row_publish_date, "%B %Y")
                        except:
                            try:
                                publish_date = datetime.strptime(
                                    row_publish_date, "%Y")
                            except:
                                try:
                                    publish_date = datetime.strptime(
                                        row_publish_date, "('%m', '%d', '%Y')")
                                except:
                                    continue

                # Attempt to parse number of pages
                try:
                    number_of_pages = int(float(row['pages']))
                except:
                    number_of_pages = 0

                # Map csv row to a Book model
                book = Book(
                    title=row['title'],
                    original_title=row['original_title'],
                    image_url=row['image_url'],
                    goodreads_average_rating=float(row['average_rating']),
                    goodreads_ratings_count=int(row['ratings_count']),
                    goodreads_book_id=row['goodreads_book_id'],
                    goodreads_star_rating_1=int(row['ratings_1']),
                    goodreads_star_rating_2=int(row['ratings_2']),
                    goodreads_star_rating_3=int(row['ratings_3']),
                    goodreads_star_rating_4=int(row['ratings_4']),
                    goodreads_star_rating_5=int(row['ratings_5']),
                    publish_date=publish_date,
                    description=row['description'],
                    ISBN=row['isbn'],
                    number_of_pages=number_of_pages,
                    language_code=row['language_code'],
                )

                # Insert book in DB
                book.save()

                # Attempt to parse authors
                row_authors = row["authors"].replace('[', '').replace(']', '')
                authors = [a.strip() for a in row_authors.split(',')]

                # Insert authors in DB
                for author in authors:
                    # Skip authors that already exist
                    if not Author.objects.filter(full_name=author).exists():
                        Author.objects.create(full_name=author)

                # Set authors and genres on the book and update
                book_authors = Author.objects.filter(full_name__in=authors)
                book.authors.set(book_authors)

                genres = ast.literal_eval(row['genres'])
                book_genres = Genre.objects.filter(name__in=genres)
                book.genres.set(book_genres)

                book.save()

                # Increment line counter
                line_count += 1
                self.stdout.write(f'{line_count}')

            print(f'Processed {line_count} lines.')
