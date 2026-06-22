// LocalPulse mock data — hyper-local for "Joe's Plumbing" in "Spartanburg, SC"

export type PillarType = "Educational" | "Promotional" | "Community";
export type DeliveryStatus = "Pending" | "Approved" | "Published" | "Failed";
export type IntentScore = "High Intent" | "General";
export type LeadStatus = "Unanswered" | "Replied";

export type QueuePost = {
  id: string;
  pillarType: PillarType;
  captionText: string;
  imageGradient: string;
  scheduledFor: string;
  deliveryStatus: DeliveryStatus;
};

export type Lead = {
  id: string;
  customerName: string;
  platformSource: string;
  messageSnippet: string;
  intentScore: IntentScore;
  urgencyTag?: string;
  aiSuggestedReply: string;
  status: LeadStatus;
};

export type Review = {
  id: string;
  reviewerName: string;
  ratingStars: number;
  reviewText: string;
  aiSeoResponse: string;
  isPosted: boolean;
};

export type LocalTrend = {
  id: string;
  icon: string;
  text: string;
};

export function generateQueuePosts(businessName: string, targetLocale: string): QueuePost[] {
  return [
    {
      id: "post-1",
      pillarType: "Educational",
      captionText: `Is your water heater ready for winter? ${businessName} is ${targetLocale}'s most trusted team for fast, affordable repairs. Call us today! ☎️ #${targetLocale.replace(/[^a-zA-Z]/g, "")}Plumber #LocalPro`,
      imageGradient: "from-cyan-900 via-blue-900 to-slate-900",
      scheduledFor: "Today at 10:00 AM",
      deliveryStatus: "Pending",
    },
    {
      id: "post-2",
      pillarType: "Promotional",
      captionText: `🔧 Special offer this week! ${businessName} is offering 15% off all drain cleaning services in ${targetLocale}. Limited slots available — book now before they're gone! #${targetLocale.replace(/[^a-zA-Z]/g, "")}Deals`,
      imageGradient: "from-purple-900 via-indigo-900 to-slate-900",
      scheduledFor: "Tomorrow at 9:00 AM",
      deliveryStatus: "Pending",
    },
    {
      id: "post-3",
      pillarType: "Community",
      captionText: `Proud to serve the ${targetLocale} community! ${businessName} has been keeping local homes and businesses flowing for years. Thank you for trusting us! 🏡❤️ #${targetLocale.replace(/[^a-zA-Z]/g, "")}Local #CommunityFirst`,
      imageGradient: "from-green-900 via-teal-900 to-slate-900",
      scheduledFor: "Wed at 11:00 AM",
      deliveryStatus: "Pending",
    },
    {
      id: "post-4",
      pillarType: "Educational",
      captionText: `🧊 Frozen pipes can cause thousands in damage! Here are 3 ways to protect your home this winter — courtesy of ${businessName}, ${targetLocale}'s emergency plumbing experts. DM us for a free assessment! #WinterPlumbing`,
      imageGradient: "from-blue-900 via-cyan-900 to-slate-900",
      scheduledFor: "Thu at 8:30 AM",
      deliveryStatus: "Pending",
    },
  ];
}

