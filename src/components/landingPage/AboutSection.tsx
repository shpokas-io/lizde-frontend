import Button from "@/components/common/Button";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-[#121212] text-white py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent mb-6">
            Tavo kelias į alternatyvios muzikos subtilybęs prasideda čia!
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 text-orange-400">
              Šis kursas skirtas tau, jei:
            </h3>
            <ul className="space-y-4 list-none pl-0 text-lg">
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-200">
                  Nori įrašinėti muziką, bet nežinai nuo ko pradėti.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-200">
                  Turi technikos, bet ne iki galo supranti, kaip ją išnaudoti..
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-200">
                  Bandai miksuoti, bet viskas skamba ne taip, kaip norėtum.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-200">
                  Nori įrašinėti kitus atlikėjus, bet trūksta praktinių žinių.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-200">
                  Domiesi įrašais, bet pasimeti tarp pluginų ir nustatymų.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-200">
                  Ieškai aiškios, žingsnis po žingsnio struktūros.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-200">
                  Tiesiog nori pagaliau viską susidėlioti galvoje ir pradėti
                  kurti rimčiau.
                </span>
              </li>
            </ul>
          </div>
          <Image
            src="/images/landing_page_1.png"
            alt="Engineer recording drums"
            width={600}
            height={400}
            className="rounded-2xl shadow-2xl w-full max-w-full md:max-w-md lg:max-w-lg object-cover mx-auto"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Image
            src="/images/landing_page_2.png"
            alt="Engineer working in studio"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full max-w-full md:max-w-md lg:max-w-lg object-cover mx-auto lg:order-1"
          />
          <div>
            <h3 className="text-2xl font-bold mb-6">Mes padėsim tau su:</h3>
            <ul className="space-y-3 list-disc pl-6 leading-relaxed  list-inside text-lg">
              <li>
                Įrangos pasirinkimu – nuo programos iki mikrofono ir ausinių.
              </li>
              <li>
                Tinkamu įrašų procesu – ką, kur ir kaip prijungti bei
                nusistatyti.
              </li>
              <li>
                Paprastais būdais įrašyti būgnus, gitaras ir kitus instrumentus
                net namų sąlygomis.
              </li>
              <li>Aiškiu takelių tvarkymu ir routing&apos;u tavo DAW&apos;e.</li>
              <li>
                Svarbiausiais garso apdorojimo įrankiais – EQ, kompresoriumi,
                efektų siuntimais.
              </li>
              <li>
                Instrumentų miksu – kad viskas derėtų tarpusavyje ir skambėtų
                profesionaliai.
              </li>
              <li>
                Vokalų apdorojimu ir suvedimu – kad jie taptų tavo dainos
                centru.
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-16">
          <Button
            text="Pradėk dabar"
            href="/buy"
            className="bg-orange-500 text-white text-lg font-bold py-4 px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
