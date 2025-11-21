# Huduma Bill - Professional Invoice Generator for Kenya

![Huduma Bill](https://img.shields.io/badge/Huduma-Bill-orange)
![Next.js](https://img.shields.io/badge/Next.js-16.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

A modern, responsive invoice generator tailored for Kenyan businesses. Create professional invoices with M-Pesa integration, live previews, and PDF export.

---

## ✨ Features

### Core Features

* **Real-time Invoice Creation** – Updates as you type.
* **Professional Templates** – Multiple invoice templates.
* **PDF Export** – Download invoices as PDF documents.
* **M-Pesa  Integration** – Built-in payment instructions.
* **Automatic VAT** – 16% tax calculations for Kenya.
* **Dark/Light Mode** – Toggle themes.

### Business Features

* **Client Management** – Save and manage client data.
* **Service Catalog** – Quick access to services.
* **Invoice Numbering** – Automatic numbering system.
* **Payment Tracking** – Track Pending, Paid, or Failed invoices.
* **Multi-currency** – Kenyan Shilling (KES) support.

### User Experience

* **Responsive Design** – Optimized for desktop, tablet, and mobile.
* **Live Preview** – Real-time invoice preview.
* **Intuitive Interface** – Clean and easy-to-use design.
* **Fast Performance** – Built with Next.js 16 and Turbopack.

---

## 🚀 Quick Start

### Prerequisites

* Node.js 18.17 or later
* npm, yarn, or pnpm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/huduma-bill.git
cd huduma-bill
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## 📋 Usage Guide

### Creating Your First Invoice

1. **Business Information** – Enter your business name, phone, email, and address.
2. **Client Details** – Enter client information or select a saved client.
3. **Services** – Add service description, amount, discounts, and VAT.
4. **Payment Method** – Choose M-Pesa, Cash, or Bank Transfer.
5. **Preview & Download** – Switch to Preview tab and click "Download PDF".

### Managing Clients

* Use Client Manager to save, edit, or auto-fill client details.

### Payment Tracking

* Mark invoices as Paid, Pending, or Failed.
* Track payment status in real-time.
* Send payment reminders.

---

## 🛠 Technology Stack

* **Framework**: Next.js 16 with App Router
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **UI Components**: Custom components with Framer Motion
* **PDF Generation**: jsPDF + html2canvas
* **Icons**: Lucide React
* **State Management**: React Hooks (useState, useEffect)

---

## 📁 Project Structure

```
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
```

---

## 🎨 Customization

### Adding New Templates

Edit `TemplateSelector.tsx`:

```ts
const templates = [
  { id: 'custom-template', name: 'Custom Template', colors: { primary: '#HEX', secondary: '#HEX' } }
];
```

Update `InvoicePreview.tsx` to apply template styles.

### Modifying Tax Rates

Edit VAT calculation in `InvoicePreview.tsx`:

```ts
const vat = data.taxEnabled ? subtotal * 0.16 : 0; // Change 0.16 to your rate
```

### Adding Payment Methods

Edit `InvoiceForm.tsx`:

```ts
<option value="new-method">New Payment Method</option>
```

---

## 🤝 Contributing

* Fork the repository
* Create a feature branch (`git checkout -b feature/new-feature`)
* Commit your changes (`git commit -m "Add new feature"`)
* Push and open a Pull Request

**Code Standards**

* Use TypeScript
* Follow React best practices
* Ensure mobile responsiveness
* Clean and commented code

---

## 📄 License

MIT License – see the LICENSE file.

---

## 🙏 Acknowledgments

* Built with Next.js
* Styled with Tailwind CSS
* Icons by Lucide
* PDF generation with jsPDF

---

## 📞 Support

* Email: [support@hudumabill.com](mailto:support@hudumabill.com)
* Report a bug or request features via GitHub issues

---

## 🔄 Changelog

**v1.0.0**

* Initial release
* Basic invoice creation
* PDF export
* M-Pesa integration
* Client management

---

Made with ❤️ for Kenyan Businesses. Streamlining invoicing and payments across Kenya.
