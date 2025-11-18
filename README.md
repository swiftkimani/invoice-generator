# Huduma Bill - Professional Invoice Generator for Kenya

![Huduma Bill](https://img.shields.io/badge/Huduma-Bill-orange)
![Next.js](https://img.shields.io/badge/Next.js-16.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

A modern, responsive invoice generator specifically designed for Kenyan businesses. Create professional invoices with M-Pesa integration, real-time previews, and PDF export capabilities.

## ✨ Features

### 🎯 Core Features
- **Real-time Invoice Creation** - See changes instantly as you type
- **Professional Templates** - Multiple invoice templates to choose from
- **PDF Export** - Download invoices as professional PDF documents
- **M-Pesa Integration** - Built-in M-Pesa payment instructions
- **Tax Calculations** - Automatic VAT (16%) calculations for Kenya
- **Dark/Light Mode** - Toggle between dark and light themes

### 💼 Business Features
- **Client Management** - Save and manage client information
- **Service Catalog** - Quick access to frequently used services
- **Invoice Numbering** - Automatic invoice numbering system
- **Payment Tracking** - Track payment status (Pending, Paid, Failed)
- **Multi-currency** - Kenyan Shilling (KES) support

### 📱 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Live Preview** - Real-time invoice preview as you fill the form
- **Intuitive Interface** - Clean, modern, and easy-to-use design
- **Fast Performance** - Built with Next.js 16 and Turbopack

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/huduma-bill.git
   cd huduma-bill


Install dependencies
bash

npm install
# or
yarn install
# or
pnpm install

Run the development server
bash

npm run dev
# or
yarn dev
# or
pnpm dev

    Open your browser
    Navigate to http://localhost:3000

Building for Production
bash

npm run build
npm start

📋 Usage Guide
Creating Your First Invoice

    Fill Business Information

        Enter your business name, phone, email, and address

        This information will appear on all your invoices

    Add Client Details

        Enter client name and contact information

        Use the Client Manager to save frequent clients

    Describe Services

        Add service description and amount

        Apply discounts and include VAT as needed

    Choose Payment Method

        Select M-Pesa, Cash, or Bank Transfer

        M-Pesa includes automatic payment instructions

    Preview & Download

        Switch to Preview tab to see the final invoice

        Click "Download PDF" to export

Managing Clients

    Use the Client Manager in the sidebar

    Save client information for quick access

    Select saved clients to auto-fill forms

Payment Tracking

    Mark invoices as Paid, Pending, or Failed

    Track payment status in real-time

    Send payment reminders to clients

🛠 Technology Stack

    Framework: Next.js 16 with App Router

    Language: TypeScript

    Styling: Tailwind CSS

    UI Components: Custom components with Framer Motion

    PDF Generation: jsPDF + html2canvas

    Icons: Lucide React

    State Management: React Hooks (useState, useEffect)

📁 Project Structure
text

huduma-bill/
├── app/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── InvoiceForm.tsx
│   │   ├── InvoicePreview.tsx
│   │   ├── ClientManager.tsx
│   │   ├── PDFExportButton.tsx
│   │   ├── TemplateSelector.tsx
│   │   └── PaymentStatus.tsx
│   ├── hooks/
│   │   └── useInvoiceNumber.ts
│   ├── page.tsx
│   └── globals.css
├── public/
├── package.json
└── README.md

🎨 Customization
Adding New Templates

    Edit TemplateSelector.tsx:
    tsx

const templates = [
{
id: 'your-template',
name: 'Your Template',
colors: { primary: '#HEXCODE', secondary: '#HEXCODE' }
}
];

    Update InvoicePreview.tsx to handle template styles

Modifying Tax Rates

Edit the tax calculation in InvoicePreview.tsx:
tsx

const vat = data.taxEnabled ? subtotal * 0.16 : 0; // Change 0.16 to your rate

Adding Payment Methods

Update the payment methods in InvoiceForm.tsx:
tsx

<option value="new-method">New Payment Method</option>

🤝 Contributing

We welcome contributions! Please feel free to submit pull requests, report bugs, or suggest new features.
Development Workflow

    Fork the repository

    Create a feature branch (git checkout -b feature/amazing-feature)

    Commit your changes (git commit -m 'Add amazing feature')

    Push to the branch (git push origin feature/amazing-feature)

    Open a Pull Request

Code Standards

    Use TypeScript for type safety

    Follow React best practices

    Use Tailwind CSS for styling

    Ensure mobile responsiveness

    Write clean, commented code

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

    Built with Next.js

    Styled with Tailwind CSS

    Icons by Lucide

    PDF generation with jsPDF

📞 Support

If you need help or have questions:

    📧 Email: support@hudumabill.com

    🐛 Report a Bug

    💡 Request a Feature

🔄 Changelog
v1.0.0 (Current)

    Initial release

    Basic invoice creation

    PDF export functionality

    M-Pesa integration

    Client management

Made with ❤️ for Kenyan Businesses

Streamlining invoicing and payments across Kenya
text


This README.md file provides:

1. **Comprehensive overview** of the project
2. **Clear installation instructions**
3. **Detailed usage guide** with step-by-step instructions
4. **Technical documentation** for developers
5. **Customization guidelines**
6. **Contribution guidelines**
7. **Professional branding** with badges and structure

You can copy this directly into a `README.md` file in your project root. The file includes everything users and developers need to understand, install, and use your invoice generator application.

