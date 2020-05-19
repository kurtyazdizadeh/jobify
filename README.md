# jobify
A dynamic web application for job seekers who want to manage their job applications


## Technologies Used

- React.js
- React Router
- Webpack 4
- Bootstrap 4
- Node.js
- Express
- PostgreSQL
- HTML5
- CSS3
- AWS EC2


## Live Demo

Try the application live at [https://jobify.kurtyazdizadeh.com](https://jobify.kurtyazdizadeh.com)


## Features

- Users can search for a job and add it to their personal list.
- Users can manually add jobs to their personal list.
- Users can view saved jobs on a map.
- Users can rate, add notes, upload documents (resume, cover letter, letter of recommendation), and update the status of each saved job.
- Users can add notes for their resume, networking events, and general topics.
- Users can create and track goals they set for themselves (# of jobs saved, # of jobs applied to, etc.).

## Preview

![Jobify](images/demo.gif)

## Development

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/kurtyazdizadeh/jobify
    cd jobify
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```
    
3. Register for API keys here: [Adzuna](https://developer.adzuna.com/signup) and [Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key)

4. Create a ```.env``` file and add your API keys using the template below:

    ```shell
    PORT=3001
    DEV_SERVER_PORT=3000
    DATABASE_URL=postgres://dev:lfz@localhost/jobify
    SESSION_SECRET=secret
    SESSION_EXPIRY=28800000

    GOOGLE_MAPS_API=your_key_here
    ADZUNA_ID=your_id_here
    ADZUNA_KEY=your_key_here

    ```

5. Import the database to PostgreSQL.

    ```shell
    npm db:import
    ```

6. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
