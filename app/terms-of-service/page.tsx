import { Badge } from "@/components/ui/badge";

export default function TermsOfServicePage() {
    return (
        <main className="bg-[#f5f5fa] min-h-screen">
            <section className="bg-[#15171e] text-white py-24">
                <div className="container mx-auto px-6">
                    <Badge className="bg-[#e91e63] border-none mb-6">INFO</Badge>
                    <h1 className="text-5xl font-black mb-6">Gebruiksvoorwaarden</h1>
                    <p className="text-gray-400 font-medium">Laatst bijgewerkt op 19 februari 2026</p>
                </div>
            </section>

            <section className="py-24 container mx-auto px-6">
                <div className="max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-slate prose-headings:text-[#15171e] prose-headings:font-black">
                    <p>Door gebruik te maken van de website van MainStage Vision ga je akkoord met de volgende voorwaarden.</p>

                    <h2>1. Intellectueel Eigendom</h2>
                    <p>Alle content op deze website (teksten, foto's, video's) is eigendom van MainStage Vision of haar partners, tenzij anders aangegeven. Het is niet toegestaan content over te nemen zonder schriftelijke toestemming.</p>

                    <h2>2. Gebruik van de website</h2>
                    <p>Je mag de website niet gebruiken voor illegale doeleinden of op een manier die de functionaliteit van de site kan schaden.</p>

                    <h2>3. Aansprakelijkheid</h2>
                    <p>MainStage Vision is niet aansprakelijk voor eventuele fouten in de verstrekte informatie of voor schade die voortvloeit uit het gebruik van de website.</p>
                </div>
            </section>
        </main>
    );
}
