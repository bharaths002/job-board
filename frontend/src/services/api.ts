interface APIJob {
    id: number;
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    salaryMin: number;
    salaryMax: number;
    jobDescription: string;
    requirements: string;
    responsibilities: string;
    applicationDeadline: Date;
    status: 'draft' | 'published';
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
    async getAllJobs(): Promise<APIJob[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            
            // 🔹 Convert `applicationDeadline` from string to Date before returning
            return (Array.isArray(responseData?.data) ? responseData.data : responseData).map((job: { applicationDeadline:  number | Date; }) => ({
                ...job,
                applicationDeadline: new Date(job.applicationDeadline), // ✅ Convert string to Date
            }));
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
    },

    async createJob(jobData: Omit<APIJob, 'id'>): Promise<{ success: boolean; message: string; job?: APIJob }> {
        try {
            // Ensure `applicationDeadline` is converted properly
            const formattedData = {
                ...jobData,
                applicationDeadline: jobData.applicationDeadline instanceof Date
                    ? jobData.applicationDeadline.toISOString()
                    : new Date(jobData.applicationDeadline).toISOString(),
            };

            const response = await fetch(`${API_BASE_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: responseData?.message || `Failed to create job: ${response.status}`,
                };
            }

            return {
                success: true,
                message: jobData.status === 'published' ? 'Job published successfully!' : 'Job saved to draft successfully!',
                job: responseData.data ?? responseData,
            };
        } catch (error) {
            console.error('Error creating job:', error);
            return {
                success: false,
                message: 'Failed to create job: ' + (error instanceof Error ? error.message : 'Unknown error'),
            };
        }
    },

    async deleteJob(jobId: number): Promise<{ success: boolean; message: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                return {
                    success: false,
                    message: errorData?.message || `Failed to delete job: ${response.status}`,
                };
            }

            return {
                success: true,
                message: 'Job deleted successfully!',
            };
        } catch (error) {
            console.error('Error deleting job:', error);
            return {
                success: false,
                message: 'Error deleting job: ' + (error instanceof Error ? error.message : 'Unknown error'),
            };
        }
    },
};