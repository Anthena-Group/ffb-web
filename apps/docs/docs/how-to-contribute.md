# How to Contribute

Thank you for your interest in contributing to the **Formik Form Builder** project!   
Follow the steps below to set up the project and start contributing.

---

## 1. Clone the Repository

Use the following command to clone the repository to your local machine:

```bash
git clone https://github.com/Anthena-Group/ffb-web.git
```
---
## 2. Navigate to the Project Folder

```bash
cd ffb-web

```
---

## 3. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed. Then install the project dependencies by running:

```bash
pnpm install
```
---

## 4. Run the Project Locally

To start contributing, run both the example app and the documentation site locally.

### a. Start the React Examples App

This runs the React application that shows live examples of components like `TextInput`,`usernameInput` etc.

```bash
cd apps/examples
pnpm dev
```
---

### b. Start the Docusaurus Docs Site

In a **new terminal window or tab**, run the documentation site:

```bash
cd apps/docs
pnpm start
```
---

## 5. Make Your Contribution

Once both the example app and docs site are running:

- Navigate to the respective folders inside the `apps` directory:
  - `apps/examples`: For React example components
  - `apps/docs`: For Docusaurus documentation files

- You can add or modify components, create examples, or write documentation.

Make sure to follow the folder structure and naming conventions used in the project.

 Example: To add a new form field component, you might:
- Add a React demo in `apps/examples/src/Demo/`
- Add documentation in `apps/docs/docs/components/`
- Update the sidebar in `apps/docs/sidebars.ts`

---
---

## 6. Commit and Push Your Changes

Once you've made your changes, follow these steps to commit and push your work:

### Stage all your changes
`git add .`

### Commit with a meaningful message
`git commit -m "Added new component and updated documentation"`

### Push to your branch
`git push origin your-branch-name`
