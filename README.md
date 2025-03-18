# 📄 Document Signature App

## 🚀 Project Overview

This project is a **Document Signature App** that allows users to **view, sign, and manage digital documents** (PDF and DOCX). It provides an intuitive UI for adding and placing signatures on documents, storing signed copies, and managing document history.

## 🛠️ Features

- **View Documents** (Supports **PDF** and **DOCX** formats)
- **Append Digital Signatures** with draggable placement
- **Save Signed Documents** for future reference
- **Signature Drawing Canvas** (with clear and save options)
- **Local File Upload Support** for signing
- **Document Preview with Cover Images**
- **Responsive UI** for desktop and mobile

## 🏗️ Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS
- **Libraries:**
  - `pdf-lib` (For handling PDF modifications)
  - `react-pdf-viewer` (For viewing PDFs)
  - `react-doc-viewer` (For viewing DOCX files)
  - `framer-motion` (For animations)
  - `react-draggable` (For draggable signature placement)
  - `sonner` (For toasts/notifications)

## 📂 Project Structure

```
📁 src/
 ├── components/      # Reusable UI components
 ├── pages/           # App pages (Signature, Profile, Home, etc.)
 ├── hooks/           # Custom hooks for API interactions
 ├── services/        # API services and integrations
 ├── utils/           # Helper functions
 ├── assets/          # Static assets (images, icons, etc.)
```

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone
cd interview
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start Development Server

```sh
npm run dev
```

## 📝 Usage Instructions

### **Uploading a Document**

1. Click the **Upload Document** button.
2. Select a **PDF** or **DOCX** file.
3. The document will be displayed in the viewer.

### **Signing a Document**

1. Click **Edit Signature** to draw a new signature.
2. Save the signature and **drag it** to the desired position.
3. Click **Confirm Placement** to save the signed document.

### **Managing Signed Documents**

- Signed documents are saved and listed under the **Recent Documents** section.
- Users can download, delete, or re-sign documents.

## 🚀 Deployment

### **Deploying to Vercel**

1. **Login to Vercel**

```sh
vercel login
```

2. **Deploy the project**

```sh
vercel
```

## 📌 Troubleshooting

- **PDF not loading?** Ensure the file is a valid PDF and properly fetched.
- **Signature not appearing?** Try clearing the signature and re-drawing it.
- **Local files not displaying?** Browser security restrictions may block direct file access. Try using the file upload feature.

## 📜 License

This project is **MIT Licensed**. Feel free to modify and use it as needed!

## 🙌 Acknowledgements

Special thanks to **React-PDF**, **pdf-lib**, and **DocViewer** for making document handling in React seamless!
