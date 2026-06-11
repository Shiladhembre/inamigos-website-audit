export interface SectionAnalysis {
  visualUI: string;
  uxFriction: string;
  trustContent: string;
  suggestions: string[];
}

export interface ScreenshotData {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  analysis: SectionAnalysis;
  heuristicScores: {
    visual: number;
    ux: number;
    trust: number;
    technical: number;
  };
  hotspots: {
    x: number; // percentage
    y: number; // percentage
    title: string;
    description: string;
    impact: 'Low' | 'Medium' | 'High';
  }[];
  beforeTraits: {
    label: string;
    value: string;
  }[];
  afterTraits: {
    label: string;
    value: string;
  }[];
}

export const auditData: ScreenshotData[] = [
  {
    id: "screenshot-1",
    title: "1. Homepage & Top Navigation Header",
    subtitle: "The user's first touchpoint: Brand identity, central navigation, and first hero fold.",
    url: "inamigosfoundation.org.in/",
    heuristicScores: {
      visual: 45,
      ux: 52,
      trust: 58,
      technical: 50
    },
    beforeTraits: [
      { label: "Top Bar", value: "Primary neon-green (#00E676), high visual irritation" },
      { label: "Email Contact", value: "Raw, unstyled text icon inside top bar" },
      { label: "Social Linkage", value: "Includes long-dead Google+ (G+) icon" },
      { label: "Logo Grid", value: "Small, off-center height alignment" },
      { label: "Hero Copy", value: "UDAAN - plain sans-serif directly over images" },
      { label: "Contrast", value: "Low readability against white shirt/books backdrop" }
    ],
    afterTraits: [
      { label: "Top Bar", value: "Slate-900 / dark graphite background with light secondary typography" },
      { label: "Interactive Layout", value: "Flexbox spacing with micro-icons and clean margins" },
      { label: "Modern Socials", value: "Removed Google+; added LinkedIn, YouTube, Instagram" },
      { label: "Logo Hierarchy", value: "Larger logo with strict horizontal centerlines" },
      { label: "Text Layering", value: "Added text-shadow & a smooth linear-gradient backdrop overlay" },
      { label: "Font Settings", value: "'Outfit' display fonts paired with clean 'Inter' sub-text" }
    ],
    hotspots: [
      {
        x: 20,
        y: 6,
        title: "Saturated Top-Bar Background",
        description: "The pure neon carbon-green creates extreme eye strain and violates standard accessibility contrast requirements for dark text on bright grids.",
        impact: "Medium"
      },
      {
        x: 79,
        y: 6,
        title: "Outdated Google+ (G+) Icon",
        description: "The Google+ service was discontinued in 2019. Retaining its logo signalizes a stale, unmaintained website skeleton, undermining trust.",
        impact: "High"
      },
      {
        x: 9,
        y: 15,
        title: "Logo Scaling Issues",
        description: "The brand logo is compressed into a tiny container without proper padding, resulting in lost readable detail on standard layouts.",
        impact: "Medium"
      },
      {
        x: 50,
        y: 50,
        title: "Direct Overlay on Face Elements",
        description: "The main hero title 'Soaring Towards a Brighter Future' runs directly across the faces of the children in the photograph with zero scrim, overlay, or text contrast backing. This severely reduces layout clarity.",
        impact: "High"
      }
    ],
    analysis: {
      visualUI: `### 1. Visual/UI Review
*   **Theming & Color Palette:** The top banner employs an extremely saturated, pure primary green (\`#00e676\` range) that distracts from the core branding. This color clashes with the softer, natural palette of the slider photograph beneath it.
*   **Grid Alignment & Spacing:** The brand logo lacks a defined bounding-box alignment with the navigation menu. The menu items themselves ("Home", "Causes", etc.) run horizontally across the white background with default-like margins, which creates a sparse, unfinished appearance.
*   **Typography Hierarchy:** The homepage hero image shows the text "UDAAN" and "Soaring Towards a Brighter Future" directly over a live, multi-colored portrait. Since the title font is a basic thin-to-medium sans-serif layout without text shading, a backing scrim, or a dark linear gradient card behind it, the white letters disappear entirely where they overlap with lighter portrait clothes and skin tones.
*   **Image Presentation:** The hero photo slider uses simple circular arrow shapes that look dated and lack proper alignment within the visual fold. The child photo is highly engaging but has not been visually treated with professional color grading or overlay filters to optimize for overlay text placement.`,
      uxFriction: `### 2. User Experience (UX) & Friction Points
*   **Low Contrast Readability Barriers:** Immediate cognitive fatigue is induced when visitors strive to read the hero message. Text readability is a critical gatekeeper for high conversion.
*   **Obsolete Interactive Prompts:** The presence of a Google+ (G+) icon in the header's social links causes direct friction. Active users who click it will either be met with a 404 error or discover that the link does not work, which suggests the organization is inactive or neglected.
*   **Unresponsive Slider Mechanics:** The navigation arrow icons on the left and right borders of the hero carousel do not have a defined hover area. They are too small for seamless clicks on desktop touch-pads or modern narrow screen structures, creating friction.
*   **Cluttered Navigation Structure:** Placing eight equivalent link pathways ("Home", "Causes", "About Us", "Volunteers", "Gallery", "Blog", "Events", "Contact") on the primary line without sub-menus creates substantial visual noise. It slows down the time-to-decision for prospective corporate sponsors.`,
      trustContent: `### 3. Content & Trust Analysis
*   **Communication Value Proposition:** The headline *"Soaring Towards a Brighter Future"* is warm but generic. It fails to convey the *concrete action mechanism* of the organization within the critical first 3 seconds of contact.
*   **Generic Contact Identifiers:** Stating a single support email (\`support@inamigosfoundation.org.in\`) without physical branch offices, registered certification numbers, or immediate telephone contacts in the header reduces the professional gravity of the NGO.
*   **Missing Trust Frameworks:** For corporate social responsibility (CSR) directors, a professional header should contain a highly visible, secondary CTA button leading directly to "Verify Registration" (80G/12A/CSR status), which is currently buried or missing altogether from the entry fold.`,
      suggestions: [
        "Incorporate a 35% dark visual linear gradient overlay (#000000 to transparent) across the bottom and middle of the hero container to guarantee AA/AAA text legibility regardless of the carousel image background.",
        "Change the top banner color from neon-green to a sophisticated deep charcoal gray (#1F2937) or navy, featuring a high-contrast white e-mail link in clean, light weight typography.",
        "Remove the Google+ social icon immediately; update the row with modern links to YouTube, LinkedIn, or Instagram using light svg elements with transition hovers.",
        "Consolidate the header links by moving 'Gallery', 'Volunteers', and 'Events' into a neat drop-down menu, clearing visual clutter and creating room for a high-priority, contrasting 'Donate Now' or 'CSR Partnerships' CTA button."
      ]
    }
  },
  {
    id: "screenshot-2",
    title: "2. Core Projects & Initiatives Catalog",
    subtitle: "How the NGO showcases current activities, community campaigns, and ongoing projects.",
    url: "inamigosfoundation.org.in/events",
    heuristicScores: {
      visual: 58,
      ux: 50,
      trust: 64,
      technical: 54
    },
    beforeTraits: [
      { label: "Card Layout", value: "Simple 3-column flex grid with default white shadow properties" },
      { label: "Badges", value: "Primary flat neon-green ribbons blocky against image boundaries" },
      { label: "Headers", value: "High-saturation primary green links with default sizes" },
      { label: "Buttons", value: "Lowercase un-rounded 'read more' green rectangular panels" },
      { label: "Calendar", value: "Basic green outline with raw text dates" },
      { label: "Back-to-top", value: "Flat saturated green box on a fixed side coordinate" }
    ],
    afterTraits: [
      { label: "Card Elevation", value: "Smoothed transitions, refined padding-bottom, shadow-sm" },
      { label: "Floating Badges", value: "Semi-transparent dark or vibrant organic accent pills with inner spacing" },
      { label: "Card Headers", value: "Refined dark slate titles, uppercase tracking weights" },
      { label: "Modern CTAs", value: "Pill-nested interactive buttons with subtle hover scales" },
      { label: "Date Elements", value: "Integrated metadata row with subtle icon colors" },
      { label: "Up Trigger", value: "Polished circular button with sleek upward arrow transition" }
    ],
    hotspots: [
      {
        x: 16,
        y: 53,
        title: "Blocky Tag Alignment",
        description: "The 'Community' tag is pinned flush dynamically against the image element but has flat corners that clash with the card's general rounded border styles.",
        impact: "Low"
      },
      {
        x: 20,
        y: 83,
        title: "Lowercase UI Text Button",
        description: "The 'read more' button is written in raw lowercase, reducing the call-to-action authority. Button style lacks standard padding and modern font treatment.",
        impact: "Medium"
      },
      {
        x: 94,
        y: 86,
        title: "Generic Back-To-Top Trigger",
        description: "A hard, solid rectangular box pinned in the corner with no hover, shadow depth, or round outline represents an outdated layout style.",
        impact: "Low"
      },
      {
        x: 75,
        y: 35,
        title: "Inconsistent Image Treatment",
        description: "Card images alternate heavily between 3D cartoon renders (left), grayscale real photos (middle), and complex scrapbooked photo collages (right). This lacks brand cohesion.",
        impact: "High"
      }
    ],
    analysis: {
      visualUI: `### 1. Visual/UI Review
*   **Card Composition & Elevation:** While the cards feature rounded top borders, they lack elegant drop-shadow treatment or gradient borders. The white card backgrounds merge with the light layout structure, making the section feel flat.
*   **Aesthetic Styling & Accents:** The categories ("Community", "Education") are presented as flat, rectangular neon-green elements placed directly on the image boundaries. This blocks part of the images and contradicts the card's rounded design language.
*   **Typography Sizing:** Headings like *"World Water Day 2025"* use a vibrant green typography tone. Although this provides clear visual contrast, color alone is relied on too heavily for visual hierarchy. The calendar date icons are placed directly adjacent to the body prose without sufficient line-height balancing.
*   **Media Consistency Issues:** There is a notable lack of visual cohesion among the images. The first card uses a high-contrast 3D cartoon render; the second implements an emotional grayscale real-life photo; the third displays a yellow scrapbook photo collage. Mixing these styles disrupts the site's overall look.`,
      uxFriction: `### 2. User Experience (UX) & Friction Points
*   **Repetitive, Style-less CTAs:** Each active card displays a basic button labeled under lowercase text as *"read more"*. The flat, unpadded green button design resembles static elements, which can confuse users and discourage clicks.
*   **Unclear Date Ordering:** The cards present dates like "22 March 2025" and "20 March 2025" alongside "11 February 2025". However, they are not arranged in a clear chronological order or filtered by status (such as "Upcoming" or "Past Event"). This lack of organization forces the user to search for context.
*   **Lack of Hover Interactivity:** Placing a cursor over the cards does not trigger positive feedback cues (such as a subtle zoom, lift, or background tint transition). This makes the interface feel slow and unresponsive.`,
      trustContent: `### 3. Content & Trust Analysis
*   **Impersonal Body Prose:** The description copy for each active container is brief and generic (e.g., *"This event highlights the importance of water conservation..."*). It fails to state *what InAmigos Foundation actually achieved* during the event, reducing its social proof.
*   **No Engagement Indicators:** There are no visual stats or social markers (e.g., *"150 Volunteers Jointed"* or *"400 Liters Distributed"*) on these event cards. This omission can make corporate sponsors feel the events are simulated rather than real.
*   **Unclear Direct Action:** After reading these briefs, it is unclear where the visitor goes next. Does the "read more" link open a detailed blog post, a register sheet, an official receipt, or a social media update?`,
      suggestions: [
        "Create visual consistency for card media by applying a subtle grayscale gradient or standard border curve to all images. Ensure they share an identical 16:9 aspect ratio.",
        "Convert category tags into elegant floating badges with rounded pills, light semitransparent black backgrounds, and subtle crisp white text positioned inside the bottom frame.",
        "Change the CTA button text to an uppercase, medium-weight style (e.g., 'Learn More' or 'View Campaign Progress') and style it with sleek rounded borders, a subtle hover lift transition, and a shadow.",
        "Add key quantitative metrics along the bottom edge of each project card (e.g., 'Impact: 200+ Lives' or 'Status: Active Campaign') in small, neat gray typography."
      ]
    }
  },
  {
    id: "screenshot-3",
    title: "3. Volunteer Overview & Gallery",
    subtitle: "A critical directory page representing the lifeblood of the community: active volunteers.",
    url: "inamigosfoundation.org.in/volunteers",
    heuristicScores: {
      visual: 38,
      ux: 41,
      trust: 50,
      technical: 45
    },
    beforeTraits: [
      { label: "Banner Section", value: "Massive solid black block occupying massive viewport height" },
      { label: "Title Design", value: "Symmetric plain white text without subheadings or stats" },
      { label: "Grid Interface", value: "Tight column margins pressing pictures tightly against borders" },
      { label: "Image Cropping", value: "Varying heights, direct sharp edges, no surrounding context" },
      { label: "Social Cards", value: "Entirely absent; no links, social handles, or roles provided" },
      { label: "Information", value: "Zero text identifying names or regions for listed volunteers" }
    ],
    afterTraits: [
      { label: "Banner Design", value: "Subtle soft gray or light ambient background with organic patterns" },
      { label: "Title Typography", value: "Clean 'Outfit' font paired with key structural statistics" },
      { label: "Grid Padding", value: "Generous 24px layout margins providing breathing room" },
      { label: "Image Presentation", value: "Balanced circular profile circles or rounded-corner cards with elegant frames" },
      { label: "Visual Badges", value: "Added dynamic sub-labels indicating roles and states" },
      { label: "Text Elements", value: "Display name, city, and active year beneath each volunteer profile" }
    ],
    hotspots: [
      {
        x: 50,
        y: 35,
        title: "Excessive Negative Space (Dark Banner)",
        description: "The giant black block occupies over 40% of the viewport height but conveys only one word of text: 'Volunteers'. This creates visual emptiness and wastes valuable real estate.",
        impact: "Medium"
      },
      {
        x: 27,
        y: 85,
        title: "Tightly Jammed Grid Cards",
        description: "The portrait photographs are cropped directly against each other without grid margins. The sharp, plain boundaries look unfinished.",
        impact: "Medium"
      },
      {
        x: 50,
        y: 95,
        title: "Absence of Profiles & Names",
        description: "Displaying faces without names, departments, or active volunteer bios looks like a generic template rather than an authentic, human-centric NGO.",
        impact: "High"
      },
      {
        x: 50,
        y: 49,
        title: "Basic Low-Contrast Breadcrumbs",
        description: "The microscopic 'Home / Volunteers' breadcrumb is flat and difficult to read against the black backdrop, creating a navigation dead end.",
        impact: "Low"
      }
    ],
    analysis: {
      visualUI: `### 1. Visual/UI Review
*   **Theming & Negative Space:** The page header features a massive, dark black rectangle that dominates the screen. This large dark block feels disconnected from the site's otherwise light, green-tinted design, creating an abrupt visual transition.
*   **Typography:** The word *"Volunteers"* is centered in white sans-serif text. The layout lacks visual Polish, such as varying line weights or subtle border rules, which leaves the header looking plain and simple.
*   **Image Alignment & Frames:** Under the dark block, the volunteer portrait photos are placed side-by-side with minimal spacing. Sharp outer corners and uneven vertical cropping make the grid feel disjointed, like a simple array of image files rather than a curated gallery.
*   **Color Composition:** The abrupt transition from a dark header banner directly into bright, unedited portrait photos is visually jarring. It creates a stark, disjointed presentation.`,
      uxFriction: `### 2. User Experience (UX) & Friction Points
*   **Wasted Viewport Space:** Moving from the homepage into the Volunteers section forces the user to scroll past a large, content-empty dark block. This layout pushes the core content—the volunteers themselves—below the primary field of view.
*   **Lack of Card Context:** Clicking on a volunteer's photo does not open a bio or details page. The absence of hovering card effects or clickable links limits interaction, turning what should be an engaging gallery into a static, unresponsive list.
*   **Missing Navigation Aids:** The breadcrumbs ("Home / Volunteers") are small and thin, which makes them difficult to read against the deep black background. This reduces their utility as a navigation aid.`,
      trustContent: `### 3. Content & Trust Analysis
*   **Lack of Authenticity Indicators:** Displaying unidentified portraits without names, active roles, or hometowns can make visitors skeptical. Without this basic context, the gallery can feel like page placeholder content or stock photography.
*   **Missing Voice of the Community:** The page lacks quotes, testimonials, or stories from the volunteers. Sharing *why* these individuals choose to serve with InAmigos is crucial for building trust with new supporters.
*   **No Next-Step Engagement:** There is no clear way to get involved on this page. If a visitor is inspired by the volunteers, they have to search the main menu for a sign-up link instead of being presented with a clear action here.`,
      suggestions: [
        "Replace the large black header banner with a light, warm gray background. Use an elegant, low-opacity pattern of overlaid hands or trees to soften the presentation.",
        "Add an engaging sub-heading under the main title (e.g., 'Meet the passionate change-makers driving our daily initiatives forward. Join our growing network of 500+ active change-makers!').",
        "Structure the grid with 16px of clear margin padding between cards. Use elegant white card outlines, slightly rounded image corners, and a light-gray border trim.",
        "Include a simple text block underneath each photo showing the volunteer's full name, role (e.g., 'Lead Educator'), and a brief, inspiring quote about their experience."
      ]
    }
  },
  {
    id: "screenshot-4",
    title: "4. Volunteer Registration & Claims",
    subtitle: "The registration flow: Displaying critical government credentials and compliance.",
    url: "docs.google.com/forms/...",
    heuristicScores: {
      visual: 30,
      ux: 28,
      trust: 48,
      technical: 40
    },
    beforeTraits: [
      { label: "Host Domain", value: "External Google Forms URL (docs.google.com)" },
      { label: "Header Art", value: "Basic pre-set vector hands illustration" },
      { label: "Content Block", value: "Plain list layout of key NGO credentials" },
      { label: "Visual Hierarchy", value: "Unformatted bullet lists without distinct badges or seals" },
      { label: "Data Safety", value: "Unstructured redirect with no clear privacy statements" },
      { label: "Group Redirect", value: "Note mandate forcing submission to an external WhatsApp group" }
    ],
    afterTraits: [
      { label: "Form Integration", value: "Custom-built volunteer form nested within the main professional domain" },
      { label: "Visual Theme", value: "Consistent branding with custom high-contrast CSS and corporate colors" },
      { label: "Compliance Seals", value: "Structured grid featuring high-resolution badges for 80G, 12A, NGO Darpan, etc." },
      { label: "Security Badges", value: "HTTPS/SSL padlock markers, detailed secure database disclosures" },
      { label: "User Privacy", value: "Secure login flow, explicit data collection permissions, and Opt-In toggles" },
      { label: "Team Comms", value: "Official automated email confirmation with secure calendar invites" }
    ],
    hotspots: [
      {
        x: 50,
        y: 7,
        title: "Generic Form Header Artwork",
        description: "The cartoon hand graphic is a standard Google Forms pre-set design. This looks generic to corporate sponsors seeking a professional CSR partnership.",
        impact: "Medium"
      },
      {
        x: 50,
        y: 2,
        title: "External Domain Redirect",
        description: "Hosting the registration on docs.google.com rather than the foundation's own domain ('inamigosfoundation.org.in/join') reduces trust and breaks the visual branding.",
        impact: "High"
      },
      {
        x: 42,
        y: 43,
        title: "Plain Text Credential Badges",
        description: "Critical credentials like ISO 9001:2015, NGO DARPAN, and 80G/12A status are listed as plain, unformatted text. This misses an opportunity to show off authoritative badges or seals of certification.",
        impact: "High"
      },
      {
        x: 50,
        y: 65,
        title: "Mandate to Join WhatsApp Group",
        description: "The requirement: 'mandatory for all to join that group' raises privacy concerns. Making a WhatsApp group join link automatic and public can expose personal phone numbers.",
        impact: "High"
      }
    ],
    analysis: {
      visualUI: `### 1. Visual/UI Review
*   **Template Design Constraints:** The form is hosted on Google Forms instead of the official domain. The standard gray-blue layout, basic text hierarchy, and preset fonts limit custom branding.
*   **Header Selection:** The header illustration—a cartoon of colorful hands—feels generic. It does not align with the professional tone expected of an NGO holding official certifications like ISO 9001:2015.
*   **Lack of Visual Badging:** The NGO's notable credentials (e.g., 80G & 12A Status, NGO DARPAN, CSR-1) are presented as a simple bulleted list in plain text. This presentation misses the opportunity to display official seals, certificate badges, or verification graphics.
*   **Structure & Spacing:** The layout features basic spacing without distinct sections for Personal Info, Core Motivations, and Certification agreement. This uniform look makes the form feel long and unappealing.`,
      uxFriction: `### 2. User Experience (UX) & Friction Points
*   **Off-Site Navigation Redirect:** Redirecting users from the official website to an external Google Form breaks the user journey. It creates confusion and may prompt security concerns for visitors unexpected of the change.
*   **Privacy & Data Collection:** The form asks for sensitive personal details in a public format without a clear, accessible Privacy Policy or explanations of how the data will be secured.
*   **Mandatory WhatsApp Group Placement:** The instruction requiring members to click an automatic link to join a WhatsApp group can feel coercive. Broad, un-moderated list access exposes user phone numbers to other members, raising privacy issues.
*   **No Auto-fill Support:** An external Google Form cannot easily pull user details from previous interactions on the main site. This lack of integration forces the applicant to re-type basic information, increasing form abandonment rates.`,
      trustContent: `### 3. Content & Trust Analysis
*   **Credential Verification Hurdles:** Listed claims like NITI Aayog/DARPAN registration are valuable, but the text lacks outbound links to the government databases. This omission makes verify these claims difficult for corporate legal teams.
*   **Unclear Processing Timelines:** The copy does not explain *how long* applicant reviews will take or *who* will contact them next, which can cause applicants to feel unsure about the process.
*   **Informal Compliance Language:** Phrases like *"mandatory for all to join"* feel informal. Using more encouraging, community-focused phrasing would be more fitting for a professional volunteer program.`,
      suggestions: [
        "Embed a custom-designed, multi-step registration form directly within the 'inamigosfoundation.org.in/volunteer' page to keep the experience branded and secure.",
        "Present the NGO's compliance credentials (80G, NGO DARPAN, CSR-1) as a structured grid of high-quality, verified trust badges and seals.",
        "Add a clear, transparent Privacy Notice checkbox at the bottom of the form to comply with data privacy standards and reassure professional partners.",
        "Replace the mandatory WhatsApp group redirect with a secure, automated email confirmation system that welcomes applicants professionally with next-steps."
      ]
    }
  }
];

