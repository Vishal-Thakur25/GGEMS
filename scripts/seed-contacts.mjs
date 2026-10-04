import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedContacts() {
  console.log('--- Seeding Contact Information ---');

  // 1. Phone Numbers
  const phoneCount = await prisma.contactPhone.count();
  if (phoneCount === 0) {
    await prisma.contactPhone.createMany({
      data: [
        {
          phoneNumber: '+91 8826433044',
          role: 'Admissions & General Enquiries',
          description: 'Mon - Sat, 9:00 AM - 6:00 PM',
          displayOrder: 1,
          isPrimary: true,
          isActive: true,
        },
        {
          phoneNumber: '+91 9810000000',
          role: 'Founder & Head Coach',
          description: 'High Performance Training Desk',
          displayOrder: 2,
          isPrimary: false,
          isActive: true,
        },
        {
          phoneNumber: '+91 8826433045',
          role: 'School Partnerships',
          description: 'Inter-school programmes & Tie-ups',
          displayOrder: 3,
          isPrimary: false,
          isActive: true,
        },
      ],
    });
    console.log('✔ Default Phone Numbers created.');
  } else {
    console.log(`ℹ Phone Numbers already exist (${phoneCount} records).`);
  }

  // 2. Email Addresses
  const emailCount = await prisma.contactEmail.count();
  if (emailCount === 0) {
    await prisma.contactEmail.createMany({
      data: [
        {
          email: 'info@ggemssportsacademy.com',
          role: 'General Enquiries & Support',
          description: 'We reply within 24 hours',
          displayOrder: 1,
          isPrimary: true,
          isActive: true,
        },
        {
          email: 'admissions@ggemssportsacademy.com',
          role: 'Admissions & Enrolments',
          description: 'New batch queries & trial booking',
          displayOrder: 2,
          isPrimary: false,
          isActive: true,
        },
        {
          email: 'partnerships@ggemssquash.com',
          role: 'School Partnerships',
          description: 'Institutional tie-ups & infrastructure',
          displayOrder: 3,
          isPrimary: false,
          isActive: true,
        },
      ],
    });
    console.log('✔ Default Email Addresses created.');
  } else {
    console.log(`ℹ Email Addresses already exist (${emailCount} records).`);
  }

  // 3. Addresses
  const addressCount = await prisma.contactAddress.count();
  if (addressCount === 0) {
    await prisma.contactAddress.createMany({
      data: [
        {
          label: 'Head Office & Academy Headquarters',
          addressLine1: 'Jaypee Wish Town, Kosmos-62, Sector 134',
          addressLine2: 'Near Jaypee Hospital',
          city: 'Noida',
          state: 'Uttar Pradesh',
          pincode: '201304',
          country: 'India',
          mapUrl:
            'https://www.google.com/maps/search/?api=1&query=Jaypee+Wish+Town+Kosmos+62+Sector+134+Noida+201304',
          directionsUrl:
            'https://www.google.com/maps/dir/?api=1&destination=Jaypee+Wish+Town+Kosmos+62+Sector+134+Noida+201304',
          isPrimary: true,
          isActive: true,
          displayOrder: 1,
        },
      ],
    });
    console.log('✔ Default Contact Address created.');
  } else {
    console.log(`ℹ Contact Addresses already exist (${addressCount} records).`);
  }

  console.log('--- Contact Seeding Complete ---');
}

seedContacts()
  .catch((e) => {
    console.error('Seeding error:', e);
  })
  .finally(() => prisma.$disconnect());
