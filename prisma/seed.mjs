import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Om Swastik Buildhomes platform database...');

  // Reset existing transactional data for clean idempotent seeding
  await prisma.activityLog.deleteMany({});
  await prisma.followUp.deleteMany({});
  await prisma.siteVisit.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.plot.deleteMany({});
  await prisma.faq.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.video.deleteMany({});
  await prisma.blogPost.deleteMany({});

  // 1. Users & Directors
  const defaultPasswordHash = await bcrypt.hash('Admin@12345', 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@omswastikbuildhomes.com' },
    update: {},
    create: {
      email: 'admin@omswastikbuildhomes.com',
      passwordHash: defaultPasswordHash,
      name: 'Om Swastik SuperAdmin',
      phone: '+919599213531',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  const rahul = await prisma.user.upsert({
    where: { email: 'rahulbisht@omswastikbuildhomes.com' },
    update: {},
    create: {
      email: 'rahulbisht@omswastikbuildhomes.com',
      passwordHash: defaultPasswordHash,
      name: 'Rahul Bisht',
      phone: '+919810484742',
      role: 'ADMIN',
      isActive: true,
      avatar: '/images/qr-rahul.png',
    },
  });

  const praful = await prisma.user.upsert({
    where: { email: 'prafulsingh@omswastikbuildhomes.com' },
    update: {},
    create: {
      email: 'prafulsingh@omswastikbuildhomes.com',
      passwordHash: defaultPasswordHash,
      name: 'Praful Singh',
      phone: '+919599213531',
      role: 'SALES_MANAGER',
      isActive: true,
      avatar: '/images/qr-prafull.png',
    },
  });

  const santosh = await prisma.user.upsert({
    where: { email: 'santoshgupta@omswastikbuildhomes.com' },
    update: {},
    create: {
      email: 'santoshgupta@omswastikbuildhomes.com',
      passwordHash: defaultPasswordHash,
      name: 'Santosh Gupta',
      phone: '+919990842233',
      role: 'SALES_EXECUTIVE',
      isActive: true,
      avatar: '/images/qr-santosh.png',
    },
  });

  console.log('Created Users:', [superAdmin.name, rahul.name, praful.name, santosh.name]);

  // 2. Contact Settings
  await prisma.contactSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      companyName: 'Om Swastik Buildhomes Pvt. Ltd.',
      tagline: 'Building Trust. Creating Spaces.',
      cin: 'U41000UW2026PTC256814',
      officeAddress: 'Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P. 201318',
      primaryPhone: '+919599213531',
      secondaryPhone: '+919810484742',
      altPhone: '+919990842233',
      primaryEmail: 'rahulbisht@omswastikbuildhomes.com',
      altEmail: 'rahulbisht0802@gmail.com',
      whatsappNumber: '919599213531',
      facebookUrl: 'https://facebook.com',
      instagramUrl: 'https://instagram.com',
      linkedinUrl: 'https://linkedin.com',
      googleMapEmbed: 'https://maps.google.com'
    }
  });

  // 3. Flagship Project: Riddhi Premium Plots
  const riddhiProject = await prisma.project.upsert({
    where: { slug: 'riddhi' },
    update: {},
    create: {
      slug: 'riddhi',
      name: 'Riddhi Premium Plots',
      projectType: 'PLOTTED_DEVELOPMENT',
      location: 'Dholera Special Investment Region (SIR)',
      city: 'Dholera',
      state: 'Gujarat',
      fullAddress: 'Near Ahmedabad-Dholera Expressway, Dholera SIR, Gujarat',
      description: 'Riddhi is a premium plotted development by Om Swastik Buildhomes Pvt. Ltd., strategically positioned within the growth story of Dholera SIR. Designed for investors and visionaries, Riddhi offers an opportunity to be part of India\'s most ambitious smart city project with world-class planned infrastructure, connectivity to major economic corridors, and a forward-thinking urban ecosystem.',
      highlights: JSON.stringify([
        'Prime location in Dholera Special Investment Region (SIR)',
        'Direct access to 250m wide Ahmedabad–Dholera Expressway',
        'Minutes away from planned Dholera International Airport',
        'Part of Delhi–Mumbai Industrial Corridor (DMIC)',
        'Clear title plots with demarcated boundaries and wide internal roads',
        'Underground utilities: electricity, water supply, and drainage planning',
        'Close proximity to 300 MW Solar Park & Global Manufacturing Hubs'
      ]),
      totalProjectArea: '50 Acres Planned Development',
      totalPlots: 120,
      amenitiesList: JSON.stringify([
        'Gated Community with 24x7 Security',
        'Wide Internal Paved Roads (30ft & 40ft)',
        'Underground Water Supply Line',
        'Underground Electrical Cabling',
        'Landscaped Green Parks & Tree Plantation',
        'Street Lighting & SCADA Surveillance',
        'Rainwater Harvesting System',
        'Entry Plaza & Boundary Wall'
      ]),
      nearbyLandmarks: JSON.stringify([
        { name: 'Dholera International Airport', distance: '15 Mins' },
        { name: 'Ahmedabad-Dholera Expressway', distance: '5 Mins' },
        { name: 'Tata Electronics Semiconductor Fab', distance: '10 Mins' },
        { name: 'Lothal Maritime Heritage Complex', distance: '25 Mins' },
        { name: '300 MW Dholera Solar Park', distance: '12 Mins' }
      ]),
      connectivity: JSON.stringify([
        'Ahmedabad City Center via Expressway: 45 Minutes',
        'High Speed Bullet Train Station: Planned Regional Hub',
        'Dedicated Freight Corridor (DFC): Direct Logistics Link',
        'Seaport & Coastal Shipping Route: Seamless Maritime Trade'
      ]),
      googleMapUrl: 'https://maps.google.com/?q=Dholera+SIR+Gujarat',
      heroImage: '/images/hero-dholera.jpg',
      siteLayoutImage: '/images/riddhi-project.jpg',
      reraNumber: 'Applicable Registration in Progress',
      status: 'ACTIVE',
      displayOrder: 1,
    }
  });

  console.log('Created Project:', riddhiProject.name);

  // 4. Plot Inventory for Riddhi
  const plotTemplates = [
    // Block A - Premium North & East Facing
    { num: 'A-101', sizeYd: 150, facing: 'EAST', road: 30, corner: false, park: false, main: true, priceSqYd: 7500, status: 'AVAILABLE' },
    { num: 'A-102', sizeYd: 150, facing: 'EAST', road: 30, corner: false, park: false, main: true, priceSqYd: 7500, status: 'AVAILABLE' },
    { num: 'A-103', sizeYd: 200, facing: 'NORTH', road: 40, corner: true, park: true, main: false, priceSqYd: 8200, status: 'AVAILABLE' },
    { num: 'A-104', sizeYd: 200, facing: 'NORTH', road: 30, corner: false, park: true, main: false, priceSqYd: 7800, status: 'HOLD', remarks: 'Client Token Pending' },
    { num: 'A-105', sizeYd: 150, facing: 'NORTH', road: 30, corner: false, park: false, main: false, priceSqYd: 7500, status: 'AVAILABLE' },
    { num: 'A-106', sizeYd: 250, facing: 'NORTH_EAST', road: 40, corner: true, park: false, main: true, priceSqYd: 8500, status: 'AVAILABLE' },
    { num: 'A-107', sizeYd: 150, facing: 'EAST', road: 30, corner: false, park: false, main: false, priceSqYd: 7500, status: 'AVAILABLE' },
    { num: 'A-108', sizeYd: 150, facing: 'EAST', road: 30, corner: false, park: false, main: false, priceSqYd: 7500, status: 'BOOKED', remarks: 'Booked by Rajiv Sharma' },

    // Block B - Park Facing & Corner Plots
    { num: 'B-201', sizeYd: 200, facing: 'NORTH', road: 40, corner: true, park: true, main: true, priceSqYd: 8800, status: 'SOLD', remarks: 'Registry Done' },
    { num: 'B-202', sizeYd: 200, facing: 'NORTH', road: 30, corner: false, park: true, main: false, priceSqYd: 8000, status: 'AVAILABLE' },
    { num: 'B-203', sizeYd: 200, facing: 'NORTH', road: 30, corner: false, park: true, main: false, priceSqYd: 8000, status: 'AVAILABLE' },
    { num: 'B-204', sizeYd: 250, facing: 'EAST', road: 30, corner: false, park: false, main: false, priceSqYd: 7600, status: 'AVAILABLE' },
    { num: 'B-205', sizeYd: 300, facing: 'EAST', road: 40, corner: true, park: false, main: false, priceSqYd: 8200, status: 'AVAILABLE' },
    { num: 'B-206', sizeYd: 150, facing: 'WEST', road: 30, corner: false, park: false, main: false, priceSqYd: 7200, status: 'AVAILABLE' },
    { num: 'B-207', sizeYd: 150, facing: 'WEST', road: 30, corner: false, park: false, main: false, priceSqYd: 7200, status: 'AVAILABLE' },
    { num: 'B-208', sizeYd: 180, facing: 'SOUTH_EAST', road: 30, corner: true, park: false, main: false, priceSqYd: 7600, status: 'HOLD' },

    // Block C - Large Investment Plots
    { num: 'C-301', sizeYd: 500, facing: 'NORTH_EAST', road: 60, corner: true, park: true, main: true, priceSqYd: 9500, status: 'BLOCKED', remarks: 'Reserved for Commercial Anchor' },
    { num: 'C-302', sizeYd: 300, facing: 'EAST', road: 40, corner: false, park: false, main: true, priceSqYd: 8000, status: 'AVAILABLE' },
    { num: 'C-303', sizeYd: 300, facing: 'EAST', road: 40, corner: false, park: false, main: true, priceSqYd: 8000, status: 'AVAILABLE' },
    { num: 'C-304', sizeYd: 250, facing: 'NORTH', road: 30, corner: false, park: false, main: false, priceSqYd: 7500, status: 'AVAILABLE' },
    { num: 'C-305', sizeYd: 250, facing: 'NORTH', road: 30, corner: false, park: false, main: false, priceSqYd: 7500, status: 'AVAILABLE' },
    { num: 'C-306', sizeYd: 200, facing: 'WEST', road: 30, corner: false, park: false, main: false, priceSqYd: 7300, status: 'AVAILABLE' },
    { num: 'C-307', sizeYd: 150, facing: 'WEST', road: 30, corner: false, park: false, main: false, priceSqYd: 7200, status: 'AVAILABLE' },
    { num: 'C-308', sizeYd: 150, facing: 'WEST', road: 30, corner: false, park: false, main: false, priceSqYd: 7200, status: 'AVAILABLE' }
  ];

  for (const p of plotTemplates) {
    const sizeSqFt = p.sizeYd * 9;
    const priceTotal = p.sizeYd * p.priceSqYd;
    await prisma.plot.upsert({
      where: {
        projectId_plotNumber: {
          projectId: riddhiProject.id,
          plotNumber: p.num,
        }
      },
      update: {},
      create: {
        projectId: riddhiProject.id,
        plotNumber: p.num,
        sizeSqYd: p.sizeYd,
        sizeSqFt: sizeSqFt,
        lengthFt: Math.round(Math.sqrt(sizeSqFt) * 1.2),
        widthFt: Math.round(Math.sqrt(sizeSqFt) / 1.2),
        facing: p.facing,
        roadWidthFt: p.road,
        isCorner: p.corner,
        isParkFacing: p.park,
        isMainRoadFacing: p.main,
        priceTotal: priceTotal,
        pricePerUnit: p.priceSqYd,
        bookingAmount: 51000,
        status: p.status,
        remarks: p.remarks || null,
      }
    });
  }

  console.log(`Created ${plotTemplates.length} plots for ${riddhiProject.name}`);

  // 5. Seed Customer & Booking (For Block A-108 and B-201)
  const plotA108 = await prisma.plot.findUnique({
    where: { projectId_plotNumber: { projectId: riddhiProject.id, plotNumber: 'A-108' } }
  });
  const plotB201 = await prisma.plot.findUnique({
    where: { projectId_plotNumber: { projectId: riddhiProject.id, plotNumber: 'B-201' } }
  });

  const customer1 = await prisma.customer.create({
    data: {
      name: 'Rajiv Sharma',
      phone: '+919871122334',
      email: 'rajiv.sharma@gmail.com',
      panNumber: 'ABCPS1234F',
      city: 'Delhi',
      state: 'Delhi',
      fullAddress: 'Sector 15, Rohini, New Delhi 110085',
      notes: 'Investor interested in Dholera semiconductor expansion',
    }
  });

  if (plotA108) {
    await prisma.booking.create({
      data: {
        bookingNumber: 'OSB-2026-001',
        customerId: customer1.id,
        projectId: riddhiProject.id,
        plotId: plotA108.id,
        salesUserId: santosh.id,
        bookingAmount: 51000,
        totalPropertyValue: plotA108.priceTotal,
        paymentMode: 'NEFT',
        paymentReference: 'NEFT99881122',
        status: 'BOOKED',
        remarks: 'Booking advance received, agreement in drafting',
      }
    });
  }

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Vikas Patel',
      phone: '+919825544332',
      email: 'vikas.patel@ahmedabadre.com',
      panNumber: 'BNXPP5678K',
      city: 'Ahmedabad',
      state: 'Gujarat',
      fullAddress: 'Satellite Road, Ahmedabad, Gujarat 380015',
      notes: 'Registered buyer, full payment cleared',
    }
  });

  if (plotB201) {
    await prisma.booking.create({
      data: {
        bookingNumber: 'OSB-2026-002',
        customerId: customer2.id,
        projectId: riddhiProject.id,
        plotId: plotB201.id,
        salesUserId: rahul.id,
        bookingAmount: plotB201.priceTotal,
        totalPropertyValue: plotB201.priceTotal,
        paymentMode: 'RTGS',
        paymentReference: 'RTGS11223344',
        status: 'COMPLETED',
        remarks: 'Registry completed, ownership handed over',
      }
    });
  }

  // 6. Realistic Leads & Pipeline Demonstration
  const lead1 = await prisma.lead.create({
    data: {
      name: 'Amitabh Verma',
      mobile: '+919811002233',
      email: 'amitabh.v@outlook.com',
      interestedProjectId: riddhiProject.id,
      budget: '₹10 - 15 Lakhs',
      preferredSize: '150 - 200 Sq. Yd.',
      leadSource: 'WEBSITE',
      assignedUserId: praful.id,
      status: 'FOLLOW_UP',
      remarks: 'Interested in North-facing 200 Sq. Yd. plot for long-term investment',
      nextFollowUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    }
  });

  await prisma.followUp.create({
    data: {
      leadId: lead1.id,
      userId: praful.id,
      callStatus: 'ANSWERED',
      remarks: 'Customer discussed Dholera airport timeline and expressway connectivity. Requested brochure and site layout.',
      customerRequirement: 'Looking for 200 Sq. Yd. plot with 30ft road width',
      nextAction: 'Send site visit invitation for this weekend',
      nextFollowUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }
  });

  const lead2 = await prisma.lead.create({
    data: {
      name: 'Sunita Aggarwal',
      mobile: '+919910223344',
      email: 'sunita.aggarwal@gmail.com',
      interestedProjectId: riddhiProject.id,
      budget: '₹15 - 20 Lakhs',
      leadSource: 'WHATSAPP',
      assignedUserId: santosh.id,
      status: 'SITE_VISIT_SCHEDULED',
      remarks: 'Confirmed site visit from Noida office',
    }
  });

  await prisma.siteVisit.create({
    data: {
      leadId: lead2.id,
      projectId: riddhiProject.id,
      assignedUserId: santosh.id,
      visitDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // In 3 days
      visitTime: '11:00 AM',
      status: 'SCHEDULED',
      remarks: 'Client traveling with family to inspect Block A and B plots.',
      nextAction: 'Confirm vehicle arrangement from Ahmedabad junction',
    }
  });

  // 7. Seed FAQs (From verified Dholera & Riddhi information)
  const faqs = [
    {
      question: 'What is Dholera Special Investment Region (SIR)?',
      answer: 'Dholera SIR is India\'s first greenfield industrial smart city being developed as a major node of the Delhi–Mumbai Industrial Corridor (DMIC). Spanning 920 sq. km, it features planned multi-modal connectivity including an international airport, expressways, high-speed rail, and dedicated freight corridors.',
      category: 'Dholera SIR',
      displayOrder: 1,
    },
    {
      question: 'Where is Riddhi Premium Plots located?',
      answer: 'Riddhi is strategically located within the planned development zone of Dholera SIR, Gujarat, in direct proximity to the 250m wide Ahmedabad–Dholera Expressway and minutes away from the upcoming Dholera International Airport.',
      category: 'Riddhi Plots',
      displayOrder: 2,
    },
    {
      question: 'What plot sizes are available in Riddhi?',
      answer: 'Riddhi offers thoughtfully demarcated residential and prime investment plots ranging from 150 Sq. Yd. (1,350 Sq. Ft.), 200 Sq. Yd. (1,800 Sq. Ft.), 250 Sq. Yd., 300 Sq. Yd. up to 500 Sq. Yd., with wide internal roads of 30ft and 40ft.',
      category: 'Riddhi Plots',
      displayOrder: 3,
    },
    {
      question: 'What is the booking process for a plot?',
      answer: 'You can select an available plot from our interactive online inventory or during a site visit, submit your initial booking token of ₹51,000, verify documents, and complete allotment documentation through our executive team.',
      category: 'Investment',
      displayOrder: 4,
    },
    {
      question: 'How can I schedule a physical site visit to Dholera?',
      answer: 'You can easily schedule a site visit through our website or by contacting our executive desk directly via Call or WhatsApp. Our team assists with local guidance, transport pickup, and comprehensive on-site plot verification.',
      category: 'General',
      displayOrder: 5,
    }
  ];

  for (const f of faqs) {
    await prisma.faq.create({ data: f });
  }

  // 8. Seed Testimonials
  const testimonials = [
    {
      customerName: 'Dr. Alok Srivastava',
      designation: 'Senior Consultant & Investor, Delhi NCR',
      review: 'Investing in Riddhi at Dholera through Om Swastik Buildhomes has been completely transparent. Their team provided clear documentation, expressway updates, and flawless assistance throughout the selection.',
      rating: 5,
      project: 'Riddhi Premium Plots',
      displayOrder: 1,
    },
    {
      customerName: 'Mahesh K. Bansal',
      designation: 'Business Owner, Noida West',
      review: 'Dholera is India\'s future manufacturing capital with Tata Electronics and other giants establishing facilities. Rahul Bisht and Praful Singh gave genuine, fact-backed guidance without unnecessary hype.',
      rating: 5,
      project: 'Riddhi Premium Plots',
      displayOrder: 2,
    },
    {
      customerName: 'Hitesh Parikh',
      designation: 'NRI Investor, Gujarat',
      review: 'I inspected the site layout and the location advantage of Riddhi. The expressway connectivity to Ahmedabad makes this an outstanding high-growth asset. Highly recommended developer.',
      rating: 5,
      project: 'Riddhi Premium Plots',
      displayOrder: 3,
    }
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // 9. Seed Videos
  const videos = [
    {
      title: "Dholera SIR Mega Master Plan & Drone Aerial Tour 2026",
      videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      youtubeId: "ScMzIvxBSi4",
      thumbnailUrl: "/images/hero-dholera.jpg",
      category: "Dholera SIR",
      description: "Exclusive aerial perspective of the 250m multi-modal transport corridor, administrative building (ABCD), and central activation area in Dholera SIR.",
      displayOrder: 1,
      isActive: true,
    },
    {
      title: "Riddhi Premium Plots: On-Site Demarcation & Road Work",
      videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      youtubeId: "kJQP7kiw5Fk",
      thumbnailUrl: "/images/riddhi-project.jpg",
      category: "Site Tour",
      description: "Comprehensive site walkthrough showing wide 30ft & 40ft asphalt roads, boundary stones, and underground utility pipelines in Riddhi.",
      displayOrder: 2,
      isActive: true,
    },
    {
      title: "Ahmedabad-Dholera Expressway Ground Speedrun & Connectivity",
      videoUrl: "https://www.youtube.com/watch?v=L_LUpnjgPso",
      youtubeId: "L_LUpnjgPso",
      thumbnailUrl: "/images/about-dholera.jpg",
      category: "Development",
      description: "Drive through the 109 km high-speed expressway connecting SG Highway Ahmedabad to Dholera in under 45 minutes.",
      displayOrder: 3,
      isActive: true,
    },
    {
      title: "Tata Electronics Semiconductor Fab & Industrial Boom",
      videoUrl: "https://www.youtube.com/watch?v=21X5lGlDOfg",
      youtubeId: "21X5lGlDOfg",
      thumbnailUrl: "/images/investment-bg.jpg",
      category: "Industrial",
      description: "Inside India's premier semiconductor manufacturing ecosystem in Dholera SIR and its multiplier impact on property valuations.",
      displayOrder: 4,
      isActive: true,
    }
  ];

  for (const v of videos) {
    await prisma.video.create({ data: v });
  }
  console.log(`Created ${videos.length} videos for gallery`);

  // 10. Seed Blog Posts
  const blogPosts = [
    {
      title: "Why Dholera SIR is India's Most Lucrative Land Investment in 2026",
      slug: "why-dholera-sir-is-indias-most-lucrative-land-investment-2026",
      featuredImage: "/images/hero-dholera.jpg",
      excerpt: "Discover how planned greenfield infrastructure, direct expressway access, and multi-billion dollar industrial investments make Dholera SIR an unbeatable wealth-creation corridor.",
      category: "Market Intelligence",
      readTime: "6 min read",
      author: "Om Swastik Research Team",
      status: "PUBLISHED",
      publishedAt: new Date("2026-02-15T10:00:00Z"),
      seoTitle: "Why Dholera SIR is the Best Land Investment in 2026 | Om Swastik",
      seoDescription: "An in-depth market report on Dholera SIR capital appreciation, expressway connectivity, and Tata semiconductor fab impact.",
      content: `### The Rise of India's First Greenfield Smart Metropolis

India's economic trajectory is undergoing a historic shift, and at the absolute vanguard of this industrial revolution stands **Dholera Special Investment Region (SIR)**. Spanning over 920 sq. km—more than double the geographic footprint of Mumbai—Dholera is not an ordinary urban extension. It is India's first platinum-rated, purpose-built smart industrial city.

For visionary investors seeking capital appreciation combined with asset security, plotted land developments in Dholera offer unprecedented potential.

---

### 1. The Greenfield Infrastructure Advantage
Unlike legacy brownfield cities that struggle with retrofitting outdated drainage and congested arterial roads, Dholera SIR was planned from the ground up:
* **Sub-surface Utility Corridors**: All power lines, potable water pipes, recycled industrial water conduits, and gigabit fiber cables are buried in accessible underground concrete ducts.
* **SCADA-Controlled Central Operations**: The entire city's water flow, traffic signals, and power grids are monitored 24x7 from the centralized ABCD Building command center.
* **Strict Statutory Zoning**: Clear segregation between heavy industrial, light manufacturing, residential, and high-density commercial zones ensures clean living and steady appreciation.

---

### 2. The Anchor Catalyst: Tata Electronics Semiconductor Fab
The ongoing development of Tata Electronics' **$11 Billion commercial semiconductor fabrication plant** in Dholera SIR has firmly established Gujarat on the global technology map. 
With over 20,000 high-skilled engineering jobs and dozens of allied global supply chain partners setting up operations, the demand for planned residential plots in surrounding developments like **Riddhi** is accelerating rapidly.

---

### 3. High-Speed Connectivity Corridors
* **Ahmedabad–Dholera Expressway (109 km)**: Reduces transit time from SG Highway Ahmedabad to Dholera to just 40–45 minutes.
* **Dholera International Cargo & Passenger Airport**: Planned to handle massive regional cargo alongside international passenger traffic, taking pressure off Ahmedabad airport.
* **High Speed Rail Node**: A planned bullet train station will connect Dholera directly to the Mumbai–Ahmedabad high-speed corridor.

---

### 4. Why Plotted Development at 'Riddhi' Stands Out
Purchasing raw agricultural land carries legal and zoning hazards. **Riddhi Premium Plots** by Om Swastik Buildhomes Pvt. Ltd. eliminates every bottleneck:
* Demarcated boundary stones and wide 30ft & 40ft internal roads.
* Direct proximity to the Expressway access interchanges.
* Direct guidance and verified documentation handled by seasoned corporate leadership.

---

### Conclusion: Act in the Inflection Window
Land investments in high-growth corridors follow an S-curve: early adoption yields generational wealth. As expressway operations commence and manufacturing units begin commissioning, entry prices will permanently reset higher. Contact our advisory desk today to inspect available plots at Riddhi.`
    },
    {
      title: "Ahmedabad-Dholera Expressway & International Airport: 2026 Milestones",
      slug: "ahmedabad-dholera-expressway-international-airport-2026-milestones",
      featuredImage: "/images/about-dholera.jpg",
      excerpt: "A comprehensive progress update on connectivity milestones: 109 km expressway operational status, international cargo runways, and regional logistics networks.",
      category: "Infrastructure",
      readTime: "5 min read",
      author: "Infrastructure Advisory Desk",
      status: "PUBLISHED",
      publishedAt: new Date("2026-03-01T11:30:00Z"),
      seoTitle: "Ahmedabad Dholera Expressway & Airport Progress 2026",
      seoDescription: "Current status of the Ahmedabad Dholera Expressway and international airport in 2026.",
      content: `### Connectivity: The Ultimate Value Driver for Real Estate

In real estate, location is defined not by linear distance, but by travel time. The historic bottleneck between Ahmedabad and Dholera was the 2-hour commute via state highways. Today, that narrative has been rewritten with the near completion of the **Ahmedabad–Dholera Expressway**.

---

### The 109-Km Expressway Reality
* **Travel Time Reduced to 45 Minutes**: Connecting Sardar Patel Ring Road in Ahmedabad to the heart of Dholera Activation Area.
* **Access-Controlled 4-Lane Expandable to 8-Lane**: Designed for 120 km/h speeds, ensuring seamless transit for both industrial freight and daily commuters.
* **Spur Interchanges**: Direct entry into residential zones like Riddhi, ensuring zero detour access for homeowners and commercial fleet operators.

---

### Dholera International Airport: Cargo Powerhouse
Strategically located near Navagam, the Dholera International Airport is being developed to cater to:
* **Dedicated Semiconductor & Electronics Air Freight**: High-value chip wafers require rapid global air transit; the Dholera airport provides an on-site tarmac just minutes from Tata Fab.
* **Overspill Passenger Traffic from SVPI Ahmedabad**: Relieving Ahmedabad's saturated airspace with twin 4,000m runways capable of landing wide-body Boeing 777 and Airbus A380 aircraft.

---

### Investment Takeaway
Properties positioned within a 10-15 minute radius of the expressway interchanges and airport arterial corridors command the highest rental yields and capital growth. Riddhi by Om Swastik Buildhomes is directly positioned within this golden radius.`
    },
    {
      title: "Legal Due Diligence Checklist for Buying Plots in Dholera Gujarat",
      slug: "legal-due-diligence-checklist-buying-plots-dholera-gujarat",
      featuredImage: "/images/investment-bg.jpg",
      excerpt: "Essential verification steps every prudent investor must know before purchasing land in Dholera SIR, including 7/12 extracts, zoning status, and clear title deed verification.",
      category: "Investor Guide",
      readTime: "7 min read",
      author: "Legal & Regulatory Affairs",
      status: "PUBLISHED",
      publishedAt: new Date("2026-03-05T09:15:00Z"),
      seoTitle: "Legal Due Diligence Checklist for Dholera Plots | Om Swastik",
      seoDescription: "Step-by-step legal guide for land buyers in Dholera SIR: NA orders, title searches, and town planning schemes.",
      content: `### Transparency First: Safeguarding Your Land Capital

Purchasing land in an emerging metropolitan area is one of the most rewarding wealth creation strategies in India. However, it requires meticulous due diligence to ensure complete legal compliance and peace of mind.

Here is the authoritative checklist curated by the legal advisory team at Om Swastik Buildhomes Pvt. Ltd.

---

### 1. Verification of Land Title & Ownership (7/12 and 8-A Extracts)
* Always inspect the **AnyRoR (Any Records of Rights)** online revenue records maintained by the Revenue Department of Gujarat.
* Verify that the seller's name appears as the legal owner without any encumbrances, litigation claims, or bank liens.
* Ensure a 30-year search report is prepared by a qualified advocate.

---

### 2. Town Planning (TP) Scheme Allotment
Dholera SIR is divided into distinct Town Planning (TP) schemes under the Dholera Special Investment Region Development Authority (DSIRDA).
* Check whether the land falls within TP1, TP2, or subsequent phases.
* Confirm that the final plot (FP) number has been demarcated from original survey plots.
* Ensure road widening reservations or green buffer zones do not infringe on your boundaries.

---

### 3. Non-Agricultural (NA) & Non-Agricultural Industrial/Residential Permission
* Agricultural land in Gujarat cannot be purchased by non-farmers without valid NA permission.
* For plotted schemes, verify that the developer has obtained **valid NA approval** and sanctioned layout plans from the competent planning authority.

---

### 4. Demarcation & Physical Possession
A paper title is only half the transaction. Physical demarcation guarantees security:
* Look for fixed stone boundaries and numbered corner markers.
* Check internal road widths (minimum 30 feet) to ensure emergency vehicle access and future utility laying.

---

### The Om Swastik Assurance
At Om Swastik Buildhomes Pvt. Ltd., every single plot in **Riddhi** undergoes institutional-grade legal vetting before being made available to clients. Our executive leadership provides complete document sets for your independent legal counsel to inspect.`
    }
  ];

  for (const b of blogPosts) {
    await prisma.blogPost.create({ data: b });
  }
  console.log(`Created ${blogPosts.length} blog posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