export const technicalSEOAnalysis = {
  webpCompression: {
    title: "Modern Image Packaging (.webp)",
    rating: "Sub-Optimal",
    impact: "High",
    current: "The platform delivers high-resolution images in uncompressed .jpg/.png formats directly, causing prolonged image download sequences.",
    recommendation: "Convert all assets to WebP format. Set a dynamic srcset configuration to load lighter weights on narrow mobile screens, reducing the initial load size by up to 75%."
  },
  responsiveness: {
    title: "Mobile Optimization & Viewport Adaptation",
    rating: "Moderate",
    impact: "High",
    current: "The grid elements scale down on mobile screens, but navigation lists collapse into long, vertical lists rather than clean hamburger menus. Large banners waste space on mobile views.",
    recommendation: "Build layout structures with a mobile-first approach using responsive classes (e.g., md:grid-cols-3, lg:grid-cols-4). Simplify long headers on mobile with a clean, slide-out side menu."
  },
  pageSpeed: {
    title: "Asset Loading Speed",
    rating: "Poor (Est: 42/100)",
    impact: "Critical",
    current: "Heavy page weights from uncompressed slider images, unminified script files, and external Google Fonts calls delay the initial content render.",
    recommendation: "Apply lazy loading (loading='lazy') to below-the-fold images. Compress CSS files using Tailwind's compiler, and cache static assets through a Content Delivery Network (CDN) to improve speed."
  },
  trustSignals: {
    title: "Domain Authority & SEO Trust Signals",
    rating: "Low-Medium",
    impact: "High",
    current: "Critical compliance records (80G, 12A, NGO DARPAN) are listed as plain text instead of formatted metadata, which misses an opportunity to improve search rankings for compliance-related terms.",
    recommendation: "Structure of key credentials should use JSON-LD Schema.org 'NGO' structured metadata. Link claims directly to governmental source directories, strengthening domain relevance with high-quality outbound links."
  }
};
