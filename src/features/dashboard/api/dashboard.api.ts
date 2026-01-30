import type { DashboardData } from '../types';

// Mock data
const MOCK_DATA: DashboardData = {
    profile: {
        id: 'u1',
        name: 'Ahmed Hassan',
        email: 'ahmed@example.com',
        role: 'student',
        joinDate: '2023-09-01',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed'
    },
    stats: {
        totalCourses: 4,
        completedLessons: 28,
        hoursSpent: 42.5,
        averageScore: 88
    },
    recentActivities: [
        {
            id: 'a1',
            type: 'lesson_complete',
            title: 'Introduction to Islamic History',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
            status: 'success'
        },
        {
            id: 'a2',
            type: 'quiz_attempt',
            title: 'Arabic Grammar Basics Quiz',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            score: 92,
            status: 'success'
        },
        {
            id: 'a3',
            type: 'course_enroll',
            title: 'Advanced Tajweed Rules',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            status: 'success'
        },
        {
            id: 'a4',
            type: 'lesson_complete',
            title: 'Fiqh of Purification',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
            status: 'success'
        }
    ]
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardApi = {
    getDashboardData: async (): Promise<DashboardData> => {
        await delay(1000); // Simulate network latency
        return MOCK_DATA;
    },

    getProfile: async () => {
        await delay(500);
        return MOCK_DATA.profile;
    },

    getStats: async () => {
        await delay(600);
        return MOCK_DATA.stats;
    },

    getActivities: async () => {
        await delay(800);
        return MOCK_DATA.recentActivities;
    }
};
