# Job Board Application

A full-stack job board platform built with Next.js and NestJS, designed to connect employers and job seekers through a modern and intuitive interface.

## 🚀 Features

- **User-Friendly Job Posting**: Easy-to-use interface for employers to post job opportunities
- **Advanced Job Search**: Filter jobs by location, type, and salary range
- **Responsive Design**: Seamless experience across all devices
- **Real-time Updates**: Instant job posting and application updates
- **Secure Authentication**: Protected routes and data security

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Mantine UI
- React Query
- Axios

### Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/bharaths002/job-board.git
cd job-board
```

2.Install Frontend Dependencies
    cd frontend
    npm install

3.Install Backend Dependencies
    cd backend
    npm install

4. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Example environment variables (DO NOT use these values in production):

   Backend (.env):
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/jobboard
   
   # JWT Configuration
   JWT_SECRET=JobBoardSecret
   JWT_EXPIRATION=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

5.Run Migrations
    npx typeorm migration:run

6.Start the development server
    npm run dev

7.Open


## 🌟 Key Features in Detail
### For Employers
- Post job openings with detailed descriptions
- Manage active job listings
- Track application statistics
- Update job status


### For Job Seekers
- Advanced search functionality
- Filter jobs by multiple criteria
- Easy application process
- Save favorite jobs


## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact
Bharath S - GitHub, Email-bharath0218@gmail.com

Project Link: https://github.com/bharaths002/job-board

## 🙏 Acknowledgments
- Mantine UI for the component library
- Next.js and NestJS communities
- All contributors who help improve this project