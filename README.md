# codeway-case-fe

This project is the frontend for the Codeway case study demo.

## How to Run

To install dependencies, run:

```sh
npm install
```

To run a development instance, run:

```sh
npm run dev
```

## Project Details

This project is composed of a sign-in page and a home page for parameter
configuration. The configuration page connects to the backend and handles all
CRUD operations. The auth process is handled through the Firebase Client SDK.
There is no sign-up functionality, so please use the manually created test account.
The test account credentials are **admin@demo.com**, **admin123**.

Secrets such as Firebase account info has purposefully **not** been obscured.
You can directly run the project as is without worrying about env. variables.

This project is hosted at <https://codewayfedemo.lm.r.appspot.com>.
