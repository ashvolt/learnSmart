import * as Sharing from 'expo-sharing';
import { TestSession } from '../types';

export interface Certificate {
  holderName: string;
  score: number;
  total: number;
  date: string;
  achievementLevel: string;
}

export function generateCertificate(
  session: TestSession,
  holderName: string = 'User'
): Certificate {
  const percentage = (session.score / session.total) * 100;
  let achievementLevel = 'Practitioner';

  if (percentage >= 90) achievementLevel = 'Master';
  else if (percentage >= 75) achievementLevel = 'Advanced';
  else if (percentage >= 60) achievementLevel = 'Proficient';

  return {
    holderName,
    score: session.score,
    total: session.total,
    date: session.date,
    achievementLevel,
  };
}

export function formatCertificateText(cert: Certificate): string {
  const percentage = Math.round((cert.score / cert.total) * 100);
  const formattedDate = new Date(cert.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `🎓 CCAT Practice Achievement\n\n` +
    `This is to certify that\n\n` +
    `${cert.holderName}\n\n` +
    `has demonstrated proficiency in the Crossover Cognitive Aptitude Test (CCAT)\n\n` +
    `Score: ${cert.score}/${cert.total} (${percentage}%)\n` +
    `Level: ${cert.achievementLevel}\n` +
    `Date: ${formattedDate}\n\n` +
    `Completed with learnSmart CCAT Trainer\n` +
    `https://github.com/yourname/learnSmart`;
}

export async function shareToLinkedIn(certificate: Certificate): Promise<void> {
  const text = formatCertificateText(certificate);

  try {
    const result = await Sharing.shareAsync(undefined, {
      mimeType: 'text/plain',
      dialogTitle: 'Share CCAT Achievement',
      UTI: 'public.plain-text',
    });

    // Check if user shared
    if (result.action === Sharing.SharedAction.SHARED) {
      console.log('Certificate shared successfully');
    }
  } catch (error) {
    console.error('Error sharing certificate:', error);
    throw error;
  }
}

export function getLinkedInShareUrl(certificate: Certificate): string {
  const message = formatCertificateText(certificate);
  const encodedMessage = encodeURIComponent(message);
  // This would open LinkedIn with the message pre-filled
  // Note: Direct LinkedIn sharing via deep links has limitations
  return `https://www.linkedin.com/feed/?shareActive=true&text=${encodedMessage}`;
}

export function getCertificateAchievementBadge(percentage: number): string {
  if (percentage >= 90) return '🏆';
  if (percentage >= 75) return '🥇';
  if (percentage >= 60) return '🥈';
  return '🥉';
}
