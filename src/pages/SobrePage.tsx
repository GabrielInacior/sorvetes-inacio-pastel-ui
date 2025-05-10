
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";

const SobrePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <PageHeader 
        title="Sobre Nós" 
        subtitle="Conheça a história da Sorvetes Inacio e nossa paixão por sorvetes"
      />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* História */}
        <section className="mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1585936018814-73aa4dc9ea1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="História da Sorvetes Inacio" 
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-sorbet-dark">Nossa História</h2>
              <p className="text-gray-600 mb-4">
                A Sorvetes Inacio nasceu em 1995, quando a família Inacio decidiu transformar sua paixão por sorvetes artesanais em um negócio. O que começou como uma pequena sorveteria no coração do Rio de Janeiro, rapidamente se tornou um ponto de referência para os amantes de sorvete na cidade.
              </p>
              <p className="text-gray-600 mb-4">
                Com receitas tradicionais trazidas da Itália pelos avós do fundador, Antônio Inacio, a sorveteria sempre se destacou pela qualidade dos ingredientes e pelo sabor inconfundível dos seus produtos. Ao longo dos anos, a empresa cresceu, mas manteve sua essência artesanal e familiar.
              </p>
              <p className="text-gray-600">
                Hoje, a Sorvetes Inacio conta com várias unidades espalhadas pelo Brasil, mas continua fiel aos seus princípios de qualidade, autenticidade e paixão por criar os melhores sorvetes do país.
              </p>
            </div>
          </div>
        </section>
        
        {/* Missão, Visão e Valores */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-sorbet-dark">
            Missão, Visão e Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-sorbet-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-sorbet-dark">Nossa Missão</h3>
              <p className="text-gray-600">
                Proporcionar momentos de felicidade através de sorvetes artesanais de alta qualidade, feitos com ingredientes selecionados e muito carinho.
              </p>
            </div>
            
            {/* Visão */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-sorbet-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-sorbet-dark">Nossa Visão</h3>
              <p className="text-gray-600">
                Ser reconhecida como a melhor sorveteria artesanal do Brasil, expandindo nossa presença nacional enquanto mantemos a qualidade e tradição dos nossos produtos.
              </p>
            </div>
            
            {/* Valores */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-sorbet-peach rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-sorbet-dark">Nossos Valores</h3>
              <p className="text-gray-600">
                <span className="block mb-1">• Qualidade sem compromissos</span>
                <span className="block mb-1">• Sustentabilidade e responsabilidade</span>
                <span className="block mb-1">• Tradição e inovação</span>
                <span className="block mb-1">• Atendimento acolhedor</span>
                <span className="block">• Paixão pelo que fazemos</span>
              </p>
            </div>
          </div>
        </section>
        
        {/* Nossa Equipe */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-sorbet-dark">
            Nossa Equipe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Membro 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Antônio Inacio" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-lg text-sorbet-dark">Antônio Inacio</h3>
                <p className="text-gray-500 mb-4">Fundador e CEO</p>
                <p className="text-gray-600 text-sm">
                  Apaixonado por sorvetes desde criança, Antônio fundou a Sorvetes Inacio com o sonho de levar felicidade através de sobremesas de qualidade.
                </p>
              </div>
            </div>
            
            {/* Membro 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Marina Inacio" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-lg text-sorbet-dark">Marina Inacio</h3>
                <p className="text-gray-500 mb-4">Diretora Criativa</p>
                <p className="text-gray-600 text-sm">
                  Responsável por desenvolver novos sabores e combinações, Marina traz inovação mantendo a tradição que fez a sorveteria ser amada.
                </p>
              </div>
            </div>
            
            {/* Membro 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Carlos Santos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-lg text-sorbet-dark">Carlos Santos</h3>
                <p className="text-gray-500 mb-4">Mestre Sorveteiro</p>
                <p className="text-gray-600 text-sm">
                  Com mais de 20 anos de experiência, Carlos é responsável pela qualidade e consistência dos sorvetes em todas as nossas lojas.
                </p>
              </div>
            </div>
            
            {/* Membro 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Laura Oliveira" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-lg text-sorbet-dark">Laura Oliveira</h3>
                <p className="text-gray-500 mb-4">Gerente de Marketing</p>
                <p className="text-gray-600 text-sm">
                  Laura lidera nossas estratégias de marketing e comunicação, garantindo que a experiência Sorvetes Inacio chegue a mais pessoas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SobrePage;
