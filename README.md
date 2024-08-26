# Planner App Frontend

This is the frontend of the Planner App, a task management application built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [React Query](https://tanstack.com/query/latest), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- **Task Management**: Create, edit, delete, and mark tasks as complete. Tasks include fields like date, priority, name, and completion status.
- **Pomodoro Timer**: A customizable timer to help manage work and break intervals.
- **Time Block Scheduling**: Organize tasks throughout the day with a visual schedule.

## Future Plans

- **Diary Feature**: Users will be able to write daily entries, set a mood for the day, and reflect on their experiences.
- **Enhanced Timer**: The timer will be moved to the header for constant visibility.
- **Fixing bugs**: It is necessary to find and fix all the bugs on the application.
- **Test covering**: The application will be covered with tests.

## Demo

You can open demo on [Render](https://planner-frontend-0xte.onrender.com/auth).
ATTENTION! For the demo hosting, I'm using the free plan. The first request on the server might take 1-2 minutes because it launches the server and needs some time to be ready. The following requests should be quicker.

Also, I ask you to note that this demo is the static version of the Next.js app because the free plan of the Render service doesn't allow the installation of the non-static version of the Next.js app.
I used the Render service because it needs to have the same domain for frontend and backend repos, and the free plan of the Render service provides it.
So, on this demo, it doesn't work middleware, redirects and some other features of the Next.js app (e.g., the redirect to the auth page doesn't happen when tokens are expired).

## Getting Started

First, clone the repository and install the dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the application.

You can start editing the app by modifying the app/page.tsx file. The page auto-updates as you edit the file.

## API Integration

This frontend is integrated with the backend API, which is hosted on Render and can be accessed at: [Planner App API](https://planner-backend-p4ab.onrender.com/api). The backend [repo](https://github.com/alexgerasimov73/planner-backend)

## Styling

The application is styled using [Tailwind CSS](https://tailwindcss.com/) and leverages [Tailwind Variants](https://v2.tailwindcss.com/docs/configuring-variants) for component styling.

## Deployment

The frontend is hosted on [Render](https://render.com/). The live application can be accessed at: [Planner App Frontend](https://planner-frontend-0xte.onrender.com/auth).

## Contributing

If you have suggestions for improvements or want to contribute to the project, feel free to fork the repository and create a pull request.

## Learn More

To learn more about the tools and technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn about TypeScript.
- [React Query Documentation](https://tanstack.com/query/latest/docs/overview) - Learn about React Query.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS.
