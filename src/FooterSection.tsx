import { Separator } from "@/components/ui/separator";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function FooterSection(): React.JSX.Element {
  // Data for language options
  const languages = [
    { code: "ENG", active: true },
    { code: "ESP", active: true },
    { code: "SVE", active: true },
  ];

  // Data for info links
  const infoLinks = [
    { name: "PRICING", active: true },
    { name: "ABOUT", active: true },
    { name: "CONTACTS", active: true },
  ];

  // Data for footer links
  const footerLinks = [
    { name: "privacy", active: true },
    { name: "terms", active: false },
  ];

  return (
    <footer className="relative w-full bg-neutral-100 py-24 px-16">
      <div className="container mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left column - Info */}
          <div className="col-span-2">
            <div className="flex flex-col gap-8">
              <div className="opacity-40 [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[10px] tracking-[0.40px] leading-[14.0px]">
                INFO
              </div>

              <div className="flex flex-col gap-2">
                {infoLinks.map((link, index) => (
                  <div key={link.name} className="flex items-center gap-2">
                    <div className="opacity-60 [font-family:'Inter-Medium',Helvetica] font-medium text-black text-xs tracking-[0] leading-[15.6px]">
                      {link.name}
                    </div>
                    {index < infoLinks.length - 1 && (
                      <div className="opacity-20 [font-family:'Inter-Light',Helvetica] font-light text-black text-xs tracking-[0] leading-[15.6px]">
                        /
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Languages section */}
            <div className="flex flex-col gap-8 mt-16">
              <div className="opacity-40 [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[10px] tracking-[0.40px] leading-[14.0px]">
                LANGUAGES
              </div>

              <div className="flex flex-col gap-2">
                {languages.map((language, index) => (
                  <div key={language.code} className="flex items-center gap-2">
                    <div className="opacity-60 [font-family:'Inter-Medium',Helvetica] font-medium text-black text-xs tracking-[-0.24px] leading-[16.8px]">
                      {language.code}
                    </div>
                    {index < languages.length - 1 && (
                      <div className="opacity-20 [font-family:'Inter-Light',Helvetica] font-light text-black text-xs tracking-[-0.24px] leading-[16.8px]">
                        /
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle column - empty space */}
          <div className="col-span-3"></div>

          {/* Right column - Technologies */}
          <div className="col-span-7">
            <div className="flex flex-col gap-8">
              <div className="opacity-40 [font-family:'Inter-Medium',Helvetica] font-medium text-[#1e1e1e] text-[10px] tracking-[0.40px] leading-[13.0px]">
                TECHNOLOGIES
              </div>

              <div className="flex flex-col gap-3 relative">
                <div className="[font-family:'Inter-Black',Helvetica] font-black text-[#ececec] text-[80px] tracking-[-1.60px] leading-[88.0px]">
                  VR
                </div>

                <div className="relative">
                  {/* Diamond shape */}
                  <div className="absolute w-[47px] h-[47px] top-0 left-0">
                    <div className="relative h-[47px]">
                      
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="[font-family:'Inter-Black',Helvetica] font-black text-black text-[80px] tracking-[-1.60px] leading-[88.0px]">
                      XIV
                    </div>
                    <div className="opacity-40 [font-family:'Inter-Medium',Helvetica] font-medium text-[#1e1e1e] text-xs tracking-[0] leading-[15.6px] self-center">
                      Near-field communication
                    </div>
                    <div className="opacity-20 [font-family:'Inter-Thin',Helvetica] font-thin text-[#1e1e1e] text-[56px] tracking-[-1.12px] leading-[61.6px]">
                      
                    </div>
                  </div>
                </div>

                <div className="[font-family:'Inter-Black',Helvetica] font-black text-black text-[80px] tracking-[-1.60px] leading-[88.0px]">
                  QR
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and links */}
        <div className="flex justify-between items-center mt-32">
          {/* Arrow button */}
          <div className="w-16 h-16 rounded-full border border-solid border-black flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6" />
            <Separator className="absolute w-16 bottom-0" />
          </div>

          {/* Copyright and links */}
          <div className="flex justify-between w-full ml-16">
            <div className="opacity-40 [font-family:'Inter-Medium',Helvetica] font-medium text-[#1e1e1e] text-[10px] tracking-[0] leading-[13.0px]">
              © 2024 — copyright
            </div>

            <div className="flex gap-8">
              {footerLinks.map((link) => (
                <div
                  key={link.name}
                  className={`opacity-40 [font-family:'Inter-Medium',Helvetica] font-medium text-${
                    link.active ? "[#1e1e1e]" : "[#dfdfdf]"
                  } text-[10px] tracking-[0] leading-[13.0px]`}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}