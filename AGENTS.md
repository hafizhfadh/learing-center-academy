
---

## 7. UI/UX Standards

### 7.1 Design Philosophy
The interface is designed to be **professional yet welcoming**, specifically tailored for users from Muslim-majority countries. It incorporates culturally appropriate design elements, Right-to-Left (RTL) support considerations, and a balance between modern professionalism and warm hospitality.

### 7.2 Color Palette
The project follows a specific color scheme inspired by Islamic art and modern design principles:

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Deep Blue** | `#1E40AF` | Primary actions, branding, headers. Symbolizes depth, stability, and intelligence. |
| **Sky Blue** | `#38BDF8` | Secondary actions, highlights, links. Represents openness and clarity. |
| **Amber** | `#F59E0B` | Accents, warnings, call-to-actions. Adds warmth and energy. |
| **Slate 50** | `#F8FAFC` | Backgrounds. Provides a clean, light, and airy foundation. |
| **Slate 900** | `#0F172A` | Text, headings. Ensures high readability and contrast. |

### 7.3 Component Library
*   **Library**: `shadcn/ui` (built on Radix UI and Tailwind CSS).
*   **Styling**: Tailwind CSS with custom configuration matching the palette above.
*   **Typography**: Clean sans-serif fonts with good RTL support (e.g., Inter, Noto Sans Arabic).

### 7.4 Accessibility & Internationalization
*   **RTL Support**: Layouts must support `dir="rtl"` (e.g., using logical properties like `ms-` (margin-start) instead of `ml-`).
*   **Contrast**: Ensure text meets WCAG AA standards.
*   **Validation**: Forms use Zod for strict validation and user-friendly error messages.
