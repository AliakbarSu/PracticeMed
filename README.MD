# Practice Med

![PracticeMed](/screenshots/homepage.png?raw=true)

[Live Demo](https://practicemed.org/)

## Description

The motivation behind building this app was to help Med student to pass Medical Theory test by allowing them to take mock test without having to pay for costly services out there. The app fetches questions from different sources and bundles then into a large databse of multi-choice questions. The user of the app can take a test and see result upon submission. The user can see the history off all the test he has taken within the app. In order to take a test you need to signin or create a new account. It's built using NuxtJs and AWS serverless for the backend.

## Features

- SignIn and SignUp
- Browse tests
- Take a test
- View performance stats

## Technologies Used

- VueJs/NuxtJs
- Serverless Framework (SST)
- Stripe
- TailwindUI

## Getting Started

### Prerequisites

- Node.js (version 16.x.x)
- Serverless Framework CLI (SST)
- Yarn (or you could use npm)

### Installation

1. Clone the repository:

   ```shell
      git clone https://github.com/AliakbarSu/mpt-sst.git
   ```

2. Install the dependencies:

   ```shell
       cd mpt-sst
       yarn install
   ```

### Configuration

1. Configure your aws credentials in order to deploy your backend on AWS

   ```shell
      npm run dev
   ```

   then provide your aws access key and secret key

2. In order for the application to work properly, you need to provide some configuration values, such as stripe api token, and cms api keys. You can set these values by running:

   ```shell
       npx sst secrets set [PARAMETER_NAME] [PARAMETER_VALUE]

   ```

   ```shell
      npx sst secrets set HYGRAPH_TOKEN
      npx sst secrets set AUTH0_CLIENT_SECRET
      npx sst secrets set STRIPE_SECRET
      npx sst secrets set STRIPE_SIGNING_SECRET
      npx sst secrets set SENDGRID_API_KEY
   ```

   You need to set these values for both development and production environments with e.g `npx sst secrets set HYGRAPH_TOKEN some-value --stage prod`.
   You can find the specific parameter names inside the .env.development file.

### Development

1. Start the development server (backend):

   ```shell
    npm run dev
   ```

2. Start the development server (frontend):

   ```shell
    cd packages/nuxt
    npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to see the application running.

### Usage

1. Browse available tests by creating an account first, then navigate to the dashboard section by clicking on the link in the navbar
2. To view previous tests and see the results for them, navigate to the Dashboard section and click on the specific test
