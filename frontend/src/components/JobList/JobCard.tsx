'use client';

import { Card, Text, Group, Button, Box, Badge, Stack, Image } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { api } from '@/services/api';

interface JobCardProps {
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
    onDelete: () => void;
}

export function JobCard({ 
    id, 
    title, 
    company, 
    companyLogo, 
    experience, 
    locationType, 
    salary, 
    description,
    requirements,
    responsibilities,
    postedTime,
    onDelete 
}: JobCardProps) {
  const handleDelete = async () => {
    try {
      await api.deleteJob(id);
      onDelete(); // Refresh the job list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="flex-start" mb="xs">
        <Box 
          style={{ 
            width: 45, 
            height: 45, 
            borderRadius: 8,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa'
          }}
        >
          <Image
            src={`/logos/${company.toLowerCase()}.jpg`}
            alt={company}
            width={35}
            height={35}
            fit="contain"
          />
        </Box>
        <Badge color="blue" variant="light" size="sm">{postedTime}</Badge>
      </Group>

      <Stack gap={5} mb="md">
        <Text fw={600} size="lg">{title}</Text>
        <Text size="sm" c="dimmed">{company}</Text>
      </Stack>

      <Group gap={8} mb="md">
        <Text size="sm" c="dimmed">{experience}</Text>
        <Text size="sm" c="dimmed">•</Text>
        <Text size="sm" c="dimmed">{locationType}</Text>
        <Text size="sm" c="dimmed">•</Text>
        <Text size="sm" c="dimmed">{salary}</Text>
      </Group>

      <Text size="sm" c="dimmed" mb="xl">
        • {description}
      </Text>

      <Group justify="space-between" mt="md">
        <Text size="sm" color="dimmed">{postedTime}</Text>
        <Button 
          variant="subtle" 
          color="red" 
          size="xs"
          leftSection={<IconTrash size={14} />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Group>
    </Card>
  );
}