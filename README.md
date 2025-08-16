# ArtVault 🎨

A modern web application for discovering, collecting, and organizing artworks from the Metropolitan Museum of Art. Built with Next.js and featuring user authentication, personal collections, and advanced search capabilities.

## ✨ Features

- **🔍 Smart Search** - Advanced filtering by artist, culture, medium, and more
- **❤️ Personal Collections** - Save and organize your favorite artworks
- **📚 Search History** - Track and revisit your previous searches  
- **🔐 Secure Authentication** - Personal accounts with JWT security
- **📱 Responsive Design** - Beautiful experience on all devices
- **⚡ Fast Performance** - Optimized with Next.js and SWR

## 🚀 Live Demo

**[Visit ArtVault →](https://artvault-delta.vercel.app)**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Bootstrap 5
- **Backend APIs**: Custom User API and Sites API (Node.js/Express)
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB Atlas
- **State Management**: Jotai
- **Data Fetching**: SWR with caching
- **Deployment**: Vercel
- **External API**: Metropolitan Museum of Art Collection API

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB database (or MongoDB Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/artvault.git
cd artvault
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env.local
```

4. **Configure environment variables**
```env
NEXT_PUBLIC_API_URL=your-user-api-url
```

5. **Start development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

## 🔧 Architecture

This project uses a custom backend architecture with two main APIs:

- **User API** - Handles authentication, favorites, and search history
- **Sites API** - Manages site data and additional content
- **Frontend** - Next.js application consuming both APIs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Metropolitan Museum of Art](https://www.metmuseum.org/) for their incredible open API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for seamless deployment

## 📧 Contact

**Ajaypartap Singh Maan**
- GitHub: [@AjayMaan13](https://github.com/AjayMaan13)
- LinkedIn: [Ajaypartap Singh Maan](https://linkedin.com/in/ajaypartap-singh-maan)

---

⭐ **Star this repo if you found it helpful!**