'use client';

import { useEffect, useState } from 'react';
import { useScopedI18n } from '@/locales/client';

import { Button } from '@/components/ui/button';
import { Modal } from './Modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useScopedI18n('modal');
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={t('title')}
      description={t('description')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='pt-6 flex items-center justify-end w-full'>
        <Button
          disabled={loading}
          variant='outline'
          onClick={onClose}
          className='mx-1'
        >
          {t('cancel')}
        </Button>
        <Button
          disabled={loading}
          variant='destructive'
          onClick={onConfirm}
          className='mx-1'
        >
          {t('continue')}
        </Button>
      </div>
    </Modal>
  );
};
