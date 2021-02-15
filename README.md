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

## Second Step: Configure and Install AWS CLI

-   AWS Amplify DOCS: https://docs.amplify.aws/

Here you can click in "Get Started for Free" and follow the instructions in order to install de CLI.

Summary:

```
$ npm install -g @aws-amplify/cli
$ amplify configure
```

After this, we have to Initialize Amplify:

```
$ amplify init
```

We can left all by default, except the **Source Directory Path:** that we should change it to `.` and the **Distribution Directory Path:** to `.next`.

---
