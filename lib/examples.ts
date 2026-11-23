import { MessageChannel } from "@/types/analysis";

export interface ExampleMessage {
  id: string;
  title: string;
  channel: MessageChannel;
  categoryLabel: string;
  expectedRisk: "High" | "Medium" | "Low";
  preview: string;
  text: string;
}

export const SAMPLE_MESSAGES: ExampleMessage[] = [
  {
    id: "bank-otp",
    title: "Urgent Bank Security Alert",
    channel: "sms",
    categoryLabel: "Bank Impersonation",
    expectedRisk: "High",
    preview: "URGENT: Your Chase account has been temporarily locked...",
    text: "URGENT: Your Chase account has been temporarily locked due to suspicious login attempts from IP 192.168.1.1. To prevent permanent suspension within 24 hours, verify your identity immediately: http://chase-security-restore.xyz/login. Do not share your 6-digit OTP code with anyone.",
  },
  {
    id: "usps-package",
    title: "Unclaimed Package Notice",
    channel: "sms",
    categoryLabel: "Delivery Smishing",
    expectedRisk: "High",
    preview: "USPS Notice: Your package US98274198 could not be delivered...",
    text: "USPS Notice: Your package US98274198 could not be delivered due to an incomplete street number on the label. Please update your address and pay the $1.85 redelivery fee within 12 hours: https://bit.ly/usps-track-package98 or your item will be returned to sender.",
  },
  {
    id: "whatsapp-job",
    title: "High-Pay WhatsApp Remote Job",
    channel: "whatsapp",
    categoryLabel: "Task / Job Scam",
    expectedRisk: "High",
    preview: "Hello! I am Sophie from Global Recruiters. We offer flexible work...",
    text: "Hello! I am Sophie from Global Talent HR. We saw your resume online and have an urgent opening for a Remote App Reviewer. Work 30-60 mins daily from your phone and earn $200-$500/day. Daily payouts via USDT cryptocurrency or Cash App. Contact our manager on Telegram @SophieHR to claim your $50 signup bonus now!",
  },
  {
    id: "legit-appointment",
    title: "Routine Dental Reminder",
    channel: "sms",
    categoryLabel: "Routine Notification",
    expectedRisk: "Low",
    preview: "Hi Alex, this is a reminder for your dental appointment tomorrow...",
    text: "Hi Alex, this is a friendly reminder of your routine dental checkup with Dr. Smith tomorrow, Thursday at 2:30 PM. Please reply 'C' to confirm or call our clinic at 555-0199 if you need to reschedule. Thank you!",
  },
];
