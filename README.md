# Job Portal App with MERN Stack

A comprehensive job portal application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows users to browse job listings, apply for jobs, and manage their applications seamlessly.
![Screenshot 2024-10-28 050115](https://github.com/user-attachments/assets/75c29190-6b49-471f-bd5b-c54cc68bc153)


## Features

- **User Authentication:** Secure authentication using JWT (JSON Web Tokens) for both job seekers and employers.
 ![Screenshot 2024-10-28 050133](https://github.com/user-attachments/assets/389433f3-4d07-4706-bc95-a7af82323d59)
- **Job Listings:** Browse through a wide range of job listings fetched from MongoDB.
 ![Screenshot 2024-10-28 050619](https://github.com/user-attachments/assets/9d35ec94-ba7b-4af5-a84f-f64858647b4a)
- **Application Management:** Job seekers can manage their job applications, and employers can view and manage received applications.
- **Responsive Design:** Ensures a seamless experience across all devices.

## Technologies Used

- **Frontend:** React.js, React Router, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens), Bcrypt (for password hash)
- **Image Upload:** Cloudinary for storing and managing uploaded images
- **Deployment:** Vercel (frontend), Render(backend), MongoDB Atlas (database)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed on your machine with latest version or v22.2.0 above
- MongoDB Atlas account (or local MongoDB server)
- Cloudinary account for image storage

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/pathakshivansh64/Jobapp.git
   ```
2. Install NPM packages:
   ```sh
   cd jobapp
   cd backend
   npm install
   cd..
   cd frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `config.env` file after creating a `config folder` in the backend directory, containing the following variables:
   ```env
    MONGODB_URI=
    DB_NAME=
    PORT=
    jwtsecret=
    cloud_name= 
    api_key=
    api_secret=
    Frontend_URL=
    ClientID=
    ClientSecret=
   ```

   Replace each value with your specific configuration details.

4. Run the application:
   ```sh
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request (`we will merge within 24 hour`)

## Please give a star to the repository if you like it.

## Contact

Shivansh Pathak - [GitHub](https://github.com/pathakshivansh64)

Project Link: [https://github.com/pathakshivansh64/Jobapp.git](https://github.com/pathakshivansh64/Jobapp.git)
