export function Carousel({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
export function CarouselContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
export function CarouselItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
export function CarouselNext() { return null; }
export function CarouselPrevious() { return null; }
