const slideImage = (import.meta.env.BASE_URL + 'media/how-it-works-reference.jpg');

export default function HowItWorks({ active = false }: { active?: boolean }) {
 return (
  <section className="how-it-works-slide w-screen h-screen overflow-hidden relative deck" data-active={active}>
   <img
    src={slideImage}
    alt="شريحة رحلة المستخدم في أربع خطوات"
    crossOrigin="anonymous"
     className="how-it-works-image absolute inset-0 h-full w-full object-cover"
   />
    <div className="how-it-works-bottom-mask" aria-hidden="true" />
  </section>
  );
}
