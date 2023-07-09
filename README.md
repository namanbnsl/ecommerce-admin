# Ecommerce Admin

An easy way to build ecommerce stores fast.

# Getting Started

### Prerequisites

You will need to [install docker](https://www.docker.com/) on your local machine.

### Installation

To get started with Ecommerce Admin locally, follow these steps

1. Get a local copy of your repo
   ```sh
    git clone https://github.com/coding1101/ecommerce-admin
   ```
2. Navigate to the project directory

   ```sh
   cd ecommerce-admin
   ```

3. Install NPM packages(We suggest using `pnpm`)
   ```sh
   pnpm install
   ```
4. Start a docker container for the database.
   ```sh
   docker-compose up
   ```
5. Copy `.env.example` file and rename it to `.env` and edit the values. Keep the `DATABASE_URL` the same unless you changed the `docker-compose.yml` file.

6. Once your database is ready, push your schema to the database.
   ```sh
   pnpm db:deploy
   ```
7. Finally start your dev server.
   ```sh
   pnpm dev
   ```

Open your browser and visit http://localhost:3000 to see the application running.

## How to Contribute

### Working on New Features

If you want to work on a new feature, follow these steps.

1. fork the repo
2. clone your fork
3. checkout a new branch
4. do you work,
5. commit
6. push your branch to your fork
7. go into github UI and create a PR from your fork & branch, and merge it into upstream MAIN

### Pulling in changes from upstream

You should pull in the changes that we add in daily, preferably before you checkout a new branch to do new work.

1. git checkout main
2. git pull upstream main
