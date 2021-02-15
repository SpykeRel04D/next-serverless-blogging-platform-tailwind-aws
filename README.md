## First Step: Create project and add initial needed dependencies

First, create the project:

```
$ npx create-next-app amplify-next
```

Then, we have to install AWS Amplify, AWS Amplify UI React, React Simple Markdown Editor, React Markdown and UUID:

```
$ npm install aws-amplify @aws-amplify/ui-react react-simplemde-editor react-markdown uuid
```

---

We will use Tailwind:

```
npm install tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/typography
```

And we have to create the configurations files for Tailwind:

```
npx tailwindcss init -p
```

Then, we update **tailwind.config.js** to add Tailwind `typography`:

```
plugins: [
  require('@tailwindcss/typography')
],
```

Finally, replace the styles in **styles/globals.css**:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---
