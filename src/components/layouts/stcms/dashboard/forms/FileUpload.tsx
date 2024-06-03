'use client';

import { Trash } from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';
import { UploadFileResponse } from 'uploadthing/client';
import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';

import deleteFiles from '@/actions/delete-files';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onChange: (value: UploadFileResponse[]) => void;
  onRemove: (value: string) => void;
  value?: UploadFileResponse[];
  endpoint: 'imageUploader';
}

export const FileUpload = ({
  onChange,
  onRemove,
  value,
  endpoint,
}: FileUploadProps) => {
  return (
    <>
      {value ? (
        <div className='pb-5 flex flex-wrap gap-4'>
          {value?.map((item) => (
            <div
              key={item.key}
              className='relative h-[200px] w-[200px] overflow-hidden rounded-md'
            >
              <div className='absolute right-2 top-2 z-10'>
                <Button
                  type='button'
                  onClick={async () => {
                    onRemove(item.url);
                    await deleteFiles(item.key);
                  }}
                  variant='destructive'
                  size='sm'
                >
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
              <div>
                <Image
                  fill
                  className='rounded-md object-cover '
                  alt={item.name ?? 'Image'}
                  src={item.url}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <UploadDropzone<OurFileRouter>
        className='ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300 py-2 dark:bg-zinc-800'
        endpoint={endpoint}
        config={{ mode: 'auto' }}
        onClientUploadComplete={(res: any) => {
          onChange(res!);
        }}
        onUploadError={(error: Error) => {
          toast({
            title: error.message,
            variant: 'destructive',
          });
        }}
      />
    </>
  );
};