export function generateLeads(businessName: string, targetLocale: string): Lead[] {
  return [
    {
      id: "lead-1",
      customerName: "Marcus Johnson",
      platformSource: "Facebook",
      messageSnippet: "Hey, how much do you charge for a water heater install?",
      intentScore: "High Intent",
      aiSuggestedReply: `Hi Marcus! Thanks for reaching out to ${businessName}. Water heater installation typically ranges from $800–$1,500 depending on the unit type and your current setup. I'd love to give you an accurate quote — can I swing by for a quick assessment? We offer same-week appointments in ${targetLocale}! Give us a call or reply here. 💧`,
      status: "Unanswered",
    },
    {
      id: "lead-2",
      customerName: "Sarah K.",
      platformSource: "Instagram",
      messageSnippet: "Do y'all service the Boiling Springs area?",
      intentScore: "High Intent",
      aiSuggestedReply: `Hey Sarah! Yes, ${businessName} proudly serves Boiling Springs and the surrounding ${targetLocale} area! We can typically schedule a visit within 24–48 hours. What's the plumbing issue you're dealing with? We're here to help! 🔧`,
      status: "Unanswered",
    },
    {
      id: "lead-3",
      customerName: "Derek Williams",
      platformSource: "Facebook",
      messageSnippet: "Love your posts! Very helpful.",
      intentScore: "General",
      aiSuggestedReply: `Thanks so much, Derek! We love sharing useful plumbing tips for the ${targetLocale} community. If you ever need a hand with anything around the house, ${businessName} is always just a message away! 😊`,
      status: "Unanswered",
    },
    {
      id: "lead-4",
      customerName: "Amanda T.",
      platformSource: "Google",
      messageSnippet: "What are your weekend hours?",
      intentScore: "General",
      aiSuggestedReply: `Hi Amanda! ${businessName} is available Monday–Saturday 7AM–7PM, and we offer emergency services 24/7 for urgent situations. For a weekend appointment, just give us a call or book online. Happy to help! ☎️`,
      status: "Unanswered",
    },
    {
      id: "lead-5",
      customerName: "Tom Richards",
      platformSource: "Instagram",
      messageSnippet: "My pipes froze last night, how soon can you come?",
      intentScore: "High Intent",
      urgencyTag: "Emergency",
      aiSuggestedReply: `Tom, we're on it! ${businessName} handles frozen pipe emergencies in ${targetLocale} — call us RIGHT NOW at our emergency line. We can typically dispatch within 1–2 hours. Do NOT run hot water through frozen pipes as this can cause bursting. Stay warm and we'll be there ASAP! 🚨`,
      status: "Unanswered",
    },
  ];
}

export function generateReviews(businessName: string, targetLocale: string): Review[] {
  return [
    {
      id: "review-1",
      reviewerName: "Robert M.",
      ratingStars: 5,
      reviewText: "Joe fixed our burst pipe in under an hour. True professional!",
      aiSeoResponse: `Thank you so much, Robert! We're thrilled we could help resolve your burst pipe emergency so quickly. At ${businessName}, fast response times in ${targetLocale} are our top priority. We appreciate your kind words and look forward to serving you again whenever you need us! 🔧`,
      isPosted: false,
    },
    {
      id: "review-2",
      reviewerName: "Linda H.",
      ratingStars: 5,
      reviewText: "Best plumber in Spartanburg, hands down.",
      aiSeoResponse: `What a wonderful compliment, Linda! We work hard every day to be the best plumbing service in ${targetLocale}, and reviews like yours mean the world to our team. Thank you for trusting ${businessName} — we're here whenever you need us! ⭐`,
      isPosted: false,
    },
    {
      id: "review-3",
      reviewerName: "Gary T.",
      ratingStars: 4,
      reviewText: "Good work, arrived a bit late but fixed everything perfectly.",
      aiSeoResponse: `Thank you for the honest feedback, Gary! We're glad the repair was done right, and we sincerely apologize for the delay. We're always working to improve punctuality for all our ${targetLocale} customers. Your satisfaction is our top priority at ${businessName}! 🙏`,
      isPosted: false,
    },
    {
      id: "review-4",
      reviewerName: "Susan P.",
      ratingStars: 5,
      reviewText: "Emergency call at 11pm and they still showed up. Amazing service!",
      aiSeoResponse: `Susan, we're so glad we could be there when you needed us most! ${businessName} is committed to 24/7 emergency plumbing service throughout ${targetLocale} because we know plumbing emergencies don't wait for business hours. Thank you for the wonderful review — it truly motivates our entire team! 💪`,
      isPosted: false,
    },
    {
      id: "review-5",
      reviewerName: "Mike D.",
      ratingStars: 3,
      reviewText: "Job was okay, communication could be better.",
      aiSeoResponse: `Hi Mike, thank you for taking the time to leave feedback. We hear you — clear communication is something we're actively improving at ${businessName}. We're sorry your experience didn't fully meet your expectations, and we'd love the opportunity to make it right. Please don't hesitate to reach out directly. Your feedback helps us serve ${targetLocale} better! 📞`,
      isPosted: false,
    },
  ];
}

export function generateLocalTrends(targetLocale: string): LocalTrend[] {
  const city = targetLocale.split(",")[0].trim();
  return [
    {
      id: "trend-1",
      icon: "⚠️",
      text: `Winter weather warning in ${city} next week: Perfect timing to promote freeze protection & pipe insulation tips!`,
    },
    {
      id: "trend-2",
      icon: "🎉",
      text: `${city} Fall Festival this weekend: Great opportunity to post community support content!`,
    },
  ];
}
