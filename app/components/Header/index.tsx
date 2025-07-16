import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-[#02836C] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/images/Logo/Logo.png" // Replace with your logo path
                alt="IDBI Bank Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}