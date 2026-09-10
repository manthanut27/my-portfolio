import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { EmptyState } from '../components/EmptyState';
import { FolderSearch } from 'lucide-react';

export const EmptyStatePage: React.FC = () => {
  useSEO({
    title: 'Empty State // Manthan Utekar',
    description: 'Empty state page preview in Manthan Utekar’s creative engineering portfolio.',
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-yellow text-brand-navy font-body flex flex-col items-center justify-center p-6 relative select-none">
      <div className="w-full max-w-xl">
        <EmptyState
          title="No Artifacts Found"
          description="You've reached an empty collection in cyberspace. There are no items or active builds in this workspace right now."
          icon={<FolderSearch className="w-8 h-8 text-brand-orange" />}
          actionLabel="Return to Portfolio"
          onAction={() => navigate('/')}
          secondaryActionLabel="Open Terminal"
          onSecondaryAction={() => {
            navigate('/');
            setTimeout(() => {
              const el = document.getElementById('terminal');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          }}
        />

        <div className="mt-8 text-center font-mono text-xs text-brand-navy/60">
          Route: <code className="bg-white/60 px-2 py-0.5 rounded border border-brand-navy/20">/empty</code>
        </div>
      </div>
    </div>
  );
};

export default EmptyStatePage;
