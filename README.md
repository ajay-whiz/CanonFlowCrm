# Canon Flow CRM

A comprehensive Next.js CRM system for managing leads and payment requests with attractive UI and full API integration.

## Features

### 🎯 Lead Management
- Create, view, edit, and delete leads
- Track lead status (New, Contacted, Qualified, Lost)
- Advanced filtering and search
- Lead analytics and reporting

### 💰 Payment Requests
- Manage payment requests with full workflow
- Integration with Asana, QBO, Drive, and payment providers
- Status tracking and audit trails
- Document management

### 📊 Dashboard & Analytics
- Real-time dashboard with key metrics
- Lead conversion tracking
- Revenue analytics
- Interactive charts and graphs

### 🔗 Integrations
- Asana task management
- QuickBooks Online accounting
- Google Drive file storage
- ZenWork vendor onboarding
- Melio payment processing
- Clockify time tracking

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark/light theme support
- Intuitive navigation
- Beautiful animations and transitions

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Charts**: Recharts
- **Forms**: React Hook Form, Zod validation
- **Icons**: Lucide React
- **API**: RESTful API integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API server running on `http://localhost:8081`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd canon-flow-crm
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### API Configuration

The application is configured to connect to your API server at `http://localhost:8081`. Make sure your API server is running before starting the frontend.

#### Available API Endpoints:
- `POST /auth/login` - User authentication
- `GET /leads` - Get all leads
- `GET /leads/:id` - Get lead by ID
- `POST /leads` - Create new lead
- `PUT /leads/:id` - Update lead
- `DELETE /leads/:id` - Delete lead

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard page
│   ├── login/             # Authentication pages
│   ├── leads/             # Lead management pages
│   └── integrations/      # Integration pages
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── auth/             # Authentication components
│   ├── leads/            # Lead management components
│   ├── payment-requests/ # Payment request components
│   ├── dashboard/        # Dashboard components
│   ├── integrations/     # Integration components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and API client
├── types/                # TypeScript type definitions
└── README.md
```

## Key Components

### Authentication
- Secure login with JWT tokens
- Protected routes
- Automatic token refresh

### Lead Management
- Full CRUD operations
- Status tracking
- Advanced filtering
- Bulk operations

### Dashboard
- Real-time metrics
- Interactive charts
- Quick actions
- Recent activity

### Integrations
- Third-party service connections
- Status monitoring
- Sync management
- Error handling

## API Integration

The application uses a custom API client (`lib/api.ts`) that handles:
- Authentication with JWT tokens
- Request/response interceptors
- Error handling
- Type safety

### Example API Usage

```typescript
import { apiClient } from '../lib/api'

// Login
const response = await apiClient.login({
  email: 'admin@example.com',
  password: 'yourpassword123'
})

// Get leads
const leads = await apiClient.getLeads()

// Create lead
const newLead = await apiClient.createLead({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  company: 'Acme Corp',
  status: 'new'
})
```

## Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

### Mobile Features
- Touch-friendly interface
- Swipe gestures
- Optimized navigation
- Mobile-specific layouts

## Customization

### Theming
The application uses Tailwind CSS with a custom color palette. You can modify colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary colors
      },
      secondary: {
        // Your secondary colors
      }
    }
  }
}
```

### Adding New Features
1. Create components in the appropriate directory
2. Add API endpoints to `lib/api.ts`
3. Create custom hooks for data management
4. Add routes to the app directory

## Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8081
NEXT_PUBLIC_APP_NAME=Canon Flow CRM
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
