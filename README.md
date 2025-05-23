# Shop Dawn

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The project is inspired by [Dawn](https://theme-dawn-demo.myshopify.com/) website. It was created as part of a challenge given by my mentor to test and enhance my skills in React , Next.js , TypeScript , and Tailwind CSS . The goal was to recreate the look and feel of the original theme as closely as possible while building a modern, responsive, and component-driven frontend experience.

Please find the Github Repo [here](https://github.com/aimansae/dawn-ecommerce)
The Deployed live site through [Vercel](https://vercel.com/), can be found [here](https://dawn-ecommerce.vercel.app/)

## Features

- Fully responsive layout
- Modular component architecture
- Styled with Tailwind CSS
- Optimized with Next.js App Router
- Dynamic filtering and searching (WIP)
- TypeScript  
- Setup for unit testing with Jest and React Testing Library (see below)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tailwind Configuration

Tailwind CSS is used for styling the app. If you'd like to explore or customize the setup, follow the official guide [here] (https://tailwindcss.com/docs/installation/framework-guides/nextjs) 

## Testing [Setup](https://nextjs.org/docs/app/guides/testing/jest)
To enable unit testing in the project:

1. Install dependencies:
bash

npm install --save-dev jest jest-environment-jsdom \
  @testing-library/react @testing-library/jest-dom \
  ts-node @types/jest ts-jest \
  @babel/preset-typescript
2. Initialize Jest:
bash


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

4.Create   __tests__folder at the root of your project and add test files.

4. use command npm test  to test files

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The app is deployed using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## TODO / Known Issues

 MobileNav : Add slide-in animation from the left
 Button interactions in collections are slow
 Improve filtering logic and performance
 Add About and Contact pages in the footer
 Implement pagination in the Lookbook section
 Currency conversion API not working as paid version is needed, created a json file with conversion rates
 Add login and authentication for users
 Email registration for subscribers does not work after deployment used MongoDb
 When clicking on Collections button, the page takes too long to render, same for when checkout page is accessed


## Set Up [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
 
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