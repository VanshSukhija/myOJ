
# myOJ - Online Judge

myOJ is an Online Judge and Coding Contest organising platform. This project is an attempt to gather the features and positives from different coding platforms, like - LeetCode, CodeForces and CodeChef, in one platform.

The feature of extensive blogging and contest participation from CodeForces is merged with data intensive features of user and problem data from LeetCode including the charts from CodeChef with a three-column multicolor design for every tab.

Docker has been used for containerizing the user submission part ensuring secure running and judging of codes.

Script for judging user submissions is totally self written and no external APIs are used.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - mysql database connection string (starting from `mysql://`) consisting of hostname, port number, database name, username and password

`NEXT_PUBLIC_MYSQL_HOST` - database hostname

`NEXT_PUBLIC_MYSQL_PORT` - database port number

`NEXT_PUBLIC_MYSQL_DATABASE` - database name

`NEXT_PUBLIC_MYSQL_USER` - mysql username

`NEXT_PUBLIC_MYSQL_PASSWORD` - mysql connection password

`NEXT_PUBLIC_GITHUB_APP_CLIENT_ID` - client ID for auth through github

`NEXT_PUBLIC_GITHUB_APP_SECRET_ID` - secret ID for auth through github

`NEXT_PUBLIC_GOOGLE_CLIENT_ID` - client ID for auth through google

`NEXT_PUBLIC_GOOGLE_CLIENT_SECRET` - secret ID for auth through google

`NEXT_PUBLIC_AUTH_SECRET` - secret ID used by NextAuth

`NEXT_PUBLIC_AUTH_URL` - callback url used by NextAuth

`NEXT_PUBLIC_API_URL` - API url for fetch calls to backend


## Run Locally
To run this project locally, ensure you have `Docker` installed on your machine and the engine is active and started.

Clone the project

```bash
  git clone https://github.com/VanshSukhija/myOJ
```

Go to the project directory

```bash
  cd myOJ
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Screenshots
### Database Model
![sql-diagram](https://github.com/user-attachments/assets/0092eef1-3a07-4f83-b35d-e4f2a56ca9f0)

### Problemset
![problem-description](https://github.com/user-attachments/assets/e6179feb-6a68-42ff-baa2-2dc7a8305b45)

![problem-submissions-1](https://github.com/user-attachments/assets/e0d7ea69-784f-4859-af8f-c66c1b105a78)

![problem-submissions-2](https://github.com/user-attachments/assets/8e7482e0-8a79-4a20-aa37-d76faf093981)

![problem-ide-1](https://github.com/user-attachments/assets/310eb0af-63a7-4237-87af-5c3a64c5f5e4)

![problem-ide-2](https://github.com/user-attachments/assets/9be3227d-d7e2-4bbc-9619-e98824a9d8e7)

### Contest
![contest-announcement](https://github.com/user-attachments/assets/7dd78b3b-6cdc-4806-b54d-0fe7b6961506)

![contest-problems](https://github.com/user-attachments/assets/29fb722f-9365-4e5a-acaf-cb3119356517)

![contest-standings](https://github.com/user-attachments/assets/906ef036-bc1a-418c-b5db-fea97748223f)

### Blogs & Comments
![blogs-description](https://github.com/user-attachments/assets/c15a7c8b-dccb-474c-8bfd-e5279e463198)

![blogs-comments](https://github.com/user-attachments/assets/475961d3-1194-4b08-8edc-f2754369d5c5)

### Create Contests & Problems
![create-contest](https://github.com/user-attachments/assets/f903428d-d11c-411b-a72b-6e94eef18cc2)

![create-problem](https://github.com/user-attachments/assets/ffa50812-5995-4b7d-b397-e87eb4881cf3)

### User Profile
![profile-charts](https://github.com/user-attachments/assets/b6e5e034-01a8-4bb2-b300-f6273becc927)

