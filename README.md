## Small business ecommerce site with CMS

This project is a work in progress. A live version of the main fork can be viewed [here](https://gerald-simpson.com).

My goal for this project was to hone the integration of frontend and backend skills I developed through freeCodeCamp courses.

I wanted to create a simple, custom ecommerce site that would offer flexibility for customers to update content using a CMS. This would provide an alternative to selling on Etsy and minimise monthly expenses for the customer.

## Technologies used

- Next.js
  - Following the deprecation of Create-React-App, I chose Next.js because of my interest in it's server-side rendering and directory-based routing, along with it's extensive adoption.
- Tailwind CSS
  - Tailwind integrated well with Next.js, enabling styling to be conveniently managed alongside other code.
- ~~MongoDB
  - Given the project's limited scope, I saw no need to introduce complexity with an SQL-based database, so opted for MongoDB.~~
- MySQL
  - After considering future features, I identified limitations with the previous MongoDB setup. Migrating to a locally hosted MySQL database offered a cost-effective solution and a valuable learning opportunity, while resolving challenges inherent to a non-SQL database.
- Prisma ORM
  - Prisma ORM was integrated due to its free, open-source nature, strong compatibility with TypeScript, and its ability to simplify querying the MySQL database.
- Stripe
  - Stripe provided a straightforward integration at an affordable price for payment processing.
- Auth0
  - I chose Auth0 for its straightforward implementation, polished client UI, extensive adoption and compatibility, with the added benefit of a free tier pricing option.
- CMS (TBD)

## Upcoming changes

Here's what I've got planned next for the project:

- Create a shop name and logo, and update the site style to match. - Complete
- Convert project to typescript. - Complete
- Research and implement the best CMS and authentication solution. - Complete
- Migrate project's backend from MongoDB to MySQL. - Complete
- Enhance the frontend design by selecting fonts and color schemes that align with the products being sold. - In progress
- Design and implement the front and backend for the CMS page.
