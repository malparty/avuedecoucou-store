import Link from 'next/link';

export default function SideBarTitle({ title, href }: { title: string; href: string }) {
  return (
    <div className="-space-y-0.5">
      <div className="relative flex gap-2 items-start">
        <div className="md:flex-grow">
          <Link
            href={href}
            className="font-bold uppercase"
          >
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
}
