import { Badge } from "@/components/ui/badge";

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-[#f5f5fa] min-h-screen">
            <section className="bg-[#15171e] text-white py-24">
                <div className="container mx-auto px-6">
                    <Badge className="bg-[#e91e63] border-none mb-6">INFO</Badge>
                    <h1 className="text-5xl font-black mb-6">Privacybeleid</h1>
                    <p className="text-gray-400 font-medium">Laatst bijgewerkt op 19 februari 2026</p>
                </div>
            </section>

            <section className="py-24 container mx-auto px-6">
                <div className="max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-slate prose-headings:text-[#15171e] prose-headings:font-black">
                    <p>Bij MainStage Vision hechten we veel waarde aan jouw privacy. In dit document leggen we uit hoe we omgaan met jouw persoonsgegevens.</p>

                    <h2>1. Gegevensverzameling</h2>
                    <p>Wanneer je gebruik maakt van onze website, kunnen we de volgende gegevens verzamelen:</p>
                    <ul>
                        <li>Vrijwillig verstrekte gegevens via contactformulieren en medewerker-aanmeldingen.</li>
                        <li>Cookies voor een betere gebruikerservaring en geanonimiseerde analyse (Google Analytics).</li>
                    </ul>

                    <h2>2. Gebruik van gegevens</h2>
                    <p>Je gegevens worden uitsluitend gebruikt voor:</p>
                    <ul>
                        <li>Het verwerken van jouw vragen of aanmeldingen.</li>
                        <li>Het sturen van nieuwsbrieven, mits je hiervoor expliciet toestemming hebt gegeven.</li>
                    </ul>

                    <h2>3. Rechten</h2>
                    <p>Je hebt altijd het recht om jouw gegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact met ons op via info@mainstage.vision.</p>
                </div>
            </section>
        </main>
    );
}
