# AI Agent System Documentation

## 1. Project Overview

This document provides a comprehensive analysis of the **Learning Center Academy** AI Agent System, covering both the **Laravel Backend** architecture and the **React Frontend** integration.

### 1.1 System Architecture
The application operates as a decoupled SaaS platform:
- **Backend (Brain)**: Laravel 12 API handling Agent logic, LLM processing, and database state.
- **Frontend (Interface)**: React 19 + Vite + Bun providing the user interaction layer.
- **Communication**: REST API & WebSockets (Reverb) for real-time agent feedback.

### 1.2 Core Domain Models (Shared Context)
Both Frontend and Backend must align on these core domain definitions:

1.  **Content Management**
    -   `Institution`: Multi-tenant root.
    -   `LearningPath`: Structured curriculum containers.
    -   `Course`: Individual courses belonging to paths.
    -   `Lesson` / `LessonSection`: Atomic learning units.
    -   `Task` / `TaskQuestion`: Assessment logic.

2.  **User Management & Access**
    -   `User`: Students, Teachers, Admins.
    -   `Enrollment`: Links Users to LearningPaths/Courses.
    -   `Role`/`Permission`: RBAC via Filament Shield.

3.  **Progress Tracking**
    -   `ProgressLog`: Records user activity and completion.
    -   `TaskSubmission`: Stores assessment results.

---

## 2. Backend Agent Architecture (Service Layer)

The AI Agent System is designed as an **Event-Driven, Asynchronous Service Layer** within Laravel.

### 2.1 Core Components

| Component | Responsibility |
| :--- | :--- |
| **Agent Interface** | Defines the contract (`handle()`, `describe()`) for all agents. |
| **Agent Registry** | Service container binding to resolve agents by name/context. |
| **LLM Gateway** | A unified Facade (`App\Services\AI\LLMService`) to abstract providers (OpenAI, Anthropic). |
| **Context Manager** | Retrieval system (RAG) to fetch relevant `Lesson` or `ProgressLog` data. |
| **Action Bus** | Dispatches resulting actions (e.g., "Create Lesson", "Send Notification"). |

### 2.2 Data Flow (Backend)
Agents communicate primarily via **Laravel Events and Queues** to ensure non-blocking performance.

1.  **Event Trigger**: User action (e.g., `LessonCompleted`) fires an Event.
2.  **Listener Dispatch**: An Event Listener identifies relevant Agents and dispatches a `ProcessAgentTask` Job.
3.  **Execution**: The Job invokes the Agent. The Agent queries the `LLMService`.
4.  **Result**: The Agent performs side-effects (DB updates) or broadcasts a result via WebSockets.

---

## 3. Frontend Integration Architecture (Interaction Layer)

The frontend communicates with the backend Agents through a structured API layer, focusing on **responsiveness** and **optimistic UI updates**.

### 3.1 Core Agent Interactions

| Agent Name | Frontend Component | Target Audience | Interaction Pattern |
| :--- | :--- | :--- | :--- |
| **Tutor Bot** | `<TutorChatWidget />` | **Students** | **Conversational**: WebSocket/SSE for streaming responses. |
| **Personalization Engine** | `<StudentDashboard />` | **Students** | **Passive**: Fetches pre-computed recommendations via API. |
| **Curriculum Architect** | `<CourseWizard />` | **Teachers/Admins** | **On-Demand**: Async request/response to generate/validate content. |

### 3.2 Data Flow & API Contracts
The frontend consumes these backend endpoints:

1.  **Tutor Bot**
    *   `POST /api/agents/tutor/chat`: Send message, receive streaming response.
    *   `GET /api/agents/tutor/history/{lessonId}`: Load previous conversation context.

2.  **Personalization Engine**
    *   `GET /api/agents/recommendations`: Retrieve `next_suggested_content_ids` based on `ProgressLog`.

3.  **Curriculum Architect** (Teacher Portal)
    *   `POST /api/agents/curriculum/analyze`: Analyze course structure.
    *   `POST /api/agents/curriculum/generate-quiz`: Generate `TaskQuestions` from `Lesson` content.

---

## 4. Agent Specifications

### 4.1 Curriculum Architect Agent
*   **Role**: Assists instructors in course creation.
*   **Responsibilities**: Suggest lesson structures, generate quiz questions, audit content.
*   **Trigger**: `CourseUpdated`, `LessonCreated` events (Backend) / `<CourseWizard />` actions (Frontend).

### 4.2 Personalization Engine Agent
*   **Role**: Adapts the learning path for students.
*   **Responsibilities**: Analyze gaps, recommend remedial content, adjust difficulty.
*   **Trigger**: `TaskSubmissionCreated` (Backend) / Dashboard Load (Frontend).
*   **Algorithm**: Input (Scores + Topics) -> Process (Compare vs Global) -> Output (Content IDs).

### 4.3 Tutor Bot (Interactive)
*   **Role**: Provides real-time help to students.
*   **Responsibilities**: Answer questions, clarify concepts.
*   **Trigger**: Direct API call `POST /api/agents/tutor/chat`.

---

## 5. Technical Implementation Details

### 5.1 Backend Implementation (Laravel)
**Directory Structure**:
```text
app/
├── Agents/
│   ├── Contracts/
│   ├── Curriculum/
│   ├── Student/
│   └── BaseAgent.php
├── Services/
│   └── AI/
│       ├── LLMService.php
│       └── Drivers/
```

**Queue Config**:
*   Queue Name: `ai_processing`
*   Worker: `php artisan queue:work --queue=ai_processing --timeout=120`

### 5.2 Frontend Implementation (React/Bun)
**Directory Structure**:
```text
src/
├── features/
│   └── ai/
│       ├── components/ (TutorChatWindow.tsx, etc.)
│       ├── hooks/ (useTutorAgent.ts, etc.)
│       ├── api/ (agents.api.ts)
│       └── types/
```

**State Management**:
*   Use **TanStack Query** for async data fetching and mutations.
*   Use **Optimistic Updates** for chat interfaces to ensure zero-latency feel.

### 5.3 Development Environment
*   **Backend**: Ensure `OPENAI_API_KEY` is set in `.env`.
*   **Frontend**: Ensure `VITE_API_URL` points to your local Laravel instance (e.g., `http://localhost:8000/api`).
*   **Runtime**: Use `bun run dev` for the frontend.

---

## 6. Testing Strategy

### 6.1 Backend Testing
*   **Unit**: Mock `LLMService` to test Agent logic without API costs.
*   **Integration**: Test `Event -> Job -> Agent` pipeline.

### 6.2 Frontend Testing
*   **Mocking**: Mock `agents.api.ts` responses.
*   **UI States**: Test `idle`, `loading`, `success` (streaming), and `error` states.
*   **Safety**: Verify Markdown rendering prevents XSS.

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
