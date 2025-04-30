'use client';

import React, { useEffect, useState } from 'react';
import { TextInput, Textarea, NumberInput, Select, Button, Stack, Group, Modal, Loader } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { api } from '@/services/api';
import { IconArrowDown, IconArrowRight } from '@tabler/icons-react';

// Remove the APIJob interface definition since it's imported

interface CreateJobFormProps {
    onJobCreated: () => void;
    opened: boolean;
    onClose: () => void;
}

interface FormData {
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    salaryMin: number;
    salaryMax: number;
    jobDescription: string;
    requirements: string;
    responsibilities: string;
    applicationDeadline: Date | null;  
    status: 'draft' | 'published';
}

export function CreateJobForm({ onJobCreated, opened, onClose }: CreateJobFormProps) {
    const [mounted, setMounted] = useState(false);
    const [showCustomLocation, setShowCustomLocation] = useState(false);
    const [formData, setFormData] = React.useState<FormData>({
        jobTitle: '',
        companyName: '',
        location: '',
        jobType: 'Full-time',
        salaryMin: 0,
        salaryMax: 0,
        jobDescription: '',
        requirements: '',
        responsibilities: '',
        applicationDeadline: null,
        status: 'draft',
    });
    const [isLoading, setIsLoading] = React.useState(false);

    // Replace the useState with a constant
    const locationOptions = [
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Bengaluru', label: 'Bengaluru' },
        { value: 'Hyderabad', label: 'Hyderabad' },
        { value: 'other', label: 'Other Location' }
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    // Return null or loading state while not mounted
    if (!mounted) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await api.createJob({
                ...formData,
                status: 'published',  // Always set to published for form submit
                applicationDeadline: formData.applicationDeadline || new Date(),
            });

            if (result.success) {
                alert('Job published successfully!');
                onJobCreated();
                onClose();
            } else {
                alert('Failed to publish job');
            }
        } catch (error) {
            console.error('Error publishing job:', error);
            alert('Error publishing job: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDraftSave = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await api.createJob({
                ...formData,
                status: 'draft',  // Always set to draft for draft save
                applicationDeadline: formData.applicationDeadline || new Date(),
            });

            if (result.success) {
                alert('Job saved to draft successfully!');
                onJobCreated();
                onClose();
            } else {
                alert('Failed to save job as draft');
            }
        } catch (error) {
            console.error('Error saving draft:', error);
            alert('Error saving draft: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleLocationChange = (value: string | null) => {
        if (value === 'other') {
            setShowCustomLocation(true);
            setFormData({ ...formData, location: '' });
        } else {
            setShowCustomLocation(false);
            setFormData({ ...formData, location: value || '' });
        }
    };


    return (
        <Modal 
            opened={opened} 
            onClose={onClose} 
            size="xl"
            styles={{
                inner: {
                    padding: '20px'
                },
                body: {
                    padding: '0'
                }
            }}
        >
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '20px',
                color: '#7B3FF2',
                fontWeight: 'bold',
                fontSize: '24px'
            }}>
                Create Job Opening
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                {isLoading ? (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        height: '200px' 
                    }}>
                        <Loader size="xl" color="violet" />
                    </div>
                ) : (
                    <Stack gap="md">
                        <Group grow>
                            <TextInput required label="Job Title" placeholder="Full Stack Developer"
                                value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} />
                            <TextInput required label="Company Name" placeholder="Amazon, Microsoft, Swiggy"
                                value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
                        </Group>

                        <Group grow>
                            <Select
                                required
                                label="Location"
                                placeholder="Choose Preferred Location"
                                data={locationOptions}
                                value={showCustomLocation ? 'other' : formData.location}
                                onChange={handleLocationChange}
                            />
                            {showCustomLocation && (
                                <TextInput
                                    required
                                    label="Custom Location"
                                    placeholder="Enter your location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            )}
                            <Select required label="Job Type" placeholder="Select job type"
                                data={['Full-time','Remote' ,'Part-time', 'Contract', 'Internship']}
                                value={formData.jobType} 
                                onChange={(value) => setFormData({ ...formData, jobType: value as FormData['jobType'] })} 
                            />
                        </Group>

                        <Group grow>
                            <NumberInput
                                required
                                label="Salary Min"
                                placeholder="4 LPA"
                                min={0}
                                step={0.1}
                                value={formData.salaryMin / 100000}
                                onChange={(value) => setFormData({
                                    ...formData,
                                    salaryMin: Number(value) * 100000
                                })}
                                rightSection="LPA"
                            />
                            <NumberInput
                                required
                                label="Salary Max"
                                placeholder="6 LPA"
                                min={0}
                                step={0.1}
                                value={formData.salaryMax / 100000}
                                onChange={(value) => setFormData({
                                    ...formData,
                                    salaryMax: Number(value) * 100000
                                })}
                                rightSection="LPA"
                            />
                        </Group>
                        <DateInput required label="Application Deadline" placeholder="Select date"
                            value={formData.applicationDeadline} onChange={(date) => setFormData({ ...formData, applicationDeadline: date || new Date() })} />

                        <Textarea required label="Job Description" placeholder="Provide job details" minRows={3}
                            value={formData.jobDescription} onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })} />

                        <Textarea
                            required
                            label="Requirements"
                            placeholder="List job requirements (e.g., skills, qualifications, experience)"
                            minRows={3}
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        />

                        <Textarea
                            required
                            label="Responsibilities"
                            placeholder="List key job responsibilities and duties"
                            minRows={3}
                            value={formData.responsibilities}
                            onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                        />

                        <Group justify="space-between" style={{ marginTop: '20px' }}>
                            <Button 
                                variant="outline" 
                                color="violet"
                                onClick={handleDraftSave}
                                disabled={isLoading}
                                leftSection={<IconArrowDown size={16} />}
                            >
                                {isLoading ? 'Saving Draft...' : 'Save Draft'}
                            </Button>
                            <Button 
                                type="submit" 
                                color="violet"
                                loading={isLoading}
                                rightSection={<IconArrowRight size={16} />}
                            >
                                {isLoading ? 'Publishing...' : 'Publish'}
                            </Button>
                        </Group>
                    </Stack>
                )}
            </form>
        </Modal>
    );
}