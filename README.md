# 🎬 React Movie Discovery App

A modern, responsive movie exploration application built with **React (Vite)** and **Tailwind CSS**. This app allows users to browse popular movies, search for specific titles, filter by genre, and manage a personal list of favorite movies.

Data is fetched dynamically using [The Movie Database (TMDB) API](https://www.themoviedb.org/).

## ✨ Features

* **🔥 Popular Movies:** Displays a grid of currently popular movies on the homepage.
* **🔍 Real-time Search:** Search functionality to find movies by title.
* **📂 Genre Filtering:** Dropdown menu to filter movies by categories (Action, Comedy, Drama, etc.).
* **ℹ️ Movie Details:** Click on any movie to view full details (Overview, Rating, Release Date, Runtime).
* **❤️ Favorites System:** Add or remove movies from your "Favorites" list.
* **💾 Local Storage:** Favorites are saved to the browser's local storage, so they persist even after refreshing.
* **📱 Fully Responsive:** Optimized for mobile, tablet, and desktop using Tailwind CSS.

## 🛠️ Tech Stack

* **Frontend Library:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **State Management:** React Context API
* **API:** TMDB (The Movie Database)
* **Icons:** React Icons / Heroicons (via SVGs)

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
Make sure you have **Node.js** installed on your machine.

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up the API Key**
    * This project uses the TMDB API.
    * Create a file named `.env` in the root directory.
    * Add your API key (or use the one provided in `api.js` for testing):
    ```env
    VITE_API_KEY=your_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📸 Screenshots

| Home Page | Movie Details |
|:---------:|:-------------:|
| *(Add Screenshot Here)* | *(Add Screenshot Here)* |

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed by [Your Name]**
