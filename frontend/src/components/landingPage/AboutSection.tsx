import Button from "@/components/common/Button";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="bg-black text-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Tavo kelias į alternatyvios muzikos subtilybęs prasideda čia!
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Šis kursas skirtas tau, jei:
            </h3>
            <ul className="space-y-3 list-disc pl-6 leading-relaxed list-inside text-lg">
              <li>Esi ambicingas kūrėjas</li>
              <li>Kuri alternatyvių žanrų muziką.</li>
              <li>Nori perprasti alternatyvios muzikos subtilybes.</li>
              <li>Ieškai įkvėpimo ir profesionalių patarimų.</li>
              <li>Sieki išgryninti savo unikalų skambesį.</li>
              <li>Nori mokytis iš geriausių šios srities mentorių.</li>
              <li>
                Tau svarbu ne tik muzika, bet ir jos emocija bei atmosfera.
              </li>
            </ul>
          </div>
          <Image
            src="/images/about-section.jpg"
            alt="Engineer recording drums"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full max-w-full md:max-w-md lg:max-w-lg object-cover mx-auto"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Image
            src="/images/about-section.jpg"
            alt="Engineer working in studio"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full max-w-full md:max-w-md lg:max-w-lg object-cover mx-auto lg:order-1"
          />
          <div>
            <h3 className="text-2xl font-bold mb-6">Mes padėsim tau su:</h3>
            <ul className="space-y-3 list-disc pl-6 leading-relaxed  list-inside text-lg">
              <li>Muzikos industrijos pagrindais</li>
              <li>Profesionaliu muzikos kūrimo procesu </li>
              <li>Garsų dizainu ir aranžuotėmis</li>
              <li>Muzikos prodiusavimo pagrindais</li>
              <li>Įrašų ir miksavimo subtilybėmis</li>
              <li>Masteringo technikomis</li>
              <li>Tinkamiausios įrangos ir softo pasirinkimu</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <Button
            text="Pradėk dabar"
            href="/free-class"
            className="bg-[#292f36] text-white text-lg font-bold py-4 px-6 rounded-lg hover:bg-[#1d2129] transition"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
