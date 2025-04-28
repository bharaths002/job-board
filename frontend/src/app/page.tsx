'use client';

import { useState, useEffect } from 'react';
import { Container, SimpleGrid, Box } from '@mantine/core';
import { Navbar } from '@/components/Layout/Navbar';
import { SearchFilters } from '@/components/JobSearch/SearchFilters';
import { JobCard } from '@/components/JobList/JobCard';
import { CreateJobForm } from '@/components/CreateJob/CreateJobForm';
import { api } from '@/services/api';

// Define APIJob Type
interface APIJob {
  id: number;
  jobTitle: string;
  companyName: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  jobDescription: string;
  requirements: string;    // Add this
  responsibilities: string;  // Add this
}

// Define Job Type
interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  experience: string;
  locationType: string;
  salary: string;
  description: string;
  requirements: string;    // Add this
  responsibilities: string;  // Add this
  postedTime: string;
}

// Mock Data for Default Jobs
const MOCK_JOBS: Job[] = [
  {
    id: -1,
    title: 'Full Stack Developer',
    company: 'Amazon',
    companyLogo: '/logos/amazon.png',
    experience: '1-3 yr Exp',
    locationType: 'Onsite',
    salary: '₹12LPA',
    description: 'A user-friendly interface lets you browse stunning photos and videos.',
    requirements: 'Strong proficiency in JavaScript, React, and Node.js',
    responsibilities: 'Develop and maintain web applications',
    postedTime: '24h Ago'
  },
  {
    id: -2,
    title: 'Node Js Developer',
    company: 'Tesla',
    companyLogo: '/logos/tesla.png',
    experience: '1-3 yr Exp',
    locationType: 'Remote',
    salary: '₹15LPA',
    description: 'A user-friendly interface lets you browse stunning photos and videos.',
    postedTime: '24h Ago',
    requirements: '',
    responsibilities: ''
  },
   {
     id: -3,
     title: 'UI UX Developer',
     company: 'Swiggy',
     companyLogo: '/logos/swiggy.png',
     experience: '1-3 yr Exp',
     locationType: 'Remote',
     salary: '₹15LPA',
     description: 'A user-friendly interface lets you browse stunning photos and videos.',
     postedTime: '24h Ago',
     requirements: '',
     responsibilities: ''
   },
  {
    id: -4,
    title: 'Full Stack Developer',
    company: 'Amazon',
    companyLogo: '/logos/amazon.png',
    experience: '1-3 yr Exp',
    locationType: 'Remote',
    salary: '₹15LPA',
    description: 'A user-friendly interface lets you browse stunning photos and videos.',
    postedTime: '24h Ago',
    requirements: '',
    responsibilities: ''
  },
];

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);

  // Update the job transformation in fetchJobs
  const fetchJobs = async () => {
    try {
      const response: APIJob[] = await api.getAllJobs();
  
      const transformedJobs: Job[] = response.map((job) => ({
        id: job.id ?? Math.floor(Math.random() * 10000),
        title: job.jobTitle,
        company: job.companyName,
        companyLogo: '/logos/default-company.png',
        experience: '1-3 yr Exp',
        locationType: job.jobType,
        salary: `₹${job.salaryMin}-${job.salaryMax}`,
        description: job.jobDescription,
        requirements: job.requirements,       // Add this
        responsibilities: job.responsibilities, // Add this
        postedTime: 'Just now'
      }));
  
      setJobs([...transformedJobs, ...MOCK_JOBS]);
      setError(null);
    } catch (err: unknown) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setJobs(MOCK_JOBS); // Fallback to mock jobs if API fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Box style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      <Navbar />
      <Container size="xl" py="xl">
        <CreateJobForm 
          opened={isCreateJobModalOpen}
          onClose={() => setIsCreateJobModalOpen(false)}
          onJobCreated={fetchJobs}
        />
        <SearchFilters />
        {loading ? (
          <div>Loading jobs...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>Error: {error}</div>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} onDelete={fetchJobs} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}