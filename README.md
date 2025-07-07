# Recipe Collection App

## 1. Project Overview  
This is a simple recipe collection app built with Next.js 15 and Convex.  
Users can **create**, **read**, **update**, and **delete** recipes, upload one image per recipe, and give each recipe a rating from 1–5.

## 2. Tech Stack  
- **Frontend:** Next.js 15 (App Router)  
- **Backend / Database:** Convex DB  
- **Styling:** Tailwind CSS  
- **Deployment:** Vercel + Convex Cloud  

## 3. Setup & Run Locally  
1. **Clone the repo**  
   ```bash
   git clone https://github.com/Max-zhou204/Recipe-Collection-App.git
   cd Recipe-Collection-App

2. Install dependencies
    npm install

3. Create your .env.local in the project root with:
    CONVEX_DEPLOYMENT=dev:industrious-gnu-916
    NEXT_PUBLIC_CONVEX_URL=https://industrious-gnu-916.convex.cloud

4. Start Convex locally (for serverless functions & storage):
    npx convex dev

5. Start Next.js
    npm run dev

## 4. Environment Variables
    Key:
        CONVEX_DEPLOYMENT	
        NEXT_PUBLIC_CONVEX_URL

## 5. Live Demo
App URL: https://recipe-collection-app-sable.vercel.app/
Convex Cloud: https://avid-albatross-878.convex.cloud

## 6. Deployment
npx convex deploy


