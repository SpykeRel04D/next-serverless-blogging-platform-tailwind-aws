# NextJS Serverless Blogging Platform using AWS and Tailwind

## First Step: Create project and add initial needed dependencies

First, create the project:

```bash
$ npx create-next-app amplify-next
```

Then, we have to install AWS Amplify, AWS Amplify UI React, React Simple Markdown Editor, React Markdown and UUID:

```bash
$ npm install aws-amplify @aws-amplify/ui-react react-simplemde-editor react-markdown uuid
```

---

We will use Tailwind:

```bash
$ npm install tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/typography
```

And we have to create the configurations files for Tailwind:

```bash
$ npx tailwindcss init -p
```

Then, we update **tailwind.config.js** to add Tailwind `typography`:

```js
plugins: [
  require('@tailwindcss/typography')
],
```

Finally, replace the styles in **styles/globals.css**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Second Step: Configure and Install AWS CLI + GraphQL API

-   AWS Amplify DOCS: https://docs.amplify.aws/

Here you can click in "Get Started for Free" and follow the instructions in order to install de CLI.

Summary:

```bash
$ npm install -g @aws-amplify/cli
$ amplify configure
```

After this, we have to Initialize Amplify:

```bash
$ amplify init
```

We can left all by default, except the **Source Directory Path:** that we should change it to `.` and the **Distribution Directory Path:** to `.next`.

At this point, we are ready to add the **Amplify API** (selecting in our case `GraphQL`):

```bash
$ amplify add api
```

On the options, we select **API key** and **Single object with fields** (The other ones, we can just let them by default and select **NO** on the advanced settings).

_Now we can found our **GraphQL** API inside /amplify/backend/api/NextBlog_

In this point, we are gonna edit the schema to the following:

```js
type Post @model {
  id: ID!
  title: String!
  content: String!
}
```

To **publish** the API, use:

```bash
$ amplify push
```

The options should be: `Yes`, `Yes`, `Javascript`, `./graphql/**/*.js`, `Yes`.

_To verify that the GraphQL API has been created successfully, check /aws-exports.js and make sure there is GraphQL endpoint._

---

## Third Step: Create our two first posts

First of all, let's open our GraphQL API to be able to edit our data:

```bash
$ amplify console api
```

And here, select **GraphQL** (This will open a UI of the GraphQL in our browser).

To start, we are gonna create a couple mutations (for the second one, we can just create "My second post"):

```js
mutation createPost {
  createPost(input: {
    title: "My first post",
    content: "Hello World!"
  }) {
    id
    title
    content
  }
}
```

And run it.

_If we have published successfully our Schema, we are gonna see that we have the "createPost", etc.._

After this, we can create a **query** to get a list of our posts:

```js
query listPosts {
  listPosts {
    items {
      id
      title
      content
    }
  }
}
```

_We can go to "Data Sources" on the left menu, and check on DynamoDB that we have our two created posts_

---

## Fourth Step: Create an easy and fast way to import our Amplify

On our project root (/), create a file name `configureAmplify.js`, and put the following content:

```js
import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);
```

Now, we can import this file everywhere were we need it. For example, we can start by importing it on our `_app.js` file.
