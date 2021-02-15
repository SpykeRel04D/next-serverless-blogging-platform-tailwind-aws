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

```graphql
mutation createPost {
	createPost(input: { title: "My first post", content: "Hello World!" }) {
		id
		title
		content
	}
}
```

And run it.

_If we have published successfully our Schema, we are gonna see that we have the "createPost", etc.._

After this, we can create a **query** to get a list of our posts:

```graphql
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

---

## Fifth Step: Print the previously created posts on screen

At this, we just have to fetch the data using our created query **listPosts** of GraphQL API and render it.
This step is available on the commit: [Fetch and Render](https://github.com/SpykeRel04D/next-serverless-blogging-platform-tailwind-aws/commit/0fbf57a2a501a6a63f520ebcd26e77e858319fad)

---

## Sixth Step: Adding authentication (Amazon Cognito)

We are gonna start by adding **auth** on the project:

```
$ amplify add auth
```

_This is gonna ask about what type of auth do we want to add (in this case, we gonna select default without Social)_

```
$ amplify push --y
```

With this installed, we are gonna create profile view into our pages directory.
Also, we want to set into blue all the amplify UI elements (we can do this by modifying **globals.css**).
Finally, we will add some routing into our **\_app.js** (A simple nav a global stying div for all the future rendered components).

Now we can SignUP and SingIN into our website and check the Profile Page of the user.
This step is available on the commit: [Auth System](https://github.com/SpykeRel04D/next-serverless-blogging-platform-tailwind-aws/tree/b5af102766e622f8a9857b52604e06b7930f2857)

---

## Seventh Step: API Authorization (Authorize actions based on Signed user)

Run an update of amplify api:

```
$ amplify update api
```

And we are gonna select **GraphQL** and **Update auth settings**. Then choose **API Key** and use some placeholder like: "public".
Then, expire time for example **365**, but now select yes on **Configure auth types?** and select `Amazon Cognito User Pool`.

After this, we have to update our GraphQL Scheme on /amplify/backend/api/NextBlog/schema.graphql.
The main idea, is to add an Auth into our created `type Post @model`.

After updating it, it should looks like this:

```graphql
type Post
	@model
	@key(
		name: "postsByUsername"
		fields: ["username"]
		queryField: "postsByUsername"
	)
	@auth(
		rules: [
			{ allow: owner, ownerField: "username" }
			{ allow: public, operations: [read] }
		]
	) {
	id: ID!
	title: String!
	content: String!
	username: String
}
```

As always, after modify any that involves our Amplify enviroment, we have to push it:

```
$ amplify push --y
```

---

## Eighth Step: Adding form to create posts

We are gonna create a new page inside **pages** named `create-post.js`.
The main idea of this page is to handle a form input that on submit should call the query `createPost` from the **GraphQL API**.

After this, we are gonna create a new folder called **posts** inside pages (/pages/posts).
Inside here, we have to create a dynamic route file: **[id].js**.
This dynamic route file, is the main body of the posts. It's important to see that is handles the **getStaticPaths** and **getStaticProps**.

In order to finish this step we have to add an author section inside our index.js

Now, we can remove from our DB the previous created posts (since they don't have author), and we can test our current application.

This step is available on the commit: [Create Posts]()
