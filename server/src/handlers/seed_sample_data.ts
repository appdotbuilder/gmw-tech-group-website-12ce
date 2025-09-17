import { db } from '../db';
import { blogPostsTable, companyStatsTable } from '../db/schema';

export const seedSampleData = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Sample blog posts data
    const sampleBlogPosts = [
      {
        title: "AI-Powered ERP Solutions Transforming African Businesses",
        slug: "ai-powered-erp-solutions-transforming-african-businesses",
        excerpt: "Discover how artificial intelligence is revolutionizing enterprise resource planning across Africa, driving efficiency and growth in traditional industries.",
        content: `# AI-Powered ERP Solutions Transforming African Businesses

The African business landscape is experiencing a digital transformation unlike any other. At the forefront of this revolution are AI-powered Enterprise Resource Planning (ERP) solutions that are fundamentally changing how businesses operate across the continent.

## The Current Landscape

Traditional ERP systems have long been the backbone of enterprise operations, but they often lack the intelligence needed to adapt to Africa's unique business challenges. From supply chain disruptions to regulatory complexities, African businesses need smarter solutions.

## AI Integration Benefits

Our AI-powered ERP solutions offer:

- **Predictive Analytics**: Anticipate market trends and inventory needs
- **Automated Decision Making**: Reduce manual processes by up to 70%
- **Real-time Insights**: Make data-driven decisions instantly
- **Local Adaptation**: Systems that understand African market nuances

## Success Stories

We've helped over 150 businesses across Kenya, Uganda, and Tanzania implement these solutions, resulting in an average 35% increase in operational efficiency.

## The Future

As we continue to expand across East Africa, our AI-powered ERP solutions will play a crucial role in driving sustainable business growth and digital transformation across the continent.`,
        author: "GMW Tech Team",
        category: "AI/ML",
        tags: JSON.stringify(["AI", "ERP", "Business Intelligence", "Digital Transformation"]),
        featured_image: "/images/blog/ai-erp-solutions.jpg",
        published: true,
        published_at: new Date('2024-01-15T10:00:00Z')
      },
      {
        title: "Blockchain Revolution: Tokenizing Supply Chains in Kenya",
        slug: "blockchain-revolution-tokenizing-supply-chains-kenya",
        excerpt: "Explore how blockchain technology is creating transparent, secure supply chains for Kenyan exporters, from coffee farms to global markets.",
        content: `# Blockchain Revolution: Tokenizing Supply Chains in Kenya

Kenya's agricultural sector is embracing blockchain technology to create more transparent and efficient supply chains. This revolutionary approach is particularly transformative for coffee and tea exports, two of Kenya's major economic drivers.

## The Problem

Traditional supply chains lack transparency, making it difficult to:
- Track product origin and quality
- Ensure fair pricing for farmers
- Verify sustainability practices
- Combat counterfeit products

## Our Blockchain Solution

GMW Tech Group has developed a comprehensive blockchain platform that:

### Tracks Every Step
From seed to shelf, every transaction is recorded on an immutable ledger, ensuring complete traceability.

### Empowers Farmers
Direct connection between farmers and buyers, eliminating middlemen and increasing profits by up to 30%.

### Ensures Quality
Smart contracts automatically verify quality standards at each stage of the supply chain.

### Builds Trust
Consumers can scan QR codes to see the complete journey of their products.

## Impact So Far

- **500+ farmers** onboarded across central Kenya
- **15 export companies** using our platform
- **$2.3M** in additional farmer income generated
- **99.8%** product authenticity rate

## Looking Forward

We're expanding this solution to other agricultural products and exploring partnerships with major international buyers who value transparency and sustainability.`,
        author: "Dr. Sarah Kimani",
        category: "Blockchain",
        tags: JSON.stringify(["Blockchain", "Supply Chain", "Agriculture", "Kenya", "Tokenization"]),
        featured_image: "/images/blog/blockchain-supply-chain.jpg",
        published: true,
        published_at: new Date('2024-02-01T14:30:00Z')
      },
      {
        title: "IoT Predictive Maintenance: Reducing Downtime by 40%",
        slug: "iot-predictive-maintenance-reducing-downtime-40-percent",
        excerpt: "Learn how IoT sensors and machine learning algorithms are helping manufacturing companies predict equipment failures before they happen.",
        content: `# IoT Predictive Maintenance: Reducing Downtime by 40%

In the competitive world of manufacturing, every minute of downtime costs money. Our IoT-powered predictive maintenance solutions are helping companies across East Africa minimize unexpected equipment failures and maximize productivity.

## The Traditional Approach

Most manufacturers still rely on:
- Scheduled maintenance (often unnecessary)
- Reactive repairs (after equipment fails)
- Manual inspections (time-consuming and error-prone)

This approach leads to:
- 30-40% of maintenance budget wasted
- Unexpected downtime costing thousands per hour
- Safety risks from equipment failures

## Our IoT Solution

### Smart Sensors
We deploy industrial-grade sensors that monitor:
- Temperature and vibration patterns
- Oil quality and pressure levels
- Energy consumption anomalies
- Acoustic signatures

### Machine Learning Analytics
Our AI algorithms analyze:
- Historical failure patterns
- Real-time sensor data
- Environmental conditions
- Usage patterns

### Predictive Insights
The system provides:
- 2-4 week advance warning of potential failures
- Optimal maintenance scheduling
- Parts ordering automation
- Performance optimization recommendations

## Real Results

A textile manufacturer in Nairobi saw:
- **40% reduction** in unplanned downtime
- **25% decrease** in maintenance costs
- **15% improvement** in overall equipment effectiveness
- **Zero** safety incidents related to equipment failure

## The Technology Stack

Our solution combines:
- Industrial IoT sensors with 5-year battery life
- Edge computing for real-time processing
- Cloud-based machine learning models
- Mobile and web dashboards for maintenance teams

## Return on Investment

Clients typically see ROI within 8-12 months through:
- Reduced downtime costs
- Lower maintenance expenses
- Extended equipment lifespan
- Improved safety records

## Future Developments

We're currently working on:
- Integration with ERP systems
- Augmented reality maintenance guides
- Automated parts procurement
- Cross-facility predictive models`,
        author: "James Mwangi",
        category: "IoT",
        tags: JSON.stringify(["IoT", "Predictive Maintenance", "Manufacturing", "Machine Learning"]),
        featured_image: "/images/blog/iot-predictive-maintenance.jpg",
        published: true,
        published_at: new Date('2024-02-20T09:00:00Z')
      },
      {
        title: "GMW Tech Group Expands Operations Across East Africa",
        slug: "gmw-tech-group-expands-operations-east-africa",
        excerpt: "GMW Tech Group announces major expansion with new offices in Uganda and Tanzania, bringing cutting-edge technology solutions closer to clients.",
        content: `# GMW Tech Group Expands Operations Across East Africa

We're excited to announce a significant milestone in GMW Tech Group's journey: the opening of new offices in Kampala, Uganda, and Dar es Salaam, Tanzania. This expansion represents our commitment to bringing world-class technology solutions closer to businesses across East Africa.

## Our Growth Story

Since our founding in Nairobi, we've grown from a small team of passionate technologists to a leading provider of AI, blockchain, and IoT solutions across the region. This expansion is driven by:

- **Increasing demand** for digital transformation services
- **Strong client relationships** built over the years
- **Proven track record** of successful implementations
- **Local talent pool** in each new location

## New Office Locations

### Kampala, Uganda
Located in the heart of Kampala's business district, our Uganda office will focus on:
- Financial technology solutions
- Agricultural technology implementations
- Government digitalization projects
- Local talent development programs

### Dar es Salaam, Tanzania
Our Tanzania office will specialize in:
- Port and logistics optimization
- Mining industry solutions
- Energy sector digitalization
- Cross-border trade facilitation

## What This Means for Our Clients

### Enhanced Local Support
- Faster response times
- On-site technical support
- Local language support
- Understanding of regional business practices

### Broader Service Offerings
- 24/7 support coverage across time zones
- Larger talent pool for complex projects
- Regional best practices sharing
- Cross-border solution implementations

### Stronger Partnerships
- Direct relationships with local vendors
- Government and regulatory connections
- University partnerships for research
- Community engagement programs

## Our Team Growth

We're proud to announce that our expansion includes:
- **45 new team members** across both locations
- **12 senior engineers** from leading universities
- **8 project managers** with regional experience
- **5 business development specialists**

## Investment in Local Communities

Beyond business growth, we're committed to:
- **Training programs** for local developers
- **Scholarship opportunities** for technology students
- **Pro-bono projects** for NGOs and social enterprises
- **Tech meetups** and knowledge sharing events

## Looking Ahead

This expansion is just the beginning. Our roadmap includes:
- Research and development centers in each location
- Partnerships with leading regional universities
- Industry-specific solution development
- Exploration of opportunities in other African markets

## Client Success Stories

Already, our expanded presence has enabled us to:
- Complete a major banking digitalization project in Uganda
- Implement supply chain solutions for a mining company in Tanzania
- Facilitate cross-border trade solutions
- Provide 24/7 support for critical systems

We're grateful for the trust our clients have placed in us and excited about the opportunities this expansion brings. Together, we're building the future of technology in East Africa.

*For more information about our services in your region, contact your local GMW Tech Group office.*`,
        author: "GMW Tech Group",
        category: "Company News",
        tags: JSON.stringify(["Company News", "Expansion", "East Africa", "Growth"]),
        featured_image: "/images/blog/gmw-expansion.jpg",
        published: true,
        published_at: new Date('2024-03-01T12:00:00Z')
      },
      {
        title: "Digital Transformation Trends Shaping Africa's Future",
        slug: "digital-transformation-trends-shaping-africa-future",
        excerpt: "An in-depth analysis of the key digital transformation trends that are driving economic growth and innovation across the African continent.",
        content: `# Digital Transformation Trends Shaping Africa's Future

Africa stands at the threshold of a digital revolution that promises to reshape economies, societies, and individual lives across the continent. As we analyze the current landscape and emerging trends, it's clear that digital transformation is not just an option—it's an imperative for sustainable growth and competitiveness.

## The Current State of Digital Africa

### Mobile-First Adoption
Africa has leapfrogged traditional infrastructure limitations:
- **500+ million** mobile internet users
- **80%** of internet access through mobile devices
- **$144 billion** mobile economy contribution to GDP
- Leading the world in mobile money adoption

### Emerging Tech Hubs
Major cities are becoming innovation centers:
- **Nairobi**: FinTech and AgriTech leadership
- **Lagos**: Africa's largest tech ecosystem
- **Cairo**: Enterprise software and e-commerce
- **Cape Town**: Hardware and software development

## Key Transformation Trends

### 1. Financial Inclusion Through FinTech

Digital financial services are revolutionizing banking:
- **Mobile money** serves 400+ million users
- **Blockchain-based** remittances reducing costs by 50%
- **AI-powered** credit scoring for the unbanked
- **Digital insurance** products reaching rural communities

### 2. Agricultural Technology Revolution

AgriTech solutions addressing food security:
- **Satellite imagery** for crop monitoring
- **IoT sensors** for precision farming
- **Blockchain** supply chain transparency
- **AI-driven** weather prediction systems

### 3. Healthcare Digitalization

Telemedicine and digital health expanding access:
- **Remote consultations** serving rural areas
- **AI diagnostics** improving accuracy
- **Digital health records** system integration
- **Drone delivery** for medical supplies

### 4. Education Technology Expansion

EdTech bridging educational gaps:
- **Online learning platforms** reaching millions
- **Mobile-based** literacy programs
- **AR/VR** enhanced learning experiences
- **AI tutoring** systems for personalized education

### 5. Smart City Development

Urban areas implementing smart solutions:
- **Traffic management** systems reducing congestion
- **Waste management** optimization
- **Energy grid** smart monitoring
- **Water quality** real-time tracking

## Industry-Specific Transformations

### Manufacturing
- **Industry 4.0** adoption increasing
- **IoT integration** in production lines
- **Supply chain** digitalization
- **Quality control** automation

### Retail and E-commerce
- **Online marketplaces** growing 40% annually
- **Last-mile delivery** innovations
- **Digital payment** integration
- **Customer analytics** driving personalization

### Energy Sector
- **Renewable energy** smart grids
- **Energy trading** platforms
- **Consumption monitoring** systems
- **Predictive maintenance** for infrastructure

## Challenges and Opportunities

### Infrastructure Challenges
- Internet connectivity gaps in rural areas
- Power supply reliability issues
- Limited fiber optic network coverage
- High data costs in some regions

### Skills Gap
- Digital literacy training needs
- Technical talent shortage
- Educational curriculum updates required
- Professional development programs

### Regulatory Environment
- Data protection frameworks developing
- Cross-border digital trade policies
- Cybersecurity regulations evolving
- Innovation-friendly policies needed

## The Role of Public-Private Partnerships

Successful digital transformation requires collaboration:
- **Government** providing regulatory framework
- **Private sector** driving innovation
- **International organizations** funding initiatives
- **Educational institutions** developing talent

## Future Predictions

### Next 5 Years
- **5G network** deployment across major cities
- **Artificial Intelligence** mainstream adoption
- **Internet of Things** connecting 10 billion devices
- **Digital currencies** government implementations

### Long-term Vision
- **Digital economy** contributing 50%+ to GDP
- **Universal internet access** across the continent
- **AI-powered governance** improving public services
- **Cross-border digital integration** enhancing trade

## GMW Tech Group's Role

As a technology leader, we're contributing to this transformation through:

### Innovation
- Developing Africa-specific solutions
- Investing in R&D capabilities
- Creating intellectual property
- Building technology ecosystems

### Capacity Building
- Training local talent
- Knowledge transfer programs
- University partnerships
- Community outreach initiatives

### Implementation
- Enterprise digital transformation
- Government digitalization projects
- SME technology adoption
- Startup ecosystem support

## Call to Action

The digital transformation of Africa is not a distant future—it's happening now. Organizations that embrace this change will thrive, while those that resist will struggle to remain relevant.

Key steps for businesses:
1. **Assess** current digital maturity
2. **Develop** comprehensive transformation strategy
3. **Invest** in technology and talent
4. **Partner** with experienced providers
5. **Measure** and iterate continuously

The future of Africa is digital, and that future is being written today. Join us in shaping this exciting transformation.

*Contact GMW Tech Group to discuss how we can support your digital transformation journey.*`,
        author: "Dr. Michael Wanjiku",
        category: "Industry Insights",
        tags: JSON.stringify(["Digital Transformation", "Africa", "Technology Trends", "Innovation"]),
        featured_image: "/images/blog/digital-transformation-africa.jpg",
        published: true,
        published_at: new Date('2024-03-15T11:00:00Z')
      }
    ];

    // Sample company stats data
    const sampleCompanyStats = [
      {
        metric_name: "Projects Completed",
        metric_value: "250+",
        display_order: 1,
        active: true
      },
      {
        metric_name: "Happy Clients",
        metric_value: "150+",
        display_order: 2,
        active: true
      },
      {
        metric_name: "Countries Served",
        metric_value: "5",
        display_order: 3,
        active: true
      },
      {
        metric_name: "Years of Experience",
        metric_value: "8+",
        display_order: 4,
        active: true
      },
      {
        metric_name: "Team Members",
        metric_value: "75+",
        display_order: 5,
        active: true
      },
      {
        metric_name: "AI Models Deployed",
        metric_value: "120+",
        display_order: 6,
        active: true
      }
    ];

    // Insert blog posts
    const blogResults = await db.insert(blogPostsTable)
      .values(sampleBlogPosts.map(post => ({
        ...post,
        published_at: post.published_at || null
      })))
      .returning()
      .execute();

    // Insert company stats
    const statsResults = await db.insert(companyStatsTable)
      .values(sampleCompanyStats)
      .returning()
      .execute();

    return {
      success: true,
      message: `Sample data seeded successfully. Created ${blogResults.length} blog posts and ${statsResults.length} company stats.`
    };
  } catch (error) {
    console.error('Sample data seeding failed:', error);
    throw error;
  }
};