import slideImage from '@assets/Screenshot_٢٠٢٦-١٠-٣١-٢٠-٢٠-٥٨-٣٠_6431dcd7adc47d9b8b1ef172f656_1793471862492.jpg';

export default function HowItWorks({ active = false }: { active?: boolean }) {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck" data-active={active}>
   <img
    src={slideImage}
    alt="شريحة رحلة المستخدم في أربع خطوات"
    crossOrigin="anonymous"
    className="absolute inset-0 h-full w-full object-contain"
   />
  </section>
  );
}
