import { StudioContent } from '@/components/Studio';
import Navbar from '@/components/Navbar';
import LenisSetup from '@/components/LenisSetup';
import BodyScripts from '@/components/BodyScripts';
import GlobalStyles from '@/components/GlobalStyles';

export default function StudioPage() {
  return (
    <main>
      <Navbar />
      <GlobalStyles />
      <StudioContent />
      <LenisSetup />
      <BodyScripts />
    </main>
  );
}
