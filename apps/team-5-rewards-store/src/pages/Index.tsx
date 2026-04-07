import { TeamPageLayout } from '@voyado-kth/ui';
import workshopData from '../../../../workshop.json';
import { ComingSoon } from './ComingSoon';

export function Index() {
  return (
    <TeamPageLayout teamId="team-5" fallbackData={workshopData}>
      <ComingSoon />
    </TeamPageLayout>
  );
}
