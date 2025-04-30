'use client';

import React, { useState, useEffect } from 'react';
import { Box, TextInput, Select, Text, Group, RangeSlider } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';

export function SearchFilters() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box 
      py="xl" 
      style={{
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid #eee',
        margin: 0,
        maxWidth: '100vw',
        width: '100vw',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        boxSizing: 'border-box',
        marginTop: '-40px',
        marginBottom: '30px'  // Added space below search filters
      }}
    >
      <Group align="flex-end" gap="xl">
        <TextInput
          placeholder="Search By Job Title, Role"
          leftSection={<IconSearch size={18} color="#666" />}
          style={{ flex: 2 }}
          size="md"
          variant="unstyled"  // Remove border
        />
        
        <Text style={{ 
          color: '#666',
          fontSize: '24px',
          fontWeight: 200,
          marginBottom: '8px'
        }}>|</Text>

        <Select
          placeholder="Preferred Location"
          leftSection={<IconMapPin size={18} color="#666" />}
          data={[
            { value: 'remote', label: 'Remote' },
            { value: 'onsite', label: 'Onsite' },
            { value: 'hybrid', label: 'Hybrid' }
          ]}
          style={{ flex: 1 }}
          size="md"
          variant="unstyled"  // Remove border
        />

        {/* Apply the same style to other separators */}
        <Text style={{ 
          color: '#666',
          fontSize: '24px',
          fontWeight: 200,
          marginBottom: '8px'
        }}>|</Text>
        
        <Select
          placeholder="Job type"
          leftSection={<IconBriefcase size={18} color="#666" />}
          data={[
            { value: 'full-time', label: 'Full-time' },
            { value: 'part-time', label: 'Part-time' },
            { value: 'contract', label: 'Contract' },
            { value: 'internship', label: 'Internship' }

          ]}
          style={{ flex: 1 }}
          size="md"
          variant="unstyled"  // Remove border
        />

        <Text style={{ 
          color: '#666',
          fontSize: '24px',
          fontWeight: 200,
          marginBottom: '8px'
        }}>|</Text>
        
        <Box style={{ flex: 1 }}>
          <Text size="sm" mb={8}>Salary Per Month</Text>
          <RangeSlider
            min={50}
            max={80}
            label={(value) => `₹${value}k`}
            defaultValue={[50, 80]}
            marks={[
              { value: 50, label: '₹50k' },
              { value: 80, label: '₹80k' }
            ]}
            styles={{
              thumb: { 
                borderColor: '#7B3FF2', 
                backgroundColor: 'white',
                width: 14,
                height: 14
              },
              bar: { 
                backgroundColor: '#7B3FF2',
                height: 2  // Made thinner
              },
              track: {
                height: 2  // Made thinner
              },
              mark: { 
                borderColor: '#7B3FF2',
                width: 6,
                height: 6
              },
              markLabel: { 
                fontSize: '12px'
              }
            }}
          />
        </Box>
      </Group>
    </Box>
  );
}