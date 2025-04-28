'use client';

import { Box, Container, Group, Image, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { CreateJobForm } from '@/components/CreateJob/CreateJobForm';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Box 
        component="header" 
        style={{ 
          backgroundColor: 'white', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          zIndex: 1000,
          borderRadius: '30px',
          margin: '0 auto',
          border: '1px solid #eee',
          maxWidth: '75%',
          marginBottom: '20px'
        }}
      >
        <Container size="xl">
          <Box py="md">
            <Group justify="center" align="center" gap="xl">
              <Image
                src="/logos/companylogo.png"
                alt="Job Portal"
                width={40}
                height={40}
                style={{ cursor: 'pointer' }}
              />
              
              <Link href="/" style={{ color: 'black', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
              <Link href="/jobs" style={{ color: 'black', textDecoration: 'none', fontWeight: 500 }}>Find Jobs</Link>
              <Link href="/talents" style={{ color: 'black', textDecoration: 'none', fontWeight: 500 }}>Find Talents</Link>
              <Link href="/about" style={{ color: 'black', textDecoration: 'none', fontWeight: 500 }}>About us</Link>
              <Link href="/testimonials" style={{ color: 'black', textDecoration: 'none', fontWeight: 500 }}>Testimonials</Link>
              <Button 
                onClick={open}
                style={{ 
                  backgroundColor: '#7B3FF2',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  fontWeight: 500,
                }}
              >
                Create Jobs
              </Button>
            </Group>
          </Box>
        </Container>
      </Box>

      <Modal 
        opened={opened} 
        onClose={close}
        size="xl"
        centered
        title="Create Job Opening"
        styles={{
          header: {
            marginBottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '16px'
          },
          title: {
            width: '100%',
            fontWeight: 600,
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 auto'
          },
          close: {
            position: 'absolute',
            right: '16px'
          },
          body: { 
            padding: '20px'  // Added padding to the body
          }
        }}
      >
        <CreateJobForm 
          onJobCreated={close} 
          opened={opened}
          onClose={close}
        />
      </Modal>
    </>
  );
}
<Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => open()}>Create Job</Button>
