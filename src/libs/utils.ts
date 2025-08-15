import { auth } from "@clerk/nextjs/server";

export const checkRole = async () => {
    const {sessionClaims} = await auth();
    return (sessionClaims?.metadata as { role: string })?.role;
}

export const checkCurrentId = async () => {
    const {userId} = await auth();
    return userId;
}

const currentWorkWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    if(dayOfWeek === 0) {
        startOfWeek.setDate(today.getDate() + 1);
    }
    if(dayOfWeek === 6) {
        startOfWeek.setDate(today.getDate() + 2);
    }
    else {
        startOfWeek.setDate(today.getDate() - dayOfWeek + 1);
    }
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4);
    endOfWeek.setHours(23, 59, 59, 999);
    return startOfWeek
}

export const adjustScheduleToCurrentWeek = (lessons: {title: string, start: Date, end: Date}[]):{title: string, start: Date, end: Date}[] => {
    const startOfWeek = currentWorkWeek();
    
    return lessons.map((lesson) => {
        const lessonDayOfWeek = lesson.start.getDay();
        const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;
        
        const adjustedStartDate = new Date(startOfWeek);
        adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
        adjustedStartDate.setHours(lesson.start.getHours(), lesson.start.getMinutes(), lesson.start.getSeconds());
        
        // Calculate duration and add it to start date
        const duration = lesson.end.getTime() - lesson.start.getTime();
        const adjustedEndDate = new Date(adjustedStartDate.getTime() + duration);
        
        return {
            title: lesson.title,
            start: adjustedStartDate,
            end: adjustedEndDate
        };
    });
};