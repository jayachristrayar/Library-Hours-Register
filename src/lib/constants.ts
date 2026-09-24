export const REASONS = ["Attendance Shortage","Disciplinary Action","Exam Preparation","Faculty Assigned Library Hour","Not Attended College Trip","Research Hours","Assignment","Under Suspension","Compensatory Hour","Others"] as const;
export const HOURS_STATUSES = ["Ongoing","Completed"] as const;
export const REPORT_STATUSES = ["Not Issued","Issued","With Student","Faculty Took"] as const;
export type Role = "SUPER_ADMIN" | "LIBRARY_STAFF" | "PHD_SCHOLAR";
export type Location = "A_BLOCK" | "B_BLOCK" | "ALL";
