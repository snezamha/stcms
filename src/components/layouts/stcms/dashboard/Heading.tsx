import { HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  ...props
}) => {
  return (
    <div {...props}>
      <h2 className='text-2xl mb-4 text-primary font-bold tracking-tight'>
        {title}
      </h2>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  );
};
