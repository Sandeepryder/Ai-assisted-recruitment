# 🧠 AI-Assisted Recruitment Backend (NestJS + Prisma + PostgreSQL)

## 📋 Overview
This module adds **AI-Assisted Recruitment** features to the HRMS system.  
It includes **resume parsing, scoring, interview scheduling, feedback collection, and recruitment metrics**, all powered by **local AI logic (no external APIs)**.

---

## ⚙️ Setup & Run Instructions (Step-by-Step)

### 🧩 0. Prerequisites
Ensure the following are installed and running:
- **Node.js** ≥ 18  
- **npm** ≥ 9  
- **PostgreSQL** (local or cloud)
- **NestJS CLI** (`npm install -g @nestjs/cli`)

---

### 🧱 1. Clone the Project
```bash
git clone https://github.com/Sandeepryder/Ai-assisted-recruitment.git
cd ai-assisted-recruitment-backend




# for prisma/

npx prisma migrate dev --name init       # this is use for run model in database !!
npx prisma migrate reset                # this is use for reset your database !!



npx prisma migrate dev --name recruitment_init_with_password
npx prisma generate
npx prisma studio
npm run start:dev