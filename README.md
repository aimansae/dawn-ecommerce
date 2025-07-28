# Shop Dawn

Shop Dawn is a responsive e-commerce frontend inspired by [Shopify's Dawn Theme](https://theme-dawn-demo.myshopify.com/), built with modern web technologies including [Next.js](https://nextjs.org/) [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS ](https://tailwindcss.com/), and [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).



![Shop Dawn Preview](/public/assets/images/preview.PNG)

This project was developed as part of the biggest challenge so far, from my mentor Amal K. , focusing on advanced features such as search params, dynamic filtering, form handling, and saving data to a real database.

Please find the Github Repo [here](https://github.com/aimansae/dawn-ecommerce)
The Deployed live site through [Vercel](https://vercel.com/), can be found [here](https://dawn-ecommerce.vercel.app/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Challenges Faced](#challenges-faced)
- [Getting Started](#getting-started)
- [Tailwind Configuration](#tailwind-configuration)
- [Testing](#testing)
- [Deploy on Vercel](#deploy-on-vercel)
- [Future Improvements](#future-improvements)
- [MongoDB Setup](#mongodb-setup)
- [Credits](#credits)


## Features

- Clean and modern design inspired by Shopify
- Fully responsive layout
- Modular, reusable components
- Tailwind CSS for styling
- Dynamic filtering by color, availability, and more
- Updates URL params for filter, sort, and product variations
- Fully functional shopping cart with quantity management
- Custom hooks for filtering and query syncing
- Price converting functionality
- Dynamic links update based on filter or selection
- Color selection updates product image and product URL
- Newsletter subscription form with DB storage
- Contact form with backend submission
- MongoDB Atlas for storing subscribers and form data
- Mocked checkout flow with form validation and database save
- Built with Next.js App Router and TypeScript
mail subscription and contact forms with MongoDB storage
- Next.js App Router with API routes for checkout, subscribers, and contact
- Server-side rendering (SSR) for product and collection pages
- MongoDB Atlas integration for storing users, forms, and payments
- Partial Unit testing with Jest and React Testing Library

## Technologies Used

- [Next.js App Router](https://nextjs.org/docs/app) – File-based routing system with layouts and server components
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/docs) – Utility-first CSS framework for rapid styling
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) – Cloud-hosted NoSQL database
- [Mongoose](https://mongoosejs.com/) – ODM library for MongoDB in Node.js
- [Jest](https://jestjs.io/) – Delightful JavaScript testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) – UI testing focused on user interaction
- [Vercel](https://vercel.com/) – Frontend hosting and deployment platform

## Challenges Faced
- Data Persistence
Initially used JSON to simulate storage but moved to MongoDB Atlas for persistent storage of subscribers, contact forms, and orders.

- Complex filtering by color, availability, sort 
Built a custom filter hook using [`useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params) and [`useRouter`](https://nextjs.org/docs/app/api-reference/functions/use-router) 

- Color selection with dynamic image and URL updates 
Used dynamic routing and `router.push()` to sync color variants with product state

- Payment simulation
Created a mocked checkout flow using a custom [App Router API route](https://nextjs.org/docs/app/building-your-application/routing/api-routes) and MongoDB storage 

- Email and contact form data 
Submitted via `/api/subscribe` and `/api/contact` routes using [`POST` request handling](https://nextjs.org/docs/app/building-your-application/routing/api-routes) 

- SSR for collections and product pages 
Implemented [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) and server-side `fetch()` 

- Full shopping cart logic 
Used global state via custom hooks context to manage cart state and sync with UI 

- Securing credentials 
Used `.env.local` with `process.env.MONGODB_URI` to hide sensitive info

Overall This project was developed as part of the biggest challenge so far

I'm incredibly proud of this project. It combined everything I learned from previous projects and pushed me to think like a developer. There were many moments where I realized, "I could’ve done this better," especially around prop handling, component reusability, and state management. 
Features like the navbar, filtering,footer and search were time-consuming . I iterated on them constantly as I learned better implementation techniques.

## Getting Started

1. Clone the repo and install dependencies
```bash

git clone https://github.com/aimansae/dawn-ecommerce.git
cd dawn-ecommerce
npm install
2. Add environment variables
Create .env.local:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
Replace with your MongoDB Atlas credentials.

3. Start the dev server

npm run dev
Go to: http://localhost:3000

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Tailwind Configuration

Tailwind CSS is used for styling the app. If you'd like to explore or customize the setup, follow the official guide [here](https://tailwindcss.com/docs/installation/framework-guides/nextjs) 

## [Testing](https://nextjs.org/docs/app/guides/testing/jest)

To enable unit testing in the project:

1. Install dependencies:
``` bash

npm install --save-dev jest jest-environment-jsdom \
  @testing-library/react @testing-library/jest-dom \
  ts-node @types/jest ts-jest \
  @babel/preset-typescript

2. Initialize Jest:

npm init jest@latest
Choose:
TypeScript support: Yes
Environment:jsdom

convert jest.config.js to jest.config.ts and add:

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

3. Create the jest.setup.ts file and add:

import '@testing-library/jest-dom';

4. Create a `__tests__` folder at the root of your project and add test files.

5. Run tests using: npm test

```

##  [MongoDB Setup](https://www.mongodb.com/products/platform/atlas-database)
 
1. Create an account (or log in if you already have one)
2. Create a free cluster
3. Set up a new project
4. Create a cluster within the project

In your VS Code project:

- create a .env.local file in root directory 

- Copy the MongoDB connection string from Atlas, and paste it into .env like this:
 
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.buvbw8u.mongodb.net/

Replace <username>and <password>with your current credentials.

- Install required packages:
 
npm install mongodb mongoose

### Set up project structure:

- Create a libs folder
- Inside, add mongodb.ts to handle DB connection using the .env file
- Create a models folder
- Add a subscriber.ts file (or relevant model files)
Learn [more](https://medium.com/yavar/how-to-create-and-connect-database-in-mongodb-atlas-using-next-js-25305a925eec) 

## Future Improvements

- **MobileNav** – Add slide-in animation from the left side for better UX
- **Slow Button Interactions** – Improve responsiveness on collection filter buttons
- **Dynamic Metadata**
- **Filtering Performance** – Optimize filtering logic and performance for large datasets
- **Footer Expansion** – Add “About” and “Contact” pages in the footer section for mobile view
- **Pagination** – Implement pagination in the Lookbook or product list pages
- **Currency Conversion** – Replace hardcoded JSON conversion with a real (free) currency API
- **Authentication** – Add user login, register, and protected routes (e.g. for checkout)
- **Subscriber Issue** – Investigate form failure after deployment and improve MongoDB logic
- **Rendering Delays** – Optimize the rendering delay when navigating to "Collections" or "Checkout" pages
- **Dark Mode** – Add a toggle for light/dark mode theme
- **Real Payment** – Integrate Stripe or PayPal for real payment instead of mock flow
- **Admin Panel** – Create a basic admin dashboard to view subscribers or orders

## Credits
Special thanks to my mentor, whose challenge, guidance, and feedback helped me explore real-world use cases in frontend architecture, dynamic data handling, and full-stack e-commerce workflows.
