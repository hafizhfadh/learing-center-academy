export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    avatarUrl?: string;
    joinDate: string;
}

export interface DashboardStats {
    totalCourses: number;
    completedLessons: number;
    hoursSpent: number;
    averageScore: number;
}

export interface Activity {
    id: string;
    type: 'lesson_complete' | 'quiz_attempt' | 'course_enroll' | 'comment';
    title: string;
    timestamp: string;
    score?: number;
    status?: 'success' | 'pending' | 'failed';
}

export interface DashboardData {
    profile: UserProfile;
    stats: DashboardStats;
    recentActivities: Activity[];
}
