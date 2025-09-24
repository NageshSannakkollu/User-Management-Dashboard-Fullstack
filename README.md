### Create app and Start the project 

npx create-react-app project-name
cd project-name

npm start 

### Install dependencies 

Main Dependencies

React 18+ - Core UI development

react-toastify - Toast notifications

react-icons - Icon usage

Tailwind CSS - Utility-first CSS styling

UserService - Custom built REST API interaction service for user CRUD operations

React Router (optional) - For navigation (if applicable)


### Key Features & Scalability Considerations

Reusable components: Modular UserTable, Pagination, UserForm components promote easy maintenance and scalability.

Central user state management in Dashboard with React hooks, allowing seamless state updates shared across components.

Pagination & Searching are handled on client side for responsiveness but can be extended to server-side for big datasets.

Modal popups for Add/Edit user forms and deletion confirmation overlays the entire UI using fixed positioning and z-index.

Toast notifications for instant feedback on CRUD operations.

Tailwind CSS as styling foundation guarantees responsive, customizable UI with minimal CSS bloat.

Icon libraries for consistent, lightweight iconography.

Error handling is baked in user API interactions for reliability.

Code structure follows React best practices easing onboarding & future enhancements.







